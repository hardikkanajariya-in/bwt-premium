import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BANCO Water Tank — FRP Panel Tanks | Neomech (T) Ltd.",
  description:
    "Premium FRP Panel Type Water Tanks by Neomech (T) Ltd., Tanzania. Corrosion-free, UV-resistant, modular water storage solutions since 1965.",
  keywords: [
    "BANCO water tank",
    "FRP water tank",
    "panel water tank",
    "Tanzania water storage",
    "Neomech",
    "fiberglass tank",
  ],
  openGraph: {
    title: "BANCO Water Tank — Neomech (T) Ltd.",
    description: "Designed for Safety. Built to Last. Premium FRP Water Tanks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600&display=swap"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
