"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange"> {
  label?: string;
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox({
  label,
  className,
  checked,
  onCheckedChange,
  onChange,
  ...props
}: CheckboxProps) {
  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  const isChecked = checked === true || checked === "indeterminate";

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleNativeChange}
        className={cn(
          "rounded border-[#E3DFD6] dark:border-zinc-800 text-[#1F3A5C] h-4 w-4 cursor-pointer focus:ring-[#1F3A5C]/35",
          className
        )}
        {...props}
      />
      {label && <span className="text-xs font-semibold text-[#1C1B19] dark:text-zinc-200">{label}</span>}
    </label>
  );
}
