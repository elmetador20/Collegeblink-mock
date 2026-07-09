import * as backend from "@/lib/backend";

const scoreCache = new Map<string, number>();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(college: College, profile: UserProfile, weights: MatchWeights): string {
  return `${college.id}-${profile.stream}-${profile.budgetMax}-${profile.locations?.join(',')}-${profile.desires?.join(',')}-${weights.stream}-${weights.budget}-${weights.location}-${weights.desires}`;
}

export interface MatchWeights {
  stream: number;
  budget: number;
  location: number;
  desires: number;
}

export interface College {
  id: string;
  name: string;
  stream?: string;
  fees?: number;
  tuitionFees?: number;
  location?: string;
  city?: string;
  state?: string;
  tags?: string[];
  placementRate?: number;
  avgPackage?: number;
  nirfRank?: number;
}

export interface UserProfile {
  stream?: string;
  budgetMax?: number;
  budgetRange?: number;
  locations?: string[];
  preferredCities?: string[];
  desires?: string[];
  priorities?: string[];
}

const DEFAULT_WEIGHTS: MatchWeights = {
  stream: 30,
  budget: 25,
  location: 20,
  desires: 25,
};

export async function getMatchWeights(): Promise<MatchWeights> {
  try {
    const config = await backend.getAIConfig();
    if (!config) return DEFAULT_WEIGHTS;
    return {
      stream: (config as any).roiWeight || 30,
      budget: (config as any).feesWeight || 25,
      location: (config as any).locationWeight || 20,
      desires: (config as any).placementWeight || 25,
    };
  } catch (error) {
    return DEFAULT_WEIGHTS;
  }
}

export function calculateMatchScore(
  college: College,
  profile: UserProfile,
  weights: MatchWeights = DEFAULT_WEIGHTS
): number {

  const cacheKey = getCacheKey(college, profile, weights);
  const cached = scoreCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  let score = 0;
  let maxScore = 100;

  if (profile.stream && college.stream) {
    const streamMatch = college.stream.toLowerCase() === profile.stream.toLowerCase();
    if (streamMatch) {
      score += weights.stream;
    }
    maxScore -= weights.stream;
  }

  const collegeFees = college.fees || college.tuitionFees || 0;
  const userBudget = profile.budgetMax || profile.budgetRange || Infinity;
  if (collegeFees > 0 && userBudget > 0) {
    if (collegeFees <= userBudget) {
      score += weights.budget;
    } else {

      const overBudgetRatio = collegeFees / userBudget;
      if (overBudgetRatio <= 1.2) {
        score += weights.budget * (1 - (overBudgetRatio - 1) * 2);
      }
    }
    maxScore -= weights.budget;
  }

  const userLocations = profile.locations || profile.preferredCities || [];
  const collegeLocation = college.location || college.city || college.state;
  if (collegeLocation && userLocations.length > 0) {
    const locationMatch = userLocations.some(
      (loc) => 
        loc.toLowerCase() === collegeLocation?.toLowerCase() ||
        loc.toLowerCase() === college.state?.toLowerCase()
    );
    if (locationMatch) {
      score += weights.location;
    }
    maxScore -= weights.location;
  }

  const userDesires = profile.desires || profile.priorities || [];
  const collegeTags = college.tags || [];
  if (userDesires.length > 0 && collegeTags.length > 0) {
    const matchedDesires = userDesires.filter((desire) =>
      collegeTags.some((tag) => tag.toLowerCase().includes(desire.toLowerCase()))
    );
    const desireScore = (matchedDesires.length / userDesires.length) * weights.desires;
    score += desireScore;
    maxScore -= weights.desires;
  }

  if (college.nirfRank && college.nirfRank <= 50) {
    score += Math.max(0, (50 - college.nirfRank) * 0.2);
  }

  if (college.placementRate && college.placementRate > 80) {
    score += (college.placementRate - 80) * 0.1;
  }

  if (college.avgPackage && collegeFees > 0) {
    const roi = (college.avgPackage / collegeFees) * 100;
    if (roi > 50) {
      score += Math.min(5, (roi - 50) * 0.1);
    }
  }

  const normalizedScore = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const finalScore = Math.round(Math.min(100, Math.max(0, normalizedScore)));

  scoreCache.set(cacheKey, finalScore);

  setTimeout(() => scoreCache.delete(cacheKey), CACHE_TTL);

  return finalScore;
}

export function calculateBatchMatchScores(
  colleges: College[],
  profile: UserProfile,
  weights?: MatchWeights
): Array<College & { matchScore: number }> {
  return colleges.map((college) => ({
    ...college,
    matchScore: calculateMatchScore(college, profile, weights),
  }));
}

export function sortCollegesByMatchScore(
  colleges: Array<College & { matchScore: number }>,
  descending: boolean = true
): Array<College & { matchScore: number }> {
  return [...colleges].sort((a, b) =>
    descending ? b.matchScore - a.matchScore : a.matchScore - b.matchScore
  );
}
