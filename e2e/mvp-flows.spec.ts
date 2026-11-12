import { expect, test } from "@playwright/test";

test("MVP-01 valida acceso de demostración y navega", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Correo electrónico").fill("correo-invalido");
  await page.getByLabel("Contraseña").fill("");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page.locator(".error-summary")).toContainText(
    "correo electrónico válido",
  );
  await page.getByLabel("Correo electrónico").fill("abogado@estudio.cl");
  await page.getByLabel("Contraseña").fill("demostracion");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/casos$/);
});

test("MVP-07 y MVP-08 buscan, validan, crean y editan con persistencia", async ({
  page,
}) => {
  const suffix = String(Date.now()).slice(-6);
  const clientName = `Cliente E2E ${suffix}`;
  const updatedClientName = `${clientName} actualizado`;
  await page.goto("/clientes");
  await page.getByPlaceholder(/Buscar por nombre/).fill("inexistente");
  await expect(page.getByText("No se encontraron clientes")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).first().click();
  await page.getByRole("link", { name: "+ Nuevo cliente" }).click();
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await expect(page.locator(".error-summary")).toContainText(
    "Revise el formulario",
  );
  await page.getByLabel(/Nombre completo/).fill(clientName);
  await page.getByLabel(/RUT/).fill(`555${suffix}`);
  await page
    .getByRole("textbox", { name: /Correo electrónico/ })
    .fill("cliente05@ejemplo.cl");
  await page.getByRole("textbox", { name: /Teléfono/ }).fill("+56 9 1111 2222");
  await page.getByLabel(/Origen o materia/).fill("Consulta laboral ficticia");
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await expect(page.getByText(clientName, { exact: true })).toBeVisible();
  await expect(page.getByText(/Mostrando \d+ de \d+ clientes/)).toBeVisible();
  const row = page.getByRole("row").filter({ hasText: clientName });
  await row.getByRole("link", { name: /Editar/ }).click();
  await page.getByLabel(/Nombre completo/).fill(updatedClientName);
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await expect(page.getByText(updatedClientName)).toBeVisible();
  await expect(page.getByText(/Mostrando \d+ de \d+ clientes/)).toBeVisible();
  const updatedRow = page
    .getByRole("row")
    .filter({ hasText: updatedClientName });
  await updatedRow
    .getByPlaceholder("Motivo del cambio")
    .fill("Cierre operativo ficticio");
  await updatedRow.getByRole("button", { name: "Desactivar" }).click();
  await expect(updatedRow.getByText("Inactivo", { exact: true })).toBeVisible();
});

test("P2 crea, edita y archiva un caso persistente", async ({ page }) => {
  await page.goto("/casos");
  await page.getByPlaceholder(/Buscar por código/).fill("sin resultado");
  await expect(page.getByText("No se encontraron casos")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).first().click();
  await page.getByRole("link", { name: "+ Nuevo caso" }).click();
  await page.getByRole("button", { name: "Guardar caso" }).click();
  await expect(page.locator(".error-summary")).toContainText(
    "Revise el formulario",
  );
  await page
    .getByLabel(/Cliente activo/)
    .selectOption({ label: "Cliente Ficticio 01" });
  await page
    .getByLabel(/Materia laboral/)
    .selectOption({ label: "Despido ficticio" });
  await page.getByLabel(/Empleador o contraparte/).fill("Empresa Ficticia SpA");
  await page.getByLabel(/Inicio de relación laboral/).fill("2025-01-10");
  await page.getByLabel(/Fecha de despido/).fill("2026-10-10");
  await page.getByLabel(/^Etapa/).selectOption({ label: "Ingreso" });
  await page.getByLabel(/^Título/).fill("Caso temporal verificable");
  await page
    .getByLabel(/Responsable principal/)
    .selectOption({ label: "Abogado Ficticio A" });
  await page.getByRole("checkbox", { name: "Socio Ficticio A" }).check();
  await page.getByRole("button", { name: "Guardar caso" }).click();
  await expect(page.getByRole("heading", { name: /^CASO-/ })).toBeVisible();
  await expect(
    page.getByRole("main").getByText("Socio Ficticio A", { exact: true }),
  ).toBeVisible();
  await page.locator("a:visible", { hasText: "Editar caso" }).click();
  const editForm = page.locator("form");
  await editForm.getByLabel(/^Título/).fill("Caso temporal actualizado");
  await editForm.getByRole("button", { name: "Guardar caso" }).click();
  await expect(page.getByText("Caso temporal actualizado")).toBeVisible();
  await page
    .locator('input[aria-label="Motivo del cambio"]:visible')
    .fill("Archivo de prueba ficticio");
  await page.locator("button:visible", { hasText: "Archivar" }).click();
  await expect(
    page.getByText("Archivado", { exact: true }).first(),
  ).toBeVisible();
});

test("P3 combina filtros y oculta casos no disponibles", async ({ page }) => {
  await page.goto("/casos");
  await page
    .getByLabel("Filtrar por cliente")
    .selectOption({ label: "Cliente Ficticio 01" });
  await page
    .getByLabel("Filtrar por responsable")
    .selectOption({ label: "Abogado Ficticio A" });
  await page.getByLabel("Filtrar por etapa").selectOption({ label: "Ingreso" });
  await expect(
    page.getByText("CASO-FICTICIO-001", { exact: true }),
  ).toBeVisible();
  await page.getByPlaceholder(/Buscar por código/).fill("sin coincidencia");
  await expect(page.getByText("No se encontraron casos")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).click();
  await expect(page.getByLabel("Filtrar por cliente")).toHaveValue("ALL");
  await page.goto("/casos/CASO-NO-DISPONIBLE");
  await expect(page.getByText("Caso no disponible")).toBeVisible();
  await expect(page.getByText(/no pertenece al estudio/)).toBeVisible();
});

test("el modal gestiona foco y Escape", async ({ page }) => {
  await page.goto("/casos/CASO-FICTICIO-001/estado");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel("Cerrar")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/casos\/CASO-FICTICIO-001$/);
});

test("confirmar un modal no lo revive al navegar atrás", async ({ page }) => {
  await page.goto("/casos");
  await page.goto("/casos/CASO-FICTICIO-001/estado");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Confirmar cambio" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.goBack();

  await expect(page).toHaveURL(/\/casos$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`ocho pantallas sin desborde de página en ${viewport.name}`, async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.setViewportSize(viewport);
    for (const path of [
      "/",
      "/casos",
      "/casos/nuevo",
      "/casos/CASO-001",
      "/casos/CASO-001/estado",
      "/casos/CASO-001/fechas/nueva",
      "/clientes",
      "/clientes/nuevo",
    ]) {
      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
      const overflow = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        elements: Array.from(document.querySelectorAll("body *"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              element: `${element.tagName.toLowerCase()}.${Array.from(element.classList).join(".")}`,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          })
          .filter(
            ({ left, right }) => left < -1 || right > window.innerWidth + 1,
          )
          .slice(0, 8),
      }));
      expect(
        overflow.documentWidth,
        `${path} presenta desborde horizontal: ${JSON.stringify(overflow)}`,
      ).toBeLessThanOrEqual(overflow.viewportWidth + 1);
    }
  });
}
