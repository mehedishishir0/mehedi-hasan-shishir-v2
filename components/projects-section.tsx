// "use client"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ExternalLink, Github } from "lucide-react"
// import Image from "next/image"
// import { useProject } from "@/hooks/ApiCall"

// const projects = [
//   {
//     title: "E-Commerce Platform",
//     description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
//     image: "/ecommerce-dashboard.png",
//     tags: ["Next.js", "Stripe", "PostgreSQL"],
//     github: "#",
//     demo: "#",
//   },
//   {
//     title: "Task Management App",
//     description: "Collaborative task management tool with real-time updates, team collaboration, and analytics.",
//     image: "/task-management-app.png",
//     tags: ["React", "Node.js", "MongoDB"],
//     github: "#",
//     demo: "#",
//   },
//   {
//     title: "AI Chat Application",
//     description: "Intelligent chatbot powered by AI with natural language processing and context awareness.",
//     image: "/ai-chat-interface.png",
//     tags: ["TypeScript", "OpenAI", "WebSocket"],
//     github: "#",
//     demo: "#",
//   },
//   {
//     title: "Portfolio Builder",
//     description: "Drag-and-drop portfolio builder with customizable templates and one-click deployment.",
//     image: "/portfolio-builder-tool.jpg",
//     tags: ["Next.js", "Tailwind", "Vercel"],
//     github: "#",
//     demo: "#",
//   },
// ]

// export default function ProjectsSection() {

//   const {data} = useProject()
// console.log(data)
//   return (
//     <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">A showcase of my recent work and side projects</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//             <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
//               <div className="relative overflow-hidden">
//                 <Image
//                   src={project.image || "/placeholder.svg"}
//                   alt={project.title}
//                   width={400}
//                   height={300}
//                   className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
//               <CardHeader>
//                 <CardTitle>{project.title}</CardTitle>
//                 <CardDescription>{project.description}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-3">
//                   <Button size="sm" variant="outline" className="flex-1 bg-transparent">
//                     <Github className="mr-2 h-4 w-4" />
//                     Code
//                   </Button>
//                   <Button size="sm" className="flex-1">
//                     <ExternalLink className="mr-2 h-4 w-4" />
//                     Demo
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


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useProject } from "@/hooks/ApiCall"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsSection() {
  const { data, isLoading, isError } = useProject()

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-muted-foreground mb-8">Loading projects...</p>
        <div className="grid md:grid-cols-2 gap-8 px-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
          ))}
        </div>
      </section>
    )
  }

  if (isError || !data?.data) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-red-500">Failed to load projects.</p>
      </section>
    )
  }

  const projects = data.data

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="overflow-hidden hover:shadow-xl transition-all p-0 pb-4 duration-300 group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={project.image?.[0]?.url || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={600}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies / Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.length > 0 ? (
                    project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No technologies listed
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <a
                      href={project.githubLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>

                  <Button asChild size="sm" className="flex-1">
                    <a
                      href={project.liveLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
