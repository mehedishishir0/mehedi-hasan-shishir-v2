
// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ExternalLink, Github } from "lucide-react"
// import Image from "next/image"
// import { useProject } from "@/hooks/ApiCall"
// import { Skeleton } from "@/components/ui/skeleton"
// import Link from "next/link"

// export default function ProjectsSection() {
//   const { data, isLoading, isError } = useProject()

//   if (isLoading) {
//     return (
//       <section className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
//         <p className="text-muted-foreground mb-8">Loading projects...</p>
//         <div className="grid md:grid-cols-2 gap-8 px-4">
//           {[...Array(2)].map((_, i) => (
//             <Skeleton key={i} className="h-[400px] w-full bg-gray-400 rounded-xl" />
//           ))}
//         </div>
//       </section>
//     )
//   }

//   if (isError || !data?.data) {
//     return (
//       <section className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
//         <p className="text-red-500">Failed to load projects.</p>
//       </section>
//     )
//   }

//   const projects = data.data

//   return (
//     <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//       <div className="container mx-auto">
//         {/* Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             A showcase of my recent work and side projects
//           </p>
//         </div>

//         {/* Project Cards */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {projects.map((project) => (
//             <Card
//               key={project._id}
//               className="overflow-hidden hover:shadow-xl transition-all p-0 pb-4 duration-300 group"
//             >
//               {/* Project Image */}
//               <div className="relative overflow-hidden">
//                 <Link href={`/project/${project._id}`}>
//                   <Image
//                     src={project.image?.[0]?.url || "/placeholder.svg"}
//                     alt={project.title}
//                     width={400}
//                     height={600}
//                     className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                 </Link>
//               </div>

//               {/* Card Content */}
//               <CardHeader>
//                 <CardTitle>{project.title}</CardTitle>
//                 <CardDescription className="line-clamp-3">
//                   {project.description}
//                 </CardDescription>
//               </CardHeader>

//               <CardContent>
//                 {/* Technologies / Tags */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.technologies && project.technologies.length > 0 ? (
//                     project.technologies.map((tech, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
//                       >
//                         {tech.trim()}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-sm text-muted-foreground">
//                       No technologies listed
//                     </span>
//                   )}
//                 </div>

//                 {/* Links */}
//                 <div className="flex gap-3">
//                   <Button
//                     asChild
//                     size="sm"
//                     variant="outline"
//                     className="flex-1 bg-transparent"
//                   >
//                     <a
//                       href={project.githubLink || "#"}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Github className="mr-2 h-4 w-4" />
//                       Code
//                     </a>
//                   </Button>

//                   <Button asChild size="sm" className="flex-1">
//                     <a
//                       href={project.liveLink || "#"}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <ExternalLink className="mr-2 h-4 w-4" />
//                       Demo
//                     </a>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

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
    <div className="h-screen  w-full flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: `calc(5vh + ${index * 20}px)`,
        }}
        className="relative w-full container origin-top px-4"
      >
        <Card className="group  bg-[#0a0f1d]  hover:border-blue-500/50 transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-fit md:h-[480px] shadow-2xl">
          {/* Image */}
          <div className="relative w-full md:w-1/2 overflow-hidden m-4 rounded-[1.8rem] min-h-[200px]">
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
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-blue-400 uppercase mb-4"
        >
          <Rocket className="w-3.5 h-3.5" /> Portfolio
        </motion.div>
        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Projects</span>
        </h2>
      </div>

      <div className="relative w-full">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center px-8">
            <Skeleton className="h-[480px] w-full max-w-5xl bg-white/5 rounded-[2.5rem]" />
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