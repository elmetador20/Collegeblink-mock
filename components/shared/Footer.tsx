"use client";

import Link from "next/link";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  product: [
    { label: "College Search", href: "/colleges" },
    { label: "Institutes", href: "/institutes" },
    { label: "Exams", href: "/exams" },
    { label: "Study Abroad", href: "/study-abroad" },
    { label: "Smart Counselor", href: "/smart-counselor" },
    { label: "Scholarships", href: "/scholarships" },
    { label: "Compare Colleges", href: "/compare" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Partners", href: "/partners" },
    { label: "Press Kit", href: "/press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_24%)]" />
      <div className="container relative mx-auto px-4 py-16">
        
        <div className="hidden lg:block glass-card mb-12 overflow-hidden p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-cyan-500/10 dark:bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
                Stay Ahead
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground lg:text-3xl">
                Admissions, deadlines, and scholarships in one signal-rich inbox.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Join students using CollegeBlink to track applications, discover better-fit colleges,
                and keep up with every important milestone.
              </p>
            </div>

            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-full border border-border/70 bg-card/75 px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-400 hover:to-cyan-300 hover:scale-105 hover:shadow-cyan-500/30"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        
        <div className="lg:hidden">
          
          <div className="mb-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="CollegeBlink" className="h-12 w-auto object-contain rounded-full" />
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Smart-powered college discovery for Indian students.
            </p>
          </div>

          
          <div className="space-y-3">
            
            <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
              <button
                onClick={() => toggleSection('product')}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                  Product
                </h3>
                {openSection === 'product' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {openSection === 'product' && (
                <ul className="border-t border-border/50 px-4 pb-4 space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            
            <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
              <button
                onClick={() => toggleSection('company')}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                  Company
                </h3>
                {openSection === 'company' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {openSection === 'company' && (
                <ul className="border-t border-border/50 px-4 pb-4 space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            
            <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
              <button
                onClick={() => toggleSection('contact')}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                  Contact
                </h3>
                {openSection === 'contact' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {openSection === 'contact' && (
                <ul className="border-t border-border/50 px-4 pb-4 space-y-4">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Mail className="mt-0.5 h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                    <span>info@collegeblink.com</span>
                  </li>
                  <li 
                    className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition"
                    onClick={() => window.open("https://wa.me/919278115957", "_blank")}
                  >
                    <Phone className="mt-0.5 h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                    <span>+91 9278115957</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                    <span>Noida, India</span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Copyright {new Date().getFullYear()} CollegeBlink. All rights reserved.
            </p>
          </div>
        </div>

        
        <div className="hidden lg:grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="CollegeBlink" className="h-16 w-auto object-contain rounded-full" />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Smart-powered college discovery for Indian students.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition hover:text-foreground hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition hover:text-foreground hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground group cursor-pointer hover:text-foreground transition">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-700 dark:text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>info@collegeblink.com</span>
              </li>
              <li 
                className="flex items-start gap-3 text-sm text-muted-foreground group cursor-pointer hover:text-foreground transition"
                onClick={() => window.open("https://wa.me/919278115957", "_blank")}
              >
                <Phone className="mt-0.5 h-4 w-4 text-cyan-700 dark:text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>+91 9278115957</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group cursor-pointer hover:text-foreground transition">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-700 dark:text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>Noida, India</span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="hidden lg:flex mt-12 flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 lg:flex-row">
          <p className="text-sm text-muted-foreground">
            Copyright {new Date().getFullYear()} CollegeBlink. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition hover:text-foreground hover:underline hover:underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center transition-all hover:scale-110 hover:shadow-cyan-500/30 lg:hidden"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>

        
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="lg:hidden fixed bottom-24 right-4 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center transition-all hover:scale-110 hover:shadow-cyan-500/30"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
