export const siteConfig = {
  name: "Dhruv Vakharia",
  title: "Dhruv Vakharia | Full Stack Developer",
  description:
    "Full-stack developer building fast, accessible web apps, mobile products, cloud infrastructure, and AI-powered tools with React, Next.js, Node.js, Python, and AWS.",
  email: "vakhariadhruv526@gmail.com",
  location: "Ahmedabad, India",
  url:
    (process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://dhruv-vakharia.vercel.app")).replace(/\/$/, ""),
  github: "https://github.com/dhruvakhariaa",
  linkedin: "https://www.linkedin.com/in/dhruv-vakharia",
  instagram: "https://www.instagram.com/grow.alongside.me/",
  keywords: [
    "Dhruv Vakharia",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "React Native Developer",
    "AWS Developer",
    "Portfolio",
  ],
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
