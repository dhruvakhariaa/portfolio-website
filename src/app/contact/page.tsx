import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact Dhruv Vakharia for full-stack development, Next.js, React Native, cloud infrastructure, and AI product work.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: `Contact | ${siteConfig.name}`,
        description:
            "Start a project with Dhruv Vakharia, a full-stack developer based in Ahmedabad, India.",
        url: absoluteUrl("/contact"),
    },
    twitter: {
        title: `Contact | ${siteConfig.name}`,
        description:
            "Start a project with Dhruv Vakharia, a full-stack developer based in Ahmedabad, India.",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
