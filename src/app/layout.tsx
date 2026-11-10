import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SessionStoreProvider } from "@/components/session-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de gestión de casos jurídicos",
  description: "Entorno de desarrollo con datos ficticios para la gestión interna de casos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body><SessionStoreProvider>{children}</SessionStoreProvider></body>
    </html>
  );
}
