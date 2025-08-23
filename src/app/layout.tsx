import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import ScrollProgress from "@/components/atoms/ScrollProgress";
import CommandPalette from "@/components/molecules/CommandPalette";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Melih Zafer Hyusein - Portfolio",
  description: "Front-end Developer & Digital Designer specializing in modern web experiences",
  keywords: ["portfolio", "frontend", "developer", "designer", "nextjs", "react"],
  authors: [{ name: "Melih Zafer Hyusein" }],
  creator: "Melih Zafer Hyusein",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  // If you add a web app manifest, place it in /public and update this path
  // manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Melih Zafer Hyusein - Portfolio",
    description: "Front-end Developer & Digital Designer specializing in modern web experiences",
    siteName: "Melih Zafer Hyusein",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melih Zafer Hyusein - Portfolio",
    description: "Front-end Developer & Digital Designer specializing in modern web experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" className={`${inter.variable} ${interDisplay.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-bg text-text" suppressHydrationWarning={true}>
    <a id="top" />
        
        <ScrollProgress />
        
        {/* Background floating wallpaper */}
        <div aria-hidden className="bg-floating">

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/background_logo.png" 
              alt=""
              className="w-full h-full object-cover opacity-10"
              priority
              width={384}
              height={200}
              // sizes="(max-width: 768px) 320px, 384px"
            />
          </div>
          {/* baseline shapes */}
          <div className="shape" style={{ top: '23%', left: '15%' }} />
          <div className="shape circle" style={{ top: '8%', right: '25%' }} />
          <div className="shape triangle" style={{ top: '67%', left: '32%' }} />
          <div className="shape" style={{ bottom: '31%', left: '7%' }} />
          <div className="shape circle" style={{ bottom: '9%', right: '38%' }} />
          {/* extra subtle shapes for richness */}
          <div className="shape" style={{ top: '41%', left: '72%' }} />
          <div className="shape circle" style={{ top: '84%', left: '19%' }} />
          <div className="shape triangle" style={{ bottom: '45%', right: '14%' }} />
          <div className="shape" style={{ top: '52%', right: '61%' }} />
          <div className="shape" style={{ top: '76%', left: '89%' }} />
          <div className="shape circle" style={{ top: '29%', left: '44%' }} />
          <div className="shape triangle" style={{ bottom: '63%', right: '52%' }} />
          <div className="shape" style={{ top: '18%', right: '79%' }} />
        </div>

        {/* Main app chrome */}
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
        
        <CommandPalette />
      </body>
    </html>
  );
}
