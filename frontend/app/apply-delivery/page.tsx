"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, CheckCircle2, Upload, FileText, User, CreditCard } from "lucide-react"
import Navbar from "@/components/navbar"

// Form validation schema
const formSchema = z.object({
  // Basic Information
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  dob: z.string().min(1, { message: "Please enter your date of birth." }),
  
  // Identity Documents
  aadhaarCard: z.instanceof(File, { message: "Aadhaar card is required." }),
  
  // Vehicle Documents
  drivingLicense: z.instanceof(File, { message: "Driving license is required." }),
  rcBook: z.instanceof(File, { message: "RC book is required." }),
  vehicleInsurance: z.instanceof(File, { message: "Vehicle insurance is required." }),
  
  // Financial Documents
  panCard: z.instanceof(File, { message: "PAN card is required." }),
  
  // Bank Details
  accountNumber: z.string().min(1, { message: "Bank account number is required." }),
  ifscCode: z.string().min(1, { message: "IFSC code is required." }),
  
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function ApplyDeliveryPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Verify token is valid by decoding it
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        if (payload.exp > currentTime) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('token')
          toast.error("Session expired", {
            description: "Please login again to continue."
          })
          router.push('/')
          return
        }
      } catch (error) {
        localStorage.removeItem('token')
        toast.error("Invalid session", {
          description: "Please login again to continue."
        })
        router.push('/')
        return
      }
    } else {
      toast.error("Authentication required", {
        description: "Please login to access the application form."
      })
      router.push('/')
      return
    }
    setLoading(false)
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      dob: "",
      accountNumber: "",
      ifscCode: "",
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      console.log('Form submitted with values:', values);
      
      const token = localStorage.getItem('token')
      console.log('Token from localStorage:', token ? 'Present' : 'Missing');
      
      if (!token) {
        alert('Please login first')
        return
      }

      // Create FormData for file uploads
      const formData = new FormData()
      
      // Add text fields
      formData.append('name', values.name)
      formData.append('phone', values.phone)
      formData.append('email', values.email)
      formData.append('dob', values.dob)
      formData.append('accountNumber', values.accountNumber)
      formData.append('ifscCode', values.ifscCode)
      
      // Add file fields
      formData.append('aadhaarCard', values.aadhaarCard)
      formData.append('drivingLicense', values.drivingLicense)
      formData.append('rcBook', values.rcBook)
      formData.append('vehicleInsurance', values.vehicleInsurance)
      formData.append('panCard', values.panCard)

      console.log('Making request to:', "http://localhost:5000/api/delivery/apply");
      console.log('Request headers:', {
        "Authorization": `Bearer ${token}`
      });

      const res = await fetch("http://localhost:5000/api/delivery/apply", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      })
    
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
    
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`)
      }
    
      const data = await res.json()
      console.log("Success:", data)
    
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
      alert('Error submitting application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Navbar />
        <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-76px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md mx-auto bg-black/80 border border-amber-500/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-amber-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                </div>
                <CardTitle className="text-2xl text-white">Application Submitted!</CardTitle>
                <CardDescription className="text-gray-400">
                  Your delivery partner application has been submitted successfully.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6 text-center">
                  We'll review your application and get back to you via phone within 2-3 business days.
                </p>
                <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => router.push("/")}>
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    )
  }

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

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="bg-amber-500/20 p-3 rounded-full">
              <Truck className="h-8 w-8 text-amber-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Apply as a Delivery Partner</h1>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Fill out the form below to apply as a delivery partner on our platform. We'll review your application and get back
            to you soon.
          </p>

          <Card className="bg-black/80 border border-amber-500/20">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="bg-black/50 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(123) 456-7890"
                                {...field}
                                className="bg-black/50 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@example.com"
                                {...field}
                                className="bg-black/50 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Date of Birth</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="bg-black/50 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Identity Documents */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Identity Documents
                    </h3>
                    <FormField
                      control={form.control}
                      name="aadhaarCard"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-white">Aadhaar Card</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                onChange(file)
                              }}
                              className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            To prove identity and address (PDF, JPG, PNG)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Vehicle Documents */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <Truck className="mr-2 h-5 w-5" />
                      Vehicle Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="drivingLicense"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">Driving License</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  onChange(file)
                                }}
                                className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400">
                              To validate ability to drive (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rcBook"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">Vehicle RC Book</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  onChange(file)
                                }}
                                className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400">
                              Registration Certificate (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="vehicleInsurance"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-white">Vehicle Insurance Paper</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                onChange(file)
                              }}
                              className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Vehicle insurance document (PDF, JPG, PNG)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Financial Documents */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Financial Documents
                    </h3>
                    <FormField
                      control={form.control}
                      name="panCard"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-white">PAN Card</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                onChange(file)
                              }}
                              className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            To facilitate payments and banking transactions (PDF, JPG, PNG)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bank Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Bank Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Account Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234567890"
                                {...field}
                                className="bg-black/50 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ifscCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">IFSC Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="SBIN0001234"
                                {...field}
                                className="bg-black/50 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-white/20"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white text-sm">
                            I accept the terms and conditions
                          </FormLabel>
                          <FormDescription className="text-gray-400 text-xs">
                            By checking this box, you agree to our platform's terms of service and privacy policy.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
} 