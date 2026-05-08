// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ExternalLink, Github, ArrowLeft, Eye } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { useQuery } from "@tanstack/react-query"
// import { SingelProjectResponse } from "@/types/singelProductDataType"

// export default function ProjectDetailsPage({ id }: { id: string }) {

//     const { data, isLoading, isError } = useQuery<SingelProjectResponse, Error>({
//         queryKey: ["project", id],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`)
//             if (!res.ok) throw new Error("Failed to fetch project")
//             return res.json()
//         },
//     })

//     const [activeImageIndex, setActiveImageIndex] = useState(0)

//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-muted-foreground">
//                 Loading project...
//             </div>
//         )
//     }

//     if (isError || !data?.data) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-500">
//                 Failed to load project.
//             </div>
//         )
//     }

//     const project = data.data
//     const mainImage = project.image?.[activeImageIndex]?.url || "/placeholder.svg"

//     return (
//         <main className="min-h-screen mt-10 bg-gradient-to-b from-background via-background to-secondary/5">
//             {/* Main Content */}
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//                 <div className="mb-12">
//                     <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
//                         {project.title}
//                     </h1>
//                     <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl whitespace-pre-line">{project.description}</p>
//                 </div>

//                 {/* Images Gallery */}
//                 <div className="grid lg:grid-cols-3 gap-8 mb-16">
//                     {/* Main Image */}
//                     <div className="lg:col-span-2">
//                         <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                             <div className="relative aspect-video bg-muted overflow-hidden group">
//                                 <Image
//                                     src={mainImage}
//                                     alt={project.title}
//                                     fill
//                                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                                     priority
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                                     <Eye className="h-8 w-8 text-white" />
//                                 </div>
//                             </div>
//                         </Card>

//                         {project.image && project.image.length > 1 && (
//                             <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
//                                 {project.image.map((img, idx) => (
//                                     <button
//                                         key={img._id}
//                                         onClick={() => setActiveImageIndex(idx)}
//                                         className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImageIndex === idx
//                                             ? "border-primary shadow-lg scale-100"
//                                             : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
//                                             }`}
//                                     >
//                                         <Image
//                                             src={img.url || "/placeholder.svg"}
//                                             alt={`${project.title} thumbnail ${idx + 1}`}
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* Project Info Sidebar */}
//                     <div className="space-y-6">
//                         <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur">
//                             <CardContent className="pt-6">
//                                 <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Tech Stack</h3>
//                                 <div className="flex flex-wrap gap-2">
//                                     {project.technologies.map((tech, idx) => (
//                                         <Badge
//                                             key={idx}
//                                             variant="secondary"
//                                             className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200 text-xs font-medium"
//                                         >
//                                             {tech}
//                                         </Badge>
//                                     ))}
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur">
//                             <CardContent className="pt-6 space-y-3">
//                                 <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Project Links</h3>
//                                 <Button
//                                     asChild
//                                     className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 font-medium"
//                                 >
//                                     <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
//                                         <ExternalLink className="mr-2 h-4 w-4" />
//                                         View Live Demo
//                                     </a>
//                                 </Button>
//                                 <Button
//                                     asChild
//                                     variant="outline"
//                                     className="w-full border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-200 font-medium bg-transparent"
//                                 >
//                                     <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
//                                         <Github className="mr-2 h-4 w-4" />
//                                         View Code
//                                     </a>
//                                 </Button>
//                             </CardContent>
//                         </Card>

//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }


"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github, Eye, Layout, Cpu, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { SingelProjectResponse } from "@/types/singelProductDataType"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectDetailsPage({ id }: { id: string }) {
    const { data, isLoading, isError } = useQuery<SingelProjectResponse, Error>({
        queryKey: ["project", id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`)
            if (!res.ok) throw new Error("Failed to fetch project")
            return res.json()
        },
    })

    const [activeImageIndex, setActiveImageIndex] = useState(0)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#112032] border-t-blue-500" />
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Initializing Project View</p>
            </div>
        )
    }

    if (isError || !data?.data) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center text-rose-500 font-bold uppercase tracking-widest">
                Failed to load project details.
            </div>
        )
    }

    const project = data.data
    const mainImage = project.image?.[activeImageIndex]?.url || "/placeholder.svg"

    return (
        <main className="min-h-screen bg-[#030712] pt-24 pb-20 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#112032]/20 blur-[150px] rounded-full -z-10" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
                {/* Massive Header Section (Image Style) */}
                <div className="mb-20 text-center lg:text-left ">
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        <Layout className="h-3 w-3" /> Case Study
                    </motion.div> */}
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase"
                    >
                        {project.title}
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                       className="text-lg text-muted-foreground leading-relaxed max-w-4xl whitespace-pre-line"
                    >
                        {project.description}
                    </motion.p>
                      
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Visual Showcase Column */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="overflow-hidden border-white/5 bg-white/[0.02] rounded-[2.5rem] shadow-2xl relative group">
                                <div className="relative aspect-video overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeImageIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full w-full"
                                        >
                                            <Image
                                                src={mainImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </Card>

                            {/* Thumbnail Gallery with Mirrored Effect */}
                            {project.image && project.image.length > 1 && (
                                <div className="flex gap-4 mt-8 overflow-x-auto pb-4 px-2 scrollbar-hide">
                                    {project.image.map((img, idx) => (
                                        <button
                                            key={img._id}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative flex-shrink-0 w-28 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                                                activeImageIndex === idx
                                                ? "border-blue-500 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                                : "border-white/5 opacity-40 hover:opacity-100"
                                            }`}
                                        >
                                            <Image
                                                src={img.url || "/placeholder.svg"}
                                                alt="thumbnail"
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Meta Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Tech Stack Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-8 shadow-xl">
                                <h3 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.3em] mb-8 text-gray-500">
                                    <Cpu className="h-4 w-4" /> Core Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="bg-[#112032] text-blue-400 border border-blue-500/10 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Action Links Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] -z-10 group-hover:bg-blue-500/10 transition-colors" />
                                
                                <h3 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.3em] mb-8 text-gray-500">
                                    <Globe className="h-4 w-4" /> Deployment
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    <Button
                                        asChild
                                        className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all group/btn"
                                    >
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            Launch Live App
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full h-14 border-white/5 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 rounded-2xl transition-all"
                                    >
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}