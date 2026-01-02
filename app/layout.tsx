import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { QueryProvider } from "@/provider/query-provider";
import { Toaster } from "sonner";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import FloatingReviewButton from "@/components/floating-review-button";

export const metadata: Metadata = {
  title: "Mehedi Hasan Shishir | Full Stack Developer & JavaScript Expert",
  description:
    "Welcome to the portfolio of Mehedi Hasan Shishir — a passionate Full Stack Developer skilled in JavaScript, React, Next.js, and .NET. Explore projects, skills, and professional experience.",
  generator: "v0.app",
  keywords: [
    "Mehedi Hasan Shishir",
    "Full Stack Developer",
    "Frontend Developer",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
    ".NET Developer",
    "Portfolio",
    "Web Developer",
    "Bangladesh Developer",
  ],
  authors: [{ name: "Mehedi Hasan Shishir" }],
  openGraph: {
    title: "Mehedi Hasan Shishir | Full Stack Developer Portfolio",
    description:
      "Explore the professional portfolio of Mehedi Hasan Shishir — expert in JavaScript, React, Next.js, and .NET technologies.",
    url: "https://mehedi-hasan-shishir.vercel.app",
    siteName: "Mehedi Hasan Shishir Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Toaster />
        <QueryProvider>
          {/* <LenisSmoothScroll /> */}
          {children}
          <FloatingReviewButton/>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
