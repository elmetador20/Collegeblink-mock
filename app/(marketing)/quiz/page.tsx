"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  GraduationCap, 
  Target, 
  Compass, 
  Trophy,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const QUESTIONS = [
  {
    id: "stream",
    title: "What is your preferred field of study?",
    subtitle: "Select the area that interests you the most",
    icon: GraduationCap,
    options: [
      { label: "Engineering (B.Tech)", value: "stream=engineering", icon: "⚙️" },
      { label: "Management (MBA)", value: "course=mba", icon: "💼" },
      { label: "Medical / MBBS", value: "stream=medical", icon: "🩺" },
      { label: "Arts & Science", value: "stream=arts", icon: "🎨" },
    ]
  },
  {
    id: "location",
    title: "Where would you like to study?",
    subtitle: "Choose your preferred location or scope",
    icon: Compass,
    options: [
      { label: "Top Cities (Delhi/Mumbai/Bangalore)", value: "state=delhi", icon: "🏙️" },
      { label: "Anywhere in India", value: "", icon: "🇮🇳" },
      { label: "Study Abroad (International)", value: "international=true", icon: "🌍" },
      { label: "Near My Home", value: "local=true", icon: "🏠" },
    ]
  },
  {
    id: "priority",
    title: "What is your main priority?",
    subtitle: "This helps us rank colleges for you",
    icon: Target,
    options: [
      { label: "High Placements", value: "sort=placement", icon: "📈" },
      { label: "Affordable Fees", value: "fees=low", icon: "💰" },
      { label: "Top Rankings (NIRF/Global)", value: "sort=rank", icon: "🏆" },
      { label: "Scholarships", value: "scholarships=true", icon: "✨" },
    ]
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleOptionSelect = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: Record<string, string>) => {
    setIsFinishing(true);
    
    // Construct the query string from answers
    const params = Object.values(finalAnswers)
      .filter(val => val !== "")
      .join("&");
    
    setTimeout(() => {
      router.push(`/colleges?${params}`);
    }, 1500);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          {!isFinishing ? (
            <motion.div
              key="quiz-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={goBack}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                  <span className="text-sm font-bold text-white/40 tracking-widest uppercase">
                    Step {currentStep + 1} of {QUESTIONS.length}
                  </span>
                </div>
                <div className="w-9" /> {/* Spacer */}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <Progress value={progress} className="h-2 bg-white/5" />
                <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                  <span>Start</span>
                  <span>Analyze</span>
                  <span>Match</span>
                </div>
              </div>

              {/* Question */}
              <div className="text-center space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-2">
                  {React.createElement(QUESTIONS[currentStep].icon, { className: "h-8 w-8" })}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {QUESTIONS[currentStep].title}
                </h1>
                <p className="text-white/50 text-lg">
                  {QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS[currentStep].options.map((option, idx) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(option.value)}
                    className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 text-left transition-all group"
                  >
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                      {option.icon}
                    </span>
                    <span className="text-lg font-semibold text-white/90 group-hover:text-white">
                      {option.label}
                    </span>
                    <ArrowRight className="h-5 w-5 ml-auto text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finishing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-12"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 border border-indigo-500/50">
                  <CheckCircle2 className="h-12 w-12 text-indigo-400" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white">Analyzing Your Path...</h2>
              <p className="text-white/50 text-xl max-w-md mx-auto">
                We're matching your requirements with over 5,000+ top colleges across the globe.
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1, 
                      delay: i * 0.2 
                    }}
                    className="w-2 h-2 rounded-full bg-indigo-500"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Quote */}
      <div className="absolute bottom-8 left-0 w-full text-center text-white/20 text-xs font-medium uppercase tracking-[0.2em] pointer-events-none">
        Your Future Starts with a Single Decision
      </div>
    </div>
  );
}
