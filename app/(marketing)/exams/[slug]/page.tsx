import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Building2,
  Star
} from "lucide-react";
import * as backend from "@/lib/backend";
import Script from "next/script";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const examData: Record<string, { 
  name: string; 
  fullName: string;
  description: string;
  overview: string;
  keyDates: { event: string; date: string; description: string }[];
  eligibility: string[];
  pattern: { section: string; questions: number | string; duration: string; marks: string }[];
  colleges: number;
  duration: string;
  mode: string;
  frequency: string;
  officialWebsite: string;
}> = {
  "cat": {
    name: "CAT",
    fullName: "Common Admission Test",
    description: "CAT is a national level management aptitude test conducted by IIMs for admission to MBA/PGDM programs.",
    overview: "The Common Admission Test (CAT) is a computer-based test conducted by the Indian Institutes of Management (IIMs) for admission to various management programs including MBA, PGDM, and Fellow programs. It is one of the most competitive entrance exams in India, with over 2 lakh aspirants appearing annually.",
    keyDates: [
      { event: "Registration Start", date: "August", description: "Online registration begins" },
      { event: "Registration End", date: "September", description: "Last date to apply" },
      { event: "Admit Card Release", date: "October", description: "Download hall tickets" },
      { event: "Exam Date", date: "November", description: "Computer-based test" },
      { event: "Result Declaration", date: "January", description: "Scorecard release" },
    ],
    eligibility: [
      "Bachelor's degree with minimum 50% marks (45% for SC/ST/PwD)",
      "Final year students can also apply",
      "No age limit",
      "Indian citizens and foreign nationals can apply",
    ],
    pattern: [
      { section: "Verbal Ability & Reading Comprehension", questions: 24, duration: "40 min", marks: "72" },
      { section: "Data Interpretation & Logical Reasoning", questions: 20, duration: "40 min", marks: "60" },
      { section: "Quantitative Aptitude", questions: 22, duration: "40 min", marks: "66" },
    ],
    colleges: 20,
    duration: "2 hours",
    mode: "Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://iimcat.ac.in"
  },
  "ielts": {
    name: "IELTS",
    fullName: "International English Language Testing System",
    description: "IELTS is the world's most popular English language proficiency test for study, work, and migration.",
    overview: "The International English Language Testing System (IELTS) assesses the English language proficiency of non-native English speakers. It is accepted by over 10,000 organizations worldwide, including universities, employers, immigration authorities, and professional bodies.",
    keyDates: [
      { event: "Test Dates", date: "Throughout the year", description: "Multiple dates available" },
      { event: "Registration", date: "Anytime", description: "Book up to 48 hours in advance" },
      { event: "Results", date: "13 days after test", description: "Paper-based: 13 days, Computer: 3-5 days" },
    ],
    eligibility: [
      "Minimum 16 years of age",
      "Valid passport required",
      "No minimum educational qualification",
    ],
    pattern: [
      { section: "Listening", questions: 40, duration: "30 min", marks: "Band 0-9" },
      { section: "Reading", questions: 40, duration: "60 min", marks: "Band 0-9" },
      { section: "Writing", questions: 2, duration: "60 min", marks: "Band 0-9" },
      { section: "Speaking", questions: 3, duration: "11-14 min", marks: "Band 0-9" },
    ],
    colleges: 150,
    duration: "2 hours 45 minutes",
    mode: "Computer-based & Paper-based",
    frequency: "Multiple times per year",
    officialWebsite: "https://www.ielts.org"
  },
  "jee-main": {
    name: "JEE Main",
    fullName: "Joint Entrance Examination Main",
    description: "JEE Main is a national level engineering entrance exam for admission to NITs, IIITs, and other engineering colleges.",
    overview: "Joint Entrance Examination (JEE) Main is conducted by the National Testing Agency (NTA) for admission to undergraduate engineering programs at NITs, IIITs, and other participating institutions. It also serves as the qualifying exam for JEE Advanced.",
    keyDates: [
      { event: "Registration Start", date: "November/December", description: "Online registration begins" },
      { event: "Registration End", date: "January", description: "Last date to apply" },
      { event: "Exam Date 1", date: "January", description: "First attempt" },
      { event: "Exam Date 2", date: "April", description: "Second attempt" },
      { event: "Result", date: "February/May", description: "Scorecard release" },
    ],
    eligibility: [
      "10+2 with Physics, Chemistry, and Mathematics",
      "Minimum 75% aggregate marks (65% for SC/ST)",
      "No age limit",
      "Can appear for 3 consecutive years",
    ],
    pattern: [
      { section: "Physics", questions: 30, duration: "60 min", marks: "100" },
      { section: "Chemistry", questions: 30, duration: "60 min", marks: "100" },
      { section: "Mathematics", questions: 30, duration: "60 min", marks: "100" },
    ],
    colleges: 31,
    duration: "3 hours",
    mode: "Computer-based",
    frequency: "Twice a year",
    officialWebsite: "https://jeemain.nta.nic.in"
  },
  "neet": {
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    description: "NEET is the single national level medical entrance exam for admission to MBBS, BDS, and other medical courses.",
    overview: "National Eligibility cum Entrance Test (NEET) is conducted by the National Testing Agency (NTA) for admission to undergraduate medical courses (MBBS, BDS, AYUSH, Veterinary) in all medical institutions across India. It is the only medical entrance exam in the country.",
    keyDates: [
      { event: "Registration Start", date: "December/January", description: "Online registration begins" },
      { event: "Registration End", date: "March", description: "Last date to apply" },
      { event: "Admit Card", date: "April", description: "Download hall tickets" },
      { event: "Exam Date", date: "May", description: "Pen and paper test" },
      { event: "Result", date: "June", description: "Scorecard release" },
    ],
    eligibility: [
      "10+2 with Physics, Chemistry, and Biology/Biotechnology",
      "Minimum 50% marks in PCB (40% for SC/ST/OBC)",
      "17 years minimum age as of December 31",
      "Indian nationals, NRIs, OCIs, and foreign nationals",
    ],
    pattern: [
      { section: "Physics", questions: 50, duration: "3h 20m total", marks: "200" },
      { section: "Chemistry", questions: 50, duration: "3h 20m total", marks: "200" },
      { section: "Biology", questions: 100, duration: "3h 20m total", marks: "400" },
    ],
    colleges: 15,
    duration: "3 hours 20 minutes",
    mode: "Pen and paper",
    frequency: "Once a year",
    officialWebsite: "https://neet.nta.nic.in"
  },
  "xat": {
    name: "XAT",
    fullName: "Xavier Aptitude Test",
    description: "XAT is a national level management entrance exam conducted by XLRI Jamshedpur for admission to MBA programs.",
    overview: "Xavier Aptitude Test (XAT) is conducted by Xavier School of Management (XLRI), Jamshedpur on behalf of XAMI. It is used for admission to MBA/PGDM programs at XLRI and over 150 other B-schools across India.",
    keyDates: [
      { event: "Registration Start", date: "August", description: "Online registration begins" },
      { event: "Registration End", date: "November", description: "Last date to apply" },
      { event: "Admit Card", date: "December", description: "Download hall tickets" },
      { event: "Exam Date", date: "January", description: "Computer-based test" },
      { event: "Result", date: "January", description: "Scorecard release" },
    ],
    eligibility: [
      "Bachelor's degree with minimum 50% marks",
      "Final year students can also apply",
      "No age limit",
    ],
    pattern: [
      { section: "Verbal & Logical Ability", questions: 26, duration: "170 min total", marks: "78" },
      { section: "Decision Making", questions: 21, duration: "170 min total", marks: "63" },
      { section: "Quantitative Aptitude & Data Interpretation", questions: 28, duration: "170 min total", marks: "72" },
      { section: "General Knowledge", questions: 25, duration: "170 min total", marks: "25" },
    ],
    colleges: 150,
    duration: "3 hours",
    mode: "Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://xatonline.in"
  },
  "clat": {
    name: "CLAT",
    fullName: "Common Law Admission Test",
    description: "CLAT is a national level law entrance exam for admission to National Law Universities and other law colleges.",
    overview: "Common Law Admission Test (CLAT) is conducted by the Consortium of National Law Universities for admission to undergraduate (BA LLB, BBA LLB) and postgraduate (LLM) law programs at 22 National Law Universities and other participating institutions.",
    keyDates: [
      { event: "Registration Start", date: "July/August", description: "Online registration begins" },
      { event: "Registration End", date: "October", description: "Last date to apply" },
      { event: "Admit Card", date: "November", description: "Download hall tickets" },
      { event: "Exam Date", date: "December", description: "Offline/Online test" },
      { event: "Result", date: "December", description: "Scorecard release" },
    ],
    eligibility: [
      "10+2 with minimum 45% marks (40% for SC/ST)",
      "No age limit for UG programs",
      "LLB degree with minimum 50% for PG programs",
    ],
    pattern: [
      { section: "English Language", questions: 28-32, duration: "2 hours total", marks: "28-32" },
      { section: "Current Affairs", questions: 28-32, duration: "2 hours total", marks: "28-32" },
      { section: "Legal Reasoning", questions: 28-32, duration: "2 hours total", marks: "28-32" },
      { section: "Logical Reasoning", questions: 22-26, duration: "2 hours total", marks: "22-26" },
      { section: "Quantitative Techniques", questions: 10-14, duration: "2 hours total", marks: "10-14" },
    ],
    colleges: 22,
    duration: "2 hours",
    mode: "Pen and paper / Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://consortiumofnlus.ac.in"
  },
  "mat": {
    name: "MAT",
    fullName: "Management Aptitude Test",
    description: "MAT is a national level management entrance exam conducted by AIMA for admission to MBA programs.",
    overview: "Management Aptitude Test (MAT) is conducted by the All India Management Association (AIMA) for admission to MBA and allied programs at over 600 B-schools across India. It is conducted four times a year in February, May, September, and December.",
    keyDates: [
      { event: "Registration", date: "Ongoing", description: "Multiple sessions throughout year" },
      { event: "Exam Dates", date: "Feb, May, Sep, Dec", description: "Four sessions annually" },
      { event: "Results", date: "3-4 weeks after exam", description: "Scorecard release" },
    ],
    eligibility: [
      "Bachelor's degree in any discipline",
      "Final year students can also apply",
      "No age limit",
    ],
    pattern: [
      { section: "Language Comprehension", questions: 40, duration: "150 min total", marks: "40" },
      { section: "Mathematical Skills", questions: 40, duration: "150 min total", marks: "40" },
      { section: "Data Analysis", questions: 40, duration: "150 min total", marks: "40" },
      { section: "Intelligence & Critical Reasoning", questions: 40, duration: "150 min total", marks: "40" },
    ],
    colleges: 600,
    duration: "2 hours 30 minutes",
    mode: "Computer-based & Paper-based",
    frequency: "Four times a year",
    officialWebsite: "https://mat.aima.in"
  },
  "gate": {
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    description: "GATE is a national level examination for admission to M.Tech and Ph.D programs and PSU recruitment.",
    overview: "Graduate Aptitude Test in Engineering (GATE) is conducted jointly by IISc Bangalore and seven IITs for admission to postgraduate programs in engineering and science at IITs, IISc, NITs, and other institutions. It is also used for recruitment in PSUs.",
    keyDates: [
      { event: "Registration Start", date: "August/September", description: "Online registration begins" },
      { event: "Registration End", date: "October", description: "Last date to apply" },
      { event: "Admit Card", date: "January", description: "Download hall tickets" },
      { event: "Exam Date", date: "February", description: "Computer-based test" },
      { event: "Result", date: "March", description: "Scorecard release" },
    ],
    eligibility: [
      "Bachelor's degree in Engineering/Technology (4 years)",
      "Master's degree in Science/Computer Applications",
      "No age limit",
      "Final year students can apply",
    ],
    pattern: [
      { section: "General Aptitude", questions: 15, duration: "3 hours total", marks: "15" },
      { section: "Engineering Mathematics", questions: 13, duration: "3 hours total", marks: "13" },
      { section: "Subject Specific", questions: 55, duration: "3 hours total", marks: "72" },
    ],
    colleges: 1000,
    duration: "3 hours",
    mode: "Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://gate.iitd.ac.in"
  },
  "duolingo": {
    name: "Duolingo",
    fullName: "Duolingo English Test",
    description: "Duolingo English Test is an online English proficiency test accepted by thousands of institutions worldwide.",
    overview: "The Duolingo English Test is a modern English proficiency assessment that can be taken online from anywhere. It's accepted by over 4,000 institutions worldwide including universities in the US, UK, Canada, and Australia. The test takes about 1 hour and results are available within 2 days.",
    keyDates: [
      { event: "Test Availability", date: "Anytime", description: "Take test 24/7 online" },
      { event: "Registration", date: "Instant", description: "Register and take test immediately" },
      { event: "Results", date: "2 days", description: "Results available within 48 hours" },
    ],
    eligibility: [
      "Minimum 13 years of age",
      "Valid government ID required",
      "No educational qualification required",
    ],
    pattern: [
      { section: "Adaptive Test", questions: "Adaptive", duration: "45 min", marks: "160 score" },
      { section: "Video Interview", questions: "2 prompts", duration: "10 min", marks: "Production score" },
      { section: "Writing Sample", questions: "1 prompt", duration: "5 min", marks: "Literacy score" },
    ],
    colleges: 4000,
    duration: "1 hour",
    mode: "Online",
    frequency: "Anytime",
    officialWebsite: "https://englishtest.duolingo.com"
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = examData[slug];

  if (!data) {
    return { title: "Exam Not Found | CollegeBlink" };
  }

  const title = `${data.fullName} (${data.name}) | Exam Details & Colleges`;
  const description = `Complete information about ${data.fullName} including exam pattern, eligibility, key dates, and top colleges accepting ${data.name} score.`;

  return {
    title,
    description,
    keywords: [data.name, data.fullName, "entrance exam", "exam pattern", "eligibility", "admission", "colleges"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://collegeblink.vercel.app/exams/${slug}`,
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

async function getExamData(slug: string) {
  const data = examData[slug];
  if (!data) notFound();
  return data;
}

async function getCollegesByExam(exam: string) {
  try {
    const data = await backend.getCollegesByExam(exam);
    return data?.colleges || [];
  } catch {
    return [];
  }
}

export default async function ExamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getExamData(slug);
  const colleges = await getCollegesByExam(data.name);

  return (
    <>
      <Script
        id="exam-page-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'exam_page_viewed', {
                exam_name: '${data.name}'
              });
            }
          `,
        }}
      />
      <div className="min-h-screen bg-background">
      
      <div className="relative h-[400px] bg-gradient-to-br from-indigo-900/50 via-background to-cyan-900/30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-primary-foreground">
                {data.name}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-gradient-to-r from-accent/20 to-accent/20 text-accent dark:text-accent border-accent/30">
                    <FileText className="h-3 w-3 mr-1" />
                    Entrance Exam
                  </Badge>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {data.colleges}+ Colleges
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{data.fullName}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {data.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {data.frequency}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="border border-border/50 text-foreground hover:bg-muted/10 bg-transparent hover:scale-105 transition-transform">
                  <Calendar className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition-transform" asChild>
                  <a href={data.officialWebsite} target="_blank" rel="noopener noreferrer">
                    Official Website <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-card border border-border/70 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Overview</TabsTrigger>
            <TabsTrigger value="dates" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Key Dates</TabsTrigger>
            <TabsTrigger value="eligibility" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Eligibility</TabsTrigger>
            <TabsTrigger value="pattern" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Exam Pattern</TabsTrigger>
            <TabsTrigger value="colleges" className="data-[state=active]:bg-white/10 data-[state=active]:rounded-lg transition-all">Colleges</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">About {data.fullName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 leading-relaxed mb-4">{data.overview}</p>
                <p className="text-foreground/70 leading-relaxed">{data.description}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass-card border-border/70">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{data.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-border/70">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{data.frequency}</div>
                  <div className="text-sm text-muted-foreground">Frequency</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-border/70">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{data.mode}</div>
                  <div className="text-sm text-muted-foreground">Mode</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dates">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Important Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.keyDates.map((date, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{date.event}</h4>
                          <Badge variant="outline" className="text-xs">{date.date}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{date.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.eligibility.map((criteria, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                      <p className="text-foreground text-sm leading-relaxed">{criteria}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pattern">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Exam Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/70">
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Section</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Questions</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Duration</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.pattern.map((section, i) => (
                        <tr key={i} className="border-b border-border/30 hover:bg-muted/5">
                          <td className="py-3 px-4 text-foreground font-medium">{section.section}</td>
                          <td className="py-3 px-4 text-foreground/70">{section.questions}</td>
                          <td className="py-3 px-4 text-foreground/70">{section.duration}</td>
                          <td className="py-3 px-4 text-foreground/70">{section.marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colleges">
            <Card className="glass-card border-border/70">
              <CardHeader>
                <CardTitle className="text-foreground">Top Colleges Accepting {data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {colleges.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No colleges found accepting this exam</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colleges.slice(0, 12).map((college: any) => (
                      <Link key={college.id} href={`/colleges/${college.slug}`}>
                        <div className="group glass-card p-5 rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-2xl">
                              🎓
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                          <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {college.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            {college.city}, {college.state}
                          </div>
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border-primary/20">
                            {college.type}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {colleges.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button className="bg-gradient-to-r from-orange-500 to-amber-500" asChild>
                      <Link href={`/colleges?exam=${data.name}`}>
                        View All Colleges <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}
