
"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import TypewriterEffect from "@/components/typewriter-effect";
import CodeEditor from "@/components/code-editor";
import { Mail } from "lucide-react";
import { useHeroSection } from "@/hooks/ApiCall";
import { motion } from "framer-motion";

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com/mehedishishir0",
    bgColor: "bg-blue-600",
    hoverBgColor: "hover:bg-blue-700",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/mehedi-hasan-shishir0",
    bgColor: "bg-blue-500",
    hoverBgColor: "hover:bg-blue-600",
  },
  {
    icon: Mail,
    href: "mailto:mehedihasanshishir.info@gmail.com",
    bgColor: "bg-red-500",
    hoverBgColor: "hover:bg-red-600",
  },
  {
    icon: FaGithub,
    href: "https://github.com/mehedishishir0",
    bgColor: "bg-gray-800",
    hoverBgColor: "hover:bg-gray-900",
  },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const getHeroData = useHeroSection();
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-[#030712] text-white"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <motion.p
                className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Welcome to my portfolio
              </motion.p>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Hi, I&apos;m <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">M.H SHISHIR</span>
              </motion.h1>
            </div>

            <div className="text-2xl sm:text-3xl font-semibold text-muted-foreground min-h-[40px]">
              {mounted && (
                <TypewriterEffect
                text={getHeroData.data?.data[0].title || "Full stack developer"}
                />
              )}
            </div>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
             {getHeroData.data?.data[0].description}
            </motion.p>

            <motion.div
              className="mt-6 flex gap-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${link.bgColor} text-white ${link.hoverBgColor} transition shadow-md`}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <CodeEditor />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Palette, Share2, Box, Zap, Code2, Figma } from "lucide-react";

// const FloatingIcon = ({ icon: Icon, className }) => (
//   <div className={`absolute p-3 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl border border-gray-50 flex items-center justify-center ${className}`}>
//     <Icon className="w-5 h-5 text-gray-400" />
//   </div>
// );

// const HeroSection = () => {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      
//       {/* --- Left Side Circles --- */}
//       <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[1000px] h-[1000px] pointer-events-none">
//         {/* Static Inner Lines */}
//         <div className="absolute inset-[15%] border-4 border-gray-200 rounded-full opacity-50" />
//         <div className="absolute inset-[30%] border-4 border-white  rounded-full opacity-50 " />
        
//         {/* Rotating Outer Line with Icons */}
//      <motion.div
//   animate={{ rotate: 360 }}
//   transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//   className="absolute inset-0 rounded-full"
//   style={{
//     border: '2px solid rgba(255, 255, 255, 0.7)', // ছবির মতো চিকন বর্ডার
//     boxShadow: `
//       10px 1px 26px rgba(0, 0, 0, 0.1), 
//       -6px -6px 16px rgba(255, 255, 255, 0.8),
//       inset 2px 2px 5px rgba(0, 0, 0, 0.05),
//       inset -2px -2px 5px rgba(255, 255, 255, 0.5)
//     `
//   }}
// >
//   {/* Icons positioned exactly on the border line */}
//   <FloatingIcon icon={Palette} className="top-1/4 right-[7%] -rotate-[45deg]" />
//   <FloatingIcon icon={Share2} className="top-1/2 -right-6 -translate-y-1/2" />
//   <FloatingIcon icon={Box} className="bottom-1/4 right-[7%] rotate-[45deg]" />
// </motion.div>
//       </div>

//       {/* --- Right Side Circles --- */}
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] pointer-events-none">
//         {/* Static Inner Lines */}
//         <div className="absolute inset-[15%] border-4 border-gray-200 rounded-full opacity-50" />
//         <div className="absolute inset-[30%] border-4 border-gray-200 rounded-full opacity-50" />
        
//         {/* Rotating Outer Line with Icons */}
//         <motion.div
//           animate={{ rotate: -360 }}
//           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//           className="absolute inset-0 border-4 border-gray-200 rounded-full"
//         >
//           <FloatingIcon icon={Code2} className="top-1/4 left-[7%] rotate-[45deg]" />
//           <FloatingIcon icon={Figma} className="top-1/2 -left-6 -translate-y-1/2" />
//           <FloatingIcon icon={Zap} className="bottom-1/4 left-[7%] -rotate-[45deg]" />
//         </motion.div>
//       </div>

//       {/* --- Hero Content --- */}
//       <div className="relative z-10 text-center px-4 max-w-4xl">
//         <div className="mb-8 inline-flex items-center gap-2 px-4 py-1 border border-gray-200 rounded-full bg-white/80 backdrop-blur-sm">
//           <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
//             ⋮ Digital Agency ⋮
//           </span>
//         </div>
        
//         <h1 className="text-6xl md:text-[90px] font-bold tracking-tight text-[#111] leading-[1.05]">
//           We design brands <br />
//           that move <span className="text-[#FF6B2C]">people</span>
//         </h1>
        
//         <p className="mt-10 text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
//           We combine strategy, design, and technology to help ambitious brands stand out & create meaningful digital experiences.
//         </p>

//         <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
//           <div className="relative">
//             <Button size="lg" className="bg-[#FF6B2C] hover:bg-[#e85a1e] text-white px-10 h-15 rounded-xl text-lg font-semibold shadow-2xl shadow-orange-200">
//               Discuss your ideas
//             </Button>
//             {/* Annotation Text */}
//             <div className="absolute -left-36 top-12 hidden lg:block">
//               <span className="text-[#FF6B2C] font-serif italic text-sm">Schedule a free call now</span>
//             </div>
//           </div>
          
//           <Button variant="ghost" size="lg" className="bg-[#0A0A0B] text-white hover:bg-black hover:text-white px-10 h-15 rounded-xl text-lg font-semibold">
//             View services
//           </Button>
//         </div>

//         {/* Logos Section */}
//         <div className="mt-32">
//           <p className="text-[10px] font-bold tracking-[0.4em] text-gray-300 uppercase mb-12">
//             Trusted by 100+ global leaders
//           </p>
//           <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale contrast-125">
//              <span className="text-3xl font-bold italic">Nexter</span>
//              <span className="text-4xl font-black tracking-tighter">oslo.</span>
//              <span className="text-2xl font-mono font-extrabold">NONME</span>
//              <span className="text-3xl font-black">next^</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;