import { expect, test, type Page } from "@playwright/test";

const demoPassword = process.env.DEMO_LOGIN_PASSWORD;

async function login(
  page: Page,
  identifier = "socio-a@example.test",
): Promise<void> {
  if (!demoPassword) throw new Error("DEMO_LOGIN_PASSWORD no está configurada.");
  await page.goto("/");
  await page.getByLabel("Correo electrónico").fill(identifier);
  await page.getByLabel("Contraseña").fill(demoPassword);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/casos$/);
}

test.beforeEach(async ({ page }, testInfo) => {
  if (
    testInfo.title.startsWith("AUTH-") ||
    testInfo.title.startsWith("MVP-01")
  )
    return;
  await login(page);
});

test("MVP-01 valida acceso de demostración y navega", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Correo electrónico").fill("correo-invalido");
  await page.getByLabel("Contraseña").fill("");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page.locator(".error-summary")).toContainText(
    "correo electrónico válido",
  );
  if (!demoPassword) throw new Error("DEMO_LOGIN_PASSWORD no está configurada.");
  await page.getByLabel("Correo electrónico").fill("socio-a@example.test");
  await page.getByLabel("Contraseña").fill(demoPassword);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/casos$/);
});

test("AUTH-01 protege rutas y elimina la sesión al cerrar", async ({ page }) => {
  await page.goto("/casos");
  await expect(page).toHaveURL(/\/$/);
  await login(page);
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/clientes");
  await expect(page).toHaveURL(/\/$/);
});

for (const account of [
  { identifier: "abogado-a@example.test", role: "Abogado" },
  { identifier: "asistente-a@example.test", role: "Asistente" },
  { identifier: "procurador-a@example.test", role: "Procurador" },
]) {
  test(`AUTH-02 oculta acciones elevadas al perfil ${account.role}`, async ({
    page,
  }) => {
    await login(page, account.identifier);
    await expect(page.locator(".topbar")).toContainText(account.role);
    await page.goto("/clientes");
    await expect(
      page.getByRole("button", { name: /Desactivar|Reactivar/ }),
    ).toHaveCount(0);
    await page.goto("/casos/CASO-FICTICIO-001");
    await expect(page.getByText("Ciclo del caso", { exact: true })).toHaveCount(
      0,
    );
  });
}

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
    page.getByRole("definition").filter({ hasText: "Socio Ficticio A" }),
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

test("P5 registra una caducidad manual sin calcular plazos", async ({
  page,
}) => {
  const dateTitle = `Referencia manual E2E ${String(Date.now()).slice(-6)}`;
  await page.goto("/casos/CASO-FICTICIO-001/fechas/nueva");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel(/^Tipo/).selectOption({ label: "Caducidad manual" });
  await page.getByLabel(/^Título/).fill(dateTitle);
  await page.getByLabel(/Fecha y hora/).fill("2026-12-15T10:30");
  await page
    .getByLabel(/^Responsable/)
    .selectOption({ label: "Abogado Ficticio A" });
  await page.getByLabel(/^Fuente/).fill("Documento ficticio revisado");
  await page.getByRole("button", { name: "Guardar fecha" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByText(dateTitle, { exact: true })).toBeVisible();
  await expect(
    page
      .getByRole("listitem")
      .filter({ hasText: dateTitle })
      .getByText("Fuente: Documento ficticio revisado"),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/casos\/CASO-FICTICIO-001$/);
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

test("P4 muestra historial y cancelar no agrega eventos", async ({ page }) => {
  await page.goto("/casos/CASO-FICTICIO-001");
  const history = page.getByTestId("case-history");
  await expect(history).toBeVisible();
  const before = await history.getByRole("listitem").count();
  await page.getByRole("link", { name: "Cambiar etapa" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: "Cancelar" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(history.getByRole("listitem")).toHaveCount(before);
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
