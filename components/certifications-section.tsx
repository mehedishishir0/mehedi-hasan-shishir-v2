import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import Image from "next/image"

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    platform: "Amazon Web Services",
    date: "Jan 2024",
    image: "/aws-certification-badge.jpg",
  },
  {
    title: "Meta Front-End Developer",
    platform: "Meta",
    date: "Aug 2023",
    image: "/meta-certification-badge.jpg",
  },
  {
    title: "Google Cloud Professional",
    platform: "Google Cloud",
    date: "Jun 2023",
    image: "/google-cloud-certification-badge.png",
  },
  {
    title: "MongoDB Certified Developer",
    platform: "MongoDB University",
    date: "Dec 2022",
    image: "/mongodb-certification-badge.jpg",
  },
]

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Professional certifications and achievements</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Certificate Image with Date Badge */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image width={100} height={100} src={cert.image || "/placeholder.svg"} alt={cert.title} className="w-full h-full object-cover" />
                {/* Date Badge in Top Corner */}
                <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-foreground">{cert.date}</span>
                </div>
              </div>

              {/* Certificate Info */}
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{cert.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">{cert.platform}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
