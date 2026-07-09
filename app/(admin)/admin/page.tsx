import React from "react";
import * as collegeService from "@/services/college.service";
import * as courseService from "@/services/course.service";
import * as blogService from "@/services/blog.service";
import { DEMO_MODE } from "@/lib/demo";
import { prisma } from "@/lib/prisma";
import { StatsGrid } from "@/components/admin/dashboard/StatsGrid";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { ContentGrowthChart } from "@/components/admin/dashboard/ContentGrowthChart";
import { ContentDistributionChart } from "@/components/admin/dashboard/ContentDistributionChart";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";
import { PendingTasks } from "@/components/admin/dashboard/PendingTasks";
import { SystemStatus } from "@/components/admin/dashboard/SystemStatus";
import { PendingReviewsWidget } from "@/components/admin/dashboard/PendingReviewsWidget";
import { TopPerformingBlogs } from "@/components/admin/dashboard/TopPerformingBlogs";
import { RecentUsersWidget } from "@/components/admin/dashboard/RecentUsersWidget";
import { RecentBlogs } from "@/components/admin/dashboard/RecentBlogs";
import { mockActivities } from "@/mock/activities";
import { mockUsers } from "@/mock/users";
import { Info } from "lucide-react";

export default async function AdminDashboardPage() {
  const [colleges, courses, blogs] = await Promise.all([
    collegeService.getColleges({ page: 1, limit: 1 }),
    courseService.getCourses({ page: 1, limit: 1 }),
    blogService.getBlogs({ page: 1, limit: 1 }),
  ]);

  const pendingReviewsCount = DEMO_MODE
    ? 12
    : await prisma.collegeReview.count().catch(() => 0);

  const activeUsersCount = mockUsers.length;

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">Overview</p>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Dashboard
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Monitor system health, track content growth and manage your platform.
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live · Updated just now
          </div>
        </div>

        {/* Section 1: KPI Stats - 4 col × 2 rows = 8 cards */}
        <StatsGrid
          collegesCount={colleges.total}
          coursesCount={courses.total}
          blogsCount={blogs.total}
          activeUsersCount={activeUsersCount}
          pendingReviewsCount={pendingReviewsCount}
        />

        {/* Section 2: Analytics - Line Chart (2/3) + Pie Chart (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContentGrowthChart />
          </div>
          <div className="lg:col-span-1">
            <ContentDistributionChart
              blogs={blogs.total}
              courses={courses.total}
              colleges={colleges.total}
            />
          </div>
        </div>

        {/* Section 3: Activity Timeline + Pending Tasks + System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* @ts-ignore */}
          <RecentActivity activities={mockActivities} />
          <PendingTasks />
          <SystemStatus />
        </div>

        {/* Section 4: Pending Reviews (full width table) */}
        <PendingReviewsWidget />

        {/* Section 5: Top Blogs + Recent Users side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TopPerformingBlogs />
          </div>
          <div className="xl:col-span-1">
            <RecentUsersWidget />
          </div>
        </div>

        {/* Section 6: Quick Actions + Recent Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div className="lg:col-span-3">
            <RecentBlogs />
          </div>
        </div>

        {/* Demo Mode Notice */}
        {DEMO_MODE && (
          <div className="rounded-2xl border border-amber-200/60 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/10 p-5 flex items-start gap-4">
            <div className="h-8 w-8 shrink-0 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-400">Running in Demo Mode</p>
              <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-500 leading-relaxed">
                This admin panel is powered by a mock dataset. Turn off <code className="font-mono bg-amber-100 dark:bg-amber-950 px-1 rounded">DEMO_MODE</code> in your configuration to connect to the production Prisma database.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}