import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ServiceWorker } from "@/components/pwa/service-worker";
import { Providers } from "./providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Project Sejengkal — Cukup maju sedikit.",
    template: "%s · Project Sejengkal",
  },
  description:
    "Langkah kecil untuk mulai melakukan sesuatu yang lebih besar. Bikin goal, jalanin challenge, bangun habit, dan catat progress lo — cukup maju sejengkal tiap hari.",
  applicationName: "Project Sejengkal",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Sejengkal",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    title: "Project Sejengkal — Cukup maju sedikit.",
    description: "Langkah kecil untuk mulai melakukan sesuatu yang lebih besar.",
    type: "website",
    url: "/",
    siteName: "Project Sejengkal",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f0e2" },
    { media: "(prefers-color-scheme: dark)", color: "#18140d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Lompat ke konten
        </a>
        <Providers>{children}</Providers>
        <ServiceWorker />
      </body>
    </html>
  );
}
