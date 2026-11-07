"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Share2, Clock, Printer, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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

  if (isLoading) return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Fetching Content...</p>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white font-bold uppercase tracking-widest">
        Blog not found!
    </div>
  );

  return (
    <article className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#030712] min-h-screen overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10" />

      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
        >
            <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-6 group"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                Back to insights
            </Button>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[550px] w-full mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5"
        >
          <Image
            src={blog.image.url}
            alt={blog.title}
            fill
            priority
            className="object-cover transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Header Content */}
        <div className="space-y-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <Clock className="h-4 w-4" />
              5 min read
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight"
          >
            {blog.title}
          </motion.h1>
        </div>

        {/* Blog Content with Glassmorphism Card */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
        >
            <div className="prose prose-invert prose-lg max-w-none">
                {/* Custom styling for white-space pre-wrap behavior */}
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg md:text-xl font-medium opacity-90">
                    {blog.description}
                </p>
            </div>
        </motion.div>

        {/* Footer Actions */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-6"
        >
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-400 font-bold text-xs">MH</span>
             </div>
             <div>
                <p className="text-white font-bold text-sm">Mehedi Hasan Shishir</p>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-tighter">Full-Stack Developer</p>
             </div>
          </div>

          <div className="flex gap-4">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.print()}
                className="rounded-full border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            >
                <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button 
                variant="outline" 
                size="sm"
                className="rounded-full border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            >
                <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </motion.div>
      </div>
    </article>
  );
}