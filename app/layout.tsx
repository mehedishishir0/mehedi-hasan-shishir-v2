import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { QueryProvider } from "@/provider/query-provider";
import { Toaster } from "sonner";
import FloatingReviewButton from "@/components/floating-review-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const siteUrl = "https://mehedi-hasan-shishir.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mehedi Hasan Shishir | Full Stack Developer & JavaScript Expert",
    template: "%s | Mehedi Hasan Shishir",
  },
  description:
    "Welcome to the official portfolio of Mehedi Hasan Shishir (M.H Shishir) — a passionate Full Stack Developer and Software Engineer from Bangladesh skilled in JavaScript, TypeScript, React, Next.js, Node.js, and .NET. Explore projects, technical skills, and professional experience.",
  applicationName: "Mehedi Hasan Shishir Portfolio",
  authors: [{ name: "Mehedi Hasan Shishir", url: siteUrl }],
  creator: "Mehedi Hasan Shishir",
  publisher: "Mehedi Hasan Shishir",
  keywords: [
    "Mehedi Hasan Shishir",
    "M.H Shishir",
    "MH Shishir",
    "Mehedi Hasan",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    ".NET Developer",
    "Software Engineer Bangladesh",
    "Web Developer Bangladesh",
    "Mehedi Hasan Shishir Portfolio",
    "mehedishishir0",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Mehedi Hasan Shishir | Full Stack Developer Portfolio",
    description:
      "Explore the professional portfolio of Mehedi Hasan Shishir — expert in JavaScript, React, Next.js, Node.js, and .NET technologies.",
    url: siteUrl,
    siteName: "Mehedi Hasan Shishir Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan Shishir | Full Stack Developer Portfolio",
    description:
      "Explore the professional portfolio of Mehedi Hasan Shishir — expert in JavaScript, React, Next.js, and modern web architectures.",
    creator: "@mehedishishir0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Mehedi Hasan Shishir",
      "alternateName": ["M.H Shishir", "MH Shishir", "Shishir", "mehedishishir0"],
      "url": siteUrl,
      "image": `${siteUrl}/logo.png`,
      "sameAs": [
        "https://github.com/mehedishishir0",
        "https://www.linkedin.com/in/mehedi-hasan-shishir0",
        "https://facebook.com/mehedishishir0",
      ],
      "jobTitle": "Full Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance / Independent Software Engineer",
      },
      "knowsAbout": [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "C#",
        ".NET",
        "PostgreSQL",
        "MongoDB",
        "Tailwind CSS",
        "Full Stack Development",
        "Frontend Development",
        "Backend Development",
      ],
      "description":
        "Full Stack Developer and Software Engineer from Bangladesh specializing in building scalable web applications with JavaScript, React, Next.js, Node.js, and .NET.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Mehedi Hasan Shishir Portfolio",
      "description":
        "Official portfolio of Mehedi Hasan Shishir — Full Stack Developer & JavaScript Expert.",
      "publisher": {
        "@id": `${siteUrl}/#person`,
      },
      "inLanguage": "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <Toaster />
        <QueryProvider>
          {/* <LenisSmoothScroll /> */}
          <Navbar />
          {children}
          <Footer />
          <FloatingReviewButton />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
