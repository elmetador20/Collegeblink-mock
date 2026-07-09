import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const staticPages: Record<string, { title: string; subtitle: string; content: string[] }> = {
  about: {
    title: "About CollegeBlink",
    subtitle: "We're on a mission to democratize college discovery in India.",
    content: [
      "CollegeBlink was founded with a singular vision: to destroy the confusion and anxiety surrounding college admissions in India. We believe every student deserves data-backed clarity when making the most important decision of their career.",
      "Traditional directories are filled with outdated information, sponsored listings, and overwhelming interfaces. We built a smart engine that focuses purely on fit, placement probability, and verified student outcomes.",
      "Today, our platform tracks millions of data points across 10,000+ Indian universities to provide you with a unified, signal-rich environment."
    ]
  },
  careers: {
    title: "Careers",
    subtitle: "Join the team building the future of education tech.",
    content: [
      "We're always looking for brilliant engineers, product designers, and data scientists who are passionate about education.",
      "Current Openings: There are no active roles right now, but we review open applications sent to careers@collegeblink.com continuously.",
      "Benefits: Remote-first, competitive equity, comprehensive health, and an unlimited book allowance."
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "We're here to help you navigate your journey.",
    content: [
      "Need immediate assistance or have a business inquiry? Our team is available.",
      "Student Support: support@collegeblink.com",
      "Partnerships: partnerships@collegeblink.com",
      "Office: 100 Feet Road, Indiranagar, Bangalore, Karnataka 560038"
    ]
  },
  partners: {
    title: "Partners",
    subtitle: "Ecosystem collaboration for student success.",
    content: [
      "We partner with high schools, independent counseling agencies, and verified institutions to ensure students get the best possible guidance.",
      "If you represent an educational institution and want to claim or verify your data, please contact our partnership team."
    ]
  },
  press: {
    title: "Press Kit",
    subtitle: "Resources for media and journalists.",
    content: [
      "Please refer to this page for official brand assets, executive bios, and recent press releases.",
      "For media inquiries, contact press@collegeblink.com."
    ]
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Your data is yours. We protect it fiercely.",
    content: [
      "Last Updated: April 2026",
      "We collect minimal data required to power your smart recommendations. We do not sell your personal identifying information to third-party institutions without your explicit opt-in.",
      "Your academic scores, preferences, and shortlists are encrypted and used strictly to improve your matching algorithm."
    ]
  },
  terms: {
    title: "Terms of Service",
    subtitle: "The rules of the platform.",
    content: [
      "By accessing CollegeBlink, you agree to basic codes of conduct. Do not scrape our proprietary datasets, do not impersonate institutions, and do not post fake reviews.",
      "We reserve the right to ban any account found violating community forum guidelines."
    ]
  },
  cookies: {
    title: "Cookie Policy",
    subtitle: "How we use cookies to improve your experience.",
    content: [
      "We use essential cookies to maintain your session and preference states. We also use functional cookies to analyze general site traffic to improve our UI/UX.",
      "You can opt out of analytics tracking at any time via your account settings."
    ]
  },
  gdpr: {
    title: "GDPR Compliance",
    subtitle: "European data standards applied globally.",
    content: [
      "While primarily operating in India, CollegeBlink adheres to GDPR principles. You have the right to request all data we hold on you, and the right to be forgotten.",
      "Initiate a data clearing request by emailing dpo@collegeblink.com."
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug];
  if (!page) return { title: "Page Not Found" };
  return { title: page.title, description: page.subtitle };
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = staticPages[slug];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      
      <main className="flex-1 flex flex-col pt-32 pb-24 container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mb-8">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">{pageData.title}</h1>
            <p className="text-xl text-muted-foreground">{pageData.subtitle}</p>
          </div>

          
          <div className="glass-card rounded-[2rem] p-8 md:p-12 border border-border/50 text-base md:text-lg text-foreground/90 leading-relaxed shadow-xl">
            <div className="space-y-8">
              {pageData.content.map((paragraph, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  {slug !== "about" && slug !== "careers" && (
                    <CheckCircle2 className="h-6 w-6 text-cyan-500 shrink-0 mt-0.5 opacity-70" />
                  )}
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            
            {(slug === "about" || slug === "contact") && (
              <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-foreground">Ready to start?</div>
                  <div className="text-sm text-muted-foreground">Join millions of students today.</div>
                </div>
                <Link href="/register" className="h-10 px-6 bg-primary text-white flex items-center justify-center rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
