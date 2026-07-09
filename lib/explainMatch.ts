import { College, UserProfile, MatchWeights } from "./matchScore";
import { getMatchWeights } from "./matchScore";

export interface MatchExplanation {
  score: number;
  reasons: string[];
  improvements: string[];
  strengths: string[];
}

export function explainMatch(
  college: College,
  profile: UserProfile,
  weights?: MatchWeights
): MatchExplanation {
  const reasons: string[] = [];
  const improvements: string[] = [];
  const strengths: string[] = [];

  const collegeFees = college.fees || college.tuitionFees || 0;
  const userBudget = profile.budgetMax || profile.budgetRange || Infinity;
  const userLocations = profile.locations || profile.preferredCities || [];
  const userDesires = profile.desires || profile.priorities || [];
  const collegeTags = college.tags || [];
  const collegeLocation = college.location || college.city || college.state;

  if (collegeFees > 0 && userBudget > 0) {
    if (collegeFees <= userBudget) {
      reasons.push("Fits perfectly within your budget");
      strengths.push("Affordable for your budget");
    } else if (collegeFees <= userBudget * 1.1) {
      reasons.push("Slightly over budget but worth considering");
      improvements.push("Consider slight budget increase");
    } else {
      improvements.push("Exceeds your budget significantly");
    }
  }

  if (collegeLocation && userLocations.length > 0) {
    const locationMatch = userLocations.some(
      (loc) => 
        loc.toLowerCase() === collegeLocation?.toLowerCase() ||
        loc.toLowerCase() === college.state?.toLowerCase()
    );
    if (locationMatch) {
      reasons.push(`Matches your preferred location (${collegeLocation})`);
      strengths.push("In your preferred area");
    } else {
      improvements.push(`Not in your preferred locations: ${userLocations.join(", ")}`);
    }
  }

  if (profile.stream && college.stream) {
    const streamMatch = college.stream.toLowerCase() === profile.stream.toLowerCase();
    if (streamMatch) {
      reasons.push(`Offers your preferred stream: ${college.stream}`);
      strengths.push("Perfect stream match");
    } else {
      improvements.push(`Doesn't offer ${profile.stream}, offers ${college.stream}`);
    }
  }

  if (userDesires.length > 0 && collegeTags.length > 0) {
    const matchedDesires = userDesires.filter((desire) =>
      collegeTags.some((tag) => tag.toLowerCase().includes(desire.toLowerCase()))
    );

    if (matchedDesires.length > 0) {
      reasons.push(`Matches your priorities: ${matchedDesires.join(", ")}`);
      strengths.push(`Aligns with ${matchedDesires.length} of your priorities`);
    }

    const unmatchedDesires = userDesires.filter(
      (desire) => !matchedDesires.includes(desire)
    );
    if (unmatchedDesires.length > 0) {
      improvements.push(`Could improve on: ${unmatchedDesires.join(", ")}`);
    }
  }

  if (college.nirfRank) {
    if (college.nirfRank <= 10) {
      reasons.push("Top-tier institution (NIRF Top 10)");
      strengths.push("Excellent NIRF ranking");
    } else if (college.nirfRank <= 50) {
      reasons.push("Highly ranked institution (NIRF Top 50)");
      strengths.push("Good NIRF ranking");
    } else if (college.nirfRank <= 100) {
      reasons.push("Well-ranked institution (NIRF Top 100)");
    }
  }

  if (college.placementRate) {
    if (college.placementRate >= 90) {
      reasons.push("Excellent placement record");
      strengths.push("Outstanding placement rate");
    } else if (college.placementRate >= 80) {
      reasons.push("Strong placement record");
      strengths.push("Good placement rate");
    } else if (college.placementRate >= 70) {
      reasons.push("Decent placement record");
    } else {
      improvements.push("Placement rate could be better");
    }
  }

  if (college.avgPackage && collegeFees > 0) {
    const roi = (college.avgPackage / collegeFees) * 100;
    if (roi > 100) {
      reasons.push("Exceptional ROI potential");
      strengths.push("High return on investment");
    } else if (roi > 50) {
      reasons.push("Good ROI potential");
      strengths.push("Solid return on investment");
    } else {
      improvements.push("ROI could be improved");
    }
  }

  const score = weights 
    ? calculateMatchScoreWithWeights(college, profile, weights)
    : 0;

  return {
    score,
    reasons: reasons.slice(0, 4), 
    improvements: improvements.slice(0, 3),
    strengths: strengths.slice(0, 3),
  };
}

function calculateMatchScoreWithWeights(
  college: College,
  profile: UserProfile,
  weights: MatchWeights
): number {
  let score = 0;
  let maxScore = 100;

  if (profile.stream && college.stream) {
    const streamMatch = college.stream.toLowerCase() === profile.stream.toLowerCase();
    if (streamMatch) score += weights.stream;
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
    if (locationMatch) score += weights.location;
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

  const normalizedScore = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return Math.round(Math.min(100, Math.max(0, normalizedScore)));
}

export function getMatchScoreColor(score: number): string {
  if (score >= 80) return "text-accent dark:text-accent";
  if (score >= 60) return "text-yellow-700 dark:text-yellow-400";
  if (score >= 40) return "text-orange-700 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function getMatchScoreBadgeColor(score: number): string {
  if (score >= 80) return "bg-accent/20 text-accent dark:text-accent border-accent/30";
  if (score >= 60) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30";
  if (score >= 40) return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30";
  return "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30";
}

export function getMatchScoreLabel(score: number): string {
  if (score >= 90) return "Perfect Match";
  if (score >= 80) return "Excellent Match";
  if (score >= 70) return "Great Match";
  if (score >= 60) return "Good Match";
  if (score >= 50) return "Fair Match";
  if (score >= 40) return "Average Match";
  return "Low Match";
}
