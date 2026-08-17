import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bookoutletpro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BookOutlet PRO | Cyber Digital Archive & Pro Library",
    template: "%s | BookOutlet PRO",
  },
  description: "BookOutlet PRO is the definitive pro-grade digital archive for technical, philosophical, and literary EPUB e-books in dark glassmorphism styling.",
  keywords: ["BookOutlet PRO", "Pro Dark Mode Library", "Cyber Ebooks", "Archival Digital Library"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "BookOutlet PRO | Cyber Digital Archive & Pro Library",
    description: "Pro-grade digital archive and cyber library at BookOutlet PRO.",
    url: siteUrl,
    siteName: "BookOutlet PRO",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "BookOutlet PRO" }],
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-inter bg-[#0F172A] text-[#F8FAFC]"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
