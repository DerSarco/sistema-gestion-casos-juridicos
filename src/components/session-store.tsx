"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SessionClient = {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  contactChannel: "Correo electrónico" | "Teléfono";
  notes: string;
};

export type HistoryEntry = { id: string; occurredAt: string; description: string };
export type RelevantDate = { id: string; name: string; date: string; time: string; responsible: string; notes: string };
export type SessionCase = {
  id: string;
  code: string;
  clientId: string;
  title: string;
  description: string;
  lawyer: string;
  status: "Activo" | "En revisión" | "Cerrado";
  stage: "Ingreso" | "Presentación" | "Antecedentes" | "Finalizado";
  court: string;
  ritRol: string;
  history: HistoryEntry[];
  dates: RelevantDate[];
};

type ClientDraft = Omit<SessionClient, "id" | "code">;
type CaseDraft = Omit<SessionCase, "id" | "code" | "history" | "dates">;

type SessionStore = {
  clients: SessionClient[];
  cases: SessionCase[];
  saveClient: (draft: ClientDraft, id?: string) => SessionClient;
  saveCase: (draft: CaseDraft, id?: string) => SessionCase;
  changeCaseState: (id: string, status: SessionCase["status"], stage: SessionCase["stage"], observation: string) => void;
  addRelevantDate: (caseId: string, date: Omit<RelevantDate, "id">) => void;
};

const initialClients: SessionClient[] = [
  { id: "client-1", code: "CLI-001", name: "Cliente 01", email: "cliente01@ejemplo.cl", phone: "+56 9 1234 5678", contactChannel: "Correo electrónico", notes: "" },
  { id: "client-2", code: "CLI-002", name: "Cliente 02", email: "cliente02@ejemplo.cl", phone: "+56 9 8765 4321", contactChannel: "Teléfono", notes: "" },
  { id: "client-3", code: "CLI-003", name: "Cliente 03", email: "cliente03@ejemplo.cl", phone: "+56 2 2345 6789", contactChannel: "Correo electrónico", notes: "" },
  { id: "client-4", code: "CLI-004", name: "Cliente 04", email: "cliente04@ejemplo.cl", phone: "+56 9 5555 4444", contactChannel: "Teléfono", notes: "" },
];

const initialCases: SessionCase[] = [
  { id: "case-1", code: "CASO-001", clientId: "client-1", title: "Demanda ordinaria de cumplimiento de contrato", description: "Revisión de antecedentes y gestión de cobranza prejudicial.", lawyer: "Abogado A", status: "Activo", stage: "Presentación", court: "1º Juzgado Civil de Santiago", ritRol: "C-4821-2026", dates: [{ id: "date-1", name: "Revisión de antecedentes", date: "2026-10-24", time: "10:00", responsible: "Abogado A", notes: "" }], history: [{ id: "history-1", occurredAt: "14 oct 2026, 11:30", description: "Abogado A cambió la etapa a “Presentación”." }, { id: "history-2", occurredAt: "12 sep 2026, 09:15", description: "Abogado A registró el caso en estado “Activo”." }] },
  { id: "case-2", code: "CASO-002", clientId: "client-2", title: "Medida prejudicial precautoria", description: "Revisión inicial de antecedentes ficticios.", lawyer: "Abogado B", status: "En revisión", stage: "Antecedentes", court: "", ritRol: "", dates: [{ id: "date-2", name: "Entrega de antecedentes", date: "2026-10-28", time: "", responsible: "Abogado B", notes: "" }], history: [] },
  { id: "case-3", code: "CASO-003", clientId: "client-1", title: "Cobro ejecutivo de pagaré", description: "Gestión interna ficticia.", lawyer: "Abogado A", status: "Activo", stage: "Ingreso", court: "", ritRol: "", dates: [], history: [] },
  { id: "case-4", code: "CASO-004", clientId: "client-3", title: "Juicio arbitral de partición", description: "Caso ficticio cerrado.", lawyer: "Abogado B", status: "Cerrado", stage: "Finalizado", court: "", ritRol: "", dates: [], history: [] },
];

const StoreContext = createContext<SessionStore | null>(null);

export function SessionStoreProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState(initialClients);
  const [cases, setCases] = useState(initialCases);

  const value = useMemo<SessionStore>(() => ({
    clients,
    cases,
    saveClient(draft, id) {
      const existing = clients.find((client) => client.id === id);
      const saved = existing ? { ...existing, ...draft } : { ...draft, id: `client-${crypto.randomUUID()}`, code: `CLI-${String(clients.length + 1).padStart(3, "0")}` };
      setClients((current) => existing ? current.map((client) => client.id === id ? saved : client) : [...current, saved]);
      return saved;
    },
    saveCase(draft, id) {
      const existing = cases.find((item) => item.id === id);
      const saved: SessionCase = existing ? { ...existing, ...draft } : { ...draft, id: `case-${crypto.randomUUID()}`, code: `CASO-${String(cases.length + 1).padStart(3, "0")}`, dates: [], history: [{ id: crypto.randomUUID(), occurredAt: new Date().toLocaleString("es-CL"), description: `${draft.lawyer} registró el caso en estado “${draft.status}”.` }] };
      setCases((current) => existing ? current.map((item) => item.id === id ? saved : item) : [...current, saved]);
      return saved;
    },
    changeCaseState(id, status, stage, observation) {
      setCases((current) => current.map((item) => item.id === id ? { ...item, status, stage, history: [{ id: crypto.randomUUID(), occurredAt: new Date().toLocaleString("es-CL"), description: `Abogado A cambió el estado a “${status}” y la etapa a “${stage}”.${observation ? ` ${observation}` : ""}` }, ...item.history] } : item));
    },
    addRelevantDate(caseId, date) {
      setCases((current) => current.map((item) => item.id === caseId ? { ...item, dates: [...item.dates, { ...date, id: crypto.randomUUID() }], history: [{ id: crypto.randomUUID(), occurredAt: new Date().toLocaleString("es-CL"), description: `${date.responsible} registró la fecha “${date.name}”.` }, ...item.history] } : item));
    },
  }), [cases, clients]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useSessionStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useSessionStore requiere SessionStoreProvider");
  return store;
}
