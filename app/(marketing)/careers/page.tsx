import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  Rocket,
  Heart,
  Zap,
  MapPin,
  DollarSign,
  Clock,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Industry-leading salary and equity packages that grow with you.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Clock,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours and unlimited PTO.",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: Heart,
    title: "Health First",
    description: "Comprehensive health insurance for you and your family.",
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    icon: Rocket,
    title: "Growth Budget",
    description: "Annual learning stipend for courses, books, and conferences.",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Users,
    title: "Team Retreats",
    description: "Quarterly off-sites to bond and brainstorm in person.",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Zap,
    title: "Latest Tech",
    description: "New MacBook Pro and budget for your home office setup.",
    color: "bg-purple-500/10 text-purple-500",
  },
];

const openPositions = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    salary: "₹30L - ₹45L",
    description: "Build beautiful, performant user interfaces for our college discovery platform using Next.js and Tailwind.",
  },
  {
    title: "Smart/ML Engineer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    salary: "₹35L - ₹50L",
    description: "Develop and deploy LLM-powered models to power our intelligent college recommendation engine.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "₹20L - ₹35L",
    description: "Craft intuitive and delightful experiences for students navigating their academic journey.",
  },
  {
    title: "Content Strategist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "₹15L - ₹25L",
    description: "Create engaging content about colleges, admissions, and career guidance for millions of students.",
  },
];

const cultureImages = [
  {
    color: "from-indigo-500 to-purple-600",
    title: "Collaboration",
    icon: Users,
  },
  {
    color: "from-cyan-500 to-blue-600",
    title: "Innovation",
    icon: Zap,
  },
  {
    color: "from-amber-500 to-orange-600",
    title: "Growth",
    icon: TrendingUp,
  },
];

export default function CareersPage() {
  return (
    <div className="relative min-h-screen bg-background">
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-400">
              <Briefcase className="h-4 w-4" />
              We're Hiring!
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Build the future of <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Admissions Technology
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Join a team of explorers and builders transforming how millions of students in India find their path to success.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-indigo-600 px-8 py-6 text-white hover:bg-indigo-700"
                asChild
              >
                <Link href="#open-positions">See All Roles</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6" asChild>
                <Link href="/about">Our Culture</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                A culture built on <span className="text-indigo-500">trust and impact</span>
              </h2>
              <p className="mb-6 text-base text-muted-foreground leading-relaxed">
                At CollegeBlink, we're not just building a product; we're building a community. We value transparency, curiosity, and the drive to make a difference in students' lives.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Remote First", icon: MapPin },
                  { label: "Fast Growth", icon: TrendingUp },
                  { label: "Deep Impact", icon: Heart },
                  { label: "Modern Stack", icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-8 flex items-center justify-center">
                  <Zap className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-white" />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-indigo-600 p-8 flex items-end">
                  <p className="text-xl font-bold text-white leading-tight">Join a team that cares about your growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Perks & Benefits</h2>
            <p className="text-muted-foreground">Everything you need to do your best work.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <div key={i} className="group relative rounded-3xl border border-border bg-card p-8 transition-all hover:border-indigo-500/30 hover:shadow-xl">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.color}`}>
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="open-positions" className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-2xl font-bold text-foreground lg:text-3xl">Open Positions</h2>
                <p className="mt-2 text-muted-foreground">Find your next challenge at CollegeBlink.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full">All Teams</Button>
                <Button variant="ghost" className="rounded-full">Engineering</Button>
                <Button variant="ghost" className="rounded-full">Design</Button>
              </div>
            </div>

            <div className="grid gap-6">
              {openPositions.map((job, i) => (
                <div key={i} className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-500">
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" /> {job.type}
                        </span>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-foreground">{job.title}</h3>
                      <p className="mb-4 text-muted-foreground leading-relaxed">{job.description}</p>
                      <p className="font-bold text-indigo-500">{job.salary}</p>
                    </div>
                    <Button
                      size="lg"
                      className="rounded-full bg-indigo-600 px-8 py-6 text-white transition-all hover:bg-indigo-700 md:w-auto"
                      asChild
                    >
                      <Link href="/contact">Apply Now</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-[2.5rem] bg-muted/50 p-12 text-center border border-dashed border-border">
              <h3 className="mb-4 text-2xl font-bold text-foreground">Don't see your role?</h3>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                We're always looking for talented people who share our mission. Send us an open application and we'll keep you in mind.
              </p>
              <Button variant="outline" size="lg" className="rounded-full px-10 py-6" asChild>
                <Link href="/contact">General Application</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 px-8 py-16 text-center lg:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)]" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="mb-6 text-xl font-bold text-white lg:text-3xl">Ready to make an impact?</h2>
              <p className="mb-8 text-base text-indigo-200 lg:text-lg">
                Join our mission-driven team and help shape the future of education for millions of students.
              </p>
              <Button
                size="lg"
                className="rounded-full bg-white px-10 py-8 text-lg font-bold text-indigo-900 hover:bg-indigo-50"
                asChild
              >
                <Link href="#open-positions">Explore Open Roles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

