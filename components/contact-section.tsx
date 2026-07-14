// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Loader2, Mail, MapPin, Phone } from "lucide-react"
// import { toast } from "sonner"
// import { useMutation } from "@tanstack/react-query"



// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     subject: "",
//   })


//   const contactMutation = useMutation({
//     mutationKey: ["contactus"],
//     mutationFn: async (payloade: { name: string; email: string; message: string; subject: string }) => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactus`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },

//           body: JSON.stringify(payloade),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to submit contact us");
//       return response.json();
//     },
//     onSuccess: (data) => {
//       console.log(data.message)

//       toast.success(data.message || "Contact us sent successfully")
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Contact us sent successfully")
//     },
//   });


//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const data = {
//       name: formData.name,
//       email: formData.email,
//       message: formData.message,
//       subject: formData.subject
//     }
//     contactMutation.mutate(data)
//   }

//   const contactInfo = [
//     {
//       icon: Mail,
//       label: "Email",
//       value: "mehedihasanshishir.info@gmail.com",
//     },
//     {
//       icon: Phone,
//       label: "Phone",
//       value: "+880 1771806597",
//     },
//     {
//       icon: MapPin,
//       label: "Location",
//       value: "Dhaka, Bangladesh",
//     },
//   ]

//   return (
//     <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Have a project in mind? Let&apos;s work together to create something amazing
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 mx-auto">
//           {/* Contact Info */}
//           <div className="space-y-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4">Let&apos;s talk about your project</h3>
//             </div>

//             <div className="space-y-4">
//               {contactInfo.map((item, index) => (
//                 <Card key={index} className="p-4 flex items-center gap-4">
//                   <div className="p-3 bg-primary/10 rounded-lg">
//                     <item.icon className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     {/* <p className="text-sm text-muted-foreground">{item.label}</p> */}
//                     <p className="font-medium">{item.value}</p>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Contact Form */}
//           <Card className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium mb-2">
//                   Name
//                 </label>
//                 <Input
//                   id="name"
//                   className="py-6 rounded-sm"
//                   placeholder="Your name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-2">
//                   Email
//                 </label>
//                 <Input
//                   id="email"
//                   className="py-6 rounded-sm"
//                   type="email"
//                   placeholder="your.email@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium mb-2">
//                   Subject
//                 </label>
//                 <Input
//                   id="subject"
//                   className="py-6 rounded-sm"
//                   placeholder="Subject"
//                   value={formData.subject}
//                   onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium mb-2">
//                   Message
//                 </label>
//                 <Textarea
//                   id="message"
//                   className="py-6 h-40 rounded-sm"
//                   placeholder="Tell me about your project..."

//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full" size="lg">
//                 Send Message {contactMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </section>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"

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
      toast.success(data.message || "Message sent successfully")
      setFormData({ name: "", email: "", message: "", subject: "" }) // Reset form
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong")
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    contactMutation.mutate(formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mehedihasanshishir.info@gmail.com",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1771806597",
      color: "text-teal-400",
      bg: "bg-teal-400/10"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
  ]

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
           className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
          >
            Get In Touch
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project in mind? Let&apos;s work together to create something amazing.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 mx-auto">
          {/* Contact Info Column */}
          <div className="space-y-10">

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-5 flex items-center gap-5 bg-white/[0.02] border-white/5 hover:border-blue-500/30 transition-all duration-300 rounded-2xl">
                    <div className={`p-4 ${item.bg} rounded-xl`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                      <p className="text-gray-200 font-medium">{item.value}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 sm:p-10 bg-white/[0.02] border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              {/* Form subtle glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Name</label>
                    <Input
                      className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
                    <Input
                      className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                  <Textarea
                    className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-xl focus:border-blue-500/50 transition-all placeholder:text-gray-600 resize-none p-4"
                    placeholder="Tell me about your project details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all group"
                >
                  {contactMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}