
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AllBlogsPage({ limitgst }: { limitgst?: number }) {
  const [page, setPage] = useState(1);
  const limit = limitgst || 12;

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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] min-h-screen overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto relative z-10">
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" /> My Journal
          </span> */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Latest Insights
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tutorials, deep-dives, and my thoughts on the evolving landscape of web technology.
          </p>
        </motion.div>

        {/* Blog Grid with AnimatePresence for smooth pagination transitions */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10" />
              ))}
            </div>
          ) : (
            <motion.div 
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogs.map((blog: any) => (
                <Link href={`/blogs/${blog._id}`} key={blog._id} className="group">
                  <Card className="h-full bg-white/[0.02] border-white/10 hover:border-blue-500/50 transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                    
                    {/* Image Container with Inner Zoom */}
                    <div className="relative h-56 overflow-hidden m-3 rounded-[1.8rem]">
                      <Image
                        src={blog.image.url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>

                    <CardHeader className="px-7 pt-2">
                      <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-3 gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-7 pb-8 pt-0 flex-grow flex flex-col justify-between">
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {blog.description}
                      </p>
                      
                      <div className="flex items-center text-blue-400 font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sleek Pagination */}
        {meta && !limitgst && meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-20">
            <Button
              variant="outline"
              size="lg"
              disabled={!meta.hasPreviousPage}
              onClick={() => {
                setPage((p) => p - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl px-6 h-12 transition-all disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5 mr-2" /> Previous
            </Button>
            
            <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-sm font-bold text-white tracking-widest uppercase">
                {meta.page} <span className="text-gray-500 mx-1">/</span> {meta.totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              size="lg"
              disabled={!meta.hasNextPage}
              onClick={() => {
                setPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl px-6 h-12 transition-all disabled:opacity-30"
            >
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}