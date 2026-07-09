"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Phone, 
  Download, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Clock, 
  GraduationCap,
  Building,
  ArrowLeft,
  Share2,
  Heart,
  Mail,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { institutes, Institute } from "@/lib/data/institutes";
import { notFound } from "next/navigation";

interface InstituteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function InstituteDetailPage({ params }: InstituteDetailPageProps) {
  const unwrappedParams = React.use(params);
  const institute = institutes.find((inst) => inst.slug === unwrappedParams.slug);

  if (!institute) {
    notFound();
  }

  const handleDownloadBrochure = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
    toast.success("Please fill the form to download the brochure", {
      description: "Our team will send it to your email instantly."
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[130px]" />
      </div>

      <div className="relative z-10 pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto max-w-6xl px-4 pt-6 pb-4">
          <Link
            href="/institutes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Institutes
          </Link>
        </div>

        {/* Header Section */}
        <div className="container mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="h-2 w-full bg-gradient-to-r from-primary via-amber-500 to-orange-500" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                  <div className="w-32 h-32 rounded-3xl bg-white border border-border shadow-xl flex items-center justify-center p-4">
                    <img src={institute.logo} alt={institute.name} className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">Verified Institute</Badge>
                    <Badge variant="outline">{institute.type}</Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enrollment Open
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                    {institute.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {institute.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-foreground text-base">{institute.rating}</span>
                      <span>({institute.reviewCount} Reviews)</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      8.5k Students Trained
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <Button 
                    className="w-full md:w-56 rounded-2xl bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}
                  >
                    Request a Callback
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full md:w-56 rounded-2xl h-14 text-lg font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all active:scale-95"
                    onClick={handleDownloadBrochure}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
                {[
                  { label: "Fees Structure", value: institute.totalFees, icon: GraduationCap, color: "text-blue-500" },
                  { label: "Success Rate", value: "92%", icon: Star, color: "text-amber-500" },
                  { label: "Course Duration", value: "3-12 Months", icon: Clock, color: "text-emerald-500" },
                  { label: "Training Mode", value: institute.type, icon: Building, color: "text-purple-500" },
                ].map((stat, i) => (
                  <div key={i} className="bg-background/40 rounded-2xl p-4 border border-border">
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Courses Offered</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {institute.courses.map((course, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{course}</h4>
                        <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Professional training with placement assistance and real-world projects.</p>
                      <div className="mt-4 flex items-center gap-4 text-xs font-bold text-primary uppercase">
                        <span>Details</span>
                        <span>•</span>
                        <span>Syllabus</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Centers</h2>
                </div>
                <div className="bg-card border border-border rounded-[2rem] p-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {institute.centers.map((center, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Building className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{center}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Visit our {center} branch for a free demo class and counseling session.</p>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-primary text-xs font-bold mt-2"
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(institute.name + " " + center)}`, "_blank")}
                          >
                            VIEW ON MAP
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4">Interested in {institute.name}?</h3>
                  <p className="text-indigo-100 mb-8 leading-relaxed">Get detailed information about fees, intake dates, and special scholarship offers.</p>
                  <Button 
                    className="w-full rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 h-14 text-lg font-bold transition-all"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}
                  >
                    Contact Institute
                  </Button>
                  <p className="text-center text-[10px] text-indigo-200/60 mt-4 uppercase tracking-widest font-bold">Safe & Verified</p>
                </div>

                <div className="mt-8 bg-card border border-border rounded-[2rem] p-8">
                  <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "Ask a Question" },
                      { icon: Share2, label: "Share with Friends" },
                      { icon: Heart, label: "Add to Shortlist" },
                      { icon: ExternalLink, label: "Official Website" },
                    ].map((item, i) => (
                      <button key={i} className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-muted transition-all text-sm font-medium text-foreground">
                        <item.icon className="h-5 w-5 text-primary" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom bar for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-50">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 rounded-xl h-12 font-bold border-2 border-primary text-primary"
            onClick={handleDownloadBrochure}
          >
            Brochure
          </Button>
          <Button 
            className="flex-[2] rounded-xl h-12 font-bold bg-primary text-white"
            onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
