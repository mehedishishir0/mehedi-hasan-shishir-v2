"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Share2 } from "lucide-react";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`);
      if (!res.ok) throw new Error("Blog not found");
      return res.json();
    },
  });

  const blog = blogData?.data;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Blog not found!</div>;

  return (
    <article className="py-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="container max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-muted"
          onClick={() => router.back()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>

        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[450px] w-full mb-10 animate-in fade-in zoom-in-95 duration-700">
          <Image
            src={blog.image.url}
            alt={blog.title}
            fill
            priority
            className="object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Content Header */}
        <div className="space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* Blog Body */}
        <div className="prose prose-lg dark:prose-invert max-w-none animate-in fade-in duration-1000 delay-200">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
            {blog.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>Print</Button>
            <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}