import { AppShell } from "@/components/app-shell";
import { ClientForm } from "@/components/client-form";

export const instant = false;

export default async function NewClientPage({ searchParams }: { searchParams: Promise<{ cliente?: string }> }) {
  const { cliente } = await searchParams;
  return <AppShell active="clients"><ClientForm clientCode={cliente} /></AppShell>;
}
