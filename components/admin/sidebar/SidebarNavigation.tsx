"use client";

import React from "react";
import { LayoutDashboard, Building2, BookOpen, FileText, Users, Settings } from "lucide-react";
import { SidebarSection } from "./SidebarSection";
import { SidebarItem } from "./SidebarItem";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, shortcut: "G D" },
  { label: "Colleges", href: "/admin/colleges", icon: Building2, badge: 3, shortcut: "G C" },
  { label: "Courses", href: "/admin/courses", icon: BookOpen, shortcut: "G O" },
  { label: "Blogs", href: "/admin/blogs", icon: FileText, badge: 2, shortcut: "G B" },
  { label: "Users", href: "/admin/users", icon: Users, shortcut: "G U" },
  { label: "Settings", href: "/admin/settings", icon: Settings, shortcut: "G S" },
];

interface SidebarNavigationProps {
  collapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarNavigation({ collapsed, onItemClick }: SidebarNavigationProps) {
  return (
    <SidebarSection title="Menu" collapsed={collapsed}>
      {NAV_ITEMS.map((item) => (
        <SidebarItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          collapsed={collapsed}
          badge={item.badge}
          shortcut={item.shortcut}
          onClick={onItemClick}
        />
      ))}
    </SidebarSection>
  );
}
