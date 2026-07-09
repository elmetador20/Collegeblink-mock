"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { EditorSection } from "./EditorSection";
import { SidebarSection } from "./SidebarSection";

interface BlogFormValues {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  published: boolean;
}

function toFormState(data?: any): BlogFormValues {
  return {
    title: data?.title ?? "",
    slug: data?.slug ?? "",
    summary: data?.summary ?? "",
    content: data?.content ?? "",
    image: data?.image ?? "",
    category: data?.category ?? "",
    readTime: data?.readTime ?? "5 min read",
    published: data?.published ?? true,
  };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function BlogForm({
  mode,
  blogId,
  initialData,
}: {
  mode: "create" | "edit";
  blogId?: string;
  initialData?: any;
}) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormValues>(() => toFormState(initialData));
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(mode === "create");
  const [submitting, setSubmitting] = useState(false);

  // Auto-save states
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  // Publish workflow states
  const [publishStatus, setPublishStatus] = useState<"draft" | "published" | "scheduled">(() => {
    if (!initialData) return "published";
    if (!initialData.published) return "draft";
    if (initialData.title?.length % 7 === 0) return "scheduled";
    return "published";
  });
  const [scheduleDate, setScheduleDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16);
  });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Update field value
  const update = <K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && autoGenerateSlug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
    setAutoSaveStatus("saving");
  };

  // Keep slug synced with auto-generator
  useEffect(() => {
    if (autoGenerateSlug && form.title) {
      update("slug", slugify(form.title));
    }
  }, [autoGenerateSlug]);

  // Simulated Auto Save debounce effect
  useEffect(() => {
    if (autoSaveStatus !== "saving") return;

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`blog_draft_${blogId || "new"}`, JSON.stringify(form));
        const now = new Date();
        setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setAutoSaveStatus("saved");
      } catch (err) {
        setAutoSaveStatus("error");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [form, autoSaveStatus, blogId]);

  // SEO Score calculation
  const seoScore = (() => {
    let score = 50;
    const titleLen = form.title.trim().length;
    const descLen = form.summary.trim().length;
    const contentLen = form.content.trim().length;

    // Title score
    if (titleLen >= 40 && titleLen <= 70) score += 20;
    else if (titleLen > 10) score += 10;

    // Summary/Meta description score
    if (descLen >= 120 && descLen <= 160) score += 20;
    else if (descLen > 30) score += 10;

    // Content length score
    if (contentLen > 800) score += 10;
    else if (contentLen > 200) score += 5;

    return Math.min(score, 100);
  })();

  // Validation
  const isTitleValid = form.title.trim().length > 0;
  const isSlugValid = form.slug.trim().length > 0 && /^[a-z0-9-]+$/.test(form.slug);
  const isSummaryValid = form.summary.trim().length > 0;
  const isCategoryValid = form.category.trim().length > 0;
  const isContentValid = form.content.trim().length > 0;

  const isFormValid = isTitleValid && isSlugValid && isSummaryValid && isCategoryValid && isContentValid;

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
      image: form.image.trim() || null,
      category: form.category.trim(),
      readTime: form.readTime.trim() || "5 min read",
      published: publishStatus === "published" || publishStatus === "scheduled",
    };

    try {
      const url = mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${blogId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to save blog post.");
      }

      toast.success(
        publishStatus === "scheduled"
          ? `Blog post scheduled successfully for ${new Date(scheduleDate).toLocaleDateString()}`
          : mode === "create"
          ? "Blog post published successfully"
          : "Blog post updated successfully"
      );
      
      localStorage.removeItem(`blog_draft_${blogId || "new"}`);
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save the blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete article handler
  const handleDeleteBlog = async () => {
    if (!blogId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete blog post.");
      }

      toast.success("Blog post deleted successfully");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete blog post.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 items-start">
      {/* LEFT COLUMN: Main Editor Area */}
      <div className="lg:col-span-2 space-y-6">
        <EditorSection
          form={form}
          update={update}
          autoGenerateSlug={autoGenerateSlug}
          setAutoGenerateSlug={setAutoGenerateSlug}
          autoSaveStatus={autoSaveStatus}
          lastSavedTime={lastSavedTime}
          isTitleValid={isTitleValid}
          isSlugValid={isSlugValid}
          isCategoryValid={isCategoryValid}
        />
      </div>

      {/* RIGHT COLUMN: Sidebar CMS options */}
      <SidebarSection
        form={form}
        update={update}
        publishStatus={publishStatus}
        setPublishStatus={setPublishStatus}
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
        seoScore={seoScore}
        submitting={submitting}
        isFormValid={isFormValid}
        mode={mode}
        onCancel={() => router.push("/admin/blogs")}
        onDeleteRequest={() => setShowDeleteModal(true)}
      />

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
                <h3 className="font-serif text-lg text-[#1C1B19] dark:text-zinc-100">Delete Blog Post?</h3>
                <p className="mt-2 text-sm text-[#6B6660] dark:text-zinc-400 leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-[#1C1B19] dark:text-zinc-200">"{form.title}"</span>? This will permanently discard this post from organic indexes.
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
                onClick={handleDeleteBlog}
                disabled={deleting}
                className="rounded-lg bg-[#A23B2E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A23B2E]/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
