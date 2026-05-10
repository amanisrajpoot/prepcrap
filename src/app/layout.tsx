import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "PrepCrap — Senior Frontend Interview Prep",
  description:
    "An open-source, interactive accordion framework for senior frontend interview preparation. Master React internals, system design, and more with dynamic study tracks.",
  keywords: [
    "frontend interview",
    "react interview",
    "senior developer",
    "interview preparation",
    "react internals",
    "system design",
  ],
  authors: [{ name: "PrepCrap" }],
  openGraph: {
    title: "PrepCrap — Senior Frontend Interview Prep",
    description:
      "Master your senior frontend interview with dynamic study tracks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
