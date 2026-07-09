"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Award, MapPin, IndianRupee, Star, Swords, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const MBA_COLLEGES = [
  {
    name: "Indian Institute of Management (IIM) Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    nirfRank: 1,
    avgPackage: 28.5,
    fees: 23.5,
    placementRate: 100,
    catPercentile: 99.5,
    type: "Government",
    roi: "120%",
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
    roi: "112%",
  },
  {
    name: "Indian Institute of Management (IIM) Calcutta",
    city: "Kolkata",
    state: "West Bengal",
    nirfRank: 3,
    avgPackage: 25.2,
    fees: 22.8,
    placementRate: 100,
    catPercentile: 99.0,
    type: "Government",
    roi: "110%",
  },
  {
    name: "Faculty of Management Studies (FMS) Delhi",
    city: "New Delhi",
    state: "Delhi",
    nirfRank: 6,
    avgPackage: 24.5,
    fees: 0.96,
    placementRate: 100,
    catPercentile: 98.5,
    type: "Government",
    roi: "2550%",
  },
  {
    name: "Jamnalal Bajaj Institute of Management Studies (JBIMS) Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 7,
    avgPackage: 23.8,
    fees: 0.6,
    placementRate: 98,
    catPercentile: 98.0,
    type: "Government",
    roi: "3967%",
  },
  {
    name: "Indian Institute of Management (IIM) Indore",
    city: "Indore",
    state: "Madhya Pradesh",
    nirfRank: 8,
    avgPackage: 22.5,
    fees: 15.5,
    placementRate: 99,
    catPercentile: 97.5,
    type: "Government",
    roi: "145%",
  },
  {
    name: "Indian Institute of Management (IIM) Kozhikode",
    city: "Kozhikode",
    state: "Kerala",
    nirfRank: 9,
    avgPackage: 21.8,
    fees: 16.8,
    placementRate: 98,
    catPercentile: 97.0,
    type: "Government",
    roi: "130%",
  },
  {
    name: "Indian Institute of Management (IIM) Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    nirfRank: 10,
    avgPackage: 21.2,
    fees: 17.5,
    placementRate: 97,
    catPercentile: 96.5,
    type: "Government",
    roi: "121%",
  },
  {
    name: "Xavier School of Management (XLRI) Jamshedpur",
    city: "Jamshedpur",
    state: "Jharkhand",
    nirfRank: 4,
    avgPackage: 25.5,
    fees: 12.5,
    placementRate: 100,
    xatPercentile: 95,
    type: "Private",
    roi: "204%",
  },
  {
    name: "SP Jain Institute of Management and Research (SPJIMR) Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 5,
    avgPackage: 26.2,
    fees: 22.0,
    placementRate: 100,
    catPercentile: 98.5,
    type: "Private",
    roi: "119%",
  },
];

const AFFORDABLE_COLLEGES = [
  {
    name: "Faculty of Management Studies (FMS) Delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 0.96,
    avgPackage: 24.5,
    roi: "2550%",
    admission: "CAT 98.5+ percentile",
  },
  {
    name: "Jamnalal Bajaj Institute of Management Studies (JBIMS) Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 0.6,
    avgPackage: 23.8,
    roi: "3967%",
    admission: "MAH CET + GDPI",
  },
  {
    name: "Department of Management Studies (DMS) IIT Delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 8.0,
    avgPackage: 22.0,
    roi: "275%",
    admission: "CAT 95+ percentile",
  },
  {
    name: "Department of Management Studies (DoMS) IIT Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 9.5,
    avgPackage: 21.5,
    roi: "226%",
    admission: "CAT 94+ percentile",
  },
  {
    name: "Sydenham Institute of Management Studies (SIMSREE) Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 0.5,
    avgPackage: 18.5,
    roi: "3700%",
    admission: "MAH CET + GDPI",
  },
];

export default function BestMBACollegesPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              High ROI MBA Programs
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
              Best MBA Colleges Under 10 Lakh Fees
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover affordable MBA programs in India with exceptional ROI. Compare fees, placements, and admission criteria to find the best value business education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Swords className="h-5 w-5 mr-2" />
                  Compare MBA Colleges
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
          <Card className="glass-card border-purple-500/20">
            <CardContent className="p-6 text-center">
              <IndianRupee className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">Under ₹10L</div>
              <div className="text-sm text-muted-foreground">Affordable Options</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-pink-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-pink-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">3000%+ ROI</div>
              <div className="text-sm text-muted-foreground">Best Return</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-indigo-500/20">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">98%+</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Top 5 MBA Colleges Under ₹10 Lakh (Highest ROI)
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          These government and private institutes offer exceptional ROI with fees under ₹10 lakh, making them the best value for your MBA investment.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {AFFORDABLE_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-gradient-to-r from-accent/20 to-accent/20 hover:border-accent/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-accent flex items-center justify-center text-white font-black text-xl">
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
                            <Badge className="bg-accent/20 text-accent border-accent/30">
                              ROI: {college.roi}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-accent flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} L
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Admission</div>
                        <div className="font-semibold text-purple-400 text-xs">{college.admission}</div>
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
          Top 10 MBA Colleges in India 2026
        </h2>
        <div className="max-w-5xl mx-auto space-y-4">
          {MBA_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-purple-500/30 transition-all">
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
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className={college.type === "Government" ? "bg-accent/10 text-accent border-accent/20" : "bg-pink-500/10 text-pink-400 border-pink-500/20"}>
                              {college.type}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              ROI: {college.roi}
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
        <Card className="glass-card border-gradient-to-r from-purple-500/30 to-pink-500/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find Your Perfect MBA College
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't just look at fees. Consider ROI, placement records, and career growth. Our Smart-powered tool helps you find the MBA college that offers the best return on your investment.
            </p>
            <Link href="/colleges">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Swords className="h-5 w-5 mr-2" />
                Compare MBA Colleges Now
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
              q: "Are MBA colleges under 10 lakh worth it?",
              a: "Absolutely! Government colleges like FMS Delhi and JBIMS offer exceptional ROI with fees under ₹10 lakh and average packages above ₹20 LPA. These institutes provide world-class education at affordable costs."
            },
            {
              q: "What is the admission process for these colleges?",
              a: "Most top MBA colleges accept CAT scores. Government colleges like IIMs require CAT percentile above 95-99. Private colleges may accept CAT, XAT, or state-level entrance exams like MAH CET."
            },
            {
              q: "How do I calculate MBA ROI?",
              a: "MBA ROI = (Average Package - Total Fees) / Total Fees × 100. Colleges with fees under ₹10 lakh and packages above ₹20 LPA typically have ROI above 200%."
            },
            {
              q: "What CAT percentile do I need for affordable MBA colleges?",
              a: "For FMS Delhi: 98.5+ percentile. For JBIMS: MAH CET score. For IIT MBA programs: 95+ CAT percentile. Private colleges may accept lower percentiles around 85-90."
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
