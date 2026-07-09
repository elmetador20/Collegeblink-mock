"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Calculator,
  AlertTriangle,
  ChevronDown,
  Info,
  Users,
  Award,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { StudentInquiryModal } from "@/components/marketing/StudentInquiryModal";

/* ================================================================
   DATA LAYER — ported from the NTA-trend statistical model.
   All computation runs client-side; nothing is sent to a server.
   ================================================================ */

const INQUIRY_STORAGE_KEY = "cb_inquiry_submitted";

function hasSubmittedInquiry() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(INQUIRY_STORAGE_KEY) === "true";
}

const MARKS_RANK_TABLE = [
  { minMark: 672, maxMark: 720, airLo: 1, airHi: 10, pctLabel: "99.99+" },
  { minMark: 650, maxMark: 671, airLo: 11, airHi: 100, pctLabel: "99.99" },
  { minMark: 630, maxMark: 649, airLo: 101, airHi: 500, pctLabel: "99.97" },
  { minMark: 616, maxMark: 629, airLo: 501, airHi: 1000, pctLabel: "99.95" },
  { minMark: 571, maxMark: 615, airLo: 1001, airHi: 5000, pctLabel: "99.77" },
  { minMark: 542, maxMark: 570, airLo: 5001, airHi: 10000, pctLabel: "99.55" },
  { minMark: 528, maxMark: 541, airLo: 10001, airHi: 20000, pctLabel: "99.09" },
  { minMark: 515, maxMark: 527, airLo: 20001, airHi: 30000, pctLabel: "98.64" },
  { minMark: 496, maxMark: 514, airLo: 30001, airHi: 50000, pctLabel: "97.74" },
  { minMark: 465, maxMark: 495, airLo: 50001, airHi: 100000, pctLabel: "95.48" },
  { minMark: 424, maxMark: 464, airLo: 100001, airHi: 200000, pctLabel: "90.95" },
  { minMark: 380, maxMark: 423, airLo: 200001, airHi: 350000, pctLabel: "~85" },
  { minMark: 320, maxMark: 379, airLo: 350001, airHi: 600000, pctLabel: "~73" },
  { minMark: 250, maxMark: 319, airLo: 600001, airHi: 1000000, pctLabel: "~55" },
  { minMark: 144, maxMark: 249, airLo: 1000001, airHi: 1600000, pctLabel: "~27" },
  { minMark: -180, maxMark: 143, airLo: 1600001, airHi: 2279000, pctLabel: "<27 (below qualifying)" },
] as const;

const CATEGORY_INFO = {
  UR: { label: "General / UR", percentile: 50, qualMin: 144, qualMax: 686, ratioOfTotal: 0.405 },
  EWS: { label: "EWS", percentile: 50, qualMin: 144, qualMax: 686, ratioOfTotal: 0.1 },
  OBC: { label: "OBC-NCL", percentile: 40, qualMin: 113, qualMax: 143, ratioOfTotal: 0.27 },
  SC: { label: "SC", percentile: 40, qualMin: 113, qualMax: 143, ratioOfTotal: 0.15 },
  ST: { label: "ST", percentile: 40, qualMin: 113, qualMax: 143, ratioOfTotal: 0.075 },
  UR_PWD: { label: "General / EWS — PwD", percentile: 45, qualMin: 127, qualMax: 143, ratioOfTotal: 0.01 },
  RES_PWD: { label: "OBC / SC / ST — PwD", percentile: 40, qualMin: 113, qualMax: 126, ratioOfTotal: 0.005 },
} as const;

type CategoryKey = keyof typeof CATEGORY_INFO;

const CATEGORY_OPTIONS: { value: CategoryKey; label: string }[] = (
  Object.keys(CATEGORY_INFO) as CategoryKey[]
).map((key) => ({ value: key, label: CATEGORY_INFO[key].label }));

