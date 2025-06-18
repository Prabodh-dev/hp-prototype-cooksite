import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChefHat, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <ChefHat className="w-8 h-8 text-amber-500" />
              <span className="text-white font-medium text-xl">HomeCooks</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting talented home cooks with hungry customers in their community.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Why Cook With Us
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-purple-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/getstarted" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                <span className="text-gray-400">support@homecooks.example.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                <span className="text-gray-400">123 Culinary Street, Foodville, CA 90210</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for cooking tips and platform updates.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-black/50 border-white/20 text-white" />
              <Button className="bg-amber-600 hover:bg-amber-700">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HomeCooks. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:text-amber-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-400 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

