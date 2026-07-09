export interface AdminNavItem {
  label: string;
  href: string;
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Colleges", href: "/admin/colleges" },
  { label: "Courses", href: "/admin/courses" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Users", href: "/admin/users" },
  { label: "Settings", href: "/admin/settings" },
];