"use client";

import { motion } from "framer-motion";
import { Shield, User, Database, Lock, ArrowUpRight, Mail, MapPin, Sparkles, CheckCircle2, Globe, FileCheck, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GDPRPage() {
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
              GDPR Compliant
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
              GDPR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 dark:from-orange-400 dark:via-amber-300 dark:to-yellow-200">
                Rights
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              EU law gives you control over your personal data. Learn about your rights and how we protect your information.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Full Transparency</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Your Data, Your Control</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">EU Compliant</span>
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
                <User className="mr-1.5 h-3 w-3" />
                YOUR RIGHTS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your GDPR Rights</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                GDPR gives you strong rights over your personal data. Here's what you can do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Right to Access</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">See what data we have</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Get a copy of your data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Know how it's used</span>
                  </li>
                </ul>
              </Card>

              <Card className="glass-card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Right to Delete</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Request data deletion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Right to be forgotten</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Clean removal process</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="soft-section p-8 mt-8 text-center">
              <p className="text-lg text-muted-foreground italic">
                "You have the right to access, correct, and delete your personal data. We make it easy to exercise these rights."
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
                <Lock className="mr-1.5 h-3 w-3" />
                DATA PROTECTION
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How We Protect Your Data</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use industry-standard security measures to keep your personal information safe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Lock,
                  title: "Encryption",
                  description: "All data is encrypted in transit and at rest using industry-standard protocols"
                },
                {
                  icon: FileCheck,
                  title: "Legal Basis",
                  description: "We only process data with your consent or when legally required"
                },
                {
                  icon: Globe,
                  title: "Safe Transfers",
                  description: "International data transfers follow GDPR compliance standards"
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
                <Clock className="mr-1.5 h-3 w-3" />
                EXERCISE YOUR RIGHTS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Take Action</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ready to exercise your GDPR rights? Here's how to get started.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Request access to your data",
                "Correct inaccurate information",
                "Request data deletion",
                "Object to processing",
                "Data portability request",
                "Withdraw consent anytime"
              ].map((action, index) => (
                <Card key={index} className="flex items-center gap-4 p-4 border border-border/40 bg-card/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{action}</span>
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
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Questions About GDPR?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our Data Protection Officer is here to help with any GDPR-related questions or requests.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="mailto:dpo@collegeblink.com" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
                    <Mail className="w-4 h-4" />
                    dpo@collegeblink.com
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
