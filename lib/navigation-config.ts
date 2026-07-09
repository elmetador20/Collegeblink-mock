import {
  LayoutDashboard,
  Wallet,
  Zap,
  User,
  Settings,
  HelpCircle,
  FileText,
  Shield,
  GraduationCap,
  Building2,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: any;
}

export interface NavConfig {
  bottom: NavItem[];
  drawer: NavItem[];
}

export const NAV_CONFIG: Record<string, NavConfig> = {
  user: {
    bottom: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Scholarships", href: "/dashboard/scholarships", icon: Wallet },
      { name: "Battles", href: "/dashboard/battles", icon: Zap },
      { name: "Profile", href: "/dashboard/profile", icon: User },
    ],
    drawer: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Explore", href: "/colleges", icon: GraduationCap },
      { name: "Compare", href: "/compare", icon: Building2 },
      { name: "Profile", href: "/dashboard/profile", icon: User },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
      { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
      { name: "Terms & Privacy", href: "/dashboard/terms", icon: FileText },
    ],
  },
  admin: {
    bottom: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Colleges", href: "/admin/colleges", icon: GraduationCap },
      { name: "Users", href: "/admin/users", icon: User },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
    drawer: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: Building2 },
      { name: "Colleges", href: "/admin/colleges", icon: GraduationCap },
      { name: "AI Control", href: "/admin/ai", icon: Zap },
      { name: "Users", href: "/admin/users", icon: User },
      { name: "Payments", href: "/admin/payments", icon: Wallet },
      { name: "Notifications", href: "/admin/notifications", icon: HelpCircle },
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
      { name: "Terms & Privacy", href: "/dashboard/terms", icon: FileText },
    ],
  },
};

export function getNavConfig(role: string = "user"): NavConfig {
  return NAV_CONFIG[role] || NAV_CONFIG.user;
}

export function getBottomNavItems(role: string = "user"): NavItem[] {
  return getNavConfig(role).bottom;
}

export function getDrawerItems(role: string = "user"): NavItem[] {
  return getNavConfig(role).drawer;
}
