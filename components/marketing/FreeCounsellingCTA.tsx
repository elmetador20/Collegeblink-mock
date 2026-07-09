"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, MessageCircle, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import * as backend from "@/lib/backend";
import { usePathname } from "next/navigation";

const examOptions = [
  "JEE Main", "JEE Advanced", "NEET", "CAT", "XAT", "CLAT", "MAT", "GATE", "IELTS", "TOEFL", "SAT", "GMAT", "GRE", "Other"
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

export function FreeCounsellingCTA() {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    exam: "",
    targetCollege: "",
    targetStream: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, parameters);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await backend.createCounsellingLead({
        ...formData,
        sourcePage: pathname,
      });
      trackEvent("counselling_form_submit", {
        exam: formData.exam || "not_specified",
        stream: formData.targetStream || "not_specified",
        source_page: pathname,
      });
      setIsSuccess(true);
      setFormData({ name: "", phone: "", exam: "", targetCollege: "", targetStream: "" });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to submit lead:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-y border-border/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm mb-4">
              <MessageCircle className="h-4 w-4" />
              Free Counselling
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Expert Guidance for Your College Journey
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Our expert counselors will help you find the right college, understand admission requirements, and navigate the application process. Completely free!
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="glass-card rounded-3xl border border-border/60 p-6 md:p-8"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Our counselor will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        pattern="[0-9]{10}"
                        className="bg-background/50 border-border/50 focus:border-primary pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="exam" className="text-foreground font-medium">
                      Target Exam
                    </Label>
                    <div className="relative">
                      <select
                        id="exam"
                        value={formData.exam}
                        onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2.5 text-foreground focus:border-primary focus:outline-none appearance-none"
                      >
                        <option value="">Select exam</option>
                        {examOptions.map((exam) => (
                          <option key={exam} value={exam}>
                            {exam}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetCollege" className="text-foreground font-medium">
                      Target College
                    </Label>
                    <Input
                      id="targetCollege"
                      placeholder="e.g., IIT Bombay"
                      value={formData.targetCollege}
                      onChange={(e) => setFormData({ ...formData, targetCollege: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetStream" className="text-foreground font-medium">
                      Target Stream
                    </Label>
                    <Input
                      id="targetStream"
                      placeholder="e.g., Engineering, MBA"
                      value={formData.targetStream}
                      onChange={(e) => setFormData({ ...formData, targetStream: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition-transform font-semibold rounded-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Free Counselling <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to receive communication from CollegeBlink about college admissions and counselling services.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
