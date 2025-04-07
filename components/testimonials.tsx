"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Home Cook since 2022",
      content:
        "Joining this platform changed my life. I've always loved cooking Mexican food, and now I can share my family recipes with people in my community while earning a good income.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MR",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Home Cook since 2021",
      content:
        "I started as a weekend cook, and now I'm doing this full-time! The platform makes it easy to manage orders, and the customers are wonderful. Best decision I ever made.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DC",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Home Cook since 2023",
      content:
        "As a stay-at-home mom, this platform gives me the flexibility to earn while doing what I love. The support team is amazing and helped me every step of the way.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PP",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 relative" id="testimonials">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from home cooks who have transformed their passion into profit on our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-white/10 h-full">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-amber-500/20 text-amber-300">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

