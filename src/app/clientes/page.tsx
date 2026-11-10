import { AppShell } from "@/components/app-shell";
import { ClientsScreen } from "@/components/clients-screen";

export default function ClientsPage() {
  return (
    <AppShell active="clients"><ClientsScreen /></AppShell>
  );
}
