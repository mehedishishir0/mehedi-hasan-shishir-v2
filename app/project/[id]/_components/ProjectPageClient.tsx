"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github, ArrowLeft, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { SingelProjectResponse } from "@/types/singelProductDataType"

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
            <div className="min-h-screen flex items-center justify-center text-muted-foreground">
                Loading project...
            </div>
        )
    }

    if (isError || !data?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Failed to load project.
            </div>
        )
    }

    const project = data.data
    const mainImage = project.image?.[activeImageIndex]?.url || "/placeholder.svg"

    return (
        <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-12">
                    <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl whitespace-pre-line">{project.description}</p>
                </div>

                {/* Images Gallery */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Main Image */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="relative aspect-video bg-muted overflow-hidden group">
                                <Image
                                    src={mainImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </Card>

                        {project.image && project.image.length > 1 && (
                            <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                                {project.image.map((img, idx) => (
                                    <button
                                        key={img._id}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImageIndex === idx
                                            ? "border-primary shadow-lg scale-100"
                                            : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={img.url || "/placeholder.svg"}
                                            alt={`${project.title} thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Project Info Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur">
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200 text-xs font-medium"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur">
                            <CardContent className="pt-6 space-y-3">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Project Links</h3>
                                <Button
                                    asChild
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 font-medium"
                                >
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        View Live Demo
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-200 font-medium bg-transparent"
                                >
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        View Code
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </main>
    )
}
