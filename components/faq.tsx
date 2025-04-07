"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What requirements do I need to meet to become a home cook?",
      answer:
        "You'll need to have a clean kitchen that meets local health standards, valid ID, proof of address, and pass a basic food safety knowledge test. Some locations may require additional certifications.",
    },
    {
      question: "How much can I earn as a home cook?",
      answer:
        "Earnings vary based on your menu, pricing, location, and how many hours you dedicate. Our top cooks earn $1,000-$3,000 per month, while part-time cooks average $400-$800 monthly.",
    },
    {
      question: "How do I receive payments?",
      answer:
        "We process all payments through our secure platform. Customers pay through the app, and we transfer your earnings to your bank account weekly, minus our service fee.",
    },
    {
      question: "Do I need to handle delivery?",
      answer:
        "No, you can choose between having customers pick up from your location or using our delivery partners. You can also offer both options to maximize your customer base.",
    },
    {
      question: "How long does the approval process take?",
      answer:
        "Typically 2-3 business days after you submit your complete application. We'll conduct a brief video interview and review your kitchen setup during this process.",
    },
  ]

  return (
    <section className="py-20 bg-amber-900/10" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get answers to common questions about becoming a home cook on our platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black/50 border border-white/10 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:text-amber-400 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

