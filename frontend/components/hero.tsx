"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight, ExternalLink, Truck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Verify token is valid by decoding it
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        if (payload.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const handleApplyClick = (type: 'chef' | 'delivery') => {
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please login or sign in to apply for this position. Redirecting to Google login..."
      });
      localStorage.setItem('authAction', 'login');
      window.location.href = 'http://localhost:5000/api/auth/google';
      return;
    }
    // If authenticated, proceed to the application page
    if (type === 'chef') {
      window.location.href = '/apply-chef';
    } else {
      window.location.href = '/apply-delivery';
    }
  };

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
              Turn your kitchen into a thriving business. Join our platform as a home cook or delivery partner and connect with customers
              who are craving authentic, homemade meals.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8"
                onClick={() => handleApplyClick('chef')}
                disabled={loading}
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Apply for Chef
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8"
                onClick={() => handleApplyClick('delivery')}
                disabled={loading}
              >
                <Truck className="mr-2 h-5 w-5" />
                Apply for Delivery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button size="lg" variant="ghost" asChild className="text-white hover:text-amber-400">
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
                src="/hero-stock.jpg"
                alt="Home cook preparing food"
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-lg">Join home cooks already on our platform</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-black/80 border border-amber-500/30 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold">₹</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">₹20,000</p>
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

