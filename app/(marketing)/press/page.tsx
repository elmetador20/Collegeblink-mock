import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Newspaper,
  Download,
  Image as ImageIcon,
  FileText,
  ExternalLink,
  Mail,
  ArrowRight,
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  MapPin,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const pressAssets = [
  {
    icon: ImageIcon,
    title: "Official Logo",
    description: "Primary and secondary logos in high-resolution formats.",
    size: "15 MB",
    formats: ["PNG", "SVG", "EPS"],
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: ImageIcon,
    title: "Brand Book",
    description: "Guidelines for typography, colors, and overall brand identity.",
    size: "8 MB",
    formats: ["PDF"],
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: FileText,
    title: "Fact Sheet",
    description: "Key metrics, company timeline, and mission statement.",
    size: "2 MB",
    formats: ["PDF"],
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Users,
    title: "Leadership Kit",
    description: "Executive biographies and high-res headshots.",
    size: "12 MB",
    formats: ["PDF", "ZIP"],
    color: "bg-amber-500/10 text-amber-500",
  },
];

const companyFacts = [
  { label: "Founded", value: "2024", icon: Calendar },
  { label: "HQ", value: "Bangalore", icon: MapPin },
  { label: "Active Users", value: "10,000+", icon: Users },
  { label: "Colleges", value: "500+", icon: GraduationCap },
];

export default function PressPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-400">
              <Newspaper className="h-4 w-4" />
              Press & Media Kit
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Resources for <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                The Media
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Everything you need to cover CollegeBlink, from official brand assets and logos to our company's latest achievements.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-indigo-600 px-8 py-6 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
                asChild
              >
                <Link href="#assets">Download All Assets</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6" asChild>
                <Link href="/contact">Media Inquiries</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
            {companyFacts.map((fact, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <fact.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground">{fact.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Press Assets</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              High-resolution materials approved for public use.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pressAssets.map((asset, i) => (
              <div key={i} className="group relative flex flex-col rounded-[2rem] border border-border bg-card p-8 transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${asset.color}`}>
                  <asset.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{asset.title}</h3>
                <p className="mb-6 text-sm text-muted-foreground flex-1">{asset.description}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {asset.formats.map((format, j) => (
                    <span key={j} className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                      {format}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="w-full rounded-xl hover:bg-indigo-600 hover:text-white group">
                  Download {asset.size}
                  <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">Company Boilerplate</h2>
              <Button variant="outline" size="sm" className="rounded-full">
                Copy to Clipboard
              </Button>
            </div>
            <div className="rounded-[2.5rem] border border-border bg-card p-10 lg:p-16 shadow-inner">
              <p className="text-xl leading-relaxed text-muted-foreground">
                CollegeBlink is a Smart-powered college discovery and application planning platform for Indian students. Founded in 2024, the platform leverages advanced Smart technology to help students discover colleges that match their profile, track applications, and make informed decisions about their higher education journey. With over 10,000 active users and partnerships with 500+ colleges across India, CollegeBlink is transforming how students navigate the complex college admissions process.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl tracking-tight">Recent Coverage</h2>
            <p className="text-muted-foreground text-lg">See what the world is saying about CollegeBlink.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                source: "TechCrunch",
                title: "CollegeBlink raises seed round to scale Smart counseling.",
                date: "March 2025",
              },
              {
                source: "Forbes India",
                title: "Top 10 EdTech startups to watch in 2025.",
                date: "February 2025",
              },
              {
                source: "YourStory",
                title: "The mission to bring transparency to college admissions.",
                date: "January 2025",
              }
            ].map((mention, i) => (
              <div key={i} className="group cursor-pointer rounded-3xl border border-border bg-card p-8 transition-all hover:border-indigo-500/30 hover:-translate-y-1">
                <div className="mb-4 text-sm font-bold uppercase tracking-widest text-indigo-500">{mention.source}</div>
                <h3 className="mb-6 text-xl font-bold text-foreground leading-tight group-hover:text-indigo-600 transition-colors">{mention.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{mention.date}</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl rounded-[3rem] bg-indigo-600 p-12 lg:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
            <div className="relative z-10">
              <Mail className="mx-auto mb-6 h-12 w-12 text-indigo-200" />
              <h2 className="mb-6 text-2xl font-bold lg:text-3xl">For Media Inquiries</h2>
              <p className="mb-8 text-base text-indigo-100">
                Contact our PR team for interviews, expert commentary, or more information about CollegeBlink.
              </p>
              <Button size="lg" className="rounded-full bg-white text-indigo-600 hover:bg-indigo-50 px-12 py-8 text-xl font-bold" asChild>
                <Link href="mailto:press@collegeblink.com">press@collegeblink.com</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

