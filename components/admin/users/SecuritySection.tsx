"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

export function SecuritySection({
  password,
  onPasswordChange,
  isEditMode,
}: {
  password: string;
  onPasswordChange: (v: string) => void;
  isEditMode: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  // Password strength logic
  const calculateStrength = (val: string) => {
    if (!val) return 0;
    let score = 0;
    if (val.length >= 6) score += 25;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[0-9]/.test(val)) score += 25;
    if (/[^A-Za-z0-9]/.test(val)) score += 25;
    return score;
  };

  const strength = calculateStrength(password);

  const getStrengthConfig = (score: number) => {
    if (score <= 25) return { color: "bg-red-500", text: "Weak security" };
    if (score <= 75) return { color: "bg-amber-500", text: "Moderate security" };
    return { color: "bg-emerald-500", text: "Strong security" };
  };

  const strengthConf = getStrengthConfig(strength);

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Lock className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Security & Login Credentials
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            {isEditMode 
              ? "Update login credentials (leave empty to keep existing password)" 
              : "Define credentials for the new user profile"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="password"
          label={isEditMode ? "Change Password" : "Login Password"}
          required={!isEditMode}
        >
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className={`${inputClass} pr-10`}
              placeholder={isEditMode ? "••••••••" : "Enter account password"}
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-[#6B6660] hover:text-[#1C1B19] p-0.5 rounded-full"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        </Field>

        {password && (
          <div className="flex flex-col justify-end pb-1.5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B6660] dark:text-zinc-400">Password Strength:</span>
              <span className="font-semibold text-[#1C1B19] dark:text-zinc-200">{strengthConf.text}</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full ${strengthConf.color} transition-all duration-300`}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
