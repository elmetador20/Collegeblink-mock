"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  Building2,
  Newspaper,
} from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const contactMethods = [
  {
    icon: Mail,
    title: "General Inquiries",
    value: "info@collegeblink.com",
    description: "For general questions and support",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: Building2,
    title: "Partnerships",
    value: "partners@collegeblink.com",
    description: "For colleges and institutions",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Newspaper,
    title: "Press & Media",
    value: "press@collegeblink.com",
    description: "For media kits and interviews",
    color: "bg-purple-500/10 text-purple-500",
  },
];

const faqs = [
  {
    question: "How do I get started with Smart Counseling?",
    answer: "Simply click on the 'Get Started' or 'Counselling' buttons across our platform. Our experts are available to help you with college matching and application planning.",
  },
  {
    question: "Is CollegeBlink free for students?",
    answer: "Yes! Our core features, including college discovery and basic Smart counseling, are free for all students.",
  },
  {
    question: "How can my college join the platform?",
    answer: "Colleges can reach out to our partnership team at partners@collegeblink.com to learn about our institution-specific tools and visibility programs.",
  },
  {
    question: "What kind of data do you provide about colleges?",
    answer: "We provide comprehensive, manually verified data including fee structures, placement records, campus facilities, and real student reviews.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background">
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-400">
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Let's start a <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                conversation
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Have a question about a college? Need help with your application? Or just want to say hi? Our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method, i) => (
              <div key={i} className="group relative rounded-3xl border border-border bg-card p-8 transition-all hover:border-indigo-500/30 hover:shadow-xl">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${method.color}`}>
                  <method.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{method.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{method.description}</p>
                <a href={`mailto:${method.value}`} className="text-lg font-semibold text-indigo-500 hover:text-indigo-400">
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            
            <div>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                We're here to <span className="text-indigo-500">help you grow</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">Our Headquarters</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      H14, Sector 70<br />
                      Noida, Uttar Pradesh 201305<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">Support Hours</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Weekend: Email support only
                    </p>
                  </div>
                </div>
                  <div 
                    className="flex gap-6 cursor-pointer group"
                    onClick={() => window.open("https://wa.me/919278115957", "_blank")}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-indigo-500 transition-colors">Phone Support</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        +91 9278115957<br />
                        Available during business hours
                      </p>
                    </div>
                  </div>
              </div>

              
              <div className="mt-16 rounded-[2rem] bg-muted/50 p-8 border border-border">
                <h4 className="mb-4 text-lg font-bold text-foreground">Follow Our Journey</h4>
                <div className="flex gap-4">
                  
                  {['Twitter', 'LinkedIn', 'Instagram'].map(platform => (
                    <Button key={platform} variant="outline" size="sm" className="rounded-full">
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="rounded-[2.5rem] border border-border bg-card p-8 lg:p-12 shadow-2xl shadow-indigo-500/5">
              <h3 className="mb-8 text-2xl font-bold text-foreground text-center">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Your Name</label>
                    <Input className="rounded-2xl border-border bg-muted/30 px-6 py-6 focus-visible:ring-indigo-500" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                    <Input className="rounded-2xl border-border bg-muted/30 px-6 py-6 focus-visible:ring-indigo-500" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Subject</label>
                  <Input className="rounded-2xl border-border bg-muted/30 px-6 py-6 focus-visible:ring-indigo-500" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Message</label>
                  <Textarea className="min-h-[150px] rounded-2xl border-border bg-muted/30 px-6 py-4 focus-visible:ring-indigo-500 resize-none" placeholder="Tell us more about your inquiry..." />
                </div>
                <Button className="w-full rounded-2xl bg-indigo-600 py-8 text-lg font-bold text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 group">
                  Send Message
                  <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Common Questions</h2>
              <p className="text-muted-foreground">Find quick answers to your questions.</p>
            </div>
            <div className="grid gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-3xl border border-border bg-card p-8">
                  <h3 className="mb-3 text-xl font-bold text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-foreground lg:text-3xl">Ready to discover your <span className="text-indigo-500">perfect college?</span></h2>
            <p className="mb-8 text-base text-muted-foreground">Join thousands of students and start your journey with CollegeBlink today.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="rounded-full bg-indigo-600 px-10 py-6 text-white hover:bg-indigo-700" 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
                }}
              >
                Get Started Free
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full px-10 py-6" asChild>
                <Link href="/colleges">Explore Colleges</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
