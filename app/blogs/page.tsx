import type { Metadata } from "next";
import React from "react";
import AllBlogsPage from "./_components/allBlogs";

export const metadata: Metadata = {
  title: "Blog & Technical Articles",
  description:
    "Explore web development articles, JavaScript tips, React best practices, Next.js tutorials, and engineering insights written by Mehedi Hasan Shishir.",
  alternates: {
    canonical: "https://mehedi-hasan-shishir.vercel.app/blogs",
  },
  openGraph: {
    title: "Blog & Technical Articles | Mehedi Hasan Shishir",
    description:
      "Explore web development articles, JavaScript tips, React best practices, Next.js tutorials, and engineering insights by Mehedi Hasan Shishir.",
    url: "https://mehedi-hasan-shishir.vercel.app/blogs",
    type: "website",
  },
};

const page = () => {
  return (
    <div>
      <AllBlogsPage />
    </div>
  );
};

export default page;
