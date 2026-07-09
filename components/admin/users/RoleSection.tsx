"use client";

import React from "react";
import { Shield } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

const permissionsMap: Record<string, string[]> = {
  USER: ["Search Colleges", "Write Reviews", "Save Shortlists", "Apply to Colleges"],
  COUNSELOR: ["Moderate Applications", "Respond to Student Inquiries", "Edit College Listings", "Manage Reviews"],
  ADMIN: ["Access System Configs", "Create/Edit Databases", "Moderate Counselors", "Export System Reports"],
  SUPERADMIN: ["Full Console Control", "Manage Admin Accounts", "API Schema Controls", "Clear Activity Feeds"],
};

export function RoleSection({
  role,
  onRoleChange,
  plan,
  onPlanChange,
}: {
  role: string;
  onRoleChange: (v: string) => void;
  plan: string;
  onPlanChange: (v: string) => void;
}) {
  const currentPermissions = permissionsMap[role] || [];

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Shield className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Roles & System Permissions
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Configure authorization variables and subscription plans
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="role" label="Access Control Role">
          <select
            id="role"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className={inputClass}
          >
            <option value="USER">USER (Student)</option>
            <option value="COUNSELOR">COUNSELOR (Advisor)</option>
            <option value="ADMIN">ADMIN (System Manager)</option>
            <option value="SUPERADMIN">SUPERADMIN (Database Principal)</option>
          </select>
        </Field>

        <Field id="plan" label="Subscription Plan">
          <select
            id="plan"
            value={plan}
            onChange={(e) => onPlanChange(e.target.value)}
            className={inputClass}
          >
            <option value="FREE">FREE</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="DISABLED">DISABLED (Suspended)</option>
          </select>
        </Field>
      </div>

      {/* Permissions display box */}
      <div className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-850 bg-[#FAF8F4]/30 dark:bg-zinc-950/20">
        <span className="text-[10px] font-bold text-[#8C6422] uppercase tracking-wider block mb-2.5">
          Granted Permissions Checklist
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {currentPermissions.map((perm, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[#6B6660] dark:text-zinc-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{perm}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
