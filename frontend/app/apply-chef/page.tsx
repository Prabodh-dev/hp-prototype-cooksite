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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, CheckCircle2, Upload, FileText, User, CreditCard, Building } from "lucide-react"
import Navbar from "@/components/navbar"

// Form validation schema
const formSchema = z.object({
  // Basic Information
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  dob: z.string().min(1, { message: "Please enter your date of birth." }),
  
  // Identity Documents
  identityProof: z.instanceof(File, { message: "Identity proof is required." }),
  
  // Contact Information
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  
  // Bank Details
  accountNumber: z.string().min(1, { message: "Bank account number is required." }),
  ifscCode: z.string().min(1, { message: "IFSC code is required." }),
  upiId: z.string().min(1, { message: "UPI ID is required." }),
  
  // FSSAI Information
  fssaiRegistration: z.instanceof(File, { message: "FSSAI registration is required." }),
  fssaiNumber: z.string().min(1, { message: "FSSAI number is required." }),
  
  // GST Information
  gstCertificate: z.instanceof(File, { message: "GST certificate is required." }),
  gstNumber: z.string().min(1, { message: "GST number is required." }),
  
  // Business Documents
  annualTurnoverProof: z.instanceof(File, { message: "Annual turnover proof is required." }),
  waterAnalysisReport: z.instanceof(File, { message: "Water analysis report is required." }),
  nocFromFssai: z.instanceof(File, { message: "NOC from FSSAI is required." }),
  localBodyLicenses: z.instanceof(File, { message: "Local body licenses are required." }),
  productApprovalCertificate: z.instanceof(File, { message: "Product approval certificate is required." }),
  animalHusbandryApproval: z.instanceof(File, { message: "Animal husbandry approval is required." }),
  
  // Personal Documents
  passportPhotos: z.instanceof(File, { message: "Passport photos are required." }),
  
  // Experience Information
  experienceYears: z.string().min(1, { message: "Please select years of experience." }),
  previousExperience: z.string().min(10, { message: "Please describe your previous experience." }),
  
  // Address and Permits
  addressProof: z.instanceof(File, { message: "Address proof is required." }),
  healthPermit: z.instanceof(File, { message: "Health permit is required." }),
  
  // Insurance
  liabilityInsurance: z.instanceof(File, { message: "Liability insurance is required." }),
  
  // KYC
  kycDocument: z.instanceof(File, { message: "KYC document is required." }),
  
  // Kitchen
  kitchenPhoto: z.instanceof(File, { message: "Kitchen photo is required." }),
  
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function ApplyChefPage() {
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
      email: "",
      dob: "",
      phone: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
      fssaiNumber: "",
      gstNumber: "",
      experienceYears: "",
      previousExperience: "",
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
      formData.append('email', values.email)
      formData.append('dob', values.dob)
      formData.append('phone', values.phone)
      formData.append('accountNumber', values.accountNumber)
      formData.append('ifscCode', values.ifscCode)
      formData.append('upiId', values.upiId)
      formData.append('fssaiNumber', values.fssaiNumber)
      formData.append('gstNumber', values.gstNumber)
      formData.append('experienceYears', values.experienceYears)
      formData.append('previousExperience', values.previousExperience)
      
      // Add file fields
      formData.append('identityProof', values.identityProof)
      formData.append('fssaiRegistration', values.fssaiRegistration)
      formData.append('gstCertificate', values.gstCertificate)
      formData.append('annualTurnoverProof', values.annualTurnoverProof)
      formData.append('waterAnalysisReport', values.waterAnalysisReport)
      formData.append('nocFromFssai', values.nocFromFssai)
      formData.append('localBodyLicenses', values.localBodyLicenses)
      formData.append('productApprovalCertificate', values.productApprovalCertificate)
      formData.append('animalHusbandryApproval', values.animalHusbandryApproval)
      formData.append('passportPhotos', values.passportPhotos)
      formData.append('addressProof', values.addressProof)
      formData.append('healthPermit', values.healthPermit)
      formData.append('liabilityInsurance', values.liabilityInsurance)
      formData.append('kycDocument', values.kycDocument)
      formData.append('kitchenPhoto', values.kitchenPhoto)

      console.log('Making request to:', "http://localhost:5000/api/chef/apply");
      console.log('Request headers:', {
        "Authorization": `Bearer ${token}`
      });

      const res = await fetch("http://localhost:5000/api/chef/apply", {
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
                  Your comprehensive chef application has been submitted successfully.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6 text-center">
                  We'll review your application and get back to you via email within 2-3 business days.
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
              <ChefHat className="h-8 w-8 text-amber-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Apply as a Home Chef</h1>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Fill out the comprehensive form below to apply as a home chef on our platform. We'll review your application and get back
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
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
                      name="identityProof"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-white">1. Aadhaar Card/PAN Card/Voter ID/Passport</FormLabel>
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
                            Upload any one: Aadhaar Card, PAN Card, Voter ID, or Passport (PDF, JPG, PNG)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Contact Information
                    </h3>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">2. Phone Number</FormLabel>
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

                  {/* Bank Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Bank Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">3. Bank Account Number</FormLabel>
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

                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">UPI ID</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@upi"
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

                  {/* FSSAI Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      FSSAI Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fssaiRegistration"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">4. FSSAI License Registration</FormLabel>
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
                              Upload FSSAI license registration certificate (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fssaiNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">5. FSSAI License Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="FSSAI123456789"
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

                  {/* GST Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      GST Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="gstCertificate"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">7. GST Certificate</FormLabel>
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
                              Upload GST certificate (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gstNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">GST Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="22AAAAA0000A1Z5"
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

                  {/* Business Documents */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Business Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="annualTurnoverProof"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">14. Proof of Annual Turnover</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="waterAnalysisReport"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">15. Water Analysis Report</FormLabel>
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
                              From a certified lab (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nocFromFssai"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">16. NOC from FSSAI</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="localBodyLicenses"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">17. Local Body Licenses</FormLabel>
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
                              Trade license, municipality permit (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="productApprovalCertificate"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">18. Product Approval Certificate</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="animalHusbandryApproval"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">19. Animal Husbandry Approval</FormLabel>
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
                              From Animal Husbandry Ministry (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Personal Documents */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Personal Documents
                    </h3>
                    <FormField
                      control={form.control}
                      name="passportPhotos"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-white">20. Passport-Size Photographs</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                onChange(file)
                              }}
                              className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Upload passport-size photographs (JPG, PNG)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Experience Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <ChefHat className="mr-2 h-5 w-5" />
                      Experience Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="experienceYears"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">23. Number of Years of Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/50 border-white/20 text-white">
                                  <SelectValue placeholder="Select years of experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black border-white/20">
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="previousExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">24. Previous Work Experience</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your previous experience in restaurant, catering, home cooking, etc..."
                              {...field}
                              className="bg-black/50 border-white/20 text-white"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Include details about restaurants, catering, home cooking, or any food-related experience
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address and Permits */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Address and Permits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="addressProof"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">26. Proof of Address</FormLabel>
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
                              Utility bills, rental agreement (PDF, JPG, PNG)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="healthPermit"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">27. Health Department Permits</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Insurance and KYC */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Insurance and KYC
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="liabilityInsurance"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">30. Liability Insurance</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="kycDocument"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-white">KYC Document</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Kitchen Photo */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-amber-500/30 pb-2 flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Kitchen Photo
                    </h3>
                    <FormField
                      control={form.control}
                      name="kitchenPhoto"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-white">34. Kitchen Photo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                onChange(file)
                              }}
                              className="bg-black/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Upload a clear photo of your kitchen (JPG, PNG)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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