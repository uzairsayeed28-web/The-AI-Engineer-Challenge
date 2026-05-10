import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haiku AI — Finance & Business Assistant",
  description:
    "An AI-powered chat assistant with expertise in finance, invoicing, and business operations, built on Claude Haiku.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
