import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

// ** import styles
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ** SEO Metadata
export const metadata: Metadata = {
  title: "BrightData Multi E-commerce Price Tracker",
  description:
    "Track and compare prices across multiple e-commerce platforms with BrightData's powerful multi-e-commerce price tracker. Stay ahead with dynamic updates and real-time insights.",
  keywords:
    "price tracker, multi-ecommerce tracker, BrightData, e-commerce price tracking, dynamic price updates, online shopping insights, competitive pricing",
  authors: [{ name: "BrightData Team", url: "https://brightdata.com" }],
  openGraph: {
    title: "BrightData Multi E-commerce Price Tracker",
    description:
      "Compare and analyze prices across top e-commerce platforms. Empower your business with real-time pricing data from BrightData.",
    url: "https://price-tracker-1sh.pages.dev",
    siteName: "BrightData Price Tracker",
    type: "website",
    images: [
      {
        url: "https://price-tracker-1sh.pages.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrightData Multi E-commerce Price Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jacksonkasi11",
    creator: "@jacksonkasi11",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
