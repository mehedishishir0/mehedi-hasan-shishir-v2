"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import { useTimeLine } from "@/hooks/ApiCall";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useScroll, useSpring } from "framer-motion";

export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useTimeLine();
  const timelineData = Array.isArray(data?.data) ? data.data : [];

  // Scroll Progress Logic - Eta line-er height control korbe
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"], // Scroll jokhon center-e ashbe tokhon fill hobe
  });

  // Spring animation smoothing-er jonno
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="about" className="relative py-24 px-4 bg-[#030712]">
      <div className="container  mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">My  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Journey</span></h2>
          <p className="text-gray-400">Professional experience and milestones</p>
        </div>

        <div ref={timelineRef} className=" mx-auto relative">
          
          {/* Main Background Line (Static) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Animated Filling Line - Scroll-er sathe fill hobe */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <motion.div
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-teal-400 origin-top shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            />
          </div>

          <div className="space-y-20 w-full">
            {isLoading ? (
               <Skeleton className="h-[200px] w-full bg-white/5 rounded-3xl" />
            ) : (
              timelineData.map((item: any, index: number) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center justify-between w-full ${
                      isLeft ? "md:flex-row-reverse" : "md:flex-row"
                    } pl-16 md:pl-0`}
                  >
                    <div className="hidden md:block w-[45%]" />

                    {/* Timeline Node/Dot */}
                    <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-gray-950 border-2 border-blue-500 z-20 -translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                    <Card className="w-full md:w-[45%] bg-white/[0.02] border-white/10 p-6 rounded-[2rem] hover:border-blue-500/30 transition-colors">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.date).getFullYear()}
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-teal-400 text-sm font-medium">{item.subTitle}</p>
                        <div 
                          className="text-gray-400 text-sm mt-2 opacity-80"
                          dangerouslySetInnerHTML={{ __html: item.content }} 
                        />
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}