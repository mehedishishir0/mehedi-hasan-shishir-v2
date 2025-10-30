"use client";

import { Card } from "@/components/ui/card";
import { Marquee } from "./ui/marquee";

const technologies = [
  { name: "React", logo: "⚛️", description: "UI Library" },
  { name: "Next.js", logo: "▲", description: "React Framework" },
  { name: "TypeScript", logo: "TS", description: "Type Safety" },
  { name: "Node.js", logo: "🟢", description: "Backend Runtime" },
  { name: "Tailwind CSS", logo: "🎨", description: "Styling" },
  { name: "PostgreSQL", logo: "🐘", description: "Database" },
  { name: "MongoDB", logo: "🍃", description: "NoSQL DB" },
  { name: "Docker", logo: "🐳", description: "Containerization" },
];

export default function TechnologySection() {
  const firstRow = technologies.slice(0, technologies.length / 2);
  const secondRow = technologies.slice(technologies.length / 2);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technologies I Love
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and frameworks I work with daily
          </p>
        </div>

        {/* ✅ Dual Magic Marquees */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Top Row — moves LEFT → RIGHT */}
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {firstRow.map((tech, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-64 p-6 m-2 hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{tech.logo}</div>
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </Card>
            ))}
          </Marquee>

          {/* Edge gradient fades */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
        </div>
      </div>
    </section>
  );
}
