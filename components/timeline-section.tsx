// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Briefcase } from "lucide-react";
// import { useTimeLine } from "@/hooks/ApiCall";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function TimelineSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [lineHeight, setLineHeight] = useState(0);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const timelineRef = useRef<HTMLDivElement>(null);

//   const { data, isLoading } = useTimeLine();
//   const timelineData = Array.isArray(data?.data) ? data.data : [];

//   // Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => entry.isIntersecting && setIsVisible(true),
//       { threshold: 0.1 },
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Scroll-based line height
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!timelineRef.current) return;
//       const timelineTop = timelineRef.current.getBoundingClientRect().top;
//       const timelineHeight = timelineRef.current.offsetHeight;
//       const windowHeight = window.innerHeight;
//       const scrollProgress = Math.max(
//         0,
//         Math.min(
//           1,
//           (windowHeight - timelineTop) / (timelineHeight + windowHeight),
//         ),
//       );
//       setLineHeight(scrollProgress * 100);
//     };

//     if (isVisible) {
//       window.addEventListener("scroll", handleScroll);
//       handleScroll();
//     }

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isVisible]);

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
//     >
//       <div className="container  mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Professional experience and learning milestones
//           </p>
//         </div>

//         <div ref={timelineRef} className=" mx-auto relative">
//           {/* Center Line (Desktop) */}
//           <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
//             <div
//               className="absolute top-0 left-0 w-full bg-primary transition-all duration-300 ease-out"
//               style={{ height: `${lineHeight}%` }}
//             />
//           </div>

//           {/* Mobile Line */}
//           <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:hidden">
//             <div
//               className="absolute top-0 left-0 w-full bg-primary transition-all duration-300 ease-out"
//               style={{ height: `${lineHeight}%` }}
//             />
//           </div>

//           {/* Timeline Items */}
//           <div className="space-y-12">
//             {isLoading ? (
//               Array.from({ length: 3 }).map((_, i) => {
//                 const isLeft = i % 2 === 0;
//                 return (
//                   <div
//                     key={i}
//                     className={`relative ${
//                       isLeft
//                         ? "md:pr-[calc(50%+2rem)] md:text-left"
//                         : "md:pl-[calc(50%+2rem)] md:text-left"
//                     } pl-20 md:pl-0`}
//                   >
//                     {/* Icon */}
//                     <div
//                       className={`absolute top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10`}
//                       style={{
//                         transform: "scale(1)",
//                       }}
//                     />

//                     {/* Skeleton Card */}
//                     <Card className="p-6">
//                       <div
//                         className={`flex flex-col gap-2 ${
//                           isLeft ? "md:items-end" : "md:items-start"
//                         } items-start`}
//                       >
//                         <Skeleton className="h-4 w-32 bg-gray-400 animate-pulse" />
//                         <Skeleton className="h-6 w-64 bg-gray-400 animate-pulse" />
//                         <Skeleton className="h-4 w-48 bg-gray-400 animate-pulse" />
//                         <Skeleton className="h-20 w-full bg-gray-400  animate-pulse" />
//                       </div>
//                     </Card>
//                   </div>
//                 );
//               })
//             ) : timelineData.length > 0 ? (
//               timelineData.map((item: any, index: number) => {
//                 const isLeft = index % 2 === 0;
//                 const isItemVisible =
//                   lineHeight > (index / timelineData.length) * 100;

//                 return (
//                   <div
//                     key={item._id || index}
//                     className={`relative ${
//                       isLeft
//                         ? "md:pr-[calc(50%+2rem)] md:text-left"
//                         : "md:pl-[calc(50%+2rem)] md:text-left"
//                     } pl-20 md:pl-0`}
//                   >
//                     {/* Icon */}
//                     <div
//                       className={`absolute top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 transition-all duration-500 ${
//                         isItemVisible
//                           ? "scale-100 opacity-100"
//                           : "scale-0 opacity-0"
//                       } ${
//                         isLeft
//                           ? "md:right-[calc(50%-1.25rem)] left-[1.25rem] md:left-auto"
//                           : "md:left-[calc(50%-1.25rem)] left-[1.25rem]"
//                       }`}
//                     >
//                       <Briefcase className="h-5 w-5 text-primary-foreground" />
//                     </div>

//                     {/* Card */}
//                     <Card
//                       className={`p-6 hover:shadow-lg transition-all duration-500 ${
//                         isItemVisible
//                           ? "opacity-100 translate-x-0"
//                           : `opacity-0 ${isLeft ? "md:-translate-x-8" : "md:translate-x-8"} -translate-x-8`
//                       }`}
//                     >
//                       <div
//                         className={`flex flex-col gap-2 ${
//                           isLeft ? "md:items-end" : "md:items-start"
//                         } items-start`}
//                       >
//                         <span className="text-sm text-primary w-full font-semibold">
//                           {new Date(item.date).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "long",
//                           })}
//                         </span>
//                         <h3 className="text-xl font-bold w-full">
//                           {item.title}
//                         </h3>
//                         <p className="text-primary/80 w-full font-medium mb-3">
//                           {item.subTitle}
//                         </p>
//                         <p
//                           className="text-muted-foreground whitespace-pre-line"
//                           dangerouslySetInnerHTML={{ __html: item.content }}
//                         ></p>
//                       </div>
//                     </Card>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-center text-muted-foreground py-10">
//                 No timeline data available.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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