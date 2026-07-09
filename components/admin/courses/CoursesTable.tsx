"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpDown, Plus, Loader2, FileSpreadsheet, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { CourseRow } from "./CourseRow";
import { CourseCard } from "./CourseCard";
import { CourseToolbar } from "./CourseToolbar";
import { DeleteCourseDialog } from "./DeleteCourseDialog";
import { Pagination } from "@/components/admin/ui-primitives";

interface CoursesTableProps {
  initialItems: any[];
}

export function CoursesTable({ initialItems }: CoursesTableProps) {
  const router = useRouter();

  // Local State
  const [items, setItems] = useState<any[]>(initialItems);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Sorting State
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtering State
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [feesFilter, setFeesFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  // Classify degrees into general categories
  const classifyCategory = (degree: string): string => {
    const deg = (degree || "").toUpperCase();
    if (deg.includes("B.TECH") || deg.includes("M.TECH") || deg.includes("B.E") || deg.includes("M.E")) {
      return "Engineering";
    }
    if (deg.includes("MBA") || deg.includes("BBA") || deg.includes("PGDM")) {
      return "Management";
    }
    if (deg.includes("B.SC") || deg.includes("M.SC")) {
      return "Science";
    }
    if (deg.includes("B.A") || deg.includes("M.A")) {
      return "Arts";
    }
    if (deg.includes("B.COM") || deg.includes("M.COM")) {
      return "Commerce";
    }
    if (deg.includes("MCA") || deg.includes("BCA")) {
      return "Computers";
    }
    return "Other";
  };

  // Get filter select options
  const degreeOptions = useMemo(() => {
    const degrees = Array.from(new Set(items.map((x) => x.degree).filter(Boolean)));
    return ["all", ...degrees];
  }, [items]);

  const durationOptions = useMemo(() => {
    const durations = Array.from(new Set(items.map((x) => x.duration).filter((x) => x !== null)));
    return ["all", ...durations.sort((a, b) => a - b)];
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
          item.name.toLowerCase().includes(q) ||
          item.degree.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          item.colleges?.some((c: any) => c.college?.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((item) => classifyCategory(item.degree) === categoryFilter);
    }

    // Degree filter
    if (degreeFilter !== "all") {
      result = result.filter((item) => item.degree === degreeFilter);
    }

    // Duration filter
    if (durationFilter !== "all") {
      result = result.filter((item) => String(item.duration) === durationFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      result = result.filter((item) => (item.active !== false) === isActive);
    }

    // Fees filter
    if (feesFilter !== "all") {
      result = result.filter((item) => {
        // Calculate average fees across linked colleges
        const collegeFeesList = item.colleges?.map((c: any) => c.fees).filter((f: any) => typeof f === "number") || [];
        if (collegeFeesList.length === 0) return false;
        const avgFee = collegeFeesList.reduce((acc: number, f: number) => acc + f, 0) / collegeFeesList.length;

        if (feesFilter === "low") return avgFee < 5;
        if (feesFilter === "medium") return avgFee >= 5 && avgFee <= 10;
        if (feesFilter === "high") return avgFee > 10;
        return true;
      });
    }

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, search, categoryFilter, degreeFilter, durationFilter, statusFilter, feesFilter, sortKey, sortOrder]);

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
  const openDeleteModal = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setActiveMenuId(null);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setDeleteName("");
    setDeleting(false);
  };

  const handleDeleteSingle = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/courses/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete course.");
      }

      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      setSelectedIds((prev) => prev.filter((x) => x !== deleteId));
      toast.success("Course deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete course");
    } finally {
      closeDeleteModal();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected courses?`)) return;

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const res = await fetch(`/api/admin/courses/${id}`, {
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
      toast.success(`Deleted ${successCount} courses.${failCount > 0 ? ` Failed to delete ${failCount}.` : ""}`);
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
      const courseToCopy = items.find((x) => x.id === id);
      if (!courseToCopy) throw new Error("Course not found");

      const duplicatePayload = {
        name: `${courseToCopy.name} (Copy)`,
        degree: courseToCopy.degree,
        duration: courseToCopy.duration,
        description: courseToCopy.description,
        careerProspects: courseToCopy.careerProspects || [],
        collegeIds: courseToCopy.colleges?.map((c: any) => c.collegeId) || [],
      };

      const res = await fetch(`/api/admin/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatePayload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to duplicate course.");
      }

      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      toast.success("Course duplicated successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to duplicate course");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const listToExport = selectedIds.length > 0
      ? items.filter((x) => selectedIds.includes(x.id))
      : processedItems;

    if (listToExport.length === 0) {
      toast.error("No records available to export");
      return;
    }

    const headers = ["Course ID", "Name", "Degree", "Duration", "Career Prospects", "Colleges Count"];
    const csvRows = [
      headers.join(","),
      ...listToExport.map((x) =>
        [
          `"${x.id}"`,
          `"${(x.name || "").replace(/"/g, '""')}"`,
          `"${x.degree || ""}"`,
          x.duration,
          `"${(x.careerProspects || []).join("; ")}"`,
          x.colleges?.length || 0,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `courses-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${listToExport.length} courses to CSV`);
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
      <CourseToolbar
        search={search}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onShowFiltersChange={setShowFilters}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={(v) => handleFilterChange(setCategoryFilter, v)}
        degreeFilter={degreeFilter}
        onDegreeFilterChange={(v) => handleFilterChange(setDegreeFilter, v)}
        durationFilter={durationFilter}
        onDurationFilterChange={(v) => handleFilterChange(setDurationFilter, v)}
        feesFilter={feesFilter}
        onFeesFilterChange={(v) => handleFilterChange(setFeesFilter, v)}
        statusFilter={statusFilter}
        onStatusFilterChange={(v) => handleFilterChange(setStatusFilter, v)}
        degreeOptions={degreeOptions}
        durationOptions={durationOptions}
        onExportCSV={handleExportCSV}
      />

      {/* Main Content Area */}
      {viewMode === "table" ? (
        /* Table Layout */
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
                  <th className="w-12 px-2 py-4 text-center">#</th>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Course Name
                      <ArrowUpDown className="h-3 w-3 opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("degree")}
                    className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Degree
                      <ArrowUpDown className="h-3 w-3 opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("duration")}
                    className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Duration
                      <ArrowUpDown className="h-3 w-3 opacity-60" />
                    </div>
                  </th>
                  <th className="px-5 py-4">Colleges Offering</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3DFD6] dark:divide-zinc-800">
                {paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F4] dark:bg-zinc-900 border border-[#E3DFD6] dark:border-zinc-800 text-[#6B6660]/60">
                        <FileSpreadsheet className="h-7 w-7" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">No courses matched criteria</h3>
                      <p className="mt-1.5 text-xs text-[#6B6660] dark:text-zinc-500 max-w-sm mx-auto">
                        Adjust your search parameters, reset filters, or create a new course structure.
                      </p>
                      <Link
                        href="/admin/courses/new"
                        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1F3A5C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1F3A5C]/90 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Course
                      </Link>
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((course, idx) => (
                    <CourseRow
                      key={course.id}
                      course={course}
                      idx={idx}
                      page={page}
                      limit={limit}
                      isSelected={selectedIds.includes(course.id)}
                      onToggleSelect={() => toggleSelectRow(course.id)}
                      activeMenuId={activeMenuId}
                      setActiveMenuId={setActiveMenuId}
                      onDuplicate={() => handleDuplicate(course.id)}
                      onDelete={() => openDeleteModal(course.id, course.name)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.length === 0 ? (
            <div className="col-span-full py-20 text-center rounded-xl border border-dashed border-[#E3DFD6] bg-white p-6">
              <FileSpreadsheet className="h-10 w-10 text-[#6B6660]/60 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-[#1C1B19]">No courses matched criteria</h3>
            </div>
          ) : (
            paginatedItems.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isSelected={selectedIds.includes(course.id)}
                onToggleSelect={() => toggleSelectRow(course.id)}
                onDuplicate={() => handleDuplicate(course.id)}
                onDelete={() => openDeleteModal(course.id, course.name)}
              />
            ))
          )}
        </div>
      )}

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
              {selectedIds.length} courses selected
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
      <DeleteCourseDialog
        isOpen={!!deleteId}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteSingle}
        courseName={deleteName}
        deleting={deleting}
      />
    </div>
  );
}
