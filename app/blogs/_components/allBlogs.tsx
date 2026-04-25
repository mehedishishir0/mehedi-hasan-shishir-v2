"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

export default function AllBlogsPage() {
  const [page, setPage] = useState(1);
  const limit = 18;

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const blogs = blogsData?.data?.items || [];
  const meta = blogsData?.data?.meta;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Blogs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development and design.
          </p>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[400px] animate-pulse bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-1000">
            {blogs.map((blog: any) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id}>
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group border-none bg-background">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image.url}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3 gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {blog.description}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              disabled={!meta.hasPreviousPage}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-sm font-medium">
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={!meta.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}