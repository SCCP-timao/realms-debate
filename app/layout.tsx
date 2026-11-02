import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Realms Debate",
  description: "Plataforma oficial de condução do debate presidencial do Realm."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
