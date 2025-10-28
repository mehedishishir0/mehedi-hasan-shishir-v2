"use client"

import { Card } from "@/components/ui/card"

const technologies = [
  { name: "React", logo: "⚛️", description: "UI Library" },
  { name: "Next.js", logo: "▲", description: "React Framework" },
  { name: "TypeScript", logo: "TS", description: "Type Safety" },
  { name: "Node.js", logo: "🟢", description: "Backend Runtime" },
  { name: "Tailwind CSS", logo: "🎨", description: "Styling" },
  { name: "PostgreSQL", logo: "🐘", description: "Database" },
  { name: "MongoDB", logo: "🍃", description: "NoSQL DB" },
  { name: "Docker", logo: "🐳", description: "Containerization" },
]

export default function TechnologySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technologies I Love</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Tools and frameworks I work with daily</p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee">
              {[...technologies, ...technologies].map((tech, index) => (
                <Card key={index} className="flex-shrink-0 w-64 p-6 hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">{tech.logo}</div>
                  <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
