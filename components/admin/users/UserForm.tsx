"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { PersonalInfoSection } from "./PersonalInfoSection";
import { LocationSection } from "./LocationSection";
import { RoleSection } from "./RoleSection";
import { SecuritySection } from "./SecuritySection";

interface UserFormValues {
  name: string;
  email: string;
  role: string;
  plan: string;
  emailVerified: boolean;
  stream: string;
  city: string;
  state: string;
  password?: string;
}

function toFormState(data?: any): UserFormValues {
  return {
    name: data?.name ?? "",
    email: data?.email ?? "",
    role: data?.role ?? "USER",
    plan: data?.plan ?? "FREE",
    emailVerified: data?.emailVerified !== null && data?.emailVerified !== undefined,
    stream: data?.stream ?? "Engineering",
    city: data?.city ?? "",
    state: data?.state ?? "",
    password: "",
  };
}

export function UserForm({
  mode,
  userId,
  initialData,
}: {
  mode: "create" | "edit";
  userId?: string;
  initialData?: any;
}) {
  const router = useRouter();
  const [form, setForm] = useState<UserFormValues>(() => toFormState(initialData));
  const [submitting, setSubmitting] = useState(false);

  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const update = <K extends keyof UserFormValues>(key: K, value: UserFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Validation checks
  const isNameValid = form.name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isRoleValid = ["USER", "ADMIN", "SUPERADMIN", "COUNSELOR"].includes(form.role);

  const password = form.password || "";
  const pwHasLength = password.length >= 8;
  const pwHasNumber = /[0-9]/.test(password);
  const pwHasSpecial = /[^A-Za-z0-9]/.test(password);
  const pwHasUpper = /[A-Z]/.test(password);
  const passwordScore = [pwHasLength, pwHasNumber, pwHasSpecial, pwHasUpper].filter(Boolean).length;
  
  const isPasswordValid = mode === "edit" ? (!password || pwHasLength) : (pwHasLength && passwordScore >= 2);
  const isFormValid = isNameValid && isEmailValid && isRoleValid && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please correct validation errors first.");
      return;
    }

    setSubmitting(true);

    const payload: any = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      plan: form.plan,
      emailVerified: form.emailVerified,
      stream: form.stream,
      city: form.city.trim() || null,
      state: form.state.trim() || null,
    };

    if (form.password) {
      payload.password = form.password;
    }

    try {
      const url = mode === "create" ? "/api/admin/users" : `/api/admin/users/${userId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save error occurred.");
      }

      toast.success(mode === "create" ? "User created successfully" : "User profile updated successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save the user profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete user.");
      }

      toast.success("User account deleted successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user profile.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16 items-start">
      
      {/* LEFT COLUMN: Profile Info & Location (2/3 width) */}
      <div className="lg:col-span-2 space-y-6">
        <PersonalInfoSection
          name={form.name}
          onNameChange={(v) => update("name", v)}
          email={form.email}
          onEmailChange={(v) => update("email", v)}
          emailVerified={form.emailVerified}
          onEmailVerifiedChange={(v) => update("emailVerified", v)}
          isNameValid={isNameValid}
          isEmailValid={isEmailValid}
        />

        <LocationSection
          city={form.city}
          onCityChange={(v) => update("city", v)}
          state={form.state}
          onStateChange={(v) => update("state", v)}
          stream={form.stream}
          onStreamChange={(v) => update("stream", v)}
        />
      </div>

      {/* RIGHT COLUMN: Roles, Permissions & Security (1/3 width) */}
      <div className="lg:col-span-1 space-y-6">
        <RoleSection
          role={form.role}
          onRoleChange={(v) => update("role", v)}
          plan={form.plan}
          onPlanChange={(v) => update("plan", v)}
        />

        <SecuritySection
          password={form.password || ""}
          onPasswordChange={(v) => update("password", v)}
          isEditMode={mode === "edit"}
        />

        {mode === "edit" && (
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-red-200 hover:bg-red-50 dark:border-rose-900/30 dark:hover:bg-rose-950/20 py-3 text-sm font-semibold text-[#A23B2E] transition-all shadow-sm active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
            Delete User Account
          </button>
        )}
      </div>

      {/* Submit Footer Actions */}
      <div className="lg:col-span-3 flex items-center justify-between border-t border-[#E3DFD6] dark:border-zinc-800 pt-6">
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting || !isFormValid}
            className="rounded-xl bg-[#1F3A5C] dark:bg-zinc-100 hover:bg-[#1F3A5C]/90 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-6 py-3 text-sm font-semibold shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? "Saving user..." : mode === "create" ? "Add User Account" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 px-6 py-3 text-sm font-semibold active:scale-95 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1C1B19]/30 backdrop-blur-[1.5px]" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl z-10">
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4 rounded-md text-[#6B6660] hover:text-[#1C1B19] dark:hover:text-white p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-rose-950/20 border border-red-100 dark:border-rose-900/30 text-[#A23B2E]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1C1B19] dark:text-zinc-100">Delete User Profile?</h3>
                <p className="mt-2 text-sm text-[#6B6660] dark:text-zinc-400 leading-relaxed">
                  Are you sure you want to delete the student profile of <span className="font-semibold text-[#1C1B19] dark:text-zinc-200">"{form.name}"</span>? This will permanently discard all database application logs and comments.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E3DFD6] dark:border-zinc-800 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={deleting}
                className="rounded-lg bg-[#A23B2E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A23B2E]/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
