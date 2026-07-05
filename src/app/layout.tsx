import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FactoryProvider } from "@/context/FactoryContext";
import { CampusShell } from "@/components/campus/CampusShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Factory — Headquarters",
  description:
    "Morgan doesn't launch software. He arrives at Headquarters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-shift="morning"
      >
        <FactoryProvider>
          <CampusShell>{children}</CampusShell>
        </FactoryProvider>
      </body>
    </html>
  );
}
