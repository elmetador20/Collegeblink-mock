import { CollegeForm } from "@/components/admin/college-form";
import { CourseForm } from "@/components/admin/course-form";
import { BlogForm } from "@/components/admin/blog-form";
import { UserForm } from "@/components/admin/user-form";
import * as collegeService from "@/services/college.service";
import * as courseService from "@/services/course.service";
import * as blogService from "@/services/blog.service";
import * as userService from "@/services/user.service";
import type { ReactNode } from "react";

export type ListParams = {
  search: string;
  page: number;
  limit: number;
};

export type ListResult<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

export type ColumnDef<T> = {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => ReactNode;
};

export type EntityType = keyof typeof entityRegistry;

export const entityRegistry = {
  colleges: {
    label: "College",
    pluralLabel: "Colleges",
    eyebrow: "Colleges",
    getById: (id: string) => collegeService.getCollegeById(id),
    list: (params: ListParams) => collegeService.getColleges(params),
    searchPlaceholder: "Search by name, city, or state",
    columns: [
      {
        key: "name",
        header: "College",
        render: (college: any) => (
          <>
            <div className="font-medium text-[#1C1B19]">{college.name}</div>
            <div className="text-xs text-[#6B6660]">/{college.slug}</div>
          </>
        ),
      },
      {
        key: "location",
        header: "Location",
        render: (college: any) => `${college.city}, ${college.state}`,
      },
      {
        key: "type",
        header: "Type",
        render: (college: any) => college.type,
      },
      {
        key: "nirfRank",
        header: "NIRF",
        className: "font-mono",
        render: (college: any) => college.nirfRank ?? "—",
      },
      {
        key: "status",
        header: "Status",
        render: (college: any) =>
          college.verified ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#8C6422]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8863B]" />
              Verified
            </span>
          ) : (
            <span className="text-xs text-[#6B6660]">Unverified</span>
          ),
      },
    ] as ColumnDef<any>[],
    Form: CollegeForm,
    formProps: (id?: string) => ({ collegeId: id }),
  },
  courses: {
    label: "Course",
    pluralLabel: "Courses",
    eyebrow: "Courses",
    getById: (id: string) => courseService.getCourseById(id),
    list: (params: ListParams) => courseService.getCourses(params),
    searchPlaceholder: "Search by name or college",
    columns: [
      {
        key: "name",
        header: "Course",
        render: (course: any) => (
          <>
            <div className="font-medium text-[#1C1B19]">{course.name}</div>
            <div className="text-xs text-[#6B6660]">/{course.slug || course.id}</div>
          </>
        ),
      },
      {
        key: "duration",
        header: "Duration",
        render: (course: any) => `${course.duration} Years`,
      },
      {
        key: "degree",
        header: "Degree",
        render: (course: any) => course.degree || "—",
      },
      {
        key: "status",
        header: "Status",
        render: (course: any) =>
          course.active !== false ? (
            <span className="text-xs text-[#8C6422]">Active</span>
          ) : (
            <span className="text-xs text-[#6B6660]">Inactive</span>
          ),
      },
    ] as ColumnDef<any>[],
    Form: CourseForm,
    formProps: (id?: string) => ({ courseId: id }),
  },
  blogs: {
    label: "Blog Post",
    pluralLabel: "Blog Posts",
    eyebrow: "Blogs",
    getById: (id: string) => blogService.getBlogById(id),
    list: (params: ListParams) => blogService.getBlogs(params),
    searchPlaceholder: "Search by title or category",
    columns: [
      {
        key: "title",
        header: "Title",
        render: (blog: any) => (
          <>
            <div className="font-medium text-[#1C1B19]">{blog.title}</div>
            <div className="text-xs text-[#6B6660]">/{blog.slug}</div>
          </>
        ),
      },
      {
        key: "category",
        header: "Category",
        render: (blog: any) => blog.category,
      },
      {
        key: "published",
        header: "Status",
        render: (blog: any) =>
          blog.published ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#8C6422]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8863B]" />
              Published
            </span>
          ) : (
            <span className="text-xs text-[#6B6660]">Draft</span>
          ),
      },
    ] as ColumnDef<any>[],
    Form: BlogForm,
    formProps: (id?: string) => ({ blogId: id }),
  },
  users: {
    label: "User",
    pluralLabel: "Users",
    eyebrow: "Users",
    getById: (id: string) => userService.getUserById(id),
    list: (params: ListParams) => userService.getUsers(params),
    searchPlaceholder: "Search by name or email",
    columns: [
      {
        key: "name",
        header: "User",
        render: (user: any) => (
          <>
            <div className="font-medium text-[#1C1B19]">{user.name ?? "—"}</div>
            <div className="text-xs text-[#6B6660]">{user.email}</div>
          </>
        ),
      },
      {
        key: "role",
        header: "Role",
        render: (user: any) => (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${user.role === "ADMIN" ? "bg-amber-100 text-amber-800" : "bg-[#1F3A5C]/10 text-[#1F3A5C]"}`}>
            {user.role}
          </span>
        ),
      },
      {
        key: "plan",
        header: "Plan",
        render: (user: any) => (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${user.plan === "PREMIUM" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}>
            {user.plan}
          </span>
        ),
      },
      {
        key: "location",
        header: "Location",
        render: (user: any) => user.city && user.state ? `${user.city}, ${user.state}` : "—",
      },
      {
        key: "stream",
        header: "Stream",
        render: (user: any) => user.stream || "—",
      },
    ] as ColumnDef<any>[],
    Form: UserForm,
    formProps: (id?: string) => ({ userId: id }),
  },
} as const;

export function getEntity(segment: string) {
  const config = entityRegistry[segment as EntityType];
  if (!config) return null;
  return config;
}