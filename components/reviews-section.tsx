// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { useReveiew } from "@/hooks/ApiCall"
// import { Star } from "lucide-react"
// import Image from "next/image"
// import { useEffect, useRef, useState } from "react"

// export default function ReviewsSection() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const { data } = useReveiew() // API data
//   const reviews = data?.data || [] // fallback to empty array
//   const total = reviews.length
//   useEffect(() => {
//     if (total === 0) return
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % total)
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [total])

//   useEffect(() => {
//     if (containerRef.current && total > 0) {
//       const width = containerRef.current.clientWidth
//       containerRef.current.scrollTo({
//         left: currentIndex * (width / 3), // 3 cards visible on desktop
//         behavior: "smooth",
//       })
//     }
//   }, [currentIndex, total])

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4"> Reviews</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             What people say about working with me
//           </p>
//         </div>

//         <div
//           ref={containerRef}
//           className="flex overflow-x-hidden gap-6 snap-x snap-mandatory scroll-smooth"
//         >
//           {reviews.map((review: any, index: number) => (
//             <div
//               key={review._id || index}
//               className="snap-start flex-shrink-0 w-full md:w-1/3 px-2"
//             >
//               <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
//                 <CardContent className="pt-6 flex flex-col h-[210px]">
//                   <div className="flex items-center gap-4 mb-4">
//                     <Image
//                       src={review?.image?.url || "/placeholder.svg"}
//                       alt={review?.name}
//                       width={80}
//                       height={80}
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                     <div>
//                       <h3 className="font-bold">{review.name}</h3>
//                       <p className="text-sm text-muted-foreground">{review.role}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-1 mb-4">
//                     {Array.from({ length: review.rating }).map((_, i) => (
//                       <Star
//                         key={i}
//                         className="h-4 w-4 fill-yellow-400 text-yellow-400"
//                       />
//                     ))}
//                   </div>

//                   <p className="text-muted-foreground leading-relaxed max-h-32 overflow-y-auto">
//                     {review.feedback}
//                   </p>
//                 </CardContent>

//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }



"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useReveiew } from "@/hooks/ApiCall";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ReviewsSection() {
  const { data, isLoading } = useReveiew();
  const reviews = data?.data || [];

  // Infinite loop create korar jonno reviews array-ke double kora hoyeche
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Client Reviews</h2>
        <p className="text-gray-400">What people say about working with me</p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden">
        {isLoading ? (
          <div className="flex gap-6 px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[250px] w-[350px] rounded-[2rem] bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6 flex-nowrap"
            animate={{
              x: ["0%", "-50%"], // 0 theke 50% porjonto move hobe (jekhane content repeat hoy)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration:100, 
                ease: "linear",
              },
            }}
          >
            {duplicatedReviews.map((review: any, index: number) => (
              <div
                key={index}
                className="w-[350px] md:w-[400px] flex-shrink-0"
              >
                <Card className="h-full bg-white/[0.02] border-white/10 hover:border-blue-500/30 transition-all duration-500 rounded-[2rem] overflow-hidden p-0">
                  <CardContent className="p-8 flex flex-col h-full relative">
                    {/* Background Quote Icon */}
                    <Quote className="absolute top-6 right-8 w-10 h-10 text-blue-500/10" />

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <Image
                        src={review?.image?.url || "/placeholder.svg"}
                        alt={review?.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50"
                      />
                      <div>
                        <h3 className="font-bold text-white text-base">{review.name}</h3>
                        <p className="text-xs text-teal-400 font-medium tracking-wide uppercase">{review.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < (review.rating || 5) ? "fill-blue-400 text-blue-400" : "text-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-400 italic text-sm leading-relaxed line-clamp-4">
                      &quot;{review.feedback}&quot;
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        )}

        {/* Side Gradients for Fade Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030712] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030712] to-transparent z-20" />
      </div>
    </section>
  );
}