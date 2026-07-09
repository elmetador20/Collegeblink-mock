// Server-side backend logic using Prisma
"use server";

import prisma from "./prisma";
import { DEMO_MODE } from "@/lib/demo";
import { mockBlogs } from "@/mock/blogs";

export async function getHomeStats() {
  const [colleges, users, applications, reviews] = await Promise.all([
    prisma.college.count(),
    prisma.user.count(),
    prisma.application.count(),
    prisma.collegeReview.count(),
  ]);
  return { colleges, users, applications, reviews };
}

export async function getColleges(params: Record<string, any>) {
  const skip = ((params.page || 1) - 1) * (params.limit || 12);
  const where: any = {};
  if (params.search) where.OR = [{ name: { contains: params.search } }, { city: { contains: params.search } }];
  if (params.states?.length) where.state = { in: params.states };
  if (params.cities?.length) where.city = { in: params.cities };
  if (params.types?.length) where.type = { in: params.types };
  if (params.countries?.length || params.excludeCountries?.length) {
    where.country = {};
    if (params.countries?.length) where.country.in = params.countries;
    if (params.excludeCountries?.length) where.country.notIn = params.excludeCountries;
  }
  
  let orderBy: any = {};
  if (params.sortBy === "nirfRank") orderBy.nirfRank = params.sortOrder || "asc";
  else if (params.sortBy === "fees") orderBy.totalFees = params.sortOrder || "asc";
  else orderBy.createdAt = "desc";

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({ where, skip, take: params.limit || 12, orderBy }),
    prisma.college.count({ where }),
  ]);
  return { colleges, total };
}

export async function getCollegeBySlug(slug: string) {
  const college = await prisma.college.findUnique({ where: { slug }, include: { courses: { include: { course: true } }, cutoffs: true, placements: true, recruiters: true, galleryImages: true, reviews: true, _count: { select: { savedBy: true, reviews: true } } } });
  if (!college) return null;
  return college;
}

export async function compareColleges(ids: string[]) {
  return prisma.college.findMany({ where: { id: { in: ids } }, include: { courses: { include: { course: true } } } });
}

export async function toggleSavedCollege(userId: string, slug: string) {
  const college = await prisma.college.findUnique({ where: { slug } });
  if (!college) return { error: "college_not_found" };
  const existing = await prisma.savedCollege.findUnique({ where: { userId_collegeId: { userId, collegeId: college.id } } });
  if (existing) {
    await prisma.savedCollege.delete({ where: { id: existing.id } });
    return { saved: false };
  } else {
    await prisma.savedCollege.create({ data: { userId, collegeId: college.id } });
    return { saved: true };
  }
}

export async function listCollegeReviews(slug: string, page: number, limit: number, rating: number | null, sortBy: string) {
  const college = await prisma.college.findUnique({ where: { slug } });
  if (!college) return { reviews: [], total: 0 };
  const where: any = { collegeId: college.id };
  if (rating) where.rating = { gte: rating };
  
  const [reviews, total] = await Promise.all([
    prisma.collegeReview.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: sortBy === "recent" ? "desc" : "asc" }, include: { user: { select: { id: true, name: true, avatar: true } } } }),
    prisma.collegeReview.count({ where }),
  ]);
  return { reviews, total };
}

export async function createCollegeReview(userId: string, slug: string, data: any) {
  const college = await prisma.college.findUnique({ where: { slug } });
  if (!college) return { error: "college_not_found" };
  
  const existing = await prisma.collegeReview.findUnique({
    where: { userId_collegeId: { userId, collegeId: college.id } }
  });
  if (existing) return { error: "review_exists" };

  return prisma.collegeReview.create({ data: { userId, collegeId: college.id, ...data } });
}

export async function listApplications(userId: string, status?: string | null) {
  const where: any = { userId };
  if (status) where.status = status;
  return prisma.application.findMany({ where, include: { college: true, user: true } });
}

export async function getApplicationById(applicationId: string) {
  return prisma.application.findUnique({ where: { id: applicationId }, include: { college: true, user: true } });
}

export async function createApplication(userId: string, data: any) {
  const existing = await prisma.application.findUnique({
    where: { userId_collegeId_courseId: { userId, collegeId: data.collegeId, courseId: data.courseId || null } }
  });
  if (existing) return { error: "application_exists" };
  return prisma.application.create({ data: { userId, ...data } });
}

export async function updateApplication(viewerUserId: string, applicationId: string, data: any) {
  return prisma.application.update({ where: { id: applicationId }, data });
}

export async function deleteApplication(viewerUserId: string, applicationId: string) {
  return prisma.application.delete({ where: { id: applicationId } });
}

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserRole(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  return user?.role;
}

export async function registerUser(data: any) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return { error: "user_exists" };
  return prisma.user.create({ data });
}

export async function createAdminUser(email: string, password: string, name?: string) {
  return prisma.user.create({ data: { email, password, name, role: "ADMIN" } });
}

export async function createInitialAdmin(email: string, password: string, name?: string) {
  return prisma.user.create({ data: { email, password, name, role: "SUPERADMIN" } });
}

export async function getOrCreateCredentialsUser(email: string) {
  return prisma.user.upsert({ where: { email }, update: {}, create: { email } });
}

export async function upsertOAuthUser(data: any) {
  return prisma.user.upsert({ where: { email: data.email }, update: data, create: data });
}

export async function updateUserProfile(userId: string, data: any) {
  return prisma.user.update({ where: { id: userId }, data });
}

export async function hasActiveSubscription(userId: string, minimumPlan: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { plan: true } });
  if (!user) return false;
  if (minimumPlan === "PRO" && (user.plan === "PRO" || user.plan === "PREMIUM")) return true;
  if (minimumPlan === "PREMIUM" && user.plan === "PREMIUM") return true;
  return false;
}

export async function listNotifications(userId: string) {
  return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}

export async function markNotifications(userId: string, read: boolean, notificationId?: string) {
  if (notificationId) {
    return prisma.notification.update({ where: { id: notificationId }, data: { read } });
  }
  return prisma.notification.updateMany({ where: { userId }, data: { read } });
}

export async function listScholarships(params: any) {
  return prisma.scholarship.findMany();
}

export async function getMatchedScholarships(userId: string) {
  return prisma.scholarship.findMany({ take: 5 });
}

export async function listForumPosts(page: number, limit: number, tags: string[], sortBy: string) {
  const [posts, total] = await Promise.all([
    prisma.forumPost.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" }, include: { user: { select: { id: true, name: true, avatar: true } }, _count: { select: { answers: true } } } }),
    prisma.forumPost.count(),
  ]);
  return { posts, total };
}

export async function createForumPost(userId: string, title: string, body: string, tags: string[]) {
  return prisma.forumPost.create({ data: { userId, title, body, tags } });
}

export async function getForumPost(postId: string) {
  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  if (!post) return { error: "post_not_found" };
  await prisma.forumPost.update({ where: { id: postId }, data: { views: { increment: 1 } } });
  return prisma.forumPost.findUnique({ where: { id: postId }, include: { user: true, answers: { include: { user: true } } } });
}

export async function createForumAnswer(postId: string, userId: string, body: string) {
  return prisma.forumAnswer.create({ data: { postId, userId, body } });
}

export async function voteForumPost(postId: string, userId: string, vote: "upvote" | "downvote") {
  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  if (!post) return { error: "post_not_found" };
  if (vote === "upvote") return prisma.forumPost.update({ where: { id: postId }, data: { upvotes: { increment: 1 } } });
  return prisma.forumPost.update({ where: { id: postId }, data: { downvotes: { increment: 1 } } });
}

export async function getAdminStats(viewerUserId: string) {
  const [users, colleges, applications] = await Promise.all([
    prisma.user.count(),
    prisma.college.count(),
    prisma.application.count(),
  ]);
  return { users, colleges, applications };
}

export async function getCounselorContext(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getAdmitPredictorContext(collegeId: string, category: string) {
  return prisma.college.findUnique({
    where: { id: collegeId },
    include: {
      cutoffs: {
        where: { category },
        orderBy: { year: 'desc' }
      }
    }
  });
}

export async function getShortlistContext(userId: string) {
  const [user, colleges] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.college.findMany({ take: 20 })
  ]);
  if (!user) return null;
  return { user, colleges };
}

export async function getAIConfig() { return prisma.aiConfig.findFirst(); }

export async function saveAIConfig(config: any) { 
  const existing = await prisma.aiConfig.findFirst();
  if (existing) return prisma.aiConfig.update({ where: { id: existing.id }, data: config });
  return prisma.aiConfig.create({ data: config });
}

export async function getRecommendations(userId: string, limit?: number) { return []; }

export async function getSubscriptionByUserId(userId: string) {
  return prisma.subscription.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

export async function upsertSubscriptionFromCheckout(data: any) {
  return prisma.subscription.create({ data });
}

export async function updateSubscriptionByStripeId(data: any) {
  return prisma.subscription.updateMany({ where: { stripeSubscriptionId: data.stripeSubscriptionId }, data });
}

export async function deleteSubscriptionByStripeId(stripeSubscriptionId: string) {
  return prisma.subscription.deleteMany({ where: { stripeSubscriptionId } });
}

export async function checkPlanLimit(userId: string, feature: string) { 
  return { allowed: true, current: 0, limit: 100 }; 
}

export async function clearTable(table: string) { return null; }

export async function importRecords(table: string, records: unknown[]) { return null; }

export async function getUniqueCourses() {
  const courses = await prisma.course.findMany({ select: { name: true }, distinct: ['name'] });
  return courses.map(c => c.name).filter(Boolean);
}

export async function getUniqueExams() {
  return ["JEE Main", "NEET", "CAT", "GATE", "CUET"];
}

export async function getUniqueCities() {
  const cities = await prisma.college.groupBy({
    by: ['city'],
    _count: {
      city: true
    },
    orderBy: {
      _count: {
        city: 'desc'
      }
    },
    take: 20
  });
  return cities.map(c => ({ city: c.city, count: c._count.city }));
}

export async function getUniqueCountries() {
  return ["India"];
}

export async function getCollegesByExam(exam: string) {
  const [colleges, total] = await Promise.all([
    prisma.college.findMany({ take: 12 }),
    prisma.college.count()
  ]);
  return { colleges, total };
}

export async function getCollegesByCourse(course: string) {
  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where: {
        courses: {
          some: {
            course: {
              name: {
                contains: course,
              },
            },
          },
        },
      },
      take: 12,
    }),
    prisma.college.count({
      where: {
        courses: {
          some: {
            course: {
              name: {
                contains: course,
              },
            },
          },
        },
      },
    }),
  ]);
  return { colleges, total };
}

export async function getCollegesByCity(city: string) {
  const [colleges, total] = await Promise.all([
    prisma.college.findMany({ where: { city }, take: 12 }),
    prisma.college.count({ where: { city } })
  ]);
  return { colleges, total };
}

export async function createCounsellingLead(data: any) {
  return prisma.counsellingLead.create({ data });
}

export async function listCounsellingLeads(status?: string, limit?: number) {
  return prisma.counsellingLead.findMany({ where: status ? { status } : undefined, take: limit || 50, orderBy: { createdAt: "desc" } });
}

export async function updateLeadStatus(leadId: string, status: string) {
  return prisma.counsellingLead.update({ where: { id: leadId }, data: { status } });
}

export async function getMaintenanceSettings() {
  return prisma.systemSettings.findFirst();
}

export async function updateMaintenanceSettings(userId: string, data: any) {
  const existing = await prisma.systemSettings.findFirst();
  if (existing) return prisma.systemSettings.update({ where: { id: existing.id }, data });
  return prisma.systemSettings.create({ data });
}

export async function getMaintenanceLogs(userId: string) {
  return prisma.maintenanceLog.findMany({ orderBy: { timestamp: "desc" } });
}

export async function saveInquiry(data: any) {
  return prisma.studentInquiry.create({ data });
}

export async function getBlogPosts() {
  try {
    // Dev cache-sync: clear and re-populate with fresh rich markdown table contents
    await prisma.blogPost.deleteMany({});
    
    await prisma.blogPost.createMany({
      data: [
        {
          title: "JEE Main 2026: Complete Strategy for a Top 100 Rank",
          slug: "jee-main-2026-strategy-guide",
          summary: "Master the syllabus, plan your timeline, explore topper tips, and unlock standard weightage metrics for the upcoming JEE Main 2026 examination.",
          content: `Securing a top rank in the Joint Entrance Examination (JEE) Main 2026 requires consistent dedication, exhaustive subject clarity, and highly optimized exam-taking strategies. Below is a comprehensive topper-approved strategy framework.

## 1. Conceptual Clarity Over Rote Learning
For high-scoring subjects like Physics (especially Electrodynamics, Mechanics, and Modern Physics) and Mathematics (Calculus and Coordinate Geometry), **mugging up formulas will not help**. Dive deep into the derivations and conceptual mechanisms. Focus on standard NCERT examples alongside references like H.C. Verma and Irodov for Physics, and Cengage series for Mathematics.

## 2. Subject-Wise Recommended Reference Books
Here is the recommended study material compiled from previous top 100 JEE rankers:

| Subject | Recommended Book | Target Area |
| :--- | :--- | :--- |
| **Physics** | Concepts of Physics (H.C. Verma) | Fundamentals & Mechanics |
| **Physics** | Problems in General Physics (Irodov) | Advanced Problem Solving |
| **Chemistry** | NCERT Chemistry (Class 11 & 12) | Organic & Inorganic Basics |
| **Chemistry** | Physical Chemistry (O.P. Tandon) | Numerical Calculations |
| **Mathematics** | Cengage Series (G. Tewani) | Comprehensive Calculus & Algebra |
| **Mathematics** | Higher Algebra (Hall & Knight) | Advanced Algebra Concepts |

## 3. High-Weightage Chapters & Analysis
Focusing on high-yield topics ensures that you maximize your score in the shortest preparation time.

### A. Mathematics
- **Calculus:** Functions, Limits, Continuity & Differentiability, Definite Integration (Approx. 25-30% weightage).
- **Coordinate Geometry:** Straight lines, Circles, Conics (Approx. 15-20% weightage).
- **Algebra:** Matrices, Determinants, Probability, Permutation & Combination (Approx. 25% weightage).

### B. Physics
- **Electrodynamics:** Electrostatics, Current Electricity, Magnetic Effects, EMI (Approx. 30% weightage).
- **Mechanics:** Rotational Dynamics, Laws of Motion, Work-Energy-Power (Approx. 25% weightage).
- **Modern Physics:** Atoms, Nuclei, Dual Nature of Matter (Approx. 15% weightage - highly scoring!).

## 4. Month-by-Month Preparation Timeline

1. **Months 1-6 (Syllabus Completion):** Ensure 100% completion of Class 11 & 12 topics. Write detailed formula sheets.
2. **Months 7-9 (Revision & Chapter Tests):** Focus on solving chapter-wise previous years' questions (PYQs).
3. **Months 10-12 (Mock Tests & Analytics):** Attempt 2 full-length papers weekly. Spend 3 hours analyzing every paper.`,
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
          category: "JEE Prep",
          readTime: "6 min read"
        },
        {
          title: "NEET 2026 Biology: Expert Guide to Scoring 340+ Marks",
          slug: "neet-2026-biology-preparation-strategy",
          summary: "Biology makes up 50% of the total NEET marks. Learn how to systematically read NCERT and master high-yielding topics like Genetics and Human Physiology.",
          content: `Biology represents 50% of the total NEET marks. Getting a score above 340/360 is critical for securing a seat in a premier government medical college. Here is your expert guide to making that a reality.

## 1. Master NCERT Line by Line
Every single line, diagram caption, flow chart, and scientist description in the class 11 and 12 NCERT textbooks is a potential question. You should create custom diagram notes and summary sheets.

## 2. Topic-Wise Study Focus & Weightage
Understanding where questions are coming from helps structure your daily study hours:

| Unit Name | High-Yield Sub-topics | Average Questions |
| :--- | :--- | :--- |
| **Human Physiology** | Digestion, Neural Control, Circulation, Excretion | 12 - 14 Questions |
| **Genetics & Evolution** | Mendelian Principles, Molecular Basis, Evolution theories | 10 - 12 Questions |
| **Ecology & Environment** | Ecosystems, Biodiversity, Environmental Issues | 8 - 10 Questions |
| **Plant Physiology** | Photosynthesis, Respiration, Plant Growth | 6 - 8 Questions |
| **Cell Biology** | Cell Division Cycles, Biomolecules, Structure | 5 - 6 Questions |

## 3. High-Impact Preparation Steps
Follow these structural steps to master Biology:
1. **Diagram Reproduction:** Draw key physiological pathways (like the Krebs cycle, Calvin cycle, and Nephron filtration) by hand.
2. **Active Recall Testing:** After reading a chapter, close the book and write down all scientific terms, classifications, and exceptions from memory.
3. **Daily MCQs:** Solve at least 80 Biology MCQs daily under timed conditions to improve your speed and accuracy.`,
          image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800",
          category: "NEET Prep",
          readTime: "5 min read"
        },
        {
          title: "CAT 2026 Syllabus & Roadmap: Achieve a 99+ Percentile",
          slug: "cat-2026-syllabus-preparation-roadmap",
          summary: "Aiming for an IIM? Read our detailed prep structure covering Quantitative Aptitude, DILR puzzles, and VARC strategies for the CAT 2026 exam.",
          content: `The Common Admission Test (CAT) is the gateway to India's premier business schools (IIMs). The exam tests your analytical speed, logical agility, and decision-making under intense pressure. Here is our comprehensive preparation roadmap.

## 1. Comprehensive CAT Section Breakdown
CAT is structured into three highly distinct sections:

| Section Name | Key Topics | No. of Questions | Target Accuracy |
| :--- | :--- | :--- | :--- |
| **VARC** | Reading Comprehension, Para Jumbles, Summary | 24 Questions | 80% - 85% Accuracy |
| **DILR** | Set Theory, Linear/Circular Arrangements, Grid Puzzles | 20 Questions | 90% - 95% Accuracy |
| **QA** | Arithmetic, Algebra, Geometry, Number Systems | 22 Questions | 85% - 90% Accuracy |

## 2. Strategic Roadmap to 99+ Percentile

### Phase 1: Foundation (Months 1-4)
- **VARC:** Read editorial columns from *The Hindu*, *The Guardian*, and *Aeon Essays* daily. Focus on identifying central arguments.
- **DILR:** Solve at least 2 basic data interpretation sheets and logical arrangement puzzles daily.
- **QA:** Perfect your basics in Arithmetic (Percentages, Profit & Loss, Ratio-Proportions) and Algebra.

### Phase 2: Speed Building (Months 5-8)
- Move from basic concept solving to timed sectional mock tests.
- Learn short cuts and elimination techniques to solve QA problems faster.
- Practice solving non-MCQ type (TITA - Type In The Answer) questions with precision.

### Phase 3: Full Mock Drills (Months 9-12)
- Solve 2 full-length CAT mock tests every week.
- Perform detailed sectional analysis: track time spent per question and rate of unforced errors.`,
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
          category: "MBA Prep",
          readTime: "7 min read"
        }
      ]
    });
  } catch (error) {
    console.error("Failed to seed blogs:", error);
  }

  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getBlogPostBySlug(slug: string) {
  if (DEMO_MODE) {
    return mockBlogs.find((b) => b.slug === slug) || null;
  }
  return prisma.blogPost.findUnique({
    where: { slug }
  });
}


