"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useReveiew } from "@/hooks/ApiCall"
import { Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function ReviewsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data } = useReveiew() // API data
  const reviews = data?.data || [] // fallback to empty array
  const total = reviews.length
  useEffect(() => {
    if (total === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, 4000)

    return () => clearInterval(interval)
  }, [total])

  useEffect(() => {
    if (containerRef.current && total > 0) {
      const width = containerRef.current.clientWidth
      containerRef.current.scrollTo({
        left: currentIndex * (width / 3), // 3 cards visible on desktop
        behavior: "smooth",
      })
    }
  }, [currentIndex, total])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Client Reviews</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-x-hidden gap-6 snap-x snap-mandatory scroll-smooth"
        >
          {reviews.map((review: any, index: number) => (
            <div
              key={review._id || index}
              className="snap-start flex-shrink-0 w-full md:w-1/3 px-2"
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="pt-6 flex flex-col h-[210px]">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={review?.image?.url || "/placeholder.svg"}
                      alt={review?.name}
                      width={80}
                      height={80}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-h-32 overflow-y-auto">
                    {review.feedback}
                  </p>
                </CardContent>

              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
