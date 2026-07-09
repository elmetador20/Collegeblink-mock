"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Award, MapPin, IndianRupee, Star, Swords } from "lucide-react";
import { motion } from "framer-motion";

const TOP_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    nirfRank: 1,
    avgPackage: 24.5,
    fees: 2.5,
    placementRate: 98,
    jeeAdvancedRank: 500,
    type: "Government",
  },
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
  },
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 3,
    avgPackage: 23.8,
    fees: 2.3,
    placementRate: 97,
    jeeAdvancedRank: 600,
    type: "Government",
  },
  {
    name: "Indian Institute of Technology (IIT) Kanpur",
    city: "Kanpur",
    state: "Uttar Pradesh",
    nirfRank: 4,
    avgPackage: 21.2,
    fees: 2.1,
    placementRate: 96,
    jeeAdvancedRank: 1000,
    type: "Government",
  },
  {
    name: "Indian Institute of Technology (IIT) Kharagpur",
    city: "Kharagpur",
    state: "West Bengal",
    nirfRank: 5,
    avgPackage: 20.8,
    fees: 2.0,
    placementRate: 95,
    jeeAdvancedRank: 1200,
    type: "Government",
  },
  {
    name: "Indian Institute of Technology (IIT) Roorkee",
    city: "Roorkee",
    state: "Uttarakhand",
    nirfRank: 6,
    avgPackage: 19.5,
    fees: 1.9,
    placementRate: 94,
    jeeAdvancedRank: 1500,
    type: "Government",
  },
  {
    name: "Indian Institute of Technology (IIT) Guwahati",
    city: "Guwahati",
    state: "Assam",
    nirfRank: 7,
    avgPackage: 18.2,
    fees: 1.8,
    placementRate: 93,
    jeeAdvancedRank: 2000,
    type: "Government",
  },
  {
    name: "Indian Institute of Technology (IIT) Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    nirfRank: 8,
    avgPackage: 22.0,
    fees: 2.4,
    placementRate: 96,
    jeeAdvancedRank: 900,
    type: "Government",
  },
  {
    name: "National Institute of Technology (NIT) Trichy",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    nirfRank: 9,
    avgPackage: 12.8,
    fees: 1.8,
    placementRate: 94,
    jeeMainsRank: 5000,
    type: "Government",
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    city: "Vellore",
    state: "Tamil Nadu",
    nirfRank: 11,
    avgPackage: 8.5,
    fees: 1.9,
    placementRate: 90,
    viteeeRank: 10000,
    type: "Private",
  },
];

export default function TopEngineeringCollegesPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
              NIRF Rankings 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
              Top Engineering Colleges in India
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover India's best engineering institutions with NIRF rankings, placement records, and admission criteria. Make informed decisions for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                  <Swords className="h-5 w-5 mr-2" />
                  Compare Colleges
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
          <Card className="glass-card border-indigo-500/20">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">23 IITs</div>
              <div className="text-sm text-muted-foreground">Institutes of Technology</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-purple-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">31 NITs</div>
              <div className="text-sm text-muted-foreground">National Institutes</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <Star className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">95%+</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Top 10 Engineering Colleges in India 2026
        </h2>
        <div className="max-w-5xl mx-auto space-y-4">
          {TOP_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-indigo-500/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index < 3 ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' : 'bg-muted'
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
                            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className={college.type === "Government" ? "bg-accent/10 text-accent border-accent/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}>
                              {college.type}
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
        <Card className="glass-card border-gradient-to-r from-indigo-500/30 to-purple-500/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Not Sure Which College is Right for You?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our Smart-powered comparison tool analyzes your profile, preferences, and budget to find the perfect college match. Compare multiple colleges side-by-side and make data-driven decisions.
            </p>
            <Link href="/colleges">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                <Swords className="h-5 w-5 mr-2" />
                Start Comparing Colleges Now
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
              q: "How are these colleges ranked?",
              a: "Colleges are ranked based on NIRF (National Institutional Ranking Framework) rankings 2026, which considers teaching, research, graduation outcomes, outreach, and perception."
            },
            {
              q: "What is the difference between IITs and NITs?",
              a: "IITs (Indian Institutes of Technology) are autonomous public institutes of national importance, generally requiring JEE Advanced rank. NITs (National Institutes of Technology) also accept JEE Main ranks and are excellent alternatives."
            },
            {
              q: "Are private engineering colleges worth it?",
              a: "Many private colleges like VIT, SRM, and BITS offer excellent placements and infrastructure. They can be great options if you don't qualify for top government colleges."
            },
            {
              q: "How do I get admission to these colleges?",
              a: "For IITs: JEE Advanced rank. For NITs: JEE Main rank. For private colleges: Their own entrance exams like VITEEE, SRMJEE, or state counseling."
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
