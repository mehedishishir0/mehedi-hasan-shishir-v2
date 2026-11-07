"use client";

import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Rocket } from "lucide-react";
import Image from "next/image";
import { useProject } from "@/hooks/ApiCall";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const ProjectCard = ({ project, index, progress, totalProjects }: { project: any; index: number; progress: any; totalProjects: number }) => {

  const start = index * (1 / totalProjects);
  const targetScale = 1 - (totalProjects - index) * 0.04;
  
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div className="h-[80vh]  w-full flex items-center  justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: `calc(5vh + ${index * 20}px)`,
        }}
        className="relative w-full container origin-top px-4"
      >
        <Card className="group  bg-[#0a0f1d]   hover:border-blue-500/50 transition-all duration-500 rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-fit md:h-[440px] px-6 shadow-2xl">
          {/* Image */}
          <div className="relative w-full md:w-1/2 overflow-hidden   rounded-[1.3rem] min-h-[200px]">
            <Link href={`/project/${project._id}`}>
              <Image
                src={project.image?.[0]?.url || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </Link>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 md:p-10">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-white text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-gray-400 line-clamp-3 md:line-clamp-4 text-base leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 mt-auto space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-white/5 text-blue-400 border border-white/10 rounded-lg">
                          {tech.trim()}
                          </span>
                        ))}
              </div>

              <div className="flex gap-4">
                <Button asChild variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-12">
                  <a href={project.githubLink || "#"} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
                <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 border-none rounded-xl h-12 shadow-lg shadow-blue-500/20">
                  <a href={project.liveLink || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live
                  </a>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { data, isLoading, isError } = useProject();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const projects = data?.data || [];

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative bg-[#030712] w-full"
    >

      
      <div className="pt-24 pb-10 text-center px-4 sticky top-0 z-0">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"> Featured Projects
        </h2>
      </div>

      <div className="relative w-full">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center px-8 relative">
            <Skeleton className="h-[480px] w-full max-w-5xl bg-white/5 rounded-[2.5rem]" />
            <span className="sr-only">
              Featured full stack and frontend web applications developed by Mehedi Hasan Shishir with React, Next.js, and modern APIs.
            </span>
          </div>
        ) : isError ? (
          <div className="h-screen flex items-center justify-center text-red-400">
            Unable to load projects.
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id || index}
                index={index}
                project={project}
                progress={scrollYProgress}
                totalProjects={projects.length}
              />
            ))}
          </div>
        )}
      </div>

      {/* Extra space at the bottom to allow the last card to stick for a bit */}
      {/* <div className="h-[20vh]" /> */}
    </section>
  );
}