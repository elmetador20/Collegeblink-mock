"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Send, GraduationCap, MapPin, User, Mail, Phone, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INQUIRY_DATA } from "@/lib/data/inquiry-data";
import { toast } from "sonner";
import * as backend from "@/lib/backend";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Phone number must be 10 digits and start with 6, 7, 8, or 9"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please select a city"),
  category: z.string().min(1, "Please select a category"),
  course: z.string().min(1, "Please select a course"),
  onlineCourse: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function StudentInquiryModal({
  isOpen,
  onClose,
  onSuccess,
  hideCategoryAndCourse = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  /**
   * Hides the "Study Category" / "Target Course" selects from the user
   * and silently submits fixed values ("Undergraduate" / "NEET") instead.
   * Used for single-purpose lead forms like the NEET rank predictor.
   */
  hideCategoryAndCourse?: boolean;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onlineCourse: false,
      ...(hideCategoryAndCourse
        ? { category: "Undergraduate", course: "NEET" }
        : {}),
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await backend.saveInquiry(data);
      setIsSubmitted(true);
      toast.success("Inquiry submitted successfully!");
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const states = Object.keys(INQUIRY_DATA.stateCityMap).sort();
  const cities = selectedState ? INQUIRY_DATA.stateCityMap[selectedState] : [];
  const categories = Object.keys(INQUIRY_DATA.categories).sort();
  const courses = selectedCategory ? INQUIRY_DATA.categories[selectedCategory] : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-card border border-border/40 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md transition-all z-[60] border border-white/10"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>

            {/* Left side Image & Branding */}
            <div className="hidden md:flex relative w-1/3 min-h-full">
              <Image
                src="/images/imageshero-childrenf.jpg"
                alt="Student Lifestyle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent p-8 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl tracking-tight">CollegeBlink</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight mb-3">
                  Expert Guidance, <br />Zero Stress.
                </h2>
                <p className="text-white/80 text-xs leading-relaxed mb-4">
                  Join 50k+ students getting personalized counseling.
                </p>
                <div className="space-y-2">
                  {[
                    { icon: ShieldCheck, text: "Privacy Protected" },
                    { icon: Clock, text: "Fast Response" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-medium text-white/90">
                      <item.icon className="h-3.5 w-3.5 text-accent" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Form Panel */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[85vh]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 pulse-slow">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Success!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Thank you! Our top counselors will contact you shortly to begin your journey.
                  </p>
                </motion.div>
              ) : (
                <div className="max-w-xl mx-auto">
                  <div className="mb-6 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-1">Need Counselling?</h3>
                    <p className="text-muted-foreground text-sm">Fill in your details for expert guidance.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="name"
                          placeholder="Your Name"
                          className="h-11 pl-10 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
                          {...register("name")}
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Email ID</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            className="h-11 pl-10 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
                            {...register("email")}
                          />
                        </div>
                        {errors.email && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Phone Number</Label>
                        <div className="relative group">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="phone"
                            placeholder="Mobile number"
                            className="h-11 pl-10 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
                            {...register("phone")}
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="state" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Preference State</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                          <select
                            id="state"
                            className="w-full h-11 pl-10 rounded-xl border border-border/50 bg-background/50 focus:bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer transition-all"
                            {...register("state")}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSelectedState(val);
                              setValue("state", val);
                              setValue("city", "");
                            }}
                          >
                            <option value="">Select State</option>
                            {states.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        {errors.state && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.state.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="city" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Preference City</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                          <select
                            id="city"
                            disabled={!selectedState}
                            className="w-full h-11 pl-10 rounded-xl border border-border/50 bg-background/50 focus:bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer disabled:opacity-50 transition-all"
                            {...register("city")}
                          >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        {errors.city && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.city.message}</p>}
                      </div>
                    </div>

                    {hideCategoryAndCourse ? (
                      <>
                        <input type="hidden" defaultValue="Undergraduate" {...register("category")} />
                        <input type="hidden" defaultValue="NEET" {...register("course")} />
                      </>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="category" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Study Category</Label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                            <select
                              id="category"
                              className="w-full h-11 pl-10 rounded-xl border border-border/50 bg-background/50 focus:bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer transition-all"
                              {...register("category")}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSelectedCategory(val);
                                setValue("category", val);
                                setValue("course", "");
                              }}
                            >
                              <option value="">Select Category</option>
                              {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          {errors.category && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.category.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="course" className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-1">Target Course</Label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                            <select
                              id="course"
                              disabled={!selectedCategory}
                              className="w-full h-11 pl-10 rounded-xl border border-border/50 bg-background/50 focus:bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer disabled:opacity-50 transition-all"
                              {...register("course")}
                            >
                              <option value="">Select Course</option>
                              {courses.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          {errors.course && <p className="text-[10px] text-red-500 font-medium ml-1">{errors.course.message}</p>}
                        </div>
                      </div>
                    )}

                    {!hideCategoryAndCourse && (
                      <div className="flex items-center space-x-3 py-2 px-1">
                        <Switch
                          id="onlineCourse"
                          checked={watch("onlineCourse")}
                          onCheckedChange={(checked) => setValue("onlineCourse", checked)}
                        />
                        <Label htmlFor="onlineCourse" className="text-sm font-medium text-muted-foreground cursor-pointer">
                          Interested in Online Course
                        </Label>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-2"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin rounded-full" />
                      ) : (
                        <>
                          Get Free Counselling <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}