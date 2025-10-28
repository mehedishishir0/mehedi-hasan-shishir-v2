import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"



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
    url: "https://yourdomain.com",
    siteName: "Mehedi Hasan Shishir Portfolio",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mehedi Hasan Shishir Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
