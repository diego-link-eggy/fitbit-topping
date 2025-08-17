import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitbit Data Manager",
  description: "Landing page for Fitbit data management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
