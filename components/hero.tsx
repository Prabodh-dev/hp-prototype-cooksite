"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChefHat, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 mb-6">
              <ChefHat className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Join our culinary community</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Share Your Culinary Magic With
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                {" "}
                Hungry Customers
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              Turn your kitchen into a thriving business. Join our platform as a home cook and connect with customers
              who are craving authentic, homemade meals.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" asChild className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                <Link href="/getstarted">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-amber-500 hover:bg-amber-500/20">
                <Link href="https://app.homecooks.example.com">
                  Open App
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm"></div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Home cook preparing food"
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-lg">Join 1,000+ home cooks already on our platform</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-black/80 border border-amber-500/30 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold">$</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">$1,200</p>
                  <p className="text-gray-400 text-sm">Avg. Monthly Earnings</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

