"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type React from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

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
        <Button variant="ghost" asChild className="text-white hover:text-purple-400">
          <Link href="https://app.homecooks.example.com/login">Sign In</Link>
        </Button>
        <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
          <Link href="/getstarted">Get Started</Link>
        </Button>
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
              <Button variant="outline" asChild className="w-full text-white border-amber-500 hover:bg-amber-500/20">
                <Link href="https://app.homecooks.example.com/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                <Link href="/getstarted">Get Started</Link>
              </Button>
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