const STATE_LABELS = {
  DL: "Delhi",
  UP: "Uttar Pradesh",
  MH: "Maharashtra",
  RJ: "Rajasthan",
  MP: "Madhya Pradesh",
  BR: "Bihar",
  WB: "West Bengal",
  TN: "Tamil Nadu",
  KA: "Karnataka",
  AP: "Andhra Pradesh",
  TS: "Telangana",
  KL: "Kerala",
  GJ: "Gujarat",
  PB: "Punjab",
  HR: "Haryana",
  OTH: "Other state",
} as const;

type StateKey = keyof typeof STATE_LABELS;

const STATE_OPTIONS: { value: StateKey; label: string }[] = (
  Object.keys(STATE_LABELS) as StateKey[]
).map((key) => ({ value: key, label: STATE_LABELS[key] }));

interface CollegeRef {
  name: string;
  quota: string;
  course: string;
  closingAIR: Partial<Record<CategoryKey, number>>;
}

const COLLEGE_REFERENCE: CollegeRef[] = [
  { name: "AIIMS New Delhi", quota: "AIQ", course: "MBBS", closingAIR: { UR: 60, OBC: 120, SC: 600, ST: 900, EWS: 150 } },
  { name: "Maulana Azad Medical College, Delhi", quota: "AIQ", course: "MBBS", closingAIR: { UR: 150, OBC: 700, SC: 3500, ST: 5500, EWS: 600 } },
  { name: "Lady Hardinge Medical College, Delhi", quota: "AIQ", course: "MBBS", closingAIR: { UR: 900, OBC: 2200, SC: 8000, ST: 12000, EWS: 1800 } },
  { name: "Govt. Medical College, Kozhikode", quota: "State", course: "MBBS", closingAIR: { UR: 3500, OBC: 7000, SC: 25000, ST: 30000, EWS: 6000 } },
  { name: "Grant Medical College, Mumbai", quota: "State", course: "MBBS", closingAIR: { UR: 2500, OBC: 6000, SC: 20000, ST: 28000, EWS: 5000 } },
  { name: "Bangalore Medical College", quota: "State", course: "MBBS", closingAIR: { UR: 4000, OBC: 9000, SC: 30000, ST: 35000, EWS: 7500 } },
  { name: "Govt. Medical College, Patiala", quota: "State", course: "MBBS", closingAIR: { UR: 9000, OBC: 18000, SC: 55000, ST: 60000, EWS: 15000 } },
  { name: "Stanley Medical College, Chennai", quota: "State", course: "MBBS", closingAIR: { UR: 6000, OBC: 14000, SC: 40000, ST: 45000, EWS: 11000 } },
  { name: "Govt. Medical College, Jaipur (SMS)", quota: "State", course: "MBBS", closingAIR: { UR: 5000, OBC: 11000, SC: 35000, ST: 40000, EWS: 9000 } },
  { name: "Any AIQ Govt. Medical College (broad band)", quota: "AIQ", course: "MBBS", closingAIR: { UR: 50000, OBC: 90000, SC: 150000, ST: 170000, EWS: 70000 } },
  { name: "State quota Govt. Medical College (broad band)", quota: "State", course: "MBBS", closingAIR: { UR: 80000, OBC: 130000, SC: 200000, ST: 220000, EWS: 100000 } },
  { name: "Govt. Dental College (BDS), broad band", quota: "State", course: "BDS", closingAIR: { UR: 150000, OBC: 220000, SC: 300000, ST: 320000, EWS: 180000 } },
  { name: "Deemed University MBBS (Mgmt / NRI band)", quota: "Deemed", course: "MBBS", closingAIR: { UR: 350000, OBC: 400000, SC: 450000, ST: 460000, EWS: 380000 } },
  { name: "Private Medical College, State quota B-category", quota: "State", course: "MBBS", closingAIR: { UR: 250000, OBC: 320000, SC: 400000, ST: 420000, EWS: 280000 } },
];

const TOTAL_CANDIDATES_2026 = 2279000;

