"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Briefcase, GraduationCap } from "lucide-react"

const timelineData = [
  {
    type: "work",
    title: "Senior Full-Stack Developer",
    company: "Tech Corp",
    period: "2022 - Present",
    description: "Leading development of enterprise applications and mentoring junior developers.",
  },
  {
    type: "work",
    title: "Full-Stack Developer",
    company: "StartUp Inc",
    period: "2020 - 2022",
    description: "Built scalable web applications using modern JavaScript frameworks.",
  },
  {
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University Name",
    period: "2016 - 2020",
    description: "Graduated with honors, specialized in software engineering and web technologies.",
  },
  {
    type: "work",
    title: "Junior Developer",
    company: "Digital Agency",
    period: "2019 - 2020",
    description: "Developed responsive websites and learned industry best practices.",
  },
]

export default function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [lineHeight, setLineHeight] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return

      const timelineTop = timelineRef.current.getBoundingClientRect().top
      const timelineHeight = timelineRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate how much of the timeline is visible
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / (timelineHeight + windowHeight)))
      setLineHeight(scrollProgress * 100)
    }

    if (isVisible) {
      window.addEventListener("scroll", handleScroll)
      handleScroll() // Initial calculation
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Professional experience and educational background</p>
        </div>

        <div ref={timelineRef} className="max-w-5xl mx-auto relative">
          {/* Center Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
            {/* Animated Growing Line */}
            <div
              className="absolute top-0 left-0 w-full bg-primary transition-all duration-300 ease-out"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Mobile Line (left side) */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:hidden">
            <div
              className="absolute top-0 left-0 w-full bg-primary transition-all duration-300 ease-out"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0
              const isItemVisible = lineHeight > (index / timelineData.length) * 100

              return (
                <div
                  key={index}
                  className={`relative ${
                    isLeft ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)] md:text-left"
                  } pl-20 md:pl-0`}
                >
                  {/* Icon - Center on desktop, left on mobile */}
                  <div
                    className={`absolute top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 transition-all duration-500 ${
                      isItemVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    } ${
                      isLeft
                        ? "md:right-[calc(50%-1.25rem)] left-[1.25rem] md:left-auto"
                        : "md:left-[calc(50%-1.25rem)] left-[1.25rem]"
                    }`}
                  >
                    {item.type === "work" ? (
                      <Briefcase className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-primary-foreground" />
                    )}
                  </div>

                  {/* Content Card */}
                  <Card
                    className={`p-6 hover:shadow-lg transition-all duration-500 ${
                      isItemVisible
                        ? "opacity-100 translate-x-0"
                        : `opacity-0 ${isLeft ? "md:-translate-x-8" : "md:translate-x-8"} -translate-x-8`
                    }`}
                  >
                    <div className={`flex flex-col gap-2 ${isLeft ? "md:items-end" : "md:items-start"} items-start`}>
                      <span className="text-sm text-primary font-semibold">{item.period}</span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-primary/80 font-medium">{item.company}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
