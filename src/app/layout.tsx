import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation, Footer, PageTransition } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhruv Vakharia | Full Stack Developer",
  description: "Full Stack Developer specializing in modern web applications, React, Next.js, Node.js, and cloud solutions. Let's build something amazing together.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "Node.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Dhruv Vakharia" }],
  openGraph: {
    title: "Dhruv Vakharia | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web applications",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Vakharia | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web applications",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
      >
        <PageTransition>
          <Navigation />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