const METHOD_STEPS = [
  { num: "01", title: "Score input", desc: "You enter your expected score, ideally calculated from NTA's official NEET 2026 answer key, subject-wise where possible." },
  { num: "02", title: "Historical benchmarking", desc: "Your score is mapped against five years of NEET marks-vs-rank data (2020–2025) to interpolate a probable rank band." },
  { num: "03", title: "Difficulty normalisation", desc: "The estimate adjusts for the expected 2026 candidate volume (~22.79 lakh) relative to 2025's ~20.8 lakh appeared candidates." },
  { num: "04", title: "Tie-break logic", desc: "Where scores tie, NTA's own order applies: higher Biology marks, then Chemistry, then Physics, then the older candidate." },
];

const HERO_STATS = [
  { value: "22.79L", label: "Expected 2026 candidates", icon: Users },
  { value: "686", label: "Highest score, NEET 2025", icon: Award },
  { value: "5 yrs", label: "Historical data used", icon: BarChart3 },
  { value: "~1.08L", label: "MBBS seats nationally", icon: GraduationCap },
];

const FAQ_ITEMS = [
  {
    q: "How accurate is this NEET 2026 rank predictor?",
    a: "This tool gives a directional estimate based on statistical interpolation of NEET 2020–2025 marks-vs-rank data, adjusted for the expected 2026 candidate volume. It is not based on the actual 2026 answer key or NTA's final normalisation, so treat the output as an informed range rather than a guaranteed rank. Always cross-check against official NTA results once declared.",
  },
  {
    q: "What's the difference between All India Rank (AIR) and Category Rank?",
    a: "AIR is your rank among all NEET candidates nationwide, regardless of category. Category Rank is your position only within candidates of your reservation category (e.g. OBC-NCL, SC, ST, EWS). Most state and category-specific counselling rounds use category rank, while AIQ general-merit seats use AIR.",
  },
  {
    q: "Why do Physics, Chemistry and Biology marks matter if I already entered my total?",
    a: "Total marks alone can't resolve ties. NTA's official tie-break order favours candidates with higher Biology marks, then Chemistry, then Physics, then older candidates. Entering subject-wise marks lets the calculator apply this same logic for a sharper estimate within your score band.",
  },
  {
    q: "What are the NEET 2026 qualifying cutoffs by category?",
    a: "Based on 2025-trend bands, General/UR and EWS candidates need to clear the 50th percentile (roughly 144+ marks), while OBC-NCL, SC and ST candidates need the 40th percentile (roughly 113+ marks). PwD candidates have separate relaxed thresholds. Exact 2026 cutoffs are notified by NTA after the result.",
  },
  {
    q: "Does this predictor account for the increase in 2026 candidates?",
    a: "Yes. The underlying model normalises historical rank bands against the expected ~22.79 lakh candidates appearing in 2026, compared to roughly 20.8 lakh in 2025, so a given score is mapped to a slightly different rank than it would have been last year.",
  },
  {
    q: "Are the college closing ranks shown here official 2026 cutoffs?",
    a: "No. The closing-AIR figures next to each college are illustrative reference points drawn from 2025 AIQ and state counselling patterns for your category. Actual 2026 cutoffs depend on the final seat matrix, candidate withdrawals, and round-by-round counselling dynamics, and can shift meaningfully from one year to the next.",
  },
  {
    q: "Is my data stored or sent anywhere when I use this calculator?",
    a: "No. Every calculation — interpolation, tie-breaking, category and college mapping — runs locally in your browser. No score or personal data is transmitted to a server as part of the prediction itself.",
  },
  {
    q: "Should I use my expected score from the official answer key or my own evaluation?",
    a: "Use your score calculated against NTA's official released answer key wherever possible, since this is the most reliable basis for any rank estimate. Self-evaluated scores against unofficial keys can vary and may shift your predicted band once NTA's final key and result are out.",
  },
];

/* ================================================================
   CORE LOGIC — direct port of the original estimation model.
   ================================================================ */

function interpolateAIR(marksInput: number) {
  const marks = Math.max(-180, Math.min(720, marksInput));
  for (const row of MARKS_RANK_TABLE) {
    if (marks >= row.minMark && marks <= row.maxMark) {
      const span = row.maxMark - row.minMark;
      const frac = span === 0 ? 0 : (row.maxMark - marks) / span;
      const air = Math.round(row.airLo + frac * (row.airHi - row.airLo));
      return { air, pctLabel: row.pctLabel };
    }
  }
  return { air: TOTAL_CANDIDATES_2026, pctLabel: "< 5" };
}

function applyTieBreak(baseAIR: number, phys: number | null, chem: number | null, bio: number | null, isOlder: boolean) {
  let nudge = 0;
  const hasSubjectMarks = phys !== null && chem !== null && bio !== null;
  if (hasSubjectMarks) {
    const bioScore = (bio as number) / 360;
    const chemScore = (chem as number) / 180;
    const physScore = (phys as number) / 180;
    const composite = bioScore * 0.6 + chemScore * 0.25 + physScore * 0.15;
    nudge -= composite * (baseAIR * 0.01);
  }
  if (isOlder) nudge -= baseAIR * 0.001;
  return Math.max(1, Math.round(baseAIR + nudge));
}

function categoryRankFromAIR(air: number, categoryKey: CategoryKey) {
  const info = CATEGORY_INFO[categoryKey];
  return Math.max(1, Math.round(air * info.ratioOfTotal));
}

type ChanceLevel = "high" | "moderate" | "low";

function getChanceLevel(userCatRank: number, closingAIR: number): ChanceLevel {
  if (userCatRank <= closingAIR * 0.7) return "high";
  if (userCatRank <= closingAIR * 1.15) return "moderate";
  return "low";
}

function chanceLabel(level: ChanceLevel) {
  if (level === "high") return { text: "Strong chance", tone: level };
  if (level === "moderate") return { text: "Borderline", tone: level };
  return { text: "Unlikely", tone: level };
}

function chanceTone(tone: ChanceLevel) {
  if (tone === "high") return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
  if (tone === "moderate") return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
  return "bg-red-500/10 text-red-500 border border-red-500/20";
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}

interface CollegeRow extends CollegeRef {
  closing: number;
  level: ChanceLevel;
  lbl: { text: string; tone: ChanceLevel };
}

function buildCollegeRows(categoryKey: CategoryKey, userCatRank: number): CollegeRow[] {
  const mappedKey: CategoryKey = categoryKey === "UR_PWD" ? "UR" : categoryKey === "RES_PWD" ? "OBC" : categoryKey;
  const rows: CollegeRow[] = COLLEGE_REFERENCE.map((c) => {
    const closing = c.closingAIR[mappedKey] ?? c.closingAIR.UR ?? 0;
    const level = getChanceLevel(userCatRank, closing);
    const lbl = chanceLabel(level);
    return { ...c, closing, level, lbl };
  });
  const order: Record<ChanceLevel, number> = { high: 0, moderate: 1, low: 2 };
  rows.sort((a, b) => order[a.level] - order[b.level] || a.closing - b.closing);
  return rows;
}

type ParsedInputs =
  | { error: string }
  | { totalMarks: number; phys: number | null; chem: number | null; bio: number | null };

function parseInputs(totalRaw: string, physRaw: string, chemRaw: string, bioRaw: string): ParsedInputs {
  const phys = physRaw.trim() === "" ? null : parseFloat(physRaw);
  const chem = chemRaw.trim() === "" ? null : parseFloat(chemRaw);
  const bio = bioRaw.trim() === "" ? null : parseFloat(bioRaw);

  let totalMarks: number;
  if (totalRaw.trim() !== "") {
    totalMarks = parseFloat(totalRaw);
  } else if (phys !== null && chem !== null && bio !== null) {
    totalMarks = phys + chem + bio;
  } else {
    return { error: "Enter your total marks, or all three subject-wise marks." };
  }

  if (isNaN(totalMarks) || totalMarks < -180 || totalMarks > 720) {
    return { error: "Total marks must be between -180 and 720." };
  }
  if (phys !== null && (phys < -45 || phys > 180)) return { error: "Physics marks must be between -45 and 180." };
  if (chem !== null && (chem < -45 || chem > 180)) return { error: "Chemistry marks must be between -45 and 180." };
  if (bio !== null && (bio < -90 || bio > 360)) return { error: "Biology marks must be between -90 and 360." };

  return { totalMarks, phys, chem, bio };
}

