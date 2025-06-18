"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  experienceLevel: z.string({
    required_error: "Please select your experience level.",
  }),
  cuisineSpecialties: z.string().min(2, { message: "Please enter your cuisine specialties." }),
  address: z.string().min(5, { message: "Please enter your full address." }),
  bio: z
    .string()
    .min(20, { message: "Bio must be at least 20 characters." })
    .max(500, { message: "Bio must not exceed 500 characters." }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function GetStartedPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      experienceLevel: "",
      cuisineSpecialties: "",
      address: "",
      bio: "",
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("http://localhost:1717/api/chef/new-chef", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
    
      
    
      const data = await res.json()
      console.log("Success:", data)
    
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
    }
    

    // Simulate a delay for the "database" operation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    setIsSubmitted(true)
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
            <Card className="w-full max-w-md mx-auto bg-black/80 border border-purple-500/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-amber-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                </div>
                <CardTitle className="text-2xl text-white">Application Submitted!</CardTitle>
                <CardDescription className="text-gray-400">
                  Your request has been added to the queue. Please wait until your application is approved.
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

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="bg-amber-500/20 p-3 rounded-full">
              <ChefHat className="h-8 w-8 text-amber-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Join Our Home Cook Network</h1>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Fill out the form below to apply as a home cook on our platform. We'll review your application and get back
            to you soon.
          </p>

          <Card className="bg-black/80 border border-amber-500/20">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Experience Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/20 text-white">
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black border-white/20">
                              <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                              <SelectItem value="professional">Professional (10+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cuisineSpecialties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Cuisine Specialties</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Italian, Mexican, Indian, etc."
                            {...field}
                            className="bg-black/50 border-white/20 text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          List the cuisines you specialize in, separated by commas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St, City, State, Zip"
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
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself, your cooking journey, and why you want to join our platform..."
                            {...field}
                            className="bg-black/50 border-white/20 text-white min-h-[120px]"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Share your cooking background and what makes your food special.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-amber-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">
                            I agree to the terms of service and privacy policy
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
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

