import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Bell,
  Share2,
  Home,
  BookOpen
} from "lucide-react";
import Script from "next/script";

interface PageProps {
  params: Promise<{ exam: string }>;
}

const examDeadlines: Record<string, {
  name: string;
  fullName: string;
  description: string;
  currentYear: string;
  deadlines: Array<{
    event: string;
    date: string;
    status: "upcoming" | "ongoing" | "completed" | "tentative";
    description: string;
    importance: "high" | "medium" | "low";
  }>;
  nextDeadline?: string;
  registrationLink?: string;
  officialWebsite: string;
}> = {
  "jee-main": {
    name: "JEE Main",
    fullName: "Joint Entrance Examination Main",
    description: "National level engineering entrance exam for admission to NITs, IIITs, and other engineering colleges.",
    currentYear: "2025",
    deadlines: [
      {
        event: "Registration Start",
        date: "November 2024",
        status: "completed",
        description: "Online registration for January session begins",
        importance: "high"
      },
      {
        event: "Registration End",
        date: "January 2025",
        status: "completed",
        description: "Last date to apply for January session",
        importance: "high"
      },
      {
        event: "Exam Date - Session 1",
        date: "January 2025",
        status: "completed",
        description: "First attempt - Computer-based test",
        importance: "high"
      },
      {
        event: "Result - Session 1",
        date: "February 2025",
        status: "completed",
        description: "Scorecard release for January session",
        importance: "medium"
      },
      {
        event: "Registration Start - Session 2",
        date: "February 2025",
        status: "completed",
        description: "Online registration for April session begins",
        importance: "high"
      },
      {
        event: "Registration End - Session 2",
        date: "March 2025",
        status: "completed",
        description: "Last date to apply for April session",
        importance: "high"
      },
      {
        event: "Exam Date - Session 2",
        date: "April 2025",
        status: "ongoing",
        description: "Second attempt - Computer-based test",
        importance: "high"
      },
      {
        event: "Result - Session 2",
        date: "May 2025",
        status: "upcoming",
        description: "Scorecard release for April session",
        importance: "medium"
      },
      {
        event: "JEE Advanced Registration",
        date: "May 2025",
        status: "upcoming",
        description: "Registration for JEE Advanced (for qualified candidates)",
        importance: "high"
      }
    ],
    nextDeadline: "April 2025 - Exam Date - Session 2",
    registrationLink: "https://jeemain.nta.nic.in",
    officialWebsite: "https://jeemain.nta.nic.in"
  },
  "cat": {
    name: "CAT",
    fullName: "Common Admission Test",
    description: "National level management aptitude test conducted by IIMs for admission to MBA/PGDM programs.",
    currentYear: "2025",
    deadlines: [
      {
        event: "Registration Start",
        date: "August 2025",
        status: "upcoming",
        description: "Online registration begins",
        importance: "high"
      },
      {
        event: "Registration End",
        date: "September 2025",
        status: "upcoming",
        description: "Last date to apply",
        importance: "high"
      },
      {
        event: "Admit Card Release",
        date: "October 2025",
        status: "upcoming",
        description: "Download hall tickets",
        importance: "medium"
      },
      {
        event: "Exam Date",
        date: "November 2025",
        status: "upcoming",
        description: "Computer-based test",
        importance: "high"
      },
      {
        event: "Result Declaration",
        date: "January 2026",
        status: "upcoming",
        description: "Scorecard release",
        importance: "medium"
      }
    ],
    nextDeadline: "August 2025 - Registration Start",
    registrationLink: "https://iimcat.ac.in",
    officialWebsite: "https://iimcat.ac.in"
  },
  "neet": {
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    description: "Single national level medical entrance exam for admission to MBBS, BDS, and other medical courses.",
    currentYear: "2025",
    deadlines: [
      {
        event: "Registration Start",
        date: "December 2024",
        status: "completed",
        description: "Online registration begins",
        importance: "high"
      },
      {
        event: "Registration End",
        date: "March 2025",
        status: "completed",
        description: "Last date to apply",
        importance: "high"
      },
      {
        event: "Admit Card Release",
        date: "April 2025",
        status: "upcoming",
        description: "Download hall tickets",
        importance: "medium"
      },
      {
        event: "Exam Date",
        date: "May 2025",
        status: "upcoming",
        description: "Pen and paper test",
        importance: "high"
      },
      {
        event: "Result Declaration",
        date: "June 2025",
        status: "upcoming",
        description: "Scorecard release",
        importance: "medium"
      }
    ],
    nextDeadline: "April 2025 - Admit Card Release",
    registrationLink: "https://neet.nta.nic.in",
    officialWebsite: "https://neet.nta.nic.in"
  },
  "ielts": {
    name: "IELTS",
    fullName: "International English Language Testing System",
    description: "World's most popular English language proficiency test for study, work, and migration.",
    currentYear: "2025",
    deadlines: [
      {
        event: "Test Dates Available",
        date: "Throughout 2025",
        status: "ongoing",
        description: "Multiple dates available throughout the year",
        importance: "medium"
      },
      {
        event: "Registration",
        date: "Anytime",
        status: "ongoing",
        description: "Book up to 48 hours in advance",
        importance: "medium"
      },
      {
        event: "Results",
        date: "13 days after test",
        status: "ongoing",
        description: "Paper-based: 13 days, Computer: 3-5 days",
        importance: "low"
      }
    ],
    nextDeadline: "Ongoing - Registration Open",
    registrationLink: "https://www.ielts.org",
    officialWebsite: "https://www.ielts.org"
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params;
  const examKey = exam.toLowerCase().replace(/ /g, "-");
  const data = examDeadlines[examKey];

  if (!data) {
    return {
      title: "Exam Deadlines Not Found",
    };
  }

  return {
    title: `${data.name} Deadlines ${data.currentYear} | Key Dates & Schedule`,
    description: `Stay updated with ${data.fullName} ${data.currentYear} deadlines, registration dates, exam schedule, and important dates. Never miss a deadline.`,
  };
}

export default async function ExamDeadlinesPage({ params }: PageProps) {
  const { exam } = await params;
  const examKey = exam.toLowerCase().replace(/ /g, "-");
  const data = examDeadlines[examKey];

  if (!data) {
    notFound();
  }

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800 border-blue-200",
    ongoing: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
    tentative: "bg-yellow-100 text-yellow-800 border-yellow-200"
  };

  const statusIcons = {
    upcoming: <Clock className="w-4 h-4" />,
    ongoing: <Bell className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
    tentative: <AlertCircle className="w-4 h-4" />
  };

  const importanceColors = {
    high: "border-l-red-500",
    medium: "border-l-yellow-500",
    low: "border-l-blue-500"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Script
        id="exam-deadlines-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `${data.name} Deadlines ${data.currentYear}`,
            description: data.description,
            startDate: data.deadlines[0]?.date,
            location: {
              "@type": "Place",
              name: "India"
            }
          })
        }}
      />

      
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30">
              {data.currentYear}
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              Deadlines
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {data.name} Deadlines {data.currentYear}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {data.description}
          </p>
          {data.nextDeadline && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Next Deadline: {data.nextDeadline}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="flex flex-wrap gap-4 mb-8">
          {data.registrationLink && (
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href={data.registrationLink} target="_blank" rel="noopener noreferrer">
                Register Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href={data.officialWebsite} target="_blank" rel="noopener noreferrer">
              Official Website <BookOpen className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <button>
              Share <Share2 className="w-4 h-4 ml-2" />
            </button>
          </Button>
        </div>

        
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Important Dates & Deadlines</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Upcoming
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Ongoing
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                Completed
              </Badge>
            </div>
          </div>

          {data.deadlines.map((deadline, index) => (
            <Card
              key={index}
              className={`border-l-4 ${importanceColors[deadline.importance]} hover:shadow-lg transition-shadow`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={statusColors[deadline.status]}>
                        <span className="flex items-center gap-1">
                          {statusIcons[deadline.status]}
                          {deadline.status.charAt(0).toUpperCase() + deadline.status.slice(1)}
                        </span>
                      </Badge>
                      <Badge variant="outline">
                        {deadline.importance === "high" && "Important"}
                        {deadline.importance === "medium" && "Moderate"}
                        {deadline.importance === "low" && "Standard"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{deadline.event}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{deadline.date}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{deadline.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        
        <Card className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl">Tips for {data.name} Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Set reminders for all important dates at least 2 weeks in advance</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Complete registration early to avoid last-minute technical issues</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Keep all required documents ready before registration starts</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Regularly check the official website for any updates or changes</p>
            </div>
          </CardContent>
        </Card>

        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Related Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                  <div>
                    <h4 className="font-semibold">Exam Pattern</h4>
                    <p className="text-sm text-gray-600">View complete exam pattern and syllabus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-orange-600" />
                  <div>
                    <h4 className="font-semibold">Preparation Timeline</h4>
                    <p className="text-sm text-gray-600">Get a structured preparation schedule</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
