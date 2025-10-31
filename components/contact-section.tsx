"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"



export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  })


  const contactMutation = useMutation({
    mutationKey: ["contactus"],
    mutationFn: async (payloade: { name: string; email: string; message: string; subject: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(payloade),
        }
      );
      if (!response.ok) throw new Error("Failed to submit contact us");
      return response.json();
    },
    onSuccess: (data) => {
      console.log(data.message)

      toast.success(data.message || "Contact us sent successfully")
    },
    onError: (error: any) => {
      toast.error(error.message || "Contact us sent successfully")
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: formData.subject
    }
    contactMutation.mutate(data)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mehedihasanshishir.info@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1771806597",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s work together to create something amazing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let&apos;s talk about your project</h3>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <Card key={index} className="p-4 flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    {/* <p className="text-sm text-muted-foreground">{item.label}</p> */}
                    <p className="font-medium">{item.value}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  className="py-6 rounded-sm"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  className="py-6 rounded-sm"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  className="py-6 rounded-sm"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  className="py-6 h-40 rounded-sm"
                  placeholder="Tell me about your project..."

                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send Message {contactMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
