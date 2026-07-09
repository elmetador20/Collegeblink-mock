"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Award, MapPin, IndianRupee, Star, Swords, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const BANGALORE_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 8,
    avgPackage: 22.0,
    fees: 2.4,
    placementRate: 96,
    jeeAdvancedRank: 900,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Indian Institute of Management (IIM) Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 2,
    avgPackage: 26.8,
    fees: 24.0,
    placementRate: 100,
    catPercentile: 99.2,
    type: "Government",
    stream: "MBA",
  },
  {
    name: "International Institute of Information Technology (IIIT) Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 65,
    avgPackage: 18.5,
    fees: 2.5,
    placementRate: 92,
    jeeAdvancedRank: 3000,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Christ University",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 60,
    avgPackage: 8.5,
    fees: 0.8,
    placementRate: 85,
    type: "Private",
    stream: "Multi-disciplinary",
  },
  {
    name: "RV College of Engineering (RVCE)",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 75,
    avgPackage: 7.5,
    fees: 1.2,
    placementRate: 88,
    type: "Private",
    stream: "Engineering",
  },
  {
    name: "BMS College of Engineering (BMSCE)",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 80,
    avgPackage: 7.2,
    fees: 1.0,
    placementRate: 86,
    type: "Private",
    stream: "Engineering",
  },
  {
    name: "MS Ramaiah Institute of Technology (MSRIT)",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 85,
    avgPackage: 7.8,
    fees: 1.3,
    placementRate: 87,
    type: "Private",
    stream: "Engineering",
  },
  {
    name: "Vivekananda Institute of Technology",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 90,
    avgPackage: 6.8,
    fees: 0.9,
    placementRate: 84,
    type: "Private",
    stream: "Engineering",
  },
  {
    name: "Bangalore Institute of Management Studies (BIMS)",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 95,
    avgPackage: 6.5,
    fees: 0.7,
    placementRate: 82,
    type: "Private",
    stream: "MBA",
  },
  {
    name: "PES University",
    city: "Bangalore",
    state: "Karnataka",
    nirfRank: 100,
    avgPackage: 8.2,
    fees: 1.5,
    placementRate: 89,
    type: "Private",
    stream: "Engineering",
  },
];

const ENGINEERING_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Bangalore",
    nirfRank: 8,
    avgPackage: 22.0,
    fees: 2.4,
    placementRate: 96,
    jeeAdvancedRank: 900,
  },
  {
    name: "International Institute of Information Technology (IIIT) Bangalore",
    nirfRank: 65,
    avgPackage: 18.5,
    fees: 2.5,
    placementRate: 92,
    jeeAdvancedRank: 3000,
  },
  {
    name: "RV College of Engineering (RVCE)",
    nirfRank: 75,
    avgPackage: 7.5,
    fees: 1.2,
    placementRate: 88,
    admission: "COMEDK + KCET",
  },
  {
    name: "BMS College of Engineering (BMSCE)",
    nirfRank: 80,
    avgPackage: 7.2,
    fees: 1.0,
    placementRate: 86,
    admission: "COMEDK + KCET",
  },
  {
    name: "MS Ramaiah Institute of Technology (MSRIT)",
    nirfRank: 85,
    avgPackage: 7.8,
    fees: 1.3,
    placementRate: 87,
    admission: "COMEDK + KCET",
  },
];

const MBA_COLLEGES = [
  {
    name: "Indian Institute of Management (IIM) Bangalore",
    nirfRank: 2,
    avgPackage: 26.8,
    fees: 24.0,
    placementRate: 100,
    catPercentile: 99.2,
  },
  {
    name: "Christ University",
    nirfRank: 60,
    avgPackage: 8.5,
    fees: 0.8,
    placementRate: 85,
    admission: "CAT + Interview",
  },
  {
    name: "Bangalore Institute of Management Studies (BIMS)",
    nirfRank: 95,
    avgPackage: 6.5,
    fees: 0.7,
    placementRate: 82,
    admission: "CAT + MAT",
  },
];

export default function TopCollegesBangalorePage() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-950 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
              Silicon Valley of India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
              Top Colleges in Bangalore 2026
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore the best educational institutions in India's tech capital. From IIT Bangalore to top private universities, find your perfect college in Bengaluru.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Swords className="h-5 w-5 mr-2" />
                  Compare Bangalore Colleges
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
                }}
              >
                Get Personalized Matches
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="glass-card border-orange-500/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-10 w-10 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Engineering Colleges</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-red-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-red-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">92%+</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-yellow-500/20">
            <CardContent className="p-6 text-center">
              <Star className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">IT Hub</div>
              <div className="text-sm text-muted-foreground">Job Opportunities</div>
            </CardContent>
          </Card>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Top Engineering Colleges in Bangalore
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Bangalore is home to IIT Bangalore and several top private engineering colleges. These institutions offer excellent placement opportunities in India's tech capital.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {ENGINEERING_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-gradient-to-r from-orange-500/20 to-red-500/20 hover:border-orange-500/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index < 2 ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              Engineering
                            </Badge>
                          </div>
                          {college.admission && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Admission: {college.admission}
                            </div>
                          )}
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
          Top MBA Colleges in Bangalore
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Bangalore offers world-class MBA education with IIM Bangalore leading the pack. These colleges provide excellent placement opportunities in the corporate world.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {MBA_COLLEGES.map((college, index) => (
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
                            index === 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/20">
                              MBA
                            </Badge>
                          </div>
                          {college.admission && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Admission: {college.admission}
                            </div>
                          )}
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
          Top 10 Colleges in Bangalore 2026
        </h2>
        <div className="max-w-5xl mx-auto space-y-4">
          {BANGALORE_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-orange-500/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index < 2 ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : 'bg-muted'
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
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className={college.type === "Government" ? "bg-accent/10 text-accent border-accent/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}>
                              {college.type}
                            </Badge>
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
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
        <Card className="glass-card border-gradient-to-r from-orange-500/30 to-red-500/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find Your Perfect College in Bangalore
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bangalore offers unparalleled opportunities in tech and business. Use our Smart-powered comparison tool to find the college that matches your aspirations, budget, and career goals.
            </p>
            <Link href="/colleges">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Swords className="h-5 w-5 mr-2" />
                Compare Bangalore Colleges Now
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
              q: "What is the admission process for IIT Bangalore?",
              a: "IIT Bangalore admits students through JEE Advanced rank. You need to qualify JEE Main first, then appear for JEE Advanced. The cutoff rank is typically around 900 for general category."
            },
            {
              q: "How do I get admission to private engineering colleges in Bangalore?",
              a: "Private colleges like RVCE, BMSCE, and MSRIT accept students through COMEDK UGET and KCET (Karnataka Common Entrance Test). Management quota seats are also available."
            },
            {
              q: "Is Bangalore good for MBA?",
              a: "Absolutely! IIM Bangalore is India's #2 MBA college. The city is home to numerous corporate headquarters, providing excellent internship and placement opportunities for MBA students."
            },
            {
              q: "What is the cost of living in Bangalore for students?",
              a: "Bangalore has moderate living costs. Hostel fees range from ₹80,000-1,50,000 per year. Private accommodation costs ₹15,000-25,000 per month including food and utilities."
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
