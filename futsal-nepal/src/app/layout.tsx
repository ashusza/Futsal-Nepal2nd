import type { Metadata } from "next";
import { Bebas_Neue, Outfit, JetBrains_Mono, Metal_Mania } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

const metalMania = Metal_Mania({
  weight: "400",
  variable: "--font-metal-mania",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Circle",
  description: "Nepal's first elite futsal booking, rewards and tournament platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${outfit.variable} ${jetbrainsMono.variable} ${metalMania.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
