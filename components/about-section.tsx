"use client"

import { Card } from "@/components/ui/card"
import { Code2, Palette, Rocket, Users, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAbout } from "@/hooks/ApiCall"

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const aboutGet = useAbout()
  const aboutData = aboutGet.data?.data?.[0]

  // ✅ Handle single or multiple images
  const images = Array.isArray(aboutData?.image)
    ? aboutData.image
    : aboutData?.image
      ? [aboutData.image]
      : []

  const highlights = [
    { icon: Code2, title: "Clean Code", description: "Writing maintainable and scalable code" },
    { icon: Palette, title: "Design Focus", description: "Creating beautiful user experiences" },
    { icon: Rocket, title: "Fast Delivery", description: "Efficient project completion" },
    { icon: Users, title: "Team Player", description: "Collaborative and communicative" },
  ]

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentImageIndex(index)
  }

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey and what drives me
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Carousel */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <Card className="overflow-hidden relative group p-0 ">
              <div className="relative aspect-square overflow-hidden">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0  transition-all duration-700 ease-in-out ${index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      }`}
                  >
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt={aboutData?.title || "About Image"}
                      width={1000}
                      height={1000}
                      quality={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Controls */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/90"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/90"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all ${index === currentImageIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-background/60 hover:bg-background/80"
                          }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Bio Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                {aboutData?.title || "Full-Stack Developer & Creative Thinker"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData?.description ||
                  "With over 1 years of experience in web development, I specialize in building modern, responsive applications that solve real-world problems."}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
