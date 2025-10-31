"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { useTimeLine } from "@/hooks/ApiCall"
import { Skeleton } from "@/components/ui/skeleton"

export default function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [lineHeight, setLineHeight] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useTimeLine()
  const timelineData = Array.isArray(data?.data) ? data.data : []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      const timelineTop = timelineRef.current.getBoundingClientRect().top
      const timelineHeight = timelineRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - timelineTop) / (timelineHeight + windowHeight)),
      )
      setLineHeight(scrollProgress * 100)
    }

    if (isVisible) {
      window.addEventListener("scroll", handleScroll)
      handleScroll()
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional experience and learning milestones
          </p>
        </div>

        <div ref={timelineRef} className="max-w-5xl mx-auto relative">
          {/* Center Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
            <div
              className="absolute top-0 left-0 w-full bg-primary transition-all duration-300 ease-out"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Mobile Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:hidden">
            <div
              className="absolute top-0 left-0 w-full bg-primary transition-all duration-300 ease-out"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </Card>
              ))
            ) : timelineData.length > 0 ? (
              timelineData.map((item: any, index: number) => {
                const isLeft = index % 2 === 0
                const isItemVisible = lineHeight > (index / timelineData.length) * 100

                return (
                  <div
                    key={item._id || index}
                    className={`relative ${isLeft
                      ? "md:pr-[calc(50%+2rem)] md:text-left"
                      : "md:pl-[calc(50%+2rem)] md:text-left"
                      } pl-20 md:pl-0`}
                  >
                    {/* Icon */}
                    <div
                      className={`absolute top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 transition-all duration-500 ${isItemVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        } ${isLeft
                          ? "md:right-[calc(50%-1.25rem)] left-[1.25rem] md:left-auto"
                          : "md:left-[calc(50%-1.25rem)] left-[1.25rem]"
                        }`}
                    >
                      <Briefcase className="h-5 w-5 text-primary-foreground" />
                    </div>

                    {/* Card */}
                    <Card
                      className={`p-6 hover:shadow-lg transition-all duration-500 ${isItemVisible
                        ? "opacity-100 translate-x-0"
                        : `opacity-0 ${isLeft ? "md:-translate-x-8" : "md:translate-x-8"} -translate-x-8`
                        }`}
                    >
                      <div
                        className={`flex flex-col gap-2 ${isLeft ? "md:items-end" : "md:items-start"
                          } items-start`}
                      >
                        <span className="text-sm text-primary w-full font-semibold">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </span>
                        <h3 className="text-xl font-bold  w-full">{item.title}</h3>
                        <p className="text-primary/80 w-full font-medium mb-3">{item.subTitle}</p>
                        <p className="text-muted-foreground  whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    </Card>
                  </div>
                )
              })
            ) : (
              <p className="text-center text-muted-foreground py-10">
                No timeline data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
