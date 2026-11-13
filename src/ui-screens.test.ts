import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cases, clients } from "@/fixtures/ui-data";

const routes = [
  "src/app/page.tsx",
  "src/app/casos/page.tsx",
  "src/app/casos/nuevo/page.tsx",
  "src/app/casos/[id]/page.tsx",
  "src/app/casos/[id]/estado/page.tsx",
  "src/app/casos/[id]/fechas/nueva/page.tsx",
  "src/app/clientes/page.tsx",
  "src/app/clientes/nuevo/page.tsx",
];

describe("pantallas aprobadas del MVP", () => {
  it("mantiene disponibles las ocho rutas del prototipo Stitch", () => {
    expect(routes.every((route) => existsSync(route))).toBe(true);
  });

  it("no conecta las pantallas con Prisma durante el incremento visual", () => {
    const screenSource = routes.map((route) => readFileSync(route, "utf8")).join("\n");

    expect(screenSource).not.toContain("@prisma");
    expect(screenSource).not.toContain("getPrismaClient");
  });

  it("utiliza identificadores neutrales en los datos demostrativos", () => {
    expect(cases.every((item) => item.client.startsWith("Cliente "))).toBe(true);
    expect(clients.every((item) => item.name.startsWith("Cliente "))).toBe(true);
    expect(clients.every((item) => item.email.endsWith("@ejemplo.cl"))).toBe(true);
  });
});