interface PredictionResult {
  qualifies: boolean;
  totalMarks: number;
  finalAIR: number;
  catRank: number;
  category: CategoryKey;
  pctLabel: string;
  stateLabel: string;
  colleges: CollegeRow[];
}

/* ================================================================
   MOTION VARIANTS — shared rhythm with the rest of the site.
   ================================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

/* ================================================================
   SMALL PRESENTATIONAL HELPERS
   ================================================================ */

function MarksInput({
  label,
  hint,
  value,
  onChange,
  onEnter,
  placeholder,
  min,
  max,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  placeholder: string;
  min: number;
  max: number;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block">
        {label} {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
      />
    </div>
  );
}

function FieldSelect<T extends string>({
  label,
  hint,
  value,
  onChange,
  options,
}: {
  label: string;
  hint?: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block">
        {label} {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="w-full appearance-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden hover:border-primary/30 transition-colors">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5"
      >
        <span className="text-sm sm:text-[15px] font-bold text-foreground">{question}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""
            }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 sm:px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function NeetRankPredictor() {
  const [totalMarks, setTotalMarks] = useState("");
  const [physMarks, setPhysMarks] = useState("");
  const [chemMarks, setChemMarks] = useState("");
  const [bioMarks, setBioMarks] = useState("");
  const [category, setCategory] = useState<CategoryKey>("UR");
  const [stateKey, setStateKey] = useState<StateKey>("DL");
  const [ageState, setAgeState] = useState<"avg" | "older">("avg");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [predictionCount, setPredictionCount] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Gate: inquiry modal shown before results, when not yet submitted
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [pendingResult, setPendingResult] = useState<PredictionResult | null>(null);

  // FAQ accordion state
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const computeResult = (): PredictionResult | { error: string } => {
    const parsed = parseInputs(totalMarks, physMarks, chemMarks, bioMarks);
    if ("error" in parsed) {
      return { error: parsed.error };
    }

    const catInfo = CATEGORY_INFO[category];
    const base = interpolateAIR(parsed.totalMarks);
    const finalAIR = applyTieBreak(base.air, parsed.phys, parsed.chem, parsed.bio, ageState === "older");
    const catRank = categoryRankFromAIR(finalAIR, category);
    const qualifies = parsed.totalMarks >= catInfo.qualMin;
    const colleges = qualifies ? buildCollegeRows(category, catRank) : [];

    return {
      qualifies,
      totalMarks: parsed.totalMarks,
      finalAIR,
      catRank,
      category,
      pctLabel: base.pctLabel,
      stateLabel: STATE_LABELS[stateKey],
      colleges,
    };
  };

  const revealResult = (computed: PredictionResult) => {
    setResult(computed);
    setPredictionCount((c) => c + 1);
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handlePredict = () => {
    const computed = computeResult();
    if ("error" in computed) {
      setError(computed.error);
      return;
    }
    setError("");

    if (!hasSubmittedInquiry()) {
      // Hold the computed result and ask for details first
      setPendingResult(computed);
      setIsInquiryOpen(true);
      return;
    }

    revealResult(computed);
  };

  const handleInquirySuccess = () => {
    localStorage.setItem(INQUIRY_STORAGE_KEY, "true");
    if (pendingResult) {
      revealResult(pendingResult);
      setPendingResult(null);
    }
  };

  const catInfoForResult = result ? CATEGORY_INFO[result.category] : null;
  const distPct = result ? Math.max(0, Math.min(100, (Math.max(0, Math.min(720, result.totalMarks)) / 720) * 100)) : 0;
  const realisticCount = result ? result.colleges.filter((c) => c.level !== "low").length : 0;

  return (
    <div className="relative flex flex-col bg-background">
      {/* ===== Top strip ===== */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="font-bold text-sm text-foreground flex items-center gap-1.5 whitespace-nowrap">
            College<span className="text-primary">Blink</span>
            <span className="hidden sm:inline text-muted-foreground font-normal">/ NEET Predictor</span>
          </Link>
          <span className="hidden sm:inline-flex text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            Built on NTA 2020–2025 data
          </span>
        </div>
      </div>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden pt-16 pb-14 border-b border-border/40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 rounded-full bg-primary/10 border-primary/20 text-primary px-3 py-1 text-xs font-bold">
                <Sparkles className="mr-1.5 h-3 w-3" /> NEET UG 2026 · AIR Estimator
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
              Know where your score lands —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                before NTA tells you.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              Enter your expected score and category. We map it against five years of NEET marks-vs-rank trends, apply
              category-wise qualifying cutoffs, and run NTA's own tie-break order to estimate your All India Rank,
              percentile, and the colleges within reach.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="text-xs text-muted-foreground border-l-2 border-amber-400 pl-3 mb-8 max-w-xl"
            >
              Estimates only, based on statistical modelling of past NTA data — not official results. Always confirm
              with NTA / MCC counselling data.
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/60 backdrop-blur-md shadow-sm"
                >
                  <div className="p-1 rounded-full bg-primary/10">
                    <stat.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="font-bold text-foreground text-[13px] tracking-tight">{stat.value}</span>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Form ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 px-3 py-1 text-xs font-bold">
                📝 Step 1 of 1
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Enter your NEET 2026 details
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              Takes under a minute. Nothing is stored — every calculation runs locally in your browser.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="glass-card rounded-[2rem] border border-border/60 shadow-xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 md:px-8 py-5 border-b border-border/50 bg-card/40">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">Score &amp; category</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Used only for this estimate
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <MarksInput
                label="Expected marks (out of 720)"
                hint="or enter subject-wise below"
                value={totalMarks}
                onChange={setTotalMarks}
                onEnter={handlePredict}
                placeholder="e.g. 612"
                min={-180}
                max={720}
              />

              <div className="flex items-center gap-3">
                <span className="flex-1 h-px bg-border/60" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground whitespace-nowrap">
                  or subject-wise (sharper tie-break)
                </span>
                <span className="flex-1 h-px bg-border/60" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MarksInput
                  label="Physics"
                  hint="/180"
                  value={physMarks}
                  onChange={setPhysMarks}
                  onEnter={handlePredict}
                  placeholder="0–180"
                  min={-45}
                  max={180}
                />
                <MarksInput
                  label="Chemistry"
                  hint="/180"
                  value={chemMarks}
                  onChange={setChemMarks}
                  onEnter={handlePredict}
                  placeholder="0–180"
                  min={-45}
                  max={180}
                />
                <MarksInput
                  label="Biology (Bot+Zoo)"
                  hint="/360"
                  value={bioMarks}
                  onChange={setBioMarks}
                  onEnter={handlePredict}
                  placeholder="0–360"
                  min={-90}
                  max={360}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldSelect
                  label="Category"
                  value={category}
                  onChange={setCategory}
                  options={CATEGORY_OPTIONS}
                />
                <FieldSelect
                  label="State of domicile"
                  hint="for state quota"
                  value={stateKey}
                  onChange={setStateKey}
                  options={STATE_OPTIONS}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Age category <span className="text-xs font-normal text-muted-foreground">used only as the final NTA tie-break</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(["avg", "older"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAgeState(opt)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${ageState === opt
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-md"
                        : "bg-background/60 border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                    >
                      {opt === "avg" ? "Standard (17–19 yrs)" : "Older candidate"}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-semibold text-red-500"
                >
                  <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePredict}
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 font-semibold text-sm shadow-lg hover:shadow-amber-500/25 hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
                >
                  Predict My Rank &amp; Colleges <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Results ===== */}
      {result && catInfoForResult && (
        <motion.section
          key={predictionCount}
          ref={resultsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="py-4"
        >
          <div className="container mx-auto px-4 max-w-5xl space-y-12">
            {/* Result card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-800 border border-border/40 p-8 md:p-10 shadow-xl">
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-amber-400" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Target className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/50">Your Prediction</div>
                  <div className="text-lg font-bold text-white">NEET UG 2026 Estimate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2">
                    All India Rank (estimated)
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {result.qualifies ? fmt(result.finalAIR) : "Not Qualified"}
                  </div>
                  <div className="text-xs text-white/60 mt-1.5">
                    {result.qualifies
                      ? `Estimated range: ${fmt(result.finalAIR * 0.85)} – ${fmt(result.finalAIR * 1.15)}`
                      : `Below ${catInfoForResult.label} qualifying mark of ${catInfoForResult.qualMin}`}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2">Category Rank</div>
                  <div className="text-3xl font-bold text-white">{result.qualifies ? fmt(result.catRank) : "—"}</div>
                  <div className="text-xs text-white/60 mt-1.5">
                    Within {catInfoForResult.label} ({(catInfoForResult.ratioOfTotal * 100).toFixed(1)}% of pool)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2">Percentile</div>
                  <div className="text-3xl font-bold text-white">
                    {result.qualifies ? result.pctLabel : `Below ${catInfoForResult.percentile}th`}
                  </div>
                  <div className="text-xs text-white/60 mt-1.5">
                    Qualifying threshold for {catInfoForResult.label}: {catInfoForResult.percentile}th percentile
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                  Score: {result.totalMarks} / 720
                </span>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                  {catInfoForResult.label}
                </span>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                  {result.stateLabel} domicile
                </span>
                {result.qualifies ? (
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/40 text-green-300 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Qualifying threshold met
                  </span>
                ) : (
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Below qualifying cutoff
                  </span>
                )}
              </div>
            </div>

            {/* Distribution strip */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                <span>0 marks</span>
                <span className="hidden sm:inline">Where your score sits on the 2025 distribution</span>
                <span>720 marks</span>
              </div>
              <div className="relative h-11 rounded-full border border-border/50 overflow-hidden bg-gradient-to-r from-border via-amber-400/70 to-orange-500">
                <div
                  className="absolute top-[-12px] w-0.5 h-[58px] bg-foreground"
                  style={{ left: `${distPct}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-bold text-foreground bg-background border border-foreground/30 rounded px-1.5 py-0.5">
                    {Math.round(result.totalMarks)} marks
                  </div>
                </div>
              </div>
            </div>

            {/* Colleges */}
            <div>
              <Badge className="mb-3 rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                🎯 {realisticCount} within realistic reach
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Likely colleges within reach</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Illustrative 2025-basis closing ranks for your category — not official 2026 cutoffs.
              </p>

              {result.qualifies ? (
                <div className="rounded-2xl border border-border/60 overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm min-w-[640px]">
                    <thead>
                      <tr className="bg-card/60 border-b border-border/60">
                        <th className="text-left font-bold text-[10.5px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                          College / Seat type
                        </th>
                        <th className="text-left font-bold text-[10.5px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                          Quota
                        </th>
                        <th className="text-left font-bold text-[10.5px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                          Course
                        </th>
                        <th className="text-left font-bold text-[10.5px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                          Closing AIR (2025)
                        </th>
                        <th className="text-left font-bold text-[10.5px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                          Your chance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.colleges.map((row) => (
                        <tr key={row.name} className="border-b border-border/40 last:border-b-0 hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3 font-semibold text-foreground">{row.name}</td>
                          <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{row.quota}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.course}</td>
                          <td className="px-4 py-3 font-mono text-xs text-foreground">~{fmt(row.closing)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full ${chanceTone(row.lbl.tone)}`}>
                              {row.lbl.text}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-2xl border border-border/60 bg-card/30 text-center text-sm text-muted-foreground p-8">
                  College predictions are shown once your score clears the {catInfoForResult.label} qualifying cutoff (
                  {catInfoForResult.qualMin}+ marks).
                </div>
              )}

              <p className="text-[11.5px] text-muted-foreground mt-3">
                Closing ranks shown are illustrative reference points drawn from 2025 trends for your category, not
                official 2026 cutoffs — actual closing ranks depend on seat matrix, withdrawals and counselling round.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* ===== Methodology ===== */}
      <section className="py-16 bg-card/20 border-y border-border/40 mt-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-8"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 px-3 py-1 text-xs font-bold">
                🧮 How it works
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              How this predictor works
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              Four steps, run entirely in your browser — no data leaves this page.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {METHOD_STEPS.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="rounded-2xl border border-border/50 bg-card/40 p-5 hover:border-primary/30 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-primary mb-3">{step.num}</div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Reference tables ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-10"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 px-3 py-1 text-xs font-bold">
                <TrendingUp className="mr-1.5 h-3 w-3 inline-block -mt-0.5" /> Reference data
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              NEET 2026 reference tables
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              The same bands the calculator above is built on, for general / UR basis.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-foreground mb-3">Expected rank by score</h3>
              <div className="rounded-2xl border border-border/60 overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[420px]">
                  <thead>
                    <tr className="bg-card/60 border-b border-border/60">
                      <th className="text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                        Score (/720)
                      </th>
                      <th className="text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                        Predicted AIR range
                      </th>
                      <th className="text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                        Percentile
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MARKS_RANK_TABLE.slice(0, 11).map((row) => (
                      <tr key={row.minMark} className="border-b border-border/40 last:border-b-0 hover:bg-primary/5 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                          {row.minMark < 424 ? "Below 424" : `${row.minMark} – ${row.maxMark}`}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                          {fmt(row.airLo)} – {fmt(row.airHi)}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.pctLabel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-foreground mb-3">Category-wise qualifying cutoff</h3>
              <div className="rounded-2xl border border-border/60 overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[420px]">
                  <thead>
                    <tr className="bg-card/60 border-b border-border/60">
                      <th className="text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                        Category
                      </th>
                      <th className="text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                        Qualifying percentile
                      </th>
                      <th className="text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-4 py-3">
                        Approx. marks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORY_OPTIONS.map((opt) => {
                      const info = CATEGORY_INFO[opt.value];
                      const isActive = result?.category === opt.value;
                      return (
                        <tr
                          key={opt.value}
                          className={`border-b border-border/40 last:border-b-0 transition-colors ${isActive ? "bg-primary/10 font-semibold" : "hover:bg-primary/5"
                            }`}
                        >
                          <td className="px-4 py-2.5 text-xs text-foreground">{info.label}</td>
                          <td className="px-4 py-2.5 font-mono text-xs text-foreground">{info.percentile}th</td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                            {info.qualMin} – {info.qualMax}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <HelpCircle className="mr-1.5 h-3 w-3 inline-block -mt-0.5" /> FAQs
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Frequently asked questions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              Everything candidates usually ask before trusting a rank estimate.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-3"
          >
            {FAQ_ITEMS.map((item, idx) => (
              <motion.div key={item.q} variants={fadeUp}>
                <FAQItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFAQ === idx}
                  onToggle={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Disclaimer / footer ===== */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This predictor uses statistical modelling on
              publicly available historical NTA trend data. It is built independently for estimation purposes and is
              not affiliated with, endorsed by, or sourced from NTA, MCC, or any official body. Predictions are
              directional, not guaranteed — always cross-check against official NTA results and MCC / state
              counselling cutoffs before making admission decisions.
            </p>
          </div>

          <p className="text-[11.5px] text-muted-foreground mt-6 leading-relaxed">
            <strong className="text-foreground/80">About the data:</strong> Marks-vs-rank bands and category
            qualifying cutoffs are based on NEET 2025 trends (UR/EWS qualifying 686–144, OBC/SC/ST qualifying
            113–143) and prior-year patterns (2020–2025), adjusted directionally for the expected 2026 candidate
            volume of ~22.79 lakh. College closing-rank references are indicative midpoints drawn from 2025 AIQ/state
            counselling patterns by category.
          </p>
          <p className="text-[11.5px] text-muted-foreground mt-2">
            Built as an independent, offline-capable estimator. All computation happens in your browser — no data
            leaves this page.
          </p>
        </div>
      </section>

      {/* ===== Inquiry gate ===== */}\
      <StudentInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onSuccess={handleInquirySuccess}
        hideCategoryAndCourse={true}
      />
    </div>
  );
}