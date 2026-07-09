import { z } from "zod";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  COUNSELOR = "COUNSELOR",
}

export enum UserPlan {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum CollegeType {
  PRIVATE = "PRIVATE",
  GOVT = "GOVT",
  DEEMED = "DEEMED",
  AUTONOMOUS = "AUTONOMOUS",
}

export enum ApplicationStatus {
  DRAFT = "DRAFT",
  APPLIED = "APPLIED",
  UNDER_REVIEW = "UNDER_REVIEW",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  WAITLISTED = "WAITLISTED",
}

export enum ScholarshipType {
  MERIT_BASED = "MERIT_BASED",
  NEED_BASED = "NEED_BASED",
  SPORTS = "SPORTS",
  MINORITY = "MINORITY",
  GOVERNMENT = "GOVERNMENT",
  PRIVATE = "PRIVATE",
}

export enum AIChatType {
  ADMISSION_PREDICTION = "ADMISSION_PREDICTION",
  ESSAY_REVIEW = "ESSAY_REVIEW",
  COLLEGE_RECOMMENDATION = "COLLEGE_RECOMMENDATION",
  SCHOLARSHIP_MATCHING = "SCHOLARSHIP_MATCHING",
  GENERAL_COUNSELING = "GENERAL_COUNSELING",
}

export enum NotificationType {
  DEADLINE_REMINDER = "DEADLINE_REMINDER",
  APPLICATION_UPDATE = "APPLICATION_UPDATE",
  SCHOLARSHIP_ALERT = "SCHOLARSHIP_ALERT",
  COLLEGE_UPDATE = "COLLEGE_UPDATE",
  SYSTEM = "SYSTEM",
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      plan: UserPlan;
      avatar: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    plan: UserPlan;
    avatar: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    plan: UserPlan;
    avatar: string | null;
  }
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  plan: UserPlan;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  stream: string | null;
  targetYear: number | null;
  city: string | null;
  state: string | null;
  board: string | null;
  percentage: number | null;
  jeemainsRank: number | null;
  jeeadvancedRank: number | null;
  neetRank: number | null;
  catPercentile: number | null;
  cuetScore: number | null;
  category: string | null;
  familyIncome: number | null;
  preferredCities: string[];
  preferredStreams: string[];
  budgetRange: number | null;
}

export interface UserWithProfile extends User {
  applications: Application[];
  savedColleges: SavedCollege[];
  documents: Document[];
}

export interface College {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  coverImage: string | null;
  city: string;
  state: string;
  type: CollegeType;
  established: number | null;
  nirfRank: number | null;
  naacRating: string | null;
  accreditation: string[];
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  about: string | null;
  facilities: string[] | null;
  highlights: string[] | null;
  entranceExams: string[];
  avgPackage: number | null;
  highestPackage: number | null;
  tuitionFees: number | null;
  totalFees: number | null;
  seats: number | null;
  placementRate: number | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  courses?: Course[];
  reviews?: CollegeReview[];
  cutoffs?: Cutoff[];
  placements?: Placement[];
  recruiters?: Recruiter[];
  galleryImages?: GalleryImage[];
}

export interface Course {
  id: string;
  collegeId: string;
  name: string;
  degree: string;
  duration: number;
  fees: number;
  totalSeats: number;
  availableSeats: number | null;
  eligibility: string | null;
  description: string | null;
  careerProspects: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  college?: College;
  cutoffs?: Cutoff[];
}

export interface Cutoff {
  id: string;
  collegeId: string;
  courseId: string | null;
  year: number;
  examType: string;
  category: string;
  openingRank: number;
  closingRank: number;
  createdAt: Date;
  course?: Course | null;
}

export interface Placement {
  id: string;
  collegeId: string;
  year: number;
  avgPackage: number;
  highestPackage: number;
  medianPackage: number | null;
  placementRate: number;
  totalStudents: number;
  placedStudents: number;
  createdAt: Date;
}

export interface Recruiter {
  id: string;
  collegeId: string;
  name: string;
  logo: string | null;
  industry: string | null;
  tier: string | null;
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  collegeId: string;
  url: string;
  caption: string | null;
  category: string | null;
  createdAt: Date;
}

export interface Application {
  id: string;
  userId: string;
  collegeId: string;
  courseId: string | null;
  status: ApplicationStatus;
  appliedAt: Date | null;
  deadline: Date | null;
  documents: unknown;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  college?: College;
  course?: Course | null;
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  savedAt: Date;
  college?: College;
}

export interface CollegeReview {
  id: string;
  userId: string;
  collegeId: string;
  rating: number;
  title: string;
  body: string;
  pros: string[];
  cons: string[];
  batch: number | null;
  course: string | null;
  placementRating: number | null;
  facultyRating: number | null;
  campusRating: number | null;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  providerLogo: string | null;
  amount: number;
  type: ScholarshipType;
  eligibility: {
    criteria: string[];
    minPercentage?: number;
    familyIncomeMax?: number;
    category?: string[];
    state?: string;
    examRank?: string;
  };
  deadline: Date | null;
  applicationLink: string | null;
  applyLink?: string;
  description: string;
  documents: string[];
  renewable: boolean;
  stateSpecific: string | null;
  categorySpecific: string | null;
  examSpecific: string | null;
  minPercentage: number | null;
  familyIncomeMax: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  body: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  views: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  answers?: ForumAnswer[];
  answerCount?: number;
}

export interface ForumAnswer {
  id: string;
  postId: string;
  userId: string;
  body: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface ForumVote {
  id: string;
  userId: string;
  postId: string | null;
  answerId: string | null;
  type: "UPVOTE" | "DOWNVOTE";
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  link: string | null;
  metadata: unknown;
  createdAt: Date;
}

export interface AISession {
  id: string;
  userId: string;
  type: AIChatType;
  title: string | null;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  url: string;
  type: string;
  size: number;
  mimeType: string;
  collegeId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  status: string;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alumni {
  id: string;
  userId: string;
  collegeId: string;
  course: string;
  batch: number;
  currentRole: string | null;
  currentCompany: string | null;
  linkedInUrl: string | null;
  isAvailable: boolean;
  bio: string | null;
  expertise: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CollegeFilters {
  states?: string[];
  cities?: string[];
  types?: CollegeType[];
  minFees?: number;
  maxFees?: number;
  minNirfRank?: number;
  maxNirfRank?: number;
  entranceExams?: string[];
  minRating?: number;
  accreditation?: string[];
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "nirfRank" | "fees" | "rating" | "established";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface AdmitPredictionInput {
  rank: number;
  exam: "JEE" | "NEET" | "CAT" | "CUET";
  category: string;
  collegeId: string;
  courseId?: string;
}

export interface AdmitPredictionResult {
  probability: number;
  confidence: "high" | "medium" | "low";
  reasoning: string;
  safeRange?: { min: number; max: number };
  historicalCutoffs?: Cutoff[];
}

export interface EssayReviewInput {
  essay: string;
  type: "SOP" | "LOR" | "COMMON_APP" | "PERSONAL_STATEMENT";
  targetCollege?: string;
  targetCourse?: string;
}

export interface EssayReviewResult {
  overallScore: number;
  dimensionScores: {
    clarity: number;
    relevance: number;
    grammar: number;
    impact: number;
    structure: number;
    uniqueness: number;
  };
  suggestions: {
    text: string;
    type: "grammar" | "style" | "content" | "structure";
    startIndex: number;
    endIndex: number;
  }[];
  rewrittenVersion?: string;
}

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  stream: z.string().optional(),
  targetYear: z.number().int().min(2024).max(2030).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  board: z.string().optional(),
  percentage: z.number().min(0).max(100).optional(),
  jeemainsRank: z.number().int().positive().optional(),
  jeeadvancedRank: z.number().int().positive().optional(),
  neetRank: z.number().int().positive().optional(),
  catPercentile: z.number().min(0).max(100).optional(),
  cuetScore: z.number().min(0).max(100).optional(),
  category: z.enum(["General", "OBC", "SC", "ST", "EWS"]).optional(),
  familyIncome: z.number().int().positive().optional(),
  preferredCities: z.array(z.string()).optional(),
  preferredStreams: z.array(z.string()).optional(),
  budgetRange: z.number().int().positive().optional(),
});

export const collegeSearchSchema = z.object({
  search: z.string().optional(),
  states: z.array(z.string()).optional(),
  cities: z.array(z.string()).optional(),
  types: z.array(z.enum(["PRIVATE", "GOVT", "DEEMED", "AUTONOMOUS"])).optional(),
  country: z.string().optional(),
  minFees: z.number().optional(),
  maxFees: z.number().optional(),
  minNirfRank: z.number().int().optional(),
  maxNirfRank: z.number().int().optional(),
  entranceExams: z.array(z.string()).optional(),
  minRating: z.number().min(1).max(5).optional(),
  accreditation: z.array(z.string()).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),
  sortBy: z.enum(["nirfRank", "fees", "rating", "established"]).default("nirfRank"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const applicationSchema = z.object({
  collegeId: z.string().uuid(),
  courseId: z.string().uuid().optional(),
  status: z.enum(["DRAFT", "APPLIED", "UNDER_REVIEW", "ACCEPTED", "REJECTED", "WAITLISTED"]),
  deadline: z.date().optional(),
  notes: z.string().optional(),
});

export const reviewSchema = z.object({
  collegeId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(5).max(200),
  body: z.string().min(50).max(5000),
  pros: z.array(z.string().max(100)).max(5),
  cons: z.array(z.string().max(100)).max(5),
  batch: z.number().int().min(1950).max(2030).optional(),
  course: z.string().optional(),
  placementRating: z.number().int().min(1).max(5).optional(),
  facultyRating: z.number().int().min(1).max(5).optional(),
  campusRating: z.number().int().min(1).max(5).optional(),
});

export const forumPostSchema = z.object({
  title: z.string().min(10).max(200),
  body: z.string().min(20).max(10000),
  tags: z.array(z.string().max(30)).max(5),
});

export const forumAnswerSchema = z.object({
  postId: z.string().uuid(),
  body: z.string().min(10).max(5000),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type CollegeSearchInput = z.infer<typeof collegeSearchSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ForumPostInput = z.infer<typeof forumPostSchema>;
export type ForumAnswerInput = z.infer<typeof forumAnswerSchema>;
