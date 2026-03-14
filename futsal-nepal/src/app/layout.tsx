import type { Metadata } from "next";
import { Bebas_Neue, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

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
  title: "Futsal Nepal | Early Access",
  description: "Nepal's elite futsal booking, rewards & tournament platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
