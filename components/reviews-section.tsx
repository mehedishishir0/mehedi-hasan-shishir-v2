import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    image: "/professional-woman-portrait.png",
    rating: 5,
    review:
      "Exceptional developer with great attention to detail. Delivered our project ahead of schedule with outstanding quality.",
  },
  {
    name: "Michael Chen",
    role: "CTO, StartUp Inc",
    image: "/professional-man-portrait.png",
    rating: 5,
    review: "Highly skilled and professional. Their technical expertise and problem-solving abilities are top-notch.",
  },
  {
    name: "Emily Rodriguez",
    role: "Design Lead",
    image: "/professional-woman-portrait-2.png",
    rating: 5,
    review: "A pleasure to work with! Great communication skills and always open to feedback. Highly recommended.",
  },
]

export default function ReviewsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Client Reviews</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">What people say about working with me</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
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
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">{review.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
