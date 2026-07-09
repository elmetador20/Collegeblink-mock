"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Award, MapPin, IndianRupee, Star, Swords, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const DELHI_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Delhi",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 2,
    avgPackage: 22.5,
    fees: 2.2,
    placementRate: 98,
    jeeAdvancedRank: 800,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Indian Institute of Management (IIM) Rohtak",
    city: "Rohtak",
    state: "Haryana",
    nirfRank: 15,
    avgPackage: 16.5,
    fees: 14.0,
    placementRate: 95,
    catPercentile: 94,
    type: "Government",
    stream: "MBA",
  },
  {
    name: "Delhi University - St. Stephen's College",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 8,
    avgPackage: 9.5,
    fees: 0.3,
    placementRate: 90,
    type: "Government",
    stream: "Arts & Science",
  },
  {
    name: "Delhi University - Hindu College",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 10,
    avgPackage: 8.8,
    fees: 0.3,
    placementRate: 88,
    type: "Government",
    stream: "Arts & Science",
  },
  {
    name: "Delhi University - SRCC",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 6,
    avgPackage: 12.5,
    fees: 0.3,
    placementRate: 92,
    type: "Government",
    stream: "Commerce",
  },
  {
    name: "Netaji Subhas University of Technology (NSUT)",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 50,
    avgPackage: 9.2,
    fees: 0.8,
    placementRate: 85,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Delhi Technological University (DTU)",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 35,
    avgPackage: 10.5,
    fees: 1.0,
    placementRate: 87,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Faculty of Management Studies (FMS) Delhi",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 25,
    avgPackage: 24.0,
    fees: 0.5,
    placementRate: 100,
    catPercentile: 98,
    type: "Government",
    stream: "MBA",
  },
  {
    name: "Indraprastha Institute of Information Technology (IIIT) Delhi",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 45,
    avgPackage: 11.2,
    fees: 1.5,
    placementRate: 89,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Lady Shri Ram College (LSR)",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 12,
    avgPackage: 8.5,
    fees: 0.3,
    placementRate: 86,
    type: "Government",
    stream: "Arts & Science",
  },
];

const ENGINEERING_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Delhi",
    nirfRank: 2,
    avgPackage: 22.5,
    fees: 2.2,
    placementRate: 98,
    jeeAdvancedRank: 800,
  },
  {
    name: "Netaji Subhas University of Technology (NSUT)",
    nirfRank: 50,
    avgPackage: 9.2,
    fees: 0.8,
    placementRate: 85,
    admission: "JEE Main",
  },
  {
    name: "Delhi Technological University (DTU)",
    nirfRank: 35,
    avgPackage: 10.5,
    fees: 1.0,
    placementRate: 87,
    admission: "JEE Main",
  },
  {
    name: "Indraprastha Institute of Information Technology (IIIT) Delhi",
    nirfRank: 45,
    avgPackage: 11.2,
    fees: 1.5,
    placementRate: 89,
    admission: "JEE Main",
  },
];

const DU_COLLEGES = [
  {
    name: "St. Stephen's College",
    nirfRank: 8,
    avgPackage: 9.5,
    fees: 0.3,
    placementRate: 90,
    stream: "Arts & Science",
  },
  {
    name: "Hindu College",
    nirfRank: 10,
    avgPackage: 8.8,
    fees: 0.3,
    placementRate: 88,
    stream: "Arts & Science",
  },
  {
    name: "SRCC",
    nirfRank: 6,
    avgPackage: 12.5,
    fees: 0.3,
    placementRate: 92,
    stream: "Commerce",
  },
  {
    name: "Lady Shri Ram College (LSR)",
    nirfRank: 12,
    avgPackage: 8.5,
    fees: 0.3,
    placementRate: 86,
    stream: "Arts & Science",
  },
];

export default function TopCollegesDelhiPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative overflow-hidden bg-gradient-to-b from-rose-950 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-rose-500/20 text-rose-300 border-rose-500/30">
              Capital of India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
              Top Colleges in Delhi 2026
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore the best educational institutions in India's capital. From IIT Delhi to Delhi University, find your perfect college in Delhi NCR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  <Swords className="h-5 w-5 mr-2" />
                  Compare Delhi Colleges
                </Button>
              </Link>
              <div onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}>
                <Button size="lg" variant="outline">
                  Get Personalized Matches
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="glass-card border-rose-500/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-10 w-10 text-rose-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">90+</div>
              <div className="text-sm text-muted-foreground">Colleges</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-orange-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">95%+</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-yellow-500/20">
            <CardContent className="p-6 text-center">
              <Star className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">Capital</div>
              <div className="text-sm text-muted-foreground">Opportunities</div>
            </CardContent>
          </Card>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Top Engineering Colleges in Delhi
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Delhi is home to IIT Delhi and several top engineering colleges. These institutions offer excellent placement opportunities in India's capital.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {ENGINEERING_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-gradient-to-r from-rose-500/20 to-orange-500/20 hover:border-rose-500/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index === 0 ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            {college.admission && (
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {college.admission}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} Lakhs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placement</div>
                        <div className="font-semibold text-accent">{college.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Top Delhi University Colleges
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Delhi University offers world-class education in arts, science, and commerce. These colleges have excellent placement records and alumni networks.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {DU_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-gradient-to-r from-purple-500/20 to-pink-500/20 hover:border-purple-500/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index < 2 ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/20">
                              {college.stream}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} Lakhs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placement</div>
                        <div className="font-semibold text-accent">{college.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Top 10 Colleges in Delhi 2026
        </h2>
        <div className="max-w-5xl mx-auto space-y-4">
          {DELHI_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-rose-500/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index < 2 ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {college.city}, {college.state}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className={college.type === "Government" ? "bg-accent/10 text-accent border-accent/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}>
                              {college.type}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              {college.stream}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} Lakhs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placement</div>
                        <div className="font-semibold text-accent">{college.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-20">
        <Card className="glass-card border-gradient-to-r from-rose-500/30 to-orange-500/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find Your Perfect College in Delhi
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Delhi offers unparalleled opportunities in government, corporate, and startup sectors. Use our Smart-powered comparison tool to find the college that matches your aspirations.
            </p>
            <Link href="/colleges">
              <Button size="lg" className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                <Swords className="h-5 w-5 mr-2" />
                Compare Delhi Colleges Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is the admission process for IIT Delhi?",
              a: "IIT Delhi admits students through JEE Advanced rank. You need to qualify JEE Main first, then appear for JEE Advanced. The cutoff rank is typically around 800 for general category.",
            },
            {
              q: "How do I get admission to Delhi University colleges?",
              a: "DU colleges admit students through CUET (Common University Entrance Test) for most courses. Some colleges also consider Class 12 marks for certain programs. Cut-off lists are released after CUET results.",
            },
            {
              q: "Is Delhi good for engineering?",
              a: "Absolutely! IIT Delhi is India's #2 engineering college. Delhi also has NSUT, DTU, and IIIT Delhi which offer excellent education and placement opportunities.",
            },
            {
              q: "What is the cost of living in Delhi for students?",
              a: "Delhi has moderate living costs. Hostel fees range from ₹60,000-1,20,000 per year. PG accommodation costs ₹12,000-20,000 per month including food and utilities.",
            },
          ].map((faq, index) => (
            <Card key={index} className="glass-card border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
