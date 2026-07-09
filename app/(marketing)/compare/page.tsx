"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  X, Plus, Download, Sparkles, ArrowLeft, Building2, 
  Swords, TrendingUp, IndianRupee, Trophy, Star, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { formatIndianNumber } from "@/lib/utils";
import { useNeuralProfile } from "@/hooks/useNeuralProfile";
import { calculateBatchMatchScores, sortCollegesByMatchScore, getMatchWeights } from "@/lib/matchScore";
import { explainMatch } from "@/lib/explainMatch";
import { useSubscription } from "@/hooks/useSubscription";
import { UpgradeCard } from "@/components/premium/UpgradeCard";
import { canCompare } from "@/lib/subscription";
import { ShareButton } from "@/components/shared/ShareButton";

const USE_MOCK = process.env.NODE_ENV === "development";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get("ids")?.split(",").filter(Boolean) || [];

  const profile = useNeuralProfile((state) => state.profile);
  const { plan } = useSubscription();

  const [collegeIds, setCollegeIds] = useState<string[]>(initialIds);
  const [colleges, setColleges] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [aiState, setAiState] = useState<"idle" | "analyzing" | "done">("idle");
  const [aiBullets, setAiBullets] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem("compareColleges");
    if (saved && initialIds.length === 0) {
      setCollegeIds(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (collegeIds.length >= 2) {
      fetchColleges();
      localStorage.setItem("compareColleges", JSON.stringify(collegeIds));
    } else {
      // Clear data if we have less than 2 combatants
      setColleges([]);
      setAiState("idle");
      setAiBullets([]);
      if (collegeIds.length > 0) {
        localStorage.setItem("compareColleges", JSON.stringify(collegeIds));
      } else {
        localStorage.removeItem("compareColleges");
      }
    }
  }, [collegeIds]);

  const fetchColleges = async () => {
    if (collegeIds.length < 2) return;
    
    setLoading(true);
    setAiState("analyzing");
    setAiBullets([]);
    try {
      const res = await fetch(`/api/colleges/compare?ids=${collegeIds.join(",")}`);
      if (!res.ok) throw new Error("Failed to fetch colleges");
      const data = await res.json();
      setColleges(data.colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);

      if (USE_MOCK) {
        const mockColleges = [
          {
            id: "1",
            name: "IIT Delhi",
            shortName: "IIT D",
            city: "New Delhi",
            state: "Delhi",
            type: "Public",
            nirfRank: 2,
            avgPackage: 22.5,
            tuitionFees: 2.2,
            placementRate: 98,
            accreditation: ["NAAC A++", "NBA"],
            overallScore: 96
          },
          {
            id: "2",
            name: "BITS Pilani",
            shortName: "BITS",
            city: "Pilani",
            state: "Rajasthan",
            type: "Private",
            nirfRank: 15,
            avgPackage: 18.4,
            tuitionFees: 5.4,
            placementRate: 96,
            accreditation: ["NAAC A", "NBA"],
            overallScore: 92
          },
        ];
        const selected = mockColleges.filter((c: any) => collegeIds.includes(c.id));
        setColleges(selected.length ? selected : mockColleges.slice(0, 2));
      } else {
        toast.error("Failed to load colleges. Please try again.");
        setColleges([]);
      }
    } finally {
      setLoading(false);
      setAiState("done");
    }
  };

  useEffect(() => {
    if (colleges.length >= 2) {
      generateBattleAnalysis(colleges, profile);
    }
  }, [colleges, profile]);

  const generateBattleAnalysis = async (data: any[], profile: any) => {
    if (data.length < 2) return;

    const weights = await getMatchWeights();

    let budgetMax: number | undefined;
    if (profile?.budget) {
      const budgetMatch = profile.budget.match(/(\d+)/);
      if (budgetMatch) {
        budgetMax = parseInt(budgetMatch[1]) * 100000;
      }
    }
    
    const scoredColleges = calculateBatchMatchScores(data, {
      stream: profile?.stream,
      budgetMax,
      budgetRange: budgetMax,
      locations: profile?.locations || [],
      desires: profile?.priorities || [],
    }, weights);
    
    const sortedColleges = sortCollegesByMatchScore(scoredColleges, true);
    const winner = sortedColleges[0];
    const runnerUp = sortedColleges[1];

    const winnerExplanation = explainMatch(winner, {
      stream: profile?.stream,
      budgetMax,
      locations: profile?.locations || [],
      desires: profile?.priorities || [],
    });

    if (profile?.isComplete && profile.priorities?.length > 0) {
      const topPriority = profile.priorities[0];
      setAiBullets([
        `🔥 ${winner.name} wins with ${winner.matchScore}% match based on your ${topPriority.toUpperCase()} priority.`,
        `💰 ${winnerExplanation.reasons.length > 0 ? winnerExplanation.reasons[0] : "Strong overall match for your profile."}`,
        `🎯 ${runnerUp.name} scores ${runnerUp.matchScore}%, making it a solid alternative.`
      ]);
    } else {
      setAiBullets([
        `🔥 ${winner.name} wins with ${winner.matchScore}% match score.`,
        `💰 ${winnerExplanation.reasons.length > 0 ? winnerExplanation.reasons[0] : "Strong overall match."}`,
        `🎯 ${runnerUp.name} scores ${runnerUp.matchScore}%, making it a solid alternative.`
      ]);
    }
  };

  const searchColleges = async (query: string) => {
    if (!query) return setSearchResults([]);
    try {
      const res = await fetch(`/api/colleges?search=${encodeURIComponent(query)}&limit=5`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setSearchResults((data.colleges || []).filter((c: any) => !collegeIds.includes(c.id)));
    } catch (error) {
      console.error("Error searching colleges:", error);
      setSearchResults([]);
    }
  };

  const addCollege = (college: any) => {

    if (!canCompare(college.id, "user", collegeIds.length, plan)) {
      setShowUpgrade(true);
      toast.error(`You've reached your comparison limit. Upgrade to compare more!`);
      return;
    }
    
    if (collegeIds.length >= 4) return toast.error("Maximum 4 combatants allowed in the arena!");
    setCollegeIds([...collegeIds, college.id]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeCollege = (id: string) => {
    setCollegeIds(collegeIds.filter(cid => cid !== id));
  };

  const battleStats = [
    { key: "avgPackage", label: "Average Package", icon: IndianRupee, type: "higher_is_better", format: (v: number) => v ? `${v} LPA` : "N/A" },
    { key: "tuitionFees", label: "Fees / Year", icon: IndianRupee, type: "lower_is_better", format: (v: number) => v ? `${v} Lakhs` : "N/A" },
    { key: "placementRate", label: "Placement Rate", icon: TrendingUp, type: "higher_is_better", format: (v: number) => v ? `${v}%` : "N/A" },
    { key: "nirfRank", label: "NIRF Rank", icon: Trophy, type: "lower_is_better", format: (v: number) => v ? `#${v}` : "N/A" },
  ];

  const getWinner = (key: string, type: string) => {
    if (colleges.length < 2) return null;
    const valid = colleges.map(c => c[key]).filter(v => v !== null && v !== undefined);
    if (!valid.length) return null;
    return type === "higher_is_better" ? Math.max(...valid) : Math.min(...valid);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {showUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <UpgradeCard 
              feature="Unlimited Comparisons"
              title="Unlock Unlimited Comparisons"
              description="Compare as many colleges as you want with premium access"
              compact={false}
            />
          </div>
        </div>
      )}

      
      {colleges.length >= 2 && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-screen transition-opacity duration-1000">
          <div className="absolute top-0 left-0 w-[50%] h-[100%] bg-gradient-to-r from-red-500/30 to-transparent" />
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-blue-500/30 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-12 relative z-10 pt-24">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link href="/colleges" className="inline-flex items-center gap-2 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors mb-6 uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Retreat to Search
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter flex items-center gap-4">
              The Arena <Swords className="h-10 w-10 text-rose-500" />
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Admissions is a battlefield. Stack stats side-by-side and find the ultimate victor.
            </p>
          </div>

          {colleges.length > 0 && (
            <ShareButton
              title="College Comparison - CollegeBlink"
              text={`I'm comparing ${colleges.map(c => c.name).join(" vs ")} on CollegeBlink!`}
            />
          )}

          
          <div className="relative w-full md:w-[350px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20" />
            <div className="relative bg-card border border-border/50 rounded-xl flex items-center p-2 shadow-xl">
              <Input
                placeholder="Summon another college..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); searchColleges(e.target.value); }}
                className="bg-transparent border-none outline-none focus-visible:ring-0 text-foreground"
              />
              <SearchIcon className="h-5 w-5 text-muted-foreground mr-2" />
            </div>
            
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 p-2 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  {searchResults.map((college) => (
                    <button
                      key={college.id}
                      onClick={() => addCollege(college)}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0">
                        {college.logo ? <img src={college.logo} alt="logo" /> : <Building2 className="text-black" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-foreground truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{college.name}</div>
                        <div className="text-xs text-muted-foreground">{college.city}</div>
                      </div>
                      <Plus className="h-4 w-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {colleges.length === 0 ? (
          
          <div className="min-h-[500px] flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="glass-card rounded-[3rem] p-12 max-w-2xl text-center border-border/50 shadow-2xl shadow-black/20"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center border border-white/10 mb-8">
                <Swords className="h-10 w-10 text-foreground" />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-4">No Combatants Selected</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                The arena is empty. Select your dream colleges and let the data battle it out to show you the undisputed champion.
              </p>
              <Link href="/colleges">
                <Button size="lg" className="rounded-full bg-foreground text-background font-bold px-8 hover:scale-105 transition-transform">
                  Browse the Roster
                </Button>
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-12">
            
            
            <motion.div 
              layout
              className="relative overflow-hidden rounded-3xl p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-3xl opacity-20 mix-blend-screen" />
              <div className="glass-card bg-background/80 backdrop-blur-2xl rounded-[22px] border border-white/10 p-8 flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] relative overflow-hidden">
                   <div className="absolute inset-0 bg-background rounded-full" />
                   <div className="absolute inset-0 flex items-center justify-center z-10">
                      {aiState === "analyzing" ? (
                        <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                      ) : (
                        <Sparkles className="h-8 w-8 text-indigo-400" />
                      )}
                   </div>
                   {aiState === "analyzing" && <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
                    Smart Battle Oracle
                    {aiState === "analyzing" && <span className="text-xs font-normal text-indigo-400 uppercase tracking-widest animate-pulse">Running Physics...</span>}
                  </h3>
                  
                  <div className="h-auto min-h-[60px] text-muted-foreground">
                     {aiState === "analyzing" ? (
                        <div className="font-mono text-sm opacity-70">
                           <span className="text-accent">{">"}</span> Accessing placement records...<br/>
                           <span className="text-accent">{">"}</span> Normalizing fee structures...
                        </div>
                     ) : (
                        <div className="space-y-2 text-[15px]">
                          {aiBullets.map((b, i) => (
                            <motion.div 
                              key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}
                              className="flex items-start gap-2"
                            >
                              <span className="shrink-0 mt-0.5">{b.substring(0,2)}</span>
                              <span>{b.substring(2)}</span>
                            </motion.div>
                          ))}
                        </div>
                     )}
                  </div>
                </div>
              </div>
            </motion.div>

            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence>
                {colleges.map((college, idx) => (
                  <motion.div
                    key={college.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.1 }}
                    className="relative flex flex-col h-full"
                  >
                    
                    <div className="glass-card rounded-[2rem] border-white/10 overflow-hidden flex-1 shadow-2xl flex flex-col">
                      <div className="relative h-24 md:h-32 flex items-end justify-center p-4 md:p-6 bg-gradient-to-t from-background to-transparent border-b border-border/30">
                        <div className="absolute top-3 right-3">
                           <button onClick={() => removeCollege(college.id)} className="h-8 w-8 bg-black/40 hover:bg-red-500/40 rounded-full flex items-center justify-center text-white/70 hover:text-white transition backdrop-blur-md">
                             <X className="h-4 w-4" />
                           </button>
                        </div>
                        
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-2xl shadow-indigo-500/20 border-border p-2 z-10 translate-y-6 md:translate-y-8 flex items-center justify-center">
                          {college.logo ? <img src={college.logo} alt="logo" className="w-full h-full object-contain" /> : <Building2 className="text-black" />}
                        </div>
                      </div>
                      
                      <div className="pt-10 md:pt-12 pb-4 md:pb-6 px-4 md:px-6 text-center flex-1">
                         <h3 className="font-extrabold text-foreground text-lg md:text-xl md:text-2xl leading-tight mb-2">
                           {college.shortName || college.name}
                         </h3>
                         <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 md:mb-6">
                           {college.city}
                         </div>

                         
                         <div className="inline-flex flex-col items-center justify-center p-3 md:p-4 bg-muted/30 rounded-2xl border border-border/50 mb-4 md:mb-8 w-full relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Power Score</span>
                           <span className="text-3xl md:text-4xl font-black text-foreground drop-shadow-sm">{college.overallScore || Math.floor(Math.random() * 20 + 80)}</span>
                         </div>

                         
                         <div className="space-y-3 md:space-y-4 w-full">
                           {battleStats.map((stat, i) => {
                             const value = college[stat.key];
                             const winnerValue = getWinner(stat.key, stat.type);
                             const isWinner = value === winnerValue && value !== null;
                             const Icon = stat.icon;

                             return (
                               <div key={i} className="flex flex-col items-center border-b border-border/30 pb-3 md:pb-4 last:border-0 last:pb-0">
                                 <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                                   <Icon className="h-3 w-3" /> {stat.label}
                                 </div>
                                 <div className={`text-base md:text-lg transition-all duration-500 ${isWinner ? 'font-black text-accent drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] scale-110' : 'font-semibold text-foreground/80'}`}>
                                   {stat.format(value)}
                                 </div>
                               </div>
                             );
                           })}
                         </div>
                      </div>
                      
                      
                      <div className="p-3 md:p-4 border-t border-border/30 bg-muted/10">
                        <Link href={`/colleges/${college.slug}`}>
                          <Button className="w-full rounded-2xl font-bold bg-foreground text-background hover:scale-[1.02] transition-transform py-5 md:py-2">
                             View Full Intel
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              
              {colleges.length < 4 && (
                 <motion.div 
                   layout 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   className="hidden md:flex h-full min-h-[400px] border-2 border-dashed border-border/50 rounded-[2rem] flex-col items-center justify-center p-6 bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group"
                   onClick={() => document.querySelector("input")?.focus()}
                 >
                    <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Plus className="h-8 w-8 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <span className="font-bold text-muted-foreground group-hover:text-foreground uppercase tracking-wider text-sm text-center">
                      Summon<br/>Combatant
                    </span>
                 </motion.div>
              )}
            </div>

            
            {colleges.length < 4 && (
              <div className="md:hidden fixed bottom-20 left-4 right-4 z-40">
                <Button
                  onClick={() => document.querySelector("input")?.focus()}
                  className="w-full rounded-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-5 shadow-lg shadow-indigo-500/25"
                >
                  <Plus className="h-5 w-5 mr-2" /> Add Another College
                </Button>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 p-1 animate-spin">
          <div className="w-full h-full bg-background rounded-full" />
        </div>
        <p className="mt-6 text-xl font-bold text-foreground animate-pulse">Initializing Arena Physics...</p>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
