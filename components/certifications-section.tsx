


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, ShieldCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import css from "@/public/css.jpg";
import js from "@/public/javascript.jpg";

const certificates = [
  {
    title: "CSS Certification",
    issuer: "Great Learning",
    date: "2024",
    status: "Completed",
    color: "from-orange-500 to-red-600",
    image: css,
  },
  {
    title: "JavaScript Certification",
    issuer: "Simplilearn",
    date: "2024",
    status: "Completed",
    color: "from-blue-500 to-cyan-400",
    image: js,
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">
            <Award className="w-3.5 h-3.5" /> Achievements
          </span> */}
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Certifications</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A testament to my commitment to continuous learning and technical mastery.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="
                  group relative overflow-hidden bg-white/[0.02] border-white/10 
                  hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] 
                  transition-all duration-500 rounded-[2rem] p-0
                "
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[1.5rem]">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      {cert.date}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md border border-green-500/30 px-3 py-1 rounded-lg">
                    <ShieldCheck className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-bold uppercase text-green-400 tracking-tight">Verified</span>
                  </div>
                </div>

                {/* Certificate Info */}
                <CardContent className="px-7 pb-8 pt-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cert.color}`} />
                      <span className="text-sm font-medium">{cert.issuer}</span>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Great Learning Partner</span>
                    <button className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-blue-400 transition-colors">
                      View Credential <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </CardContent>

                {/* Subtle Neon Inner Glow */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}