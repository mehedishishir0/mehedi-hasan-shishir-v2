import type { Metadata } from "next";
import React from "react";
import BlogDetailsPage from "../_components/singelBlog";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://portfolio-backend-afoq.onrender.com/api/v1";

  try {
    const res = await fetch(`${backendUrl}/blogs/${params.id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return {
        title: "Blog Details | Mehedi Hasan Shishir",
      };
    }
    const data = await res.json();
    const blog = data?.data;

    if (!blog) {
      return {
        title: "Blog Details | Mehedi Hasan Shishir",
      };
    }

    const title = `${blog.title} | Mehedi Hasan Shishir`;
    const description =
      blog.description?.slice(0, 160) ||
      "Read insightful web development articles by Mehedi Hasan Shishir.";
    const imageUrl =
      blog.image?.url || "https://mehedi-hasan-shishir.vercel.app/logo.png";

    return {
      title,
      description,
      alternates: {
        canonical: `https://mehedi-hasan-shishir.vercel.app/blogs/${params.id}`,
      },
      openGraph: {
        title,
        description,
        url: `https://mehedi-hasan-shishir.vercel.app/blogs/${params.id}`,
        type: "article",
        publishedTime: blog.createdAt,
        authors: ["Mehedi Hasan Shishir"],
        images: [
          {
            url: imageUrl,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Blog Details | Mehedi Hasan Shishir",
    };
  }
}

const page = () => {
  return (
    <div>
      <BlogDetailsPage />
    </div>
  );
};

export default page;
