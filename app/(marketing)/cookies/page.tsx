"use client";

import { motion } from "framer-motion";
import { Shield, Cookie, Settings, Lock, ArrowUpRight, Mail, MapPin, Sparkles, CheckCircle2, Eye, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CookiesPage() {
  return (
    <div className="min-h-svh bg-background text-foreground overflow-hidden relative">
      
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[30%] h-[40%] rounded-full bg-indigo-500/15 blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 dark:opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge className="mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 backdrop-blur-md shadow-sm text-sm">
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Transparent & Secure
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
              Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 dark:from-orange-400 dark:via-amber-300 dark:to-yellow-200">
                Policy
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              We use cookies to improve your experience. Learn about the different types we use and how you can control them.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Your Choice Matters</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Fully Secure</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Transparent</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-24">
          
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Badge className="mb-3 rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Cookie className="mr-1.5 h-3 w-3" />
                WHAT ARE COOKIES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Understanding Cookies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cookies are small text files stored on your device. They help us provide a better, more personalized experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cookie className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">What They Do</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Remember your preferences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Keep you logged in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Improve site performance</span>
                  </li>
                </ul>
              </Card>

              <Card className="glass-card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Why We Use Them</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Essential for site functionality</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Analyze usage patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Personalize your experience</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="soft-section p-8 mt-8 text-center">
              <p className="text-lg text-muted-foreground italic">
                "We only use cookies that are necessary for providing you with the best possible experience on CollegeBlink."
              </p>
            </Card>
          </motion.section>

          
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Badge className="mb-3 rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <SlidersHorizontal className="mr-1.5 h-3 w-3" />
                COOKIE TYPES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Different cookies serve different purposes. Here's a breakdown of what we use and why.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Lock,
                  title: "Essential Cookies",
                  description: "Required for basic site functionality like login and security"
                },
                {
                  icon: Eye,
                  title: "Analytics Cookies",
                  description: "Help us understand how you use our site to improve it"
                },
                {
                  icon: Settings,
                  title: "Preference Cookies",
                  description: "Remember your settings and choices for a better experience"
                }
              ].map((item, index) => (
                <Card key={index} className="glass-card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </motion.section>

          
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Badge className="mb-3 rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Shield className="mr-1.5 h-3 w-3" />
                YOUR CONTROL
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Manage Your Preferences</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                You have full control over which cookies you accept. Here's how to manage them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Adjust browser settings",
                "Use our cookie preferences panel",
                "Opt out of analytics cookies",
                "Clear cookies anytime",
                "Block third-party cookies",
                "Review cookie policy regularly"
              ].map((option, index) => (
                <Card key={index} className="flex items-center gap-4 p-4 border border-border/40 bg-card/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{option}</span>
                </Card>
              ))}
            </div>
          </motion.section>

          
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Questions About Cookies?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our team is here to help you understand and manage your cookie preferences.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="mailto:privacy@collegeblink.com" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
                    <Mail className="w-4 h-4" />
                    privacy@collegeblink.com
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Noida, India</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>

      
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Last updated: January 2026 • View our{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </section>
    </div>
  );
}
