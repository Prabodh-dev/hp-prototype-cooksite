"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import type React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, LogIn } from "lucide-react"

interface UserType {
  name: string
  email: string
  id: string
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Check if user is logged in (check for token in localStorage)
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Decode the JWT token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ 
          name: payload.name || 'User', 
          email: payload.email || 'user@example.com',
          id: payload.id
        })
      } catch (error) {
        console.error('Error decoding token:', error)
        localStorage.removeItem('token')
        setUser(null)
      }
    }
    setLoading(false)
    setMounted(true)
  }, [])

  const handleGoogleAuth = (action: 'login' | 'signin') => {
    // Store the action in localStorage to differentiate between login and signin
    localStorage.setItem('authAction', action)
    window.location.href = 'http://localhost:5000/api/auth/google'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('authAction')
    setUser(null)
    window.location.href = '/'
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Image 
          src="/logo-2.png" 
          alt="Home Plate Logo" 
          width={64} 
          height={64} 
          className="rounded-sm" 
        />
        <div className="flex flex-col leading-tight">
          <span className="text-white font-medium text-xl">Home Plate</span>
          <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Bring home far from home</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="#features">Why Cook With Us</NavLink>
        <NavLink href="#how-it-works">How It Works</NavLink>
        <NavLink href="#testimonials">Success Stories</NavLink>
        <NavLink href="#faq">FAQ</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {!loading && (
          user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-white">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-white hover:text-red-400 hover:bg-red-500/20"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => handleGoogleAuth('login')}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button 
                onClick={() => handleGoogleAuth('signin')}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Sign in
              </Button>
            </div>
          )
        )}
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[76px] left-0 right-0 bg-black/95 border-b border-white/10 p-6 z-50">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={toggleMobileMenu}>
              Why Cook With Us
            </MobileNavLink>
            <MobileNavLink href="#how-it-works" onClick={toggleMobileMenu}>
              How It Works
            </MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={toggleMobileMenu}>
              Success Stories
            </MobileNavLink>
            <MobileNavLink href="#faq" onClick={toggleMobileMenu}>
              FAQ
            </MobileNavLink>
            <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
              {!loading && (
                user ? (
                  <>
                    <div className="flex items-center space-x-2 text-white py-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="w-full text-white border-red-500 hover:bg-red-500/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={() => handleGoogleAuth('login')}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login with Google
                    </Button>
                    <Button 
                      onClick={() => handleGoogleAuth('signin')}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Sign in with Google
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors py-2 block" onClick={onClick}>
      {children}
    </Link>
  )
}
