"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast" // Changed from sonner to react-hot-toast which is more commonly used
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  const searchParams = useSearchParams()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')
    const authAction = localStorage.getItem('authAction')

    if (token) {
      // Store the token
      localStorage.setItem('token', token)
      
      // Show success message based on action
      if (authAction === 'login') {
        toast.success("Successfully logged in! Welcome back to Home Plate!")
      } else {
        toast.success("Successfully signed in! Welcome to Home Plate!")
      }
      
      // Clear the auth action
      localStorage.removeItem('authAction')
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)
      
      setShowSuccessMessage(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
    }

    if (error) {
      if (error === 'auth_failed') {
        toast.error("Authentication failed. Please try logging in again.")
      } else if (error === 'test_login_failed') {
        toast.error("Test login failed. Please try again.")
      }
      
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
      
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Testimonials /> */}
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}

