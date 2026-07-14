// "use client";

// import { Card } from "@/components/ui/card";
// import { Code2, Palette, Rocket, Users, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useAbout } from "@/hooks/ApiCall";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AboutSection() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const aboutGet = useAbout();
//   const aboutData = aboutGet.data?.data?.[0];

//   const images = Array.isArray(aboutData?.image)
//     ? aboutData.image
//     : aboutData?.image
//       ? [aboutData.image]
//       : [];

//   const highlights = [
//     { icon: Code2, title: "Clean Code", description: "Writing maintainable and scalable code", color: "from-blue-500/20 to-cyan-500/20" },
//     { icon: Palette, title: "Design Focus", description: "Creating beautiful user experiences", color: "from-purple-500/20 to-pink-500/20" },
//     { icon: Rocket, title: "Fast Delivery", description: "Efficient project completion", color: "from-orange-500/20 to-red-500/20" },
//     { icon: Users, title: "Team Player", description: "Collaborative and communicative", color: "from-green-500/20 to-emerald-500/20" },
//   ];

//   useEffect(() => {
//     if (!isAutoPlaying || images.length <= 1) return;
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, images.length]);

//   const goToNext = () => {
//     setIsAutoPlaying(false);
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const goToPrevious = () => {
//     setIsAutoPlaying(false);
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden">
//       {/* Background Glows */}
//       <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
//       <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />

//       <div className="container mx-auto relative z-10">
//         <div className="text-center mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Me</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto text-lg">
//               Combining technical expertise with a passion for clean design to build digital experiences that matter.
//             </p>
//           </motion.div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Enhanced Carousel */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="relative "
//           >
//             <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-[2.5rem] blur opacity-20" />
//             <Card className="overflow-hidden relative  bg-gray-900 border-white/10 p-2 rounded-[2rem] shadow-2xl">
//               <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-black">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={currentImageIndex}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.5 }}
//                     className="absolute inset-0"
//                   >
//                     <Image
//                       src={images[currentImageIndex]?.url || "/placeholder.svg"}
//                       alt="About Image"
//                       fill
//                       className="object-cover"
//                       priority
//                     />
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Overlays & Controls */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
//                 {images.length > 1 && (
//                   <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
//                       onClick={goToPrevious}
//                     >
//                       <ChevronLeft className="h-6 w-6" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
//                       onClick={goToNext}
//                     >
//                       <ChevronRight className="h-6 w-6" />
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </Card>
            
//             {/* Slide Indicators */}
//             <div className="flex justify-center gap-2 mt-6">
//               {images.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => { setIsAutoPlaying(false); setCurrentImageIndex(index); }}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     index === currentImageIndex ? "w-8 bg-blue-500" : "w-2 bg-white/10 hover:bg-white/20"
//                   }`}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Bio Content */}
//           <div className="space-y-10">
//             <motion.div 
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-6"
//             >
//               <h3 className="text-3xl font-bold text-white">
//                 {aboutData?.title || "Full-Stack Developer & Creative Thinker"}
//               </h3>
//               <p className="text-gray-400 text-lg leading-relaxed">
//                 {aboutData?.description ||
//                   "With over 1 years of experience in web development, I specialize in building modern, responsive applications that solve real-world problems."}
//               </p>
//             </motion.div>

//             {/* Highlights Grid (Bento Style) */}
//             <div className="grid sm:grid-cols-2 gap-4">
//               {highlights.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className="group p-5 bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 relative overflow-hidden">
//                     <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
//                     <div className="relative z-10">
//                       <div className="p-2 w-fit rounded-lg bg-white/5 border border-white/10 mb-4 group-hover:border-blue-500/50 transition-colors">
//                         <item.icon className="h-6 w-6 text-blue-400" />
//                       </div>
//                       <h4 className="font-bold text-white mb-1">{item.title}</h4>
//                       <p className="text-sm text-gray-500 leading-snug">{item.description}</p>
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAbout } from "@/hooks/ApiCall";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const aboutGet = useAbout();
  const aboutData = aboutGet.data?.data?.[0];

  const images = Array.isArray(aboutData?.image)
    ? aboutData.image
    : aboutData?.image
    ? [aboutData.image]
    : [];

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and scalable code",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Palette,
      title: "Design Focus",
      description: "Creating beautiful user experiences",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Efficient project completion",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Collaborative and communicative",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              About{" "} Me
           
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Combining technical expertise with a passion for clean design to
              build digital experiences that matter.
            </p>
          </motion.div>
        </div>

        {/* MAIN GRID FIXED: equal height alignment */}
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-[2.5rem] blur opacity-20" />

            <Card className="overflow-hidden relative bg-gray-900 border-white/10 p-2 rounded-[2rem] shadow-2xl h-full">
              <div className="relative h-full min-h-[600px] rounded-[1.5rem] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImageIndex]?.url || "/placeholder.svg"}
                      alt="About Image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
                      onClick={goToNext}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-8 bg-blue-500"
                      : "w-2 bg-white/10 hover:bg-white/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT CONTENT (FIXED ALIGNMENT) */}
          <div className="space-y-10 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                {aboutData?.title ||
                  "Full-Stack Developer & Creative Thinker"}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed" >
                {aboutData?.description ||
                  "With over 1 years of experience in web development, I specialize in building modern, responsive applications that solve real-world problems."}
              </p>
            </motion.div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group p-5 bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    <div
                      className={`absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                    />

                    <div className="relative z-10">
                      <div className="p-2 w-fit rounded-lg bg-white/5 border border-white/10 mb-4 group-hover:border-blue-500/50 transition-colors">
                        <item.icon className="h-6 w-6 text-blue-400" />
                      </div>

                      <h4 className="font-bold text-white mb-1">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}