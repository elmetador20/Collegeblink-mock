"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpDown, Plus, Loader2, BookOpen, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { BlogRow } from "./BlogRow";
import { BlogToolbar } from "./BlogToolbar";
import { DeleteBlogDialog } from "./DeleteBlogDialog";
import { Pagination } from "@/components/admin/ui-primitives";

interface BlogsTableProps {
  initialItems: any[];
}

export function BlogsTable({ initialItems }: BlogsTableProps) {
  const router = useRouter();

  // Local State
  const [items, setItems] = useState<any[]>(initialItems);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  // Sorting State
  const [sortKey, setSortKey] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filtering State
  const [showFilters, setShowFilters] = useState(false);
  const [authorFilter, setAuthorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  // Dynamic calculations (client-side enhancements)
  const getMockAuthor = (item: any) => {
    const categories: Record<string, string> = {
      Admissions: "Counselor Priya",
      Rankings: "Editorial Team",
      Trends: "Analyst Rahul",
      Campus: "Campus Reporter",
      Finance: "Finance Expert",
    };
    return categories[item.category] || "Admin Editor";
  };

  const getMockViews = (item: any) => {
    const val = (item.title.length * 37) % 500 + 120;
    return val;
  };

  const getSEOScore = (item: any) => {
    let score = 50;
    const titleLen = item.title?.length || 0;
    const descLen = item.summary?.length || 0;
    const contentLen = item.content?.length || 0;

    if (titleLen >= 40 && titleLen <= 70) score += 20;
    else if (titleLen > 10) score += 10;

    if (descLen >= 110 && descLen <= 170) score += 20;
    else if (descLen > 30) score += 10;

    if (contentLen > 800) score += 10;
    else if (contentLen > 200) score += 5;

    return Math.min(score, 100);
  };

  const getStatus = (item: any) => {
    if (!item.published) return "Draft";
    if (item.title.length % 7 === 0) return "Scheduled";
    return "Published";
  };

  // Get categories options
  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(items.map((x) => x.category).filter(Boolean)));
    return ["all", ...categories];
  }, [items]);

  const authorOptions = useMemo(() => {
    const authors = Array.from(new Set(items.map((x) => getMockAuthor(x))));
    return ["all", ...authors];
  }, [items]);

  // Reset page on filters changes
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
    setSelectedIds([]);
  };

  const handleFilterChange = (setter: (v: string) => void, val: string) => {
    setter(val);
    setPage(1);
    setSelectedIds([]);
  };

  // Sorting toggle
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Process items locally
  const processedItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((item) => getStatus(item).toLowerCase() === statusFilter.toLowerCase());
    }

    // Author filter
    if (authorFilter !== "all") {
      result = result.filter((item) => getMockAuthor(item) === authorFilter);
    }

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        // Calculated sorts
        if (sortKey === "views") {
          valA = getMockViews(a);
          valB = getMockViews(b);
        } else if (sortKey === "seo") {
          valA = getSEOScore(a);
          valB = getSEOScore(b);
        } else if (sortKey === "status") {
          valA = getStatus(a);
          valB = getStatus(b);
        }

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA instanceof Date) valA = valA.getTime();
        if (valB instanceof Date) valB = valB.getTime();

        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, search, categoryFilter, statusFilter, authorFilter, sortKey, sortOrder]);

  // Paginated list
  const totalItems = processedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * limit;
    return processedItems.slice(start, start + limit);
  }, [processedItems, page, limit]);

  // Selection handlers
  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedItems.map((item) => item.id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => {
        const next = [...prev];
        currentPageIds.forEach((id) => {
          if (!next.includes(id)) next.push(id);
        });
        return next;
      });
    }
  };

  // Actions
  const openDeleteModal = (id: string, title: string) => {
    setDeleteId(id);
    setDeleteTitle(title);
    setActiveMenuId(null);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setDeleteTitle("");
    setDeleting(false);
  };

  const handleDeleteSingle = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/blogs/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete blog post.");
      }

      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      setSelectedIds((prev) => prev.filter((x) => x !== deleteId));
      toast.success("Blog post deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete blog post");
    } finally {
      closeDeleteModal();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected blog posts?`)) return;

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
              method: "DELETE",
            });
            if (res.ok) {
              successCount++;
            } else {
              failCount++;
            }
          } catch {
            failCount++;
          }
        })
      );

      setItems((prev) => prev.filter((x) => !selectedIds.includes(x.id)));
      setSelectedIds([]);
      toast.success(`Deleted ${successCount} blogs.${failCount > 0 ? ` Failed to delete ${failCount}.` : ""}`);
      router.refresh();
    } catch (err) {
      toast.error("Bulk delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    setLoading(true);
    setActiveMenuId(null);

    try {
      const blogToCopy = items.find((x) => x.id === id);
      if (!blogToCopy) throw new Error("Blog post not found");

      const duplicatePayload = {
        title: `${blogToCopy.title} (Copy)`,
        slug: `${blogToCopy.slug}-copy`,
        summary: blogToCopy.summary,
        content: blogToCopy.content,
        image: blogToCopy.image,
        category: blogToCopy.category,
        readTime: blogToCopy.readTime,
        published: false,
      };

      const res = await fetch(`/api/admin/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatePayload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to duplicate blog post.");
      }

      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      toast.success("Blog cloned successfully as Draft");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to duplicate blog");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const listToExport = selectedIds.length > 0
      ? items.filter((x) => selectedIds.includes(x.id))
      : processedItems;

    if (listToExport.length === 0) {
      toast.error("No articles available to export");
      return;
    }

    const headers = ["ID", "Title", "Category", "Author", "Status", "Reading Time", "SEO Score", "Views", "Created At"];
    const csvRows = [
      headers.join(","),
      ...listToExport.map((x) =>
        [
          `"${x.id}"`,
          `"${(x.title || "").replace(/"/g, '""')}"`,
          `"${x.category || ""}"`,
          `"${getMockAuthor(x)}"`,
          `"${getStatus(x)}"`,
          `"${x.readTime}"`,
          getSEOScore(x),
          getMockViews(x),
          `"${new Date(x.createdAt).toLocaleDateString()}"`,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `blogs-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${listToExport.length} blog posts to CSV`);
  };

  const isAllPageSelected = paginatedItems.length > 0 && paginatedItems.every((item) => selectedIds.includes(item.id));

  return (
    <div className="mt-8 space-y-6 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-[1px] z-50 flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-[#1F3A5C] animate-spin" />
            <span className="text-xs font-semibold text-[#1C1B19] dark:text-zinc-300">Processing operations...</span>
          </div>
        </div>
      )}

      {/* Action Toolbar */}
      <BlogToolbar
        search={search}
        onSearchChange={handleSearchChange}
        showFilters={showFilters}
        onShowFiltersChange={setShowFilters}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={(v) => handleFilterChange(setCategoryFilter, v)}
        statusFilter={statusFilter}
        onStatusFilterChange={(v) => handleFilterChange(setStatusFilter, v)}
        authorFilter={authorFilter}
        onAuthorFilterChange={(v) => handleFilterChange(setAuthorFilter, v)}
        categoryOptions={categoryOptions}
        authorOptions={authorOptions}
        onExportCSV={handleExportCSV}
      />

      {/* Table Container */}
      <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[580px] scrollbar-thin">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="sticky top-0 bg-[#FAF8F4] dark:bg-zinc-900 border-b border-[#E3DFD6] dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-[#6B6660] dark:text-zinc-400 z-10 select-none">
                <th className="w-12 px-5 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-[#E3DFD6] dark:border-zinc-700 text-[#1F3A5C] focus:ring-[#1F3A5C]/35 cursor-pointer h-4 w-4"
                  />
                </th>
                <th className="px-5 py-4 w-28">Cover</th>
                <th
                  onClick={() => handleSort("title")}
                  className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Article Title
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("category")}
                  className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th className="px-5 py-4">Author</th>
                <th
                  onClick={() => handleSort("views")}
                  className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1">
                    Views
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("seo")}
                  className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1">
                    SEO Score
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("createdAt")}
                  className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Published
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th className="px-5 py-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DFD6] dark:divide-zinc-800">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-20 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F4] dark:bg-zinc-900 border border-[#E3DFD6] dark:border-zinc-800 text-[#6B6660]/60">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">No blog posts found</h3>
                    <p className="mt-1.5 text-xs text-[#6B6660] dark:text-zinc-500 max-w-sm mx-auto">
                      Adjust your search query, change advanced filters, or write a new article draft.
                    </p>
                    <Link
                      href="/admin/blogs/new"
                      className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1F3A5C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1F3A5C]/90 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Article
                    </Link>
                  </td>
                </tr>
              ) : (
                paginatedItems.map((blog) => (
                  <BlogRow
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedIds.includes(blog.id)}
                    onToggleSelect={() => toggleSelectRow(blog.id)}
                    seoScore={getSEOScore(blog)}
                    status={getStatus(blog)}
                    authorName={getMockAuthor(blog)}
                    viewsCount={getMockViews(blog)}
                    activeMenuId={activeMenuId}
                    setActiveMenuId={setActiveMenuId}
                    onDuplicate={() => handleDuplicate(blog.id)}
                    onDelete={() => openDeleteModal(blog.id, blog.title)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          limit={limit}
          onPageChange={setPage}
        />
      )}

      {/* Floating Selection Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-[#E3DFD6] dark:border-zinc-800 rounded-full px-5 py-3 shadow-xl z-40 flex items-center gap-6"
          >
            <span className="text-xs font-semibold text-[#1C1B19] dark:text-zinc-200">
              {selectedIds.length} articles selected
            </span>
            <div className="h-4 w-px bg-[#E3DFD6] dark:bg-zinc-800" />
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A23B2E] text-white text-xs font-semibold hover:bg-[#A23B2E]/90 transition-colors shadow-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Selected
              </button>
            </div>
            <button
              onClick={() => setSelectedIds([])}
              className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#6B6660]"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Delete Confirmation Dialog Modal */}
      <DeleteBlogDialog
        isOpen={!!deleteId}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteSingle}
        blogTitle={deleteTitle}
        deleting={deleting}
      />
    </div>
  );
}
