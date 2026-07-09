"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Clock,
    GraduationCap,
    BookOpen,
    CheckCircle,
    Building,
    Calendar,
    Layers,
    Share2,
    Heart,
    ExternalLink,
    ChevronRight,
    Sparkles,
    FileText,
    Award,
    TrendingUp,
    Laptop,
    Globe,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { COURSES_DATA, Course } from "@/lib/data/courses";
import { COURSES_METADATA } from "@/lib/data/courses-metadata";
import { notFound } from "next/navigation";


interface CourseDetailPageProps {
    params: Promise<{ slug: string }>;
}

// Derive a slug from course title if your data doesn't already have slugs
function toSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const LEVEL_COLOR: Record<Course["level"], string> = {
    Undergraduate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    Postgraduate: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    Doctoral: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const MODE_COLOR: Record<Course["mode"], string> = {
    "Full Time": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    "Part Time": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

// Quick-stat chips shown in the hero card
function getHighlights(course: Course) {
    return [
        { icon: Clock, label: "Duration", value: course.duration, color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: GraduationCap, label: "Level", value: course.level, color: "text-amber-500", bg: "bg-amber-500/10" },
        { icon: Layers, label: "Mode", value: course.mode, color: "text-violet-500", bg: "bg-violet-500/10" },
        { icon: Building, label: "Department", value: course.department, color: "text-teal-500", bg: "bg-teal-500/10" },
    ];
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
    const unwrappedParams = React.use(params);
    const course = COURSES_DATA.find(
        (c) => toSlug(c.title) === unwrappedParams.slug || (c as any).slug === unwrappedParams.slug
    );

    if (!course) notFound();

    const highlights = getHighlights(course);
    const metadata = COURSES_METADATA.find((m) => m.id === course.id);
    const syllabus = metadata?.syllabus ?? [];
    const careers = metadata?.careerOutcomes ?? [];

    const handleEnquire = () => {
        window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
    };

    const handleBrochure = () => {
        window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
        toast.success("Please fill the form to download the brochure", {
            description: "Our team will send it to your email instantly.",
        });
    };

    return (
        <div className="min-h-screen bg-background relative">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-indigo-500/5 blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[130px]" />
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
                {/* Breadcrumb */}
                <div className="container mx-auto max-w-6xl px-4 pt-6 pb-4">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Courses
                    </Link>
                </div>

                {/* Hero Card */}
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative overflow-hidden rounded-3xl border border-white/15 dark:border-white/8 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-2xl shadow-2xl shadow-black/10"
                    >
                        {/* Top accent bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

                        {/* Ambient blobs inside card */}
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />

                        <div className="relative p-8 md:p-10">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                {/* Icon block */}
                                <div className="shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center shadow-xl">
                                        <GraduationCap className="h-10 w-10 text-indigo-500" />
                                    </div>
                                </div>

                                {/* Title + meta */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 text-xs font-semibold">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            {course.department}
                                        </Badge>
                                        <Badge variant="outline" className={`text-xs font-semibold ${LEVEL_COLOR[course.level]}`}>
                                            {course.level}
                                        </Badge>
                                        <Badge variant="outline" className={`text-xs font-semibold ${MODE_COLOR[course.mode]}`}>
                                            {course.mode}
                                        </Badge>
                                        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs font-semibold">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Admissions Open
                                        </Badge>
                                    </div>

                                    <h1 className="text-2xl md:text-4xl font-black text-foreground tracking-tight mb-1">
                                        {course.fullTitle ?? course.title}
                                    </h1>
                                    <p className="text-base font-semibold text-indigo-500 mb-3">{course.title}</p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-indigo-500" />
                                            {course.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Building className="h-4 w-4 text-violet-500" />
                                            {course.department}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Layers className="h-4 w-4 text-amber-500" />
                                            {course.mode}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA buttons */}
                                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                                    <Button
                                        className="w-full md:w-52 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white h-13 text-base font-bold shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
                                        onClick={handleEnquire}
                                    >
                                        Apply Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full md:w-52 rounded-2xl h-13 text-base font-bold border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
                                        onClick={handleBrochure}
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Download Brochure
                                    </Button>
                                </div>
                            </div>

                            {/* Quick stats grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-border/40">
                                {highlights.map(({ icon: Icon, label, value, color, bg }) => (
                                    <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl bg-background/40 border border-border/30">
                                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                                            <Icon className={`h-5 w-5 ${color}`} />
                                        </div>
                                        <div>
                                            <div className="text-base font-black text-foreground leading-none">{value}</div>
                                            <div className="text-[11px] text-muted-foreground mt-1">{label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main content */}
                <div className="container mx-auto max-w-6xl px-4 py-10 relative z-10">
                    <div className="flex gap-8 items-start">
                        {/* Left: content sections */}
                        <div className="flex-1 min-w-0 space-y-12">

                            {/* About */}
                            <section>
                                <SectionHeading icon={BookOpen} title="About This Program" />
                                <div className="mt-4 bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
                                    <p className="text-foreground/75 leading-relaxed">{metadata?.description ?? "Not found"}</p>
                                </div>
                            </section>

                            <Divider />

                            {/* Eligibility */}
                            <section>
                                <SectionHeading icon={CheckCircle} title="Eligibility Criteria" />
                                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                                    {[
                                        course.eligibility,
                                        "Valid entrance exam score (if applicable)",
                                        "Age as per university / regulatory norms",
                                        "Category-wise relaxation applicable (SC / ST / OBC / PwD)",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-border/40">
                                            <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            </div>
                                            <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <Divider />

                            {/* Syllabus */}
                            <section>
                                <SectionHeading icon={Layers} title="Program Structure" />
                                <div className="mt-4 space-y-4">
                                    {syllabus.map(({ semester, topics }, i) => (
                                        <div key={i} className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
                                            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/30 bg-muted/20">
                                                <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                                                    <span className="text-xs font-black text-indigo-500">{i + 1}</span>
                                                </div>
                                                <span className="font-bold text-foreground text-sm">{semester}</span>
                                            </div>
                                            <div className="px-6 py-4 grid sm:grid-cols-2 gap-2">
                                                {topics.map((topic, j) => (
                                                    <div key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                                                        <ChevronRight className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                                                        {topic}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <Divider />

                            {/* Career outcomes */}
                            <section>
                                <SectionHeading icon={TrendingUp} title="Career Outcomes" />
                                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                                    {careers.map(({ role, package: pkg }, i) => (
                                        <div
                                            key={i}
                                            className="group flex items-center justify-between p-5 rounded-2xl bg-card/40 border border-border/40 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                                    <Award className="h-4.5 w-4.5 text-indigo-500" />
                                                </div>
                                                <span className="font-semibold text-sm text-foreground">{role}</span>
                                            </div>
                                            <Badge variant="outline" className="text-xs border-indigo-500/20 text-indigo-500 bg-indigo-500/5">
                                                {pkg}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="hidden lg:block w-72 shrink-0 sticky top-[calc(4.5rem+3rem)] self-start space-y-6">
                            {/* CTA card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-7 text-white shadow-2xl shadow-indigo-500/20">
                                <h3 className="text-xl font-bold mb-2">Interested in this program?</h3>
                                <p className="text-indigo-100/80 text-sm mb-6 leading-relaxed">
                                    Get personalised guidance on fees, eligibility, and scholarship opportunities.
                                </p>
                                <Button
                                    className="w-full rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 h-12 font-bold transition-all"
                                    onClick={handleEnquire}
                                >
                                    Get Free Counselling
                                </Button>
                                <p className="text-center text-[10px] text-indigo-200/50 mt-3 uppercase tracking-widest font-bold">
                                    Safe & Verified
                                </p>
                            </div>

                            {/* Quick info card */}
                            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-xl">
                                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Program At a Glance</h4>
                                <div className="space-y-3">
                                    {[
                                        { icon: GraduationCap, label: "Degree", value: course.title },
                                        { icon: Layers, label: "Level", value: course.level },
                                        { icon: Clock, label: "Duration", value: course.duration },
                                        { icon: Laptop, label: "Mode", value: course.mode },
                                        { icon: Building, label: "Department", value: course.department },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Icon className="h-3.5 w-3.5" />
                                                {label}
                                            </div>
                                            <span className="text-xs font-semibold text-foreground text-right max-w-[130px] truncate">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick links */}
                            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-xl">
                                <h4 className="font-bold text-foreground mb-3 text-sm">Quick Links</h4>
                                <div className="space-y-1">
                                    {[
                                        { icon: Globe, label: "View all Colleges offering this" },
                                        { icon: Share2, label: "Share with friends" },
                                        { icon: Heart, label: "Add to shortlist" },
                                        { icon: ExternalLink, label: "Official regulatory body" },
                                    ].map(({ icon: Icon, label }, i) => (
                                        <button
                                            key={i}
                                            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted transition-all text-sm font-medium text-foreground"
                                        >
                                            <Icon className="h-4 w-4 text-indigo-500" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {/* Mobile sticky bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-50">
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-12 font-bold border-2 border-indigo-500 text-indigo-500"
                        onClick={handleBrochure}
                    >
                        Brochure
                    </Button>
                    <Button
                        className="flex-[2] rounded-xl h-12 font-bold bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={handleEnquire}
                    >
                        Apply Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-indigo-500" />
            </div>
            <h2 className="text-xl font-black text-foreground">{title}</h2>
        </div>
    );
}

function Divider() {
    return <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />;
}