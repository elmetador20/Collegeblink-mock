export interface UserInteraction {
  collegeId: string;
  type: "click" | "save" | "compare" | "view" | "apply";
  timestamp: number;
  userId: string;
}

export interface CollegeBoost {
  collegeId: string;
  boostScore: number;
  interactionCount: number;
  lastInteraction: number;
}

const INTERACTION_WEIGHTS = {
  view: 1,
  click: 3,
  save: 10,
  compare: 5,
  apply: 15,
};

const DECAY_RATE = 0.95;
const MAX_BOOST = 20;

class LearningSystem {
  private interactions: Map<string, UserInteraction[]> = new Map();
  private boosts: Map<string, CollegeBoost> = new Map();

  trackInteraction(interaction: UserInteraction) {
    const key = `${interaction.userId}-${interaction.collegeId}`;
    if (!this.interactions.has(key)) {
      this.interactions.set(key, []);
    }
    this.interactions.get(key)!.push(interaction);
    
    this.updateBoost(interaction);
  }

  private updateBoost(interaction: UserInteraction) {
    const key = interaction.collegeId;
    const userInteractions = this.getUserInteractions(interaction.userId, interaction.collegeId);
    
    const totalScore = userInteractions.reduce((sum, inter) => {
      return sum + INTERACTION_WEIGHTS[inter.type];
    }, 0);

    const now = Date.now();
    const recentInteractions = userInteractions.filter(
      inter => (now - inter.timestamp) < 7 * 24 * 60 * 60 * 1000    );
    
    const decayedScore = recentInteractions.reduce((sum, inter) => {
      const daysSinceInteraction = (now - inter.timestamp) / (24 * 60 * 60 * 1000);
      const decay = Math.pow(DECAY_RATE, daysSinceInteraction);
      return sum + INTERACTION_WEIGHTS[inter.type] * decay;
    }, 0);

    const boostScore = Math.min(MAX_BOOST, decayedScore);

    this.boosts.set(key, {
      collegeId: interaction.collegeId,
      boostScore,
      interactionCount: userInteractions.length,
      lastInteraction: now,
    });
  }

  getUserInteractions(userId: string, collegeId: string): UserInteraction[] {
    const key = `${userId}-${collegeId}`;
    return this.interactions.get(key) || [];
  }

  getBoostScore(collegeId: string): number {
    const boost = this.boosts.get(collegeId);
    if (!boost) return 0;

    const daysSinceLastInteraction = (Date.now() - boost.lastInteraction) / (24 * 60 * 60 * 1000);
    const decayedBoost = boost.boostScore * Math.pow(DECAY_RATE, daysSinceLastInteraction);
    
    return Math.round(Math.max(0, decayedBoost));
  }

  getPersonalizedRanking(
    colleges: Array<{ id: string; matchScore?: number }>,
    userId: string
  ): Array<{ id: string; matchScore?: number; personalizedScore: number }> {
    return colleges.map(college => {
      const boost = this.getBoostScore(college.id);
      const baseScore = college.matchScore || 0;
      const personalizedScore = Math.min(100, baseScore + boost);
      
      return {
        ...college,
        personalizedScore,
      };
    }).sort((a, b) => b.personalizedScore - a.personalizedScore);
  }

  getUserInsights(userId: string): {
    topInteractedColleges: Array<{ collegeId: string; count: number }>;
    interactionPatterns: {
      totalViews: number;
      totalSaves: number;
      totalCompares: number;
      totalClicks: number;
    };
  } {
    const userInteractions: UserInteraction[] = [];
    
    this.interactions.forEach((interactions, key) => {
      if (key.startsWith(userId)) {
        userInteractions.push(...interactions);
      }
    });

    const collegeCounts = new Map<string, number>();
    userInteractions.forEach(inter => {
      collegeCounts.set(inter.collegeId, (collegeCounts.get(inter.collegeId) || 0) + 1);
    });

    const topInteractedColleges = Array.from(collegeCounts.entries())
      .map(([collegeId, count]) => ({ collegeId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const interactionPatterns = {
      totalViews: userInteractions.filter(i => i.type === "view").length,
      totalSaves: userInteractions.filter(i => i.type === "save").length,
      totalCompares: userInteractions.filter(i => i.type === "compare").length,
      totalClicks: userInteractions.filter(i => i.type === "click").length,
    };

    return {
      topInteractedColleges,
      interactionPatterns,
    };
  }

  cleanupOldInteractions(daysToKeep: number = 30) {
    const cutoff = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    
    this.interactions.forEach((interactions, key) => {
      const filtered = interactions.filter(inter => inter.timestamp > cutoff);
      if (filtered.length === 0) {
        this.interactions.delete(key);
      } else {
        this.interactions.set(key, filtered);
      }
    });

    this.boosts.forEach((boost, key) => {
      if (boost.lastInteraction < cutoff) {
        this.boosts.delete(key);
      }
    });
  }
}

const learningSystem = new LearningSystem();

export default learningSystem;

export function trackCollegeClick(userId: string, collegeId: string) {
  learningSystem.trackInteraction({
    collegeId,
    type: "click",
    timestamp: Date.now(),
    userId,
  });
}

export function trackCollegeSave(userId: string, collegeId: string) {
  learningSystem.trackInteraction({
    collegeId,
    type: "save",
    timestamp: Date.now(),
    userId,
  });
}

export function trackCollegeCompare(userId: string, collegeId: string) {
  learningSystem.trackInteraction({
    collegeId,
    type: "compare",
    timestamp: Date.now(),
    userId,
  });
}

export function trackCollegeView(userId: string, collegeId: string) {
  learningSystem.trackInteraction({
    collegeId,
    type: "view",
    timestamp: Date.now(),
    userId,
  });
}

export function trackCollegeApply(userId: string, collegeId: string) {
  learningSystem.trackInteraction({
    collegeId,
    type: "apply",
    timestamp: Date.now(),
    userId,
  });
}

export function getPersonalizedRanking(
  colleges: Array<{ id: string; matchScore?: number }>,
  userId: string
) {
  return learningSystem.getPersonalizedRanking(colleges, userId);
}

export function getUserInsights(userId: string) {
  return learningSystem.getUserInsights(userId);
}
