import type { Metadata } from "next";
import { Hero, About, Stats, Services, Process, Work, Testimonials, FAQ } from "@/components";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <FAQ />
    </>
  );
}
