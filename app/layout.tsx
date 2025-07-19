// app/layout.tsx
"use client";

export const dynamic = "force-dynamic"; // Keep this export
import ClientProviders from "./ClientProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import nextDynamic from "next/dynamic"; // Rename the import
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StarField } from "./components/Stars";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Use the renamed import
const ClientProviders = nextDynamic(
  () => import("./ClientProvider"), // Correct path
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <StarField/>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
