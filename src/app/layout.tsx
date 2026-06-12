import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation, Footer, PageTransition } from "@/components";
import { absoluteUrl, siteConfig } from "@/lib/site";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/hero-image.jpeg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/hero-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "React Native",
      "Python",
      "AWS",
      "Cloud Infrastructure",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        <link rel="me" href={siteConfig.github} />
        <link rel="me" href={siteConfig.linkedin} />
        <link rel="me" href={siteConfig.instagram} />
        <link rel="canonical" href={absoluteUrl("/")} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
        suppressHydrationWarning
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
