export const cases = [
  { code: "CASO-001", client: "Cliente 01", matter: "Demanda ordinaria de cumplimiento de contrato", lawyer: "Abogado A", status: "Activo", stage: "Presentación", nextDate: "24 oct 2026" },
  { code: "CASO-002", client: "Cliente 02", matter: "Medida prejudicial precautoria", lawyer: "Abogado B", status: "En revisión", stage: "Antecedentes", nextDate: "28 oct 2026" },
  { code: "CASO-003", client: "Cliente 01", matter: "Cobro ejecutivo de pagaré", lawyer: "Abogado A", status: "Activo", stage: "Ingreso", nextDate: "Sin fecha" },
  { code: "CASO-004", client: "Cliente 03", matter: "Juicio arbitral de partición", lawyer: "Abogado B", status: "Cerrado", stage: "Finalizado", nextDate: "Finalizado" },
];

export const clients = [
  { code: "CLI-001", name: "Cliente 01", email: "cliente01@ejemplo.cl", phone: "+56 9 1234 5678", cases: 2 },
  { code: "CLI-002", name: "Cliente 02", email: "cliente02@ejemplo.cl", phone: "+56 9 8765 4321", cases: 1 },
  { code: "CLI-003", name: "Cliente 03", email: "cliente03@ejemplo.cl", phone: "+56 2 2345 6789", cases: 1 },
  { code: "CLI-004", name: "Cliente 04", email: "cliente04@ejemplo.cl", phone: "+56 9 5555 4444", cases: 0 },
];
