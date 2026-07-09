"use client";

import React from "react";
import { User, Mail } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

export function PersonalInfoSection({
  name,
  onNameChange,
  email,
  onEmailChange,
  emailVerified,
  onEmailVerifiedChange,
  isNameValid,
  isEmailValid,
}: {
  name: string;
  onNameChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  emailVerified: boolean;
  onEmailVerifiedChange: (b: boolean) => void;
  isNameValid: boolean;
  isEmailValid: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <User className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Personal Information
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Manage name, communication email address and notification variables
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="name" label="Full Name" required error={!isNameValid ? "Name is required" : null}>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className={inputClass}
            placeholder="e.g. Rahul Sharma"
          />
        </Field>

        <Field id="email" label="Email Address" required error={!isEmailValid ? "Valid email address is required" : null}>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="rahul@example.com"
            />
          </div>
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-3">
        <input
          id="emailVerified"
          type="checkbox"
          checked={emailVerified}
          onChange={(e) => onEmailVerifiedChange(e.target.checked)}
          className="rounded border-[#E3DFD6] text-[#1F3A5C] h-4.5 w-4.5 focus:ring-[#1F3A5C]/35 cursor-pointer"
        />
        <label htmlFor="emailVerified" className="text-sm font-semibold text-[#1C1B19] dark:text-zinc-200 cursor-pointer select-none">
          Verify email immediately
        </label>
      </div>
    </div>
  );
}
