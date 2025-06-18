"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ChefHat, Truck } from "lucide-react"
import Navbar from "@/components/navbar"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token)
      
      // Redirect to home page immediately after storing token
      router.push('/')
      return
    } else {
      // Check if user is already logged in
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]))
          setUser({
            name: payload.name || 'User',
            email: payload.email || 'user@example.com',
            id: payload.id
          })
        } catch (error) {
          console.error('Error decoding stored token:', error)
          localStorage.removeItem('token')
          router.push('/')
          return
        }
      } else {
        // No token found, redirect to home
        router.push('/')
        return
      }
    }
    
    setLoading(false)
  }, [searchParams, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Navbar />
        <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-76px)]">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-6">
              <User className="h-8 w-8 text-amber-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              You're now logged in to Home Plate. Choose how you'd like to get started with our platform.
            </p>
          </div>

          {/* Application Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Chef Application */}
            <Card className="bg-black/80 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-amber-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <ChefHat className="h-8 w-8 text-amber-500" />
                </div>
                <CardTitle className="text-2xl text-white">Apply as a Chef</CardTitle>
                <CardDescription className="text-gray-400">
                  Share your culinary skills and start earning from your kitchen
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  Join our network of home chefs and start cooking for customers in your area.
                </p>
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={() => router.push('/apply-chef')}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Partner Application */}
            <Card className="bg-black/80 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-amber-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-amber-500" />
                </div>
                <CardTitle className="text-2xl text-white">Apply as Delivery Partner</CardTitle>
                <CardDescription className="text-gray-400">
                  Help deliver delicious meals to customers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  Become a delivery partner and earn by delivering food to customers.
                </p>
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={() => router.push('/apply-delivery')}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Info */}
          <Card className="bg-black/80 border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">User ID:</span>
                  <span className="text-white font-mono text-sm">{user?.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 