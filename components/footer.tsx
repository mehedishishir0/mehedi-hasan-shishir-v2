// import { Github, Linkedin, Twitter, Mail } from "lucide-react"

// export default function Footer() {
//   const socialLinks = [
//     { icon: Github, href: "https://github.com/mehedishishir0", label: "GitHub" },
//     { icon: Linkedin, href: "https://www.linkedin.com/in/mehedi-hasan-shishir0", label: "LinkedIn" },
//     { icon: Twitter, href: "", label: "Twitter" },
//     { icon: Mail, href: "mailto:mehedihasanshishir.info@gmail.com", label: "Email" },
//   ]

//   return (
//     <footer className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <div className="flex flex-col items-center gap-6">
//           {/* Social Links */}
//           <div className="flex gap-4">
//             {socialLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.href}
//                 aria-label={link.label}
//                 className="p-3 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
//               >
//                 <link.icon className="h-5 w-5" />
//               </a>
//             ))}
//           </div>

//           {/* Copyright */}
//           <p className="text-sm text-muted-foreground text-center">
//             © {new Date().getFullYear()} Your Name. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }

"use client"

import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/mehedishishir0", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mehedi-hasan-shishir0", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:mehedihasanshishir.info@gmail.com", label: "Email" },
  ]

  return (
    <footer className="relative bg-[#030712] pt-32 pb-12 px-4 overflow-hidden border-t border-white/5">
      {/* Background Decorative Glow - Using your signature Dark Teal */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#112032]/30 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          
          {/* Big Typography with Reflection (Mirror Effect) */}
          <div className="relative  select-none group">
            {/* Main Text - Gradient from White to Transparent-ish */}
            <h2 className="text-[14vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/10 to-transparent tracking-tighter leading-none text-center uppercase">
              MH.SHISHIR
            </h2>
            
            {/* Reflection Text (Mirrored & Faded) */}
            {/* <div className="absolute top-[72%] left-0 right-0 overflow-hidden h-full">
              <h2 className="text-[14vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#112032]/60 to-transparent tracking-tighter leading-none text-center uppercase scale-y-[-1] blur-[2px] opacity-80   transition-all duration-700 group-hover:opacity-100">
               MH.SHISHIR
              </h2>
            </div> */}

            {/* Signature Horizontal Glow Line - Using #112032 */}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[95%] h-[4px] bg-gradient-to-r from-transparent via-[#112032] to-transparent blur-md shadow-[0_0_40px_rgba(17,32,50,0.8)] opacity-80" />
          </div>

          {/* Social Links & Copyright Info */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8  pt-16 relative z-10">
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  whileHover={{ y: -5, backgroundColor: "rgba(17,32,50,0.3)" }}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-[#112032]/50 transition-all duration-300"
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 font-medium tracking-tight">
                © {new Date().getFullYear()} <span className="text-gray-200">Mehedi Hasan Shishir</span>
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#112032] animate-pulse" />
                {/* <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.5em]">
                  Pixel Perfect Developer
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}