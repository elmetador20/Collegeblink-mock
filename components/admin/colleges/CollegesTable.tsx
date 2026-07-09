"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpDown, Plus, Loader2, FileSpreadsheet } from "lucide-react";
import toast from "react-hot-toast";

import { CollegeRow } from "./CollegeRow";
import { CollegeToolbar } from "./CollegeToolbar";
import { DeleteCollegeDialog } from "./DeleteCollegeDialog";
import { Pagination } from "@/components/admin/ui-primitives";

interface CollegesTableProps {
  initialItems: any[];
}

export function CollegesTable({ initialItems }: CollegesTableProps) {
  const router = useRouter();

  // Local State
  const [items, setItems] = useState<any[]>(initialItems);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  // Sorting State
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtering State
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Action Menu dropdown active row State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Delete Confirmation Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  // Dynamic filter options generated from items list
  const stateOptions = useMemo(() => {
    const states = Array.from(new Set(items.map((item) => item.state).filter(Boolean)));
    return ["all", ...states];
  }, [items]);

  const cityOptions = useMemo(() => {
    const filteredItems = stateFilter === "all" ? items : items.filter((item) => item.state === stateFilter);
    const cities = Array.from(new Set(filteredItems.map((item) => item.city).filter(Boolean)));
    return ["all", ...cities];
  }, [items, stateFilter]);

  // Reset page when filters change
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

  // Sorting logic
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Local Filter, Search, and Sort Process
  const processedItems = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (statusFilter !== "all") {
      const isVerified = statusFilter === "verified";
      result = result.filter((item) => item.verified === isVerified);
    }

    if (stateFilter !== "all") {
      result = result.filter((item) => item.state === stateFilter);
    }

    if (cityFilter !== "all") {
      result = result.filter((item) => item.city === cityFilter);
    }

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
  }, [items, search, typeFilter, statusFilter, stateFilter, cityFilter, sortKey, sortOrder]);

  // Paginated chunk
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
      const res = await fetch(`/api/admin/colleges/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete college.");
      }

      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      setSelectedIds((prev) => prev.filter((x) => x !== deleteId));
      toast.success("College deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete college");
    } finally {
      setDeleteId(null);
      setDeleteName("");
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected colleges?`)) return;

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const res = await fetch(`/api/admin/colleges/${id}`, {
              method: "DELETE",
            });
            if (res.ok) successCount++;
            else failCount++;
          } catch {
            failCount++;
          }
        })
      );

      setItems((prev) => prev.filter((x) => !selectedIds.includes(x.id)));
      setSelectedIds([]);
      toast.success(`Deleted ${successCount} colleges.${failCount > 0 ? ` Failed to delete ${failCount}.` : ""}`);
      router.refresh();
    } catch (err) {
      toast.error("Bulk delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkPublish = async () => {
    if (selectedIds.length === 0) return;

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const item = items.find((x) => x.id === id);
            if (!item) return;

            const res = await fetch(`/api/admin/colleges/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...item, verified: true }),
            });

            if (res.ok) successCount++;
            else failCount++;
          } catch {
            failCount++;
          }
        })
      );

      setItems((prev) =>
        prev.map((x) => (selectedIds.includes(x.id) ? { ...x, verified: true } : x))
      );
      setSelectedIds([]);
      toast.success(`Verified ${successCount} colleges.${failCount > 0 ? ` Failed to verify ${failCount}.` : ""}`);
      router.refresh();
    } catch (err) {
      toast.error("Bulk verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    setLoading(true);
    setActiveMenuId(null);

    try {
      const detailRes = await fetch(`/api/admin/colleges`).then((r) => r.json());
      const fullList = detailRes.data || [];
      const collegeToCopy = fullList.find((x: any) => x.id === id) || items.find((x) => x.id === id);

      if (!collegeToCopy) {
        throw new Error("Unable to locate college record details.");
      }

      const duplicatePayload = {
        ...collegeToCopy,
        id: undefined,
        name: `${collegeToCopy.name} (Copy)`,
        slug: `${collegeToCopy.slug}-copy-${Math.floor(100 + Math.random() * 900)}`,
        verified: false,
        createdAt: undefined,
        updatedAt: undefined,
      };

      const createRes = await fetch(`/api/admin/colleges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatePayload),
      });

      if (!createRes.ok) {
        const body = await createRes.json().catch(() => ({}));
        throw new Error(body.error || "Failed to create duplicate.");
      }

      const createdCollege = await createRes.json();
      setItems((prev) => [createdCollege, ...prev]);
      toast.success("College duplicated successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to duplicate college");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const itemsToExport = selectedIds.length > 0
      ? items.filter((x) => selectedIds.includes(x.id))
      : processedItems;

    if (itemsToExport.length === 0) {
      toast.error("No records available to export");
      return;
    }

    const headers = ["Name", "Slug", "Type", "City", "State", "NIRF", "Verified"];
    const csvRows = [
      headers.join(","),
      ...itemsToExport.map((x) =>
        [
          `"${(x.name || "").replace(/"/g, '""')}"`,
          `"${x.slug || ""}"`,
          `"${x.type || ""}"`,
          `"${x.city || ""}"`,
          `"${x.state || ""}"`,
          x.nirfRank ?? "",
          x.verified ? "Yes" : "No",
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `colleges-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${itemsToExport.length} colleges to CSV`);
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

      {/* Toolbar controls */}
      <CollegeToolbar
        search={search}
        onSearchChange={handleSearchChange}
        showFilters={showFilters}
        onShowFiltersChange={setShowFilters}
        typeFilter={typeFilter}
        onTypeFilterChange={(v) => handleFilterChange(setTypeFilter, v)}
        statusFilter={statusFilter}
        onStatusFilterChange={(v) => handleFilterChange(setStatusFilter, v)}
        stateFilter={stateFilter}
        onStateFilterChange={(v) => {
          handleFilterChange(setStateFilter, v);
          setCityFilter("all");
        }}
        cityFilter={cityFilter}
        onCityFilterChange={(v) => handleFilterChange(setCityFilter, v)}
        stateOptions={stateOptions}
        cityOptions={cityOptions}
        selectedCount={selectedIds.length}
        onBulkDelete={handleBulkDelete}
        onBulkVerify={handleBulkPublish}
        onExportCSV={handleExportCSV}
      />

      {/* Table grid */}
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
                <th onClick={() => handleSort("name")} className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-1">
                    College
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort("city")} className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-1">
                    Location
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort("type")} className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-1">
                    Type
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort("nirfRank")} className="px-5 py-4 text-center cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center justify-center gap-1">
                    NIRF
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort("verified")} className="px-5 py-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
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
                    <h3 className="mt-4 text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">No colleges matched criteria</h3>
                    <p className="mt-1.5 text-xs text-[#6B6660] dark:text-zinc-500 max-w-sm mx-auto">
                      Adjust your search keyword, reset the active filters, or add a new college from scratch.
                    </p>
                    <Link
                      href="/admin/colleges/new"
                      className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1F3A5C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1F3A5C]/90 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add College
                    </Link>
                  </td>
                </tr>
              ) : (
                paginatedItems.map((college, idx) => (
                  <CollegeRow
                    key={college.id}
                    college={college}
                    idx={idx}
                    page={page}
                    limit={limit}
                    isSelected={selectedIds.includes(college.id)}
                    onToggleSelect={() => toggleSelectRow(college.id)}
                    activeMenuId={activeMenuId}
                    setActiveMenuId={setActiveMenuId}
                    onDuplicate={() => handleDuplicate(college.id)}
                    onDelete={() => openDeleteModal(college.id, college.name)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination component */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          limit={limit}
          onPageChange={setPage}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteCollegeDialog
        isOpen={!!deleteId}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteSingle}
        collegeName={deleteName}
        deleting={deleting}
      />
    </div>
  );
}
