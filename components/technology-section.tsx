// "use client";

// import { Card } from "@/components/ui/card";
// import { Marquee } from "./ui/marquee";
// import Image from "next/image";
// import { useTechnologyLove } from "@/hooks/ApiCall";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function TechnologySection() {
//   const { data, isLoading, isError } = useTechnologyLove();

//   if (isLoading) {
//     return (
//       <section className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">Technologies I Love</h2>
//         <p className="text-muted-foreground">Loading technologies...</p>
//         <div className="flex justify-center gap-4 mt-8">
//           {[...Array(6)].map((_, i) => (
//             <Skeleton key={i} className="h-40 w-64 rounded-xl bg-gray-300" />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   if (isError || !data?.data) {
//     return (
//       <section className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">Technologies I Love</h2>
//         <p className="text-red-500">Failed to load technologies.</p>
//       </section>
//     );
//   }

//   const technologies = data.data;

//   // Split into two marquee rows for better visual balance
//   const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
//   const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="container mx-auto">
//         {/* Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//             Technologies I Love
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Tools and frameworks I work with daily
//           </p>
//         </div>

//         {/* ✅ Dual Marquees */}
//         <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-8">
//           <Marquee pauseOnHover className="[--duration:20s]">
//             {firstRow.map((tech) => (
//               <Card
//                 key={tech._id}
//                 className="flex-shrink-0 w-64 p-6 m-2 hover:shadow-xl transition-shadow text-center"
//               >
//                 <div className="flex justify-center mb-4">
//                   <Image
//                     src={tech.image.url}
//                     alt={tech.name}
//                     width={64}
//                     height={64}
//                     className="object-contain"
//                   />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {tech.description}
//                 </p>
//               </Card>
//             ))}
//           </Marquee>

//           {/* Edge gradients */}
//           <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
//           <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { Card } from "@/components/ui/card";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { useTechnologyLove } from "@/hooks/ApiCall";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function TechnologySection() {
  const { data, isLoading, isError } = useTechnologyLove();

  if (isLoading) {
    return (
      <section className="py-24 bg-[#030712] text-center">
        <Skeleton className="h-10 w-64 mx-auto mb-4 bg-white/5" />
        <div className="flex justify-center gap-6 mt-12 px-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-64 rounded-3xl bg-white/5" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data?.data) {
    return (
      <section className="py-24 bg-[#030712] text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Technologies I Love</h2>
        <p className="text-red-400">Failed to load tools. Please refresh.</p>
      </section>
    );
  }

  const technologies = data.data;
  const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
  const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" /> Stack & Tools
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
            Technologies I <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Love</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My core arsenal for building high-performance, pixel-perfect web applications.
          </p>
        </motion.div>

        {/* ✅ Dual Animated Marquees */}
        <div className="relative flex flex-col gap-8 items-center justify-center overflow-hidden">
          {/* Row 1: Forward Direction */}
          <Marquee pauseOnHover className="[--duration:35s] py-4">
            {firstRow.map((tech) => (
              <TechCard key={tech._id} tech={tech} />
            ))}
          </Marquee>

          {/* Row 2: Reverse Direction */}
          <Marquee reverse pauseOnHover className="[--duration:40s] py-4">
            {secondRow.map((tech) => (
              <TechCard key={tech._id} tech={tech} />
            ))}
          </Marquee>

          {/* Premium Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#030712]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#030712]" />
        </div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: any }) {
  return (
    <Card className="group relative flex-shrink-0 w-72 p-8 m-3 bg-white/[0.02] border-white/5 hover:border-blue-500/30 transition-all duration-500 rounded-[2rem] overflow-hidden">
      {/* Card Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative w-16 h-16 mb-6 transform group-hover:scale-110 transition-transform duration-500">
            {/* Soft Icon Shadow */}
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src={tech.image.url}
            alt={tech.name}
            fill
            className="object-contain relative z-10"
          />
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {tech.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 px-2">
          {tech.description}
        </p>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}