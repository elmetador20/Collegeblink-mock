import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Building2,
  Star,
  TrendingUp,
  Users,
  GraduationCap,
  Award,
  Globe,
  DollarSign,
  Clock,
  Heart,
  Share2,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ country: string }>;
}

const countryData: Record<string, { name: string; flag: string; description: string; universities: number; students: number; avgFees: string; popularCourses: string[]; requirements: string[]; benefits: string[] }> = {
  "usa": {
    name: "USA",
    flag: "🇺🇸",
    description: "The United States is home to some of the world's most prestigious universities, offering diverse academic programs and excellent research opportunities. With a flexible education system and strong industry connections, it's a top destination for international students.",
    universities: 150,
    students: 200000,
    avgFees: "$20,000 - $60,000/year",
    popularCourses: ["Computer Science", "Business Administration", "Engineering", "Data Science", "MBA"],
    requirements: ["IELTS/TOEFL", "SAT/ACT (for undergrad)", "GRE/GMAT (for grad)", "Statement of Purpose", "Letters of Recommendation"],
    benefits: ["STEM OPT (3 years work permit)", "World-class research facilities", "Diverse campus culture", "Strong alumni network"]
  },
  "uk": {
    name: "UK",
    flag: "🇬🇧",
    description: "The UK offers world-class education with a rich academic heritage. Known for its shorter degree programs and strong focus on independent learning, UK universities consistently rank among the best globally.",
    universities: 130,
    students: 180000,
    avgFees: "£10,000 - £38,000/year",
    popularCourses: ["Business & Management", "Law", "Engineering", "Computer Science", "Medicine"],
    requirements: ["IELTS/TOEFL", "UCAS application", "Personal Statement", "Academic References"],
    benefits: ["3-year undergraduate programs", "2-year post-study work visa", "Globally recognized degrees", "Cultural diversity"]
  },
  "canada": {
    name: "Canada",
    flag: "🇨🇦",
    description: "Canada is known for its welcoming environment, high-quality education, and affordable tuition compared to other study destinations. With a strong economy and immigration-friendly policies, it's an excellent choice for long-term career prospects.",
    universities: 100,
    students: 150000,
    avgFees: "CAD 15,000 - 40,000/year",
    popularCourses: ["Computer Science", "Business", "Engineering", "Health Sciences", "Hospitality"],
    requirements: ["IELTS/TOEFL", "Study Permit", "Academic transcripts", "Proof of funds"],
    benefits: ["3-year post-graduation work permit", "Pathway to permanent residency", "Safe and welcoming environment", "Affordable living costs"]
  },
  "germany": {
    name: "Germany",
    flag: "🇩🇪",
    description: "Germany offers tuition-free education at public universities for most international students. Known for its engineering and technical programs, Germany provides excellent research opportunities and strong industry ties.",
    universities: 120,
    students: 120000,
    avgFees: "€0 - €3,000/year (public universities)",
    popularCourses: ["Engineering", "Computer Science", "Business", "Natural Sciences", "Medicine"],
    requirements: ["IELTS/TOEFL (German for some programs)", "APS certificate", "Blocked bank account", "Health insurance"],
    benefits: ["Tuition-free at public universities", "18-month job seeker visa", "Strong engineering programs", "Central European location"]
  },
  "australia": {
    name: "Australia",
    flag: "🇦🇺",
    description: "Australia is known for its high-quality education system, beautiful landscapes, and relaxed lifestyle. With world-class universities and a multicultural society, it's a popular choice for international students.",
    universities: 90,
    students: 100000,
    avgFees: "AUD 20,000 - 45,000/year",
    popularCourses: ["Business", "Engineering", "IT", "Health Sciences", "Hospitality"],
    requirements: ["IELTS/TOEFL", "Student Visa (Subclass 500)", "GTE statement", "Overseas Student Health Cover"],
    benefits: ["2-4 year post-study work visa", "High quality of life", "Multicultural society", "Part-time work rights"]
  },
  "russia": {
    name: "Russia",
    flag: "🇷🇺",
    description: "Russia offers affordable education with strong programs in medicine, engineering, and sciences. With a rich cultural heritage and many English-taught programs, it's an emerging destination for international students.",
    universities: 80,
    students: 50000,
    avgFees: "$2,000 - $8,000/year",
    popularCourses: ["Medicine", "Engineering", "Computer Science", "Physics", "Mathematics"],
    requirements: ["Invitation letter", "Student visa", "Medical certificate", "HIV test"],
    benefits: ["Very affordable tuition", "Strong STEM programs", "Rich cultural experience", "Government scholarships available"]
  },
  "ireland": {
    name: "Ireland",
    flag: "🇮🇪",
    description: "Ireland is known as the 'Silicon Valley of Europe' with a thriving tech industry. Home to many multinational companies, it offers excellent opportunities for graduates, especially in technology and business sectors.",
    universities: 40,
    students: 35000,
    avgFees: "€9,000 - €25,000/year",
    popularCourses: ["Computer Science", "Data Analytics", "Business", "Pharmaceuticals", "Engineering"],
    requirements: ["IELTS/TOEFL", "Student visa", "Proof of funds", "Academic transcripts"],
    benefits: ["2-year post-study work visa", "Hub for tech companies", "English-speaking country", "Welcoming culture"]
  },
  "new-zealand": {
    name: "New Zealand",
    flag: "🇳🇿",
    description: "New Zealand offers a unique study experience with its focus on practical learning and stunning natural environment. Known for its safety and quality of life, it's an excellent choice for students seeking a balanced lifestyle.",
    universities: 30,
    students: 25000,
    avgFees: "NZD 18,000 - 35,000/year",
    popularCourses: ["Business", "IT", "Engineering", "Hospitality", "Agriculture"],
    requirements: ["IELTS/TOEFL", "Student visa", "Proof of funds", "Medical insurance"],
    benefits: ["1-3 year post-study work visa", "Pathway to residency", "Safe environment", "Beautiful landscapes"]
  },
  "sweden": {
    name: "Sweden",
    flag: "🇸🇪",
    description: "Sweden is known for its innovative education system and focus on sustainability. With tuition-free education for EU students and many scholarships for non-EU students, it's an attractive destination for forward-thinking students.",
    universities: 50,
    students: 30000,
    avgFees: "€8,000 - €15,000/year (non-EU)",
    popularCourses: ["Engineering", "Design", "Business", "Environmental Science", "Computer Science"],
    requirements: ["IELTS/TOEFL", "Residence permit", "Proof of funds", "Health insurance"],
    benefits: ["Innovative teaching methods", "Focus on sustainability", "Strong startup ecosystem", "Work while studying"]
  },
  "italy": {
    name: "Italy",
    flag: "🇮🇹",
    description: "Italy combines world-class education with rich cultural heritage. Known for art, design, fashion, and architecture programs, Italy offers affordable education in a historically and culturally rich environment.",
    universities: 70,
    students: 40000,
    avgFees: "€1,000 - €10,000/year",
    popularCourses: ["Design", "Fashion", "Architecture", "Business", "Culinary Arts"],
    requirements: ["IELTS/TOEFL (English programs)", "Student visa", "Declaration of value", "Proof of funds"],
    benefits: ["Affordable tuition", "Rich cultural experience", "Strong design programs", "Central European location"]
  },
  "uzbekistan": {
    name: "Uzbekistan",
    flag: "🇺🇿",
    description: "Uzbekistan is emerging as an affordable study destination with growing educational infrastructure. Located at the crossroads of Asia, it offers unique cultural experiences and budget-friendly education options.",
    universities: 60,
    students: 20000,
    avgFees: "$1,000 - $4,000/year",
    popularCourses: ["Medicine", "Engineering", "Business", "IT", "Languages"],
    requirements: ["Invitation letter", "Student visa", "Medical certificate", "HIV test"],
    benefits: ["Very affordable", "Growing education sector", "Central Asian location", "Cultural diversity"]
  },
  "netherlands": {
    name: "Netherlands",
    flag: "🇳🇱",
    description: "The Netherlands is known for its innovative education system and English-taught programs. With a strong focus on practical learning and a high quality of life, it's an excellent choice for international students.",
    universities: 55,
    students: 45000,
    avgFees: "€8,000 - €20,000/year (non-EU)",
    popularCourses: ["Business", "Engineering", "Computer Science", "Life Sciences", "Design"],
    requirements: ["IELTS/TOEFL", "Residence permit", "Proof of funds", "Health insurance"],
    benefits: ["Many English-taught programs", "1-year post-study search year", "High quality of life", "Innovative teaching"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const data = countryData[country];

  if (!data) {
    return { title: "Country Not Found | CollegeBlink" };
  }

  const title = `Study in ${data.name} | Universities & Admission Guide`;
  const description = `Discover universities and colleges in ${data.name}. View courses, fees, requirements, and admission guidance on CollegeBlink.`;

  return {
    title,
    description,
    keywords: [data.name, "study abroad", "universities", "colleges", "admission", "international education", "study in " + data.name.toLowerCase()],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://collegeblink.vercel.app/study-abroad/${country}`,
      siteName: "CollegeBlink",
      images: [
        {
          url: "https://collegeblink.vercel.app/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://collegeblink.vercel.app/og-image.jpg"],
    },
  };
}

async function getCountryData(country: string) {
  const data = countryData[country];
  if (!data) notFound();
  return data;
}

export default async function StudyAbroadCountryPage({ params }: PageProps) {
  const { country } = await params;
  const data = await getCountryData(country);

  return (
    <div className="min-h-screen bg-background">
      <Script
        id="study-abroad-page-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'study_abroad_viewed', {
                country: '${data.name}'
              });
            }
          `,
        }}
      />
      
      <div className="relative h-[400px] bg-gradient-to-br from-indigo-900/50 via-background to-cyan-900/30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-5xl">
                {data.flag}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-gradient-to-r from-accent/20 to-accent/20 text-accent dark:text-accent border-accent/30">
                    <Globe className="h-3 w-3 mr-1" />
                    Study Abroad
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {data.universities}+ Universities
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Study in {data.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {data.students.toLocaleString()}+ Indian Students
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    Top Destination
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="border border-border/50 text-foreground hover:bg-muted/10 bg-transparent hover:scale-105 transition-transform">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button className="border border-border/50 text-foreground hover:bg-muted/10 bg-transparent hover:scale-105 transition-transform">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition-transform">
                  Start Application
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-b border-border/70 bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{data.universities}+</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{data.students.toLocaleString()}+</div>
              <div className="text-sm text-muted-foreground">Indian Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{data.avgFees.split(' - ')[0]}</div>
              <div className="text-sm text-muted-foreground">Avg Fees/Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2-4 Years</div>
              <div className="text-sm text-muted-foreground">Post-Study Visa</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-card border border-border/70 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Overview</TabsTrigger>
            <TabsTrigger value="universities" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Universities</TabsTrigger>
            <TabsTrigger value="requirements" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Requirements</TabsTrigger>
            <TabsTrigger value="benefits" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">About {data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 leading-relaxed">{data.description}</p>
              </CardContent>
            </Card>

            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular Courses</h3>
              <div className="flex flex-wrap gap-3">
                {data.popularCourses.map((course) => (
                  <Badge key={course} className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
                    <GraduationCap className="h-3 w-3 mr-2" />
                    {course}
                  </Badge>
                ))}
              </div>
            </div>

            
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Cost Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold text-foreground">{data.avgFees}</div>
                    <div className="text-sm text-muted-foreground">Annual Tuition</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold text-foreground">3-4 Years</div>
                    <div className="text-sm text-muted-foreground">Program Duration</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold text-foreground">High</div>
                    <div className="text-sm text-muted-foreground">ROI Potential</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="universities">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Top Universities in {data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="glass-card border-border hover:bg-white/10 hover:scale-105 transition-all cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
                            {data.flag}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm mb-1">University {i}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <span>4.{5 - i/2}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Top {i * 10}%</span>
                          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">Public</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500">
                    View All Universities <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{req}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Required for most programs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Why Study in {data.name}?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Award className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{benefit}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
