import type { ExportCaseRow } from "./domain/report";

function safeCell(value: string): string {
  const neutralized = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${neutralized.replaceAll('"', '""')}"`;
}

export function buildCaseCsv(rows: ExportCaseRow[]): string {
  const header = [
    "Código interno",
    "Materia",
    "Etapa",
    "Estado",
    "Ciclo",
    "Responsable",
    "Próxima fecha",
  ];
  const body = rows.map((row) =>
    [
      row.internalCode,
      row.matter,
      row.stage,
      row.status,
      row.lifecycle,
      row.responsible,
      row.nextRelevantDate,
    ]
      .map(safeCell)
      .join(","),
  );
  return `\uFEFF${[header.map(safeCell).join(","), ...body].join("\r\n")}\r\n`;
}
