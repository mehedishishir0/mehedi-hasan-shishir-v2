"use client"

import { Card } from "@/components/ui/card"
import { useGetStackGallery } from "@/hooks/ApiCall"
import Image from "next/image"

export default function TechStackGallery() {
  const { data } = useGetStackGallery()
  const techStack = data?.data || [] // fallback to empty array

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tech Stack Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete overview of technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech) => (
            <Card
              key={tech._id}
              className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={tech.image.url}
                  alt={tech.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-semibold text-sm text-center">{tech.title}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
