"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Eye, Edit2, ShieldAlert, Trash2 } from "lucide-react";
import { UserStatusBadge } from "./UserStatusBadge";

// Helper color-map for initials avatars
const AVATAR_PALETTES = [
  "from-blue-600 to-cyan-500",
  "from-emerald-600 to-teal-500",
  "from-violet-600 to-indigo-500",
  "from-amber-600 to-orange-500",
  "from-rose-600 to-pink-500",
  "from-purple-600 to-fuchsia-500",
];

const getAvatarColor = (email: string) => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[idx];
};

export function UserRow({
  user,
  isSelected,
  onToggleSelect,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  user: any;
  isSelected: boolean;
  onToggleSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click outside to close actions menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const initials = (user.name || user.email || "U").slice(0, 2).toUpperCase();
  const grad = getAvatarColor(user.email || "");

  // Format relative activity time
  const timeLabel = () => {
    if (!user.lastLogin) return "Never";
    const date = new Date(user.lastLogin);
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const statusStr = user.plan === "DISABLED" ? "Disabled" : "Active";

  return (
    <tr className={`hover:bg-[#FAF8F4]/30 dark:hover:bg-zinc-800/20 transition-all duration-150 group ${
      isSelected ? "bg-[#1F3A5C]/[0.02] dark:bg-zinc-800/10" : ""
    }`}>
      {/* Checkbox select */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="rounded border-[#E3DFD6] text-[#1F3A5C] h-4.5 w-4.5 focus:ring-[#1F3A5C]/35 cursor-pointer"
        />
      </td>

      {/* User profile (Avatar name/email) */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border border-zinc-150/20 bg-gradient-to-tr ${grad}`}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1C1B19] dark:text-zinc-200 truncate max-w-[180px]">
              {user.name || "—"}
            </p>
            <p className="text-xs text-[#6B6660] dark:text-zinc-500 truncate max-w-[200px]">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role badge */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <UserStatusBadge type="role" value={user.role} />
      </td>

      {/* Sub plan badge */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <UserStatusBadge type="plan" value={user.plan} />
      </td>

      {/* Location */}
      <td className="px-6 py-4.5 whitespace-nowrap text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        {user.city && user.state ? `${user.city}, ${user.state}` : "—"}
      </td>

      {/* Email verification status */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <UserStatusBadge type="verification" value={!!user.emailVerified} />
      </td>

      {/* Last login */}
      <td className="px-6 py-4.5 whitespace-nowrap text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        {timeLabel()}
      </td>

      {/* Status badge */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <UserStatusBadge type="status" value={statusStr} />
      </td>

      {/* Actions menu */}
      <td className="px-6 py-4.5 whitespace-nowrap text-right text-sm font-medium relative">
        <div ref={menuRef} className="inline-block text-left">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-[#6B6660] hover:text-[#1C1B19] dark:hover:text-white p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <MoreVertical className="h-4.5 w-4.5" />
          </button>

          {showMenu && (
            <div className="origin-top-right absolute right-0 mt-1 w-40 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-25 overflow-hidden py-1">
              <button
                onClick={() => {
                  onView();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 flex items-center gap-2"
              >
                <Eye className="h-3.5 w-3.5 text-[#6B6660]" />
                View Details
              </button>
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 flex items-center gap-2"
              >
                <Edit2 className="h-3.5 w-3.5 text-[#6B6660]" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  onToggleStatus();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-800"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                {user.plan === "DISABLED" ? "Enable Account" : "Disable Account"}
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs font-bold text-[#A23B2E] hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-800"
              >
                <Trash2 className="h-3.5 w-3.5 text-[#A23B2E]" />
                Delete User
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
