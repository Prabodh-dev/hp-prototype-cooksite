"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Complete your profile with your culinary background, specialties, and sample menu items.",
    },
    {
      number: "02",
      title: "Get Approved",
      description:
        "Our team reviews your application to ensure quality standards. This typically takes 2-3 business days.",
    },
    {
      number: "03",
      title: "Set Up Your Menu",
      description: "Create your menu with photos, descriptions, pricing, and availability for customers to browse.",
    },
    {
      number: "04",
      title: "Start Cooking",
      description: "Receive orders, prepare delicious meals, and build your reputation as a home cook on our platform.",
    },
  ]

  return (
    <section className="py-20 bg-amber-900/10" id="how-it-works">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting started as a home cook on our platform is simple. Follow these steps to begin your culinary journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-white/10 h-full relative overflow-hidden">
                <div className="absolute -top-4 -left-4 text-7xl font-bold text-amber-500/10">{step.number}</div>
                <CardContent className="pt-8 pb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

