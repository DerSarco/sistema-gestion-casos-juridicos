import { describe, expect, it } from "vitest";

describe("base técnica", () => {
  it("identifica el entorno como no productivo", () => {
    const environmentNotice =
      "Entorno de desarrollo · Solo datos ficticios · No apto para uso productivo";

    expect(environmentNotice).toContain("datos ficticios");
    expect(environmentNotice).toContain("No apto para uso productivo");
  });
});
