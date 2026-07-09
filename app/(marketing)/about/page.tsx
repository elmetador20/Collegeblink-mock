import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  Target,
  Heart,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "Student-First",
    description: "Every decision we make starts with what's best for students navigating their college journey.",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Leveraging Smart technology and data to solve complex college discovery challenges with simple solutions.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Providing accurate, verified information to help students make informed decisions.",
    color: "from-accent/20 to-accent/20",
    iconColor: "text-teal-400",
  },
];

const milestones = [
  { 
    year: "2024", 
    title: "The Beginning",
    event: "CollegeBlink founded with a vision to simplify college admissions in India.",
    icon: Target
  },
  { 
    year: "2024", 
    title: "Smart Evolution",
    event: "Launched our first Smart Counselor powered by GPT-4o, providing 24/7 guidance.",
    icon: Zap
  },
  { 
    year: "2024", 
    title: "Growing Community",
    event: "Reached 10,000+ active students discovering their futures on our platform.",
    icon: Users
  },
  { 
    year: "2025", 
    title: "Expanding Reach",
    event: "Partnered with 500+ top-tier colleges across every major city in India.",
    icon: GraduationCap
  },
];

const team = [
  {
    name: "Founding Team",
    role: "Visionaries & Builders",
    description: "A collective of engineers, designers, and education experts dedicated to democratizing college access.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=team1"
  },
  {
    name: "Smart Research",
    role: "ML Engineers",
    description: "Specialists working on personalized recommendation engines and natural language processing.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=team2"
  },
  {
    name: "Success Team",
    role: "Student Counselors",
    description: "Education consultants ensuring every student finds their perfect academic path.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=team3"
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[35%] w-[35%] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[30%] w-[30%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              Our Story
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Empowering the next generation of{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Indian students
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              We're on a mission to bring clarity, confidence, and data-driven insights to the most important decision in a student's life.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-indigo-600 px-8 py-6 text-white transition-all hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                asChild
              >
                <Link href="/colleges">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Our Platform
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full px-8 py-6 hover:bg-muted/50" asChild>
                <Link href="/contact">View Our Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
            {[
              { label: "Active Students", value: "10k+", icon: Users, color: "text-indigo-400" },
              { label: "Smart Consultations", value: "25k+", icon: Zap, color: "text-amber-400" },
              { label: "User Satisfaction", value: "98%", icon: Heart, color: "text-rose-400" },
            ].map((stat, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur-md transition-all hover:border-indigo-500/30">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-foreground lg:text-3xl">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
              <div className="relative">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                  Redefining how India <br />
                  <span className="text-indigo-500">thinks about education</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10">
                      <Target className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">Personalized Guidance</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We don't believe in one-size-fits-all. Our Smart engine learns about your aspirations to find the perfect fit.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
                      <Shield className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">Verified Information</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Every college profile, fee structure, and placement record is manually verified for 100% accuracy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 p-px">
                <div className="h-full w-full rounded-[2rem] bg-card/80 backdrop-blur-xl flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center">
                      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                        <GraduationCap className="h-10 w-10" />
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-foreground">Our Ultimate Vision</h3>
                      <p className="text-lg text-muted-foreground">
                        To be the most trusted educational companion for every student in India, from their first inquiry to their final enrollment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Core Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              The principles that guide our product, our team, and our commitment to you.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <div key={i} className="group relative rounded-[2.5rem] border border-border/50 bg-card p-8 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/5">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color}`}>
                  <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Our Journey</h2>
            <p className="text-muted-foreground">From a simple idea to a nationwide platform.</p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-cyan-500 to-purple-500/0 hidden md:block" />
            
            <div className="space-y-12 md:space-y-24">
              {milestones.map((milestone, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-background bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 hidden md:block" />
                  
                  <div className="w-full md:w-1/2">
                    <div className={`rounded-[2rem] border border-border bg-card p-8 transition-all hover:border-indigo-500/30 hover:shadow-xl ${i % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-3xl font-bold text-indigo-500">{milestone.year}</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                          <milestone.icon className="h-5 w-5 text-indigo-500" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A diverse group of dreamers, builders, and educators working towards a common goal.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img src={member.image} alt={member.name} className="h-48 w-48 mx-auto transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-2xl font-bold text-foreground">{member.name}</h3>
                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-indigo-500">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[3rem] bg-indigo-600 px-8 py-16 lg:px-24 lg:py-24">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 rounded-full bg-white/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px]" />
            
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-2xl font-bold text-white lg:text-4xl">
                Be a part of the <br /> education revolution
              </h2>
              <p className="mb-10 text-lg text-indigo-100 lg:text-xl">
                Whether you're looking for your dream college or wanting to join our growing team, we'd love to have you.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-white text-indigo-600 hover:bg-indigo-50 sm:w-auto"
                  asChild
                >
                  <Link href="/register">Get Started Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-white/20 text-white hover:bg-white/10 sm:w-auto backdrop-blur-sm"
                  asChild
                >
                  <Link href="/careers">Explore Careers</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

