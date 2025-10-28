import { Card } from "@/components/ui/card"

const techStack = [
  { name: "React", logo: "⚛️" },
  { name: "Next.js", logo: "▲" },
  { name: "TypeScript", logo: "TS" },
  { name: "JavaScript", logo: "JS" },
  { name: "Node.js", logo: "🟢" },
  { name: "Express", logo: "🚂" },
  { name: "MongoDB", logo: "🍃" },
  { name: "PostgreSQL", logo: "🐘" },
  { name: "Tailwind CSS", logo: "🎨" },
  { name: "Git", logo: "📦" },
  { name: "Docker", logo: "🐳" },
  { name: "AWS", logo: "☁️" },
]

export default function TechStackGallery() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tech Stack Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Complete overview of technologies I work with</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <Card
              key={index}
              className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform">{tech.logo}</div>
              <p className="font-semibold text-sm text-center">{tech.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
