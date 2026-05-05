// "use client";

// import { useEffect, useState } from "react";
// import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
// import TypewriterEffect from "@/components/typewriter-effect";
// import CodeEditor from "@/components/code-editor";
// import { Mail } from "lucide-react";
// import { useHeroSection } from "@/hooks/ApiCall";

// export default function HeroSection() {
//   const [mounted, setMounted] = useState(false);
//   const getHeroData = useHeroSection();
//   useEffect(() => {
//     setMounted(true);
//   }, []);
  
//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="container mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Column - Text Content */}
//           <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
//             <div className="space-y-2">
//               <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
//                 Welcome to my portfolio
//               </p>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
//                 Hi, I&apos;m <span className="text-primary">M.H SHISHIR</span>
//               </h1>
//             </div>

//             <div className="text-2xl sm:text-3xl font-semibold text-muted-foreground min-h-[40px]">
//               {mounted && (
//                 <TypewriterEffect
//                 text={getHeroData.data?.data[0].title || "Full stack developer"}
//                 />
//               )}
//             </div>

//             <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
//              {getHeroData.data?.data[0].description}
//             </p>

//             {/* <div className="flex flex-wrap gap-4 pt-4">
//               <Button size="lg" className="group">
//                 View My Work
//                 <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
//               </Button>
//               <Button size="lg" variant="outline">
//                 Download CV
//               </Button>
//             </div> */}
//             <div>
//               <div className="mt-6 flex gap-10">
//                 {/* Facebook */}
//                 <a
//                   href="https://facebook.com/mehedishishir0"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
//                 >
//                   <FaFacebookF size={18} />
//                 </a>

//                 {/* LinkedIn */}
//                 <a
//                   href="https://www.linkedin.com/in/mehedi-hasan-shishir0"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
//                 >
//                   <FaLinkedinIn size={18} />
//                 </a>

//                 {/* Gmail */}
//                 <a
//                   href="mailto:mehedihasanshishir.info@gmail.com"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md"
//                 >
//                   <Mail size={18} />
//                 </a>

//                 {/* GitHub */}
//                 <a
//                   href="https://github.com/mehedishishir0"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900 transition shadow-md"
//                 >
//                   <FaGithub size={18} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Code Editor */}
//           <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
//             <CodeEditor />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


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
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
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