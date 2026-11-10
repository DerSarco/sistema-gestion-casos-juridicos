import { AppShell } from "@/components/app-shell";
import { CaseForm } from "@/components/case-form";

export const instant = false;

export default async function NewCasePage({ searchParams }: { searchParams: Promise<{ editar?: string }> }) {
  const { editar } = await searchParams;
  return <AppShell active="cases"><CaseForm caseCode={editar} /></AppShell>;
}
