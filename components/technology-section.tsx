"use client";

import { Card } from "@/components/ui/card";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { useTechnologyLove } from "@/hooks/ApiCall";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechnologySection() {
  const { data, isLoading, isError } = useTechnologyLove();

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Technologies I Love</h2>
        <p className="text-muted-foreground">Loading technologies...</p>
        <div className="flex justify-center gap-4 mt-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-64 rounded-xl bg-gray-300" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data?.data) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Technologies I Love</h2>
        <p className="text-red-500">Failed to load technologies.</p>
      </section>
    );
  }

  const technologies = data.data;

  // Split into two marquee rows for better visual balance
  const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
  const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

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

        {/* ✅ Dual Marquees */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-8">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((tech) => (
              <Card
                key={tech._id}
                className="flex-shrink-0 w-64 p-6 m-2 hover:shadow-xl transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={tech.image.url}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </Card>
            ))}
          </Marquee>

          {/* Edge gradients */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
        </div>
      </div>
    </section>
  );
}
