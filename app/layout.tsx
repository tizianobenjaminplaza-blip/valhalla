import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VALHALLA — Barbería",
  description: "Una experiencia. No solo un corte. Castrocalvón, León.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}