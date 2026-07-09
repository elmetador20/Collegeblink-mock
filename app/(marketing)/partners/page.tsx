import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  GraduationCap,
  TrendingUp,
  Users,
  Building2,
  Target,
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";

const partnershipTypes = [
  {
    icon: Building2,
    title: "Institutions",
    description: "For colleges and universities looking to increase their digital footprint and attract qualified students.",
    color: "bg-indigo-500/10 text-indigo-500",
    benefits: [
      "Priority search placement",
      "Verified badge & profile",
      "Lead generation tools",
      "Student analytics",
    ],
  },
  {
    icon: Globe,
    title: "Organizations",
    description: "For educational boards, NGOs, and student-focused organizations looking to collaborate on scale.",
    color: "bg-cyan-500/10 text-cyan-500",
    benefits: [
      "API & Data access",
      "Co-branded content",
      "Event collaboration",
      "Shared research",
    ],
  },
  {
    icon: Target,
    title: "Corporate",
    description: "For companies wanting to support students through scholarships, internships, and skill programs.",
    color: "bg-purple-500/10 text-purple-500",
    benefits: [
      "Scholarship hosting",
      "Brand visibility",
      "Talent pipeline access",
      "Direct outreach",
    ],
  },
];

const stats = [
  { label: "Active Students", value: "10,000+", icon: Users },
  { label: "Partner Colleges", value: "500+", icon: GraduationCap },
  { label: "Monthly Visits", value: "50,000+", icon: TrendingUp },
  { label: "States Covered", value: "28", icon: Globe },
];

export default function PartnersPage() {
  return (
    <div className="relative min-h-screen bg-background">
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-400">
              <Heart className="h-4 w-4" />
              Partner Ecosystem
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Building the future of{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Indian Education
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Join a network of hundreds of institutions and organizations committed to helping students find their perfect academic match.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-indigo-600 px-8 py-6 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
                asChild
              >
                <Link href="/contact">Become a Partner</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6" asChild>
                <Link href="/about">View Our Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Partnership Opportunities</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              We offer tailored solutions for every type of organization in the education space.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {partnershipTypes.map((type, i) => (
              <div key={i} className="group relative flex flex-col rounded-[2.5rem] border border-border bg-card p-8 transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${type.color}`}>
                  <type.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">{type.title}</h3>
                <p className="mb-8 text-muted-foreground leading-relaxed">{type.description}</p>
                <div className="mt-auto space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground">Key Benefits:</p>
                  <ul className="space-y-3">
                    {type.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-indigo-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-6 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-indigo-900 py-16 lg:py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl tracking-tight">Trusted by leading universities</h2>
              <p className="text-indigo-100 text-lg">See how we're helping institutions transform their digital recruitment strategy.</p>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-32 rounded-lg bg-white/10 backdrop-blur-sm" />
              <div className="h-12 w-32 rounded-lg bg-white/10 backdrop-blur-sm" />
              <div className="h-12 w-32 rounded-lg bg-white/10 backdrop-blur-sm" />
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote: "CollegeBlink has fundamentally changed how we connect with prospective students. The quality of inquiries has seen a 3x jump.",
                author: "Director of Admissions",
                org: "Leading Tech Institute",
              },
              {
                quote: "The analytics provided by the platform give us insights into student behavior that we never had before. It's a game-changer.",
                author: "Registrar",
                org: "National University",
              }
            ].map((story, i) => (
              <div key={i} className="rounded-[2rem] bg-white/5 p-8 backdrop-blur-md border border-white/10">
                <p className="mb-8 text-xl italic text-indigo-50 leading-relaxed">"{story.quote}"</p>
                <div>
                  <p className="font-bold text-white">{story.author}</p>
                  <p className="text-indigo-300 text-sm">{story.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">How to Join</h2>
              <p className="text-muted-foreground text-lg">Four simple steps to start your partnership journey.</p>
            </div>
            <div className="space-y-4">
              {[
                { step: "01", title: "Reach Out", desc: "Fill out our partnership inquiry form with your details." },
                { step: "02", title: "Discovery Call", desc: "Our team will schedule a brief call to understand your institutional goals." },
                { step: "03", title: "Setup & Verification", desc: "We'll help you set up your profile and verify your institution data." },
                { step: "04", title: "Go Live", desc: "Start connecting with students and accessing your analytics dashboard." },
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-8 rounded-3xl border border-border bg-card p-6 transition-all hover:border-indigo-500/30">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-2xl font-bold text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-[3rem] bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="mb-6 text-2xl font-bold text-white lg:text-3xl tracking-tight">Ready to grow your institution?</h2>
              <p className="mb-8 text-base text-indigo-100 max-w-2xl mx-auto">
                Join 500+ colleges already finding success on CollegeBlink.
              </p>
              <Button
                size="lg"
                className="rounded-full bg-white px-12 py-8 text-xl font-bold text-indigo-700 hover:bg-indigo-50"
                asChild
              >
                <Link href="/contact">Apply for Partnership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
