import { expect, test } from "@playwright/test";

test("MVP-01 valida acceso de demostración y navega", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Correo electrónico").fill("correo-invalido");
  await page.getByLabel("Contraseña").fill("");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page.locator(".error-summary")).toContainText("correo electrónico válido");
  await page.getByLabel("Correo electrónico").fill("abogado@estudio.cl");
  await page.getByLabel("Contraseña").fill("demostracion");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/casos$/);
});

test("MVP-07 y MVP-08 buscan, validan, crean y editan con persistencia", async ({ page }) => {
  await page.goto("/clientes");
  await page.getByPlaceholder(/Buscar por nombre/).fill("inexistente");
  await expect(page.getByText("No se encontraron clientes")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar búsqueda" }).first().click();
  await page.getByRole("link", { name: "+ Nuevo cliente" }).click();
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await expect(page.locator(".error-summary")).toContainText("Revise los campos");
  await page.getByLabel(/Nombre completo/).fill("Cliente 05");
  await page.getByLabel(/RUT/).fill("555555555");
  await page.getByRole("textbox", { name: /Correo electrónico/ }).fill("cliente05@ejemplo.cl");
  await page.getByRole("textbox", { name: /Teléfono/ }).fill("+56 9 1111 2222");
  await page.getByLabel(/Origen o materia/).fill("Consulta laboral ficticia");
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await expect(page.getByText("Cliente 05", { exact: true })).toBeVisible();
  await expect(page.getByText("Mostrando 2 de 2 clientes")).toBeVisible();
  const row = page.getByRole("row").filter({ hasText: "Cliente 05" });
  await row.getByRole("link", { name: /Editar/ }).click();
  await page.getByLabel(/Nombre completo/).fill("Cliente 05 actualizado");
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await expect(page.getByText("Cliente 05 actualizado")).toBeVisible();
  await expect(page.getByText("Mostrando 2 de 2 clientes")).toBeVisible();
  const updatedRow = page.getByRole("row").filter({ hasText: "Cliente 05 actualizado" });
  await updatedRow.getByPlaceholder("Motivo del cambio").fill("Cierre operativo ficticio");
  await updatedRow.getByRole("button", { name: "Desactivar" }).click();
  await expect(updatedRow.getByText("Inactivo", { exact: true })).toBeVisible();
});

test("MVP-02 a MVP-06 completan caso, filtros, estado, fecha y cancelación", async ({ page }) => {
  await page.goto("/casos");
  await page.getByPlaceholder(/Buscar por código/).fill("sin resultado");
  await expect(page.getByText("No se encontraron casos")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).first().click();
  await page.getByRole("link", { name: "+ Nuevo caso" }).click();
  await page.getByRole("button", { name: "Guardar caso" }).click();
  await expect(page.locator(".error-summary")).toContainText("Revise los campos");
  await page.getByLabel(/Cliente/).selectOption("client-1");
  await page.getByLabel(/Título o materia/).fill("Caso temporal verificable");
  await page.getByLabel(/Abogado responsable/).selectOption("Abogado B");
  await page.getByRole("button", { name: "Guardar caso" }).click();
  await expect(page.getByRole("heading", { name: "CASO-005" })).toBeVisible();
  await page.getByRole("link", { name: "Cambiar estado / etapa" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel("Nuevo estado").selectOption("En revisión");
  await page.getByLabel("Nueva etapa").selectOption("Antecedentes");
  await page.getByRole("button", { name: "Confirmar cambio" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByText("En revisión").first()).toBeVisible();
  await page.getByRole("link", { name: "+ Registrar fecha" }).click();
  await page.getByRole("button", { name: "Guardar fecha" }).click();
  await expect(page.locator(".error-summary")).toContainText("Revise los campos");
  await page.getByLabel(/Nombre de la fecha/).fill("Audiencia ficticia");
  await page.getByLabel(/^Fecha/).fill("2026-12-10");
  await page.getByRole("dialog").getByLabel(/Abogado responsable/).selectOption("Abogado B");
  await page.getByRole("button", { name: "Guardar fecha" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByText("Audiencia ficticia · Abogado B", { exact: true }).first()).toBeVisible();
  await page.locator("a:visible", { hasText: "Editar caso" }).click();
  const editForm = page.locator("form:visible");
  await editForm.getByLabel(/Título o materia/).fill("Caso temporal actualizado");
  await editForm.getByRole("button", { name: "Guardar caso" }).click();
  await expect(page.getByText("Caso temporal actualizado").first()).toBeVisible();
});

test("el modal gestiona foco y Escape", async ({ page }) => {
  await page.goto("/casos/CASO-001/estado");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel("Cerrar")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/casos\/CASO-001$/);
});

for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "tablet", width: 820, height: 1180 }, { name: "mobile", width: 390, height: 844 }]) {
  test(`ocho pantallas sin desborde de página en ${viewport.name}`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize(viewport);
    for (const path of ["/", "/casos", "/casos/nuevo", "/casos/CASO-001", "/casos/CASO-001/estado", "/casos/CASO-001/fechas/nueva", "/clientes", "/clientes/nuevo"]) {
      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflow, `${path} presenta desborde horizontal`).toBe(false);
    }
  });
}
