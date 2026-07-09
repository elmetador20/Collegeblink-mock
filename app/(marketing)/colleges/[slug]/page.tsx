import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Building2,
  Star,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Landmark,
  Laptop,
  Utensils,
  Bus,
  Wifi,
  Heart,
  Share2,
  CheckCircle,
  ArrowLeft,
  GraduationCap,
  IndianRupee,
  BarChart3,
  Calendar,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Trophy,
  Building,
  Globe,
} from "lucide-react";
import { formatIndianNumber, getCollegeTypeColor } from "@/lib/utils";
import * as backend from "@/lib/backend";
import { CollegeDetailActions, CollegeStickyActions } from "@/components/college/CollegeDetailActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = await backend.getCollegeBySlug(slug);
  if (!college) return { title: "College Not Found | CollegeBlink" };
  return {
    title: `${college.name} | College Details & Admission Info`,
    description: `Explore ${college.name} in ${college.city}, ${college.state || college.country}. View courses, fees, cutoffs, placements, reviews and more on CollegeBlink.`,
  };
}

async function getCollege(slug: string) {
  const college = await backend.getCollegeBySlug(slug);
  if (!college) notFound();
  return college;
}

const FACILITIES = [
  { icon: BookOpen, label: "Library", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Laptop, label: "Labs", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Landmark, label: "Hostel", color: "text-teal-500", bg: "bg-teal-500/10" },
  { icon: Award, label: "Sports", color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: Wifi, label: "WiFi", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { icon: Utensils, label: "Cafeteria", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Building2, label: "Medical", color: "text-red-500", bg: "bg-red-500/10" },
  { icon: Bus, label: "Transport", color: "text-green-500", bg: "bg-green-500/10" },
];

const TAB_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses" },
  { id: "admissions", label: "Admissions" },
  { id: "placements", label: "Placements" },
  { id: "reviews", label: "Reviews" },
];

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollege(slug);

  const avgRating =
    college.reviews.length > 0
      ? (college.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / college.reviews.length).toFixed(1)
      : "N/A";

  const isInternational = !!(college.country && college.country !== "India");

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-accent/6 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[130px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] dark:opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 pt-16">
        <div className="container mx-auto max-w-6xl px-4 pt-6 pb-4">
          <Link
            href={isInternational ? "/study-abroad" : "/colleges"}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to {isInternational ? "Study Abroad" : "Colleges"}
          </Link>
        </div>

        <div className="container mx-auto max-w-6xl px-4 pb-0">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 dark:border-white/8 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-2xl shadow-2xl shadow-black/10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-teal-500/8 blur-[80px] pointer-events-none" />

            <div className="h-2 w-full bg-gradient-to-r from-accent via-violet-500 to-teal-400" />

            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-xl flex items-center justify-center overflow-hidden p-4">
                    {college.logo && !college.logo.includes("wikimedia") && !college.logo.includes("placeholder") ? (
                      <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                    ) : (
                      <Building className="h-14 w-14 text-indigo-500/90" />
                    )}
                  </div>
                  {college.nirfRank && (
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg px-2 py-1 shadow-lg">
                      <span className="text-[10px] font-black text-white leading-none block">
                        {isInternational ? "GLOBAL" : "NIRF"}
                      </span>
                      <span className="text-sm font-black text-white leading-none">#{college.nirfRank}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-accent/15 text-accent border-accent/30 text-xs font-semibold">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {isInternational ? "Global Recognition" : "85% Match for you"}
                    </Badge>
                    <Badge className={getCollegeTypeColor(college.type)} variant="outline">
                      {college.type}
                    </Badge>
                    {isInternational && (
                      <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
                        International
                      </Badge>
                    )}
                    {Array.isArray(college.accreditation) && college.accreditation.map((acc: any) => (
                      <Badge key={acc} className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {acc}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-2xl md:text-4xl font-black text-foreground tracking-tight mb-2">{college.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      {isInternational ? <Globe className="h-4 w-4 text-indigo-500" /> : <MapPin className="h-4 w-4 text-accent" />}
                      {college.city}, {isInternational ? college.country : college.state}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground">{avgRating}</span>
                      <span>({college.reviews?.length || 0} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-teal-500" />
                      {(college as any)._count?.savedBy || 0}+ interested
                    </span>
                  </div>
                </div>

                <CollegeDetailActions college={college} isInternational={isInternational} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/40">
                {[
                  {
                    label: isInternational ? "Avg Salary" : "Avg Package",
                    value: college.avgPackage ? (isInternational ? `${(college.avgPackage / 100).toFixed(1)} Cr` : formatIndianNumber(college.avgPackage * 100000)) : "N/A",
                    sub: isInternational ? "Global Placements" : "↑ Top 10% in India",
                    icon: TrendingUp,
                    color: "text-green-500",
                    subColor: "text-green-500",
                  },
                  {
                    label: "Highest Package",
                    value: college.highestPackage ? (isInternational ? `${(college.highestPackage / 100).toFixed(1)} Cr` : formatIndianNumber(college.highestPackage * 100000)) : "N/A",
                    sub: "Industry Leader",
                    icon: Trophy,
                    color: "text-amber-500",
                    subColor: "text-amber-500",
                  },
                  {
                    label: isInternational ? "Annual Fees" : "Annual Fees",
                    value: college.tuitionFees ? (isInternational ? `${college.tuitionFees >= 100 ? (college.tuitionFees / 100).toFixed(1) + " Cr" : college.tuitionFees + " L"}` : `₹${college.tuitionFees}L`) : "N/A",
                    sub: "Per annum",
                    icon: IndianRupee,
                    color: "text-blue-500",
                    subColor: "text-muted-foreground",
                  },
                  {
                    label: "Students Saved",
                    value: `${(college as any)._count?.savedBy || 0}+`,
                    sub: "Want to apply",
                    icon: Heart,
                    color: "text-red-500",
                    subColor: "text-muted-foreground",
                  },
                ].map(({ label, value, sub, icon: Icon, color, subColor }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-background/40 border border-border/30">
                    <div className={`w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center shrink-0 ${color.replace('text-', 'bg-').replace('-500', '-500/10')}`}>
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground leading-none">{value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
                      <div className={`text-[10px] font-medium mt-0.5 ${subColor}`}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10 relative z-10">
        <div className="flex gap-1 bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-1.5 mb-8 overflow-x-auto scrollbar-hide">
          {TAB_ITEMS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all whitespace-nowrap"
            >
              {tab.label}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          <section id="overview" className="scroll-mt-28">
            <SectionHeading icon={Building} title="About the College" />
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 mt-4">
              <p className="text-foreground/75 leading-relaxed">{college.description}</p>
            </div>

            <h3 className="text-lg font-bold text-foreground mt-8 mb-4">Campus Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FACILITIES.map(({ icon: Icon, label, color, bg }) => (
                <div
                  key={label}
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-card/40 border border-border/40 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{label}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-foreground mt-8 mb-4">Accepted Entrance Exams</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(college.entranceExams) && college.entranceExams.map((exam: any) => (
                <div
                  key={exam}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-sm font-medium"
                >
                  <GraduationCap className="h-4 w-4" />
                  {exam}
                </div>
              ))}
            </div>
          </section>

          <Divider />

          <section id="courses" className="scroll-mt-28">
            <SectionHeading icon={BookOpen} title="Courses Offered" />
            <div className="mt-4 bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border/40">
                      <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Name</th>
                      <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Degree</th>
                      <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</th>
                      <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Fees/Year</th>
                      <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.courses?.map((relation: any) => (
                      <tr
                        key={`${relation.collegeId}-${relation.courseId}`}
                        className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-4 px-5">
                          <span className="font-semibold text-sm text-foreground">{relation.course?.name}</span>
                        </td>
                        <td className="py-4 px-5">
                          <Badge variant="outline" className="text-xs border-border/50">{relation.course?.degree}</Badge>
                        </td>
                        <td className="py-4 px-5 text-sm text-muted-foreground">{relation.course?.duration} yrs</td>
                        <td className="py-4 px-5 text-sm font-medium text-foreground">₹{relation.fees}L</td>
                        <td className="py-4 px-5 text-sm text-muted-foreground">{relation.totalSeats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <Divider />

          <section id="admissions" className="scroll-mt-28">
            <SectionHeading icon={Calendar} title="Admissions & Cutoffs" />
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Eligibility Criteria
                </h4>
                <p className="text-muted-foreground text-sm">
                  Please visit the official college website for detailed eligibility information,
                  including minimum percentages, age limits, and category-wise requirements.
                </p>
                <a
                  href={college.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-accent text-sm font-medium hover:underline"
                >
                  View Official Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-violet-500" />
                  Cutoff History
                </h4>
                {college.cutoffs?.length > 0 ? (
                  <div className="space-y-2">
                    {college.cutoffs.slice(0, 5).map((cutoff: any) => (
                      <div
                        key={cutoff.id}
                        className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <span className="text-sm font-semibold text-foreground">{cutoff.examType} {cutoff.year}</span>
                          <span className="text-xs text-muted-foreground ml-2">({cutoff.category})</span>
                        </div>
                        <Badge variant="outline" className="text-xs border-violet-500/30 text-violet-600 dark:text-violet-400">
                          {cutoff.openingRank} – {cutoff.closingRank}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No cutoff data available for this college.</p>
                )}
              </div>
            </div>
          </section>

          <Divider />

          <section id="placements" className="scroll-mt-28">
            <SectionHeading icon={TrendingUp} title="Placement Statistics" />
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {[
                {
                  icon: TrendingUp,
                  label: `Average Package (${college.placements?.[0]?.year || "N/A"})`,
                  value: college.placements?.[0]?.avgPackage
                    ? formatIndianNumber(college.placements[0].avgPackage * 100000)
                    : (college.avgPackage ? (isInternational ? `${(college.avgPackage / 100).toFixed(1)} Cr` : formatIndianNumber(college.avgPackage * 100000)) : "N/A"),
                  gradient: "from-green-500/20 to-teal-500/10",
                  border: "border-green-500/20",
                  iconColor: "text-green-500",
                  iconBg: "bg-green-500/10",
                },
                {
                  icon: Trophy,
                  label: `Highest Package (${college.placements?.[0]?.year || "N/A"})`,
                  value: college.placements?.[0]?.highestPackage
                    ? formatIndianNumber(college.placements[0].highestPackage * 100000)
                    : (college.highestPackage ? (isInternational ? `${(college.highestPackage / 100).toFixed(1)} Cr` : formatIndianNumber(college.highestPackage * 100000)) : "N/A"),
                  gradient: "from-amber-500/20 to-orange-500/10",
                  border: "border-amber-500/20",
                  iconColor: "text-amber-500",
                  iconBg: "bg-amber-500/10",
                },
                {
                  icon: Users,
                  label: `Placement Rate (${college.placements?.[0]?.year || "N/A"})`,
                  value: college.placements?.[0]?.placementRate
                    ? `${college.placements[0].placementRate}%`
                    : (college.placementRate ? `${college.placementRate}%` : "N/A"),
                  gradient: "from-blue-500/20 to-violet-500/10",
                  border: "border-blue-500/20",
                  iconColor: "text-blue-500",
                  iconBg: "bg-blue-500/10",
                },
              ].map(({ icon: Icon, label, value, gradient, border, iconColor, iconBg }) => (
                <div
                  key={label}
                  className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${gradient} ${border} backdrop-blur-sm p-6`}
                >
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <div className="text-3xl font-black text-foreground">{value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>

            {college.recruiters?.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-foreground mt-8 mb-4">Top Recruiters</h3>
                <div className="flex flex-wrap gap-2">
                  {college.recruiters.map((recruiter: any) => (
                    <div
                      key={recruiter.id}
                      className="px-4 py-2 rounded-full bg-card/60 border border-border/50 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all cursor-default"
                    >
                      {recruiter.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          <Divider />

          <section id="reviews" className="scroll-mt-28">
            <SectionHeading icon={Star} title="Student Reviews" />
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <div className="text-7xl font-black text-foreground mb-2">{avgRating}</div>
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(Number(avgRating))
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/25"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {(college as any)._count?.reviews || 0} student reviews
                </p>
                <div className="mt-4 w-full space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = college.reviews?.filter((r: any) => Math.round(r.rating) === stars).length || 0;
                    const totalReviews = college.reviews?.length || 0;
                    const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-4">{stars}</span>
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-5">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                {college.reviews?.length > 0 ? (
                  college.reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-5 hover:border-border/60 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-violet-500/30 flex items-center justify-center text-sm font-bold text-foreground">
                            {review.user?.name?.[0] || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{review.user?.name || "Anonymous Student"}</p>
                            <p className="text-xs text-muted-foreground">{review.batch} · {review.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{review.rating}</span>
                        </div>
                      </div>
                      <h5 className="font-semibold text-sm text-foreground mb-1.5">{review.title}</h5>
                      <p className="text-sm text-foreground/65 leading-relaxed">{review.body}</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                    <Star className="h-10 w-10 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground mb-5">No reviews yet. Be the first!</p>
                    <Button className="rounded-xl bg-gradient-to-r from-accent to-violet-500 text-white">
                      Write a Review
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border/40 bg-background/80 backdrop-blur-xl z-30 py-4 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-foreground">{college.name}</p>
            <p className="text-xs text-muted-foreground">{college.city}, {isInternational ? college.country : college.state}</p>
          </div>
          <CollegeStickyActions college={college} isInternational={isInternational} />
        </div>
      </div>
    </div>
  );
}


function SectionHeading({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <h2 className="text-xl font-black text-foreground">{title}</h2>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />;
}
