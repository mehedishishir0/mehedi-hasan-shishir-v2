"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import Image from "next/image";
import css from "@/public/css.jpg";
import js from "@/public/javascript.jpg";

const certificates = [
  {
    title: "CSS Certification",
    issuer: "Great Learning",
    date: "2024",
    status: "Completed",
    color: "from-orange-400 to-red-500",
    image: css,
  },
  {
    title: "JavaScript Certification",
    issuer: "Simplilearn",
    date: "2024",
    status: "Completed",
    color: "from-blue-400 to-cyan-500",
    image: js,
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <Card
              key={index}
              className="
                overflow-hidden relative border p-0 pb-4 border-white/10 
                bg-white/5 backdrop-blur-md
                hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] 
                transition-all duration-500 rounded-2xl group
              "
            >
              {/* Image with subtle overlay */}
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />
                {/* Date badge */}
                <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
                  <span className="text-xs font-semibold text-foreground">
                    {cert.date}
                  </span>
                </div>
              </div>

              {/* Certificate Info */}
              <div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">{cert.issuer}</span>
                  </div>
                </CardContent>
              </div>
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
