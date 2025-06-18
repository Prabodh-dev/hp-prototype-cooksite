"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Clock, Users, ShieldCheck } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <DollarSign className="h-10 w-10 text-amber-500" />,
      title: "Earn Extra Income",
      description:
        "Set your own prices and schedule. Turn your cooking passion into a profitable side hustle or full-time business.",
    },
    {
      icon: <Clock className="h-10 w-10 text-amber-500" />,
      title: "Flexible Hours",
      description:
        "Work when it suits you. Accept orders based on your availability and prepare meals on your own schedule.",
    },
    {
      icon: <Users className="h-10 w-10 text-amber-500" />,
      title: "Build Your Reputation",
      description:
        "Gain loyal customers through reviews and ratings. Showcase your unique culinary skills to a growing audience.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-amber-500" />,
      title: "Safe & Secure",
      description:
        "Our platform handles payments, customer service, and logistics so you can focus on what you do best—cooking.",
    },
  ]

  return (
    <section className="py-20 relative" id="features">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Cook With Us?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our platform and enjoy these benefits while sharing your culinary creations with hungry customers in
            your area.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-white/10 h-full">
                <CardHeader>
                  <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

