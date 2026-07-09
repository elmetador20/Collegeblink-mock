"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown, AlertCircle, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { UserRow } from "./UserRow";
import { UserToolbar } from "./UserToolbar";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { DisableUserDialog } from "./DisableUserDialog";
import { EmptyState, TableSkeleton, Pagination } from "@/components/admin/ui-primitives";

interface UsersTableProps {
  initialItems: any[];
}

export function UsersTable({ initialItems }: UsersTableProps) {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Search & Filtering State
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [verificationFilter, setVerificationFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  // Sorting
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Selection
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Modals / Dialogs
  const [viewUser, setViewUser] = useState<any | null>(null);
  const [deleteUser, setDeleteUser] = useState<any | null>(null);
  const [disableUser, setDisableUser] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting helper
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Row selection helpers
  const handleSelectAll = (checked: boolean, filteredIds: string[]) => {
    if (checked) {
      setSelectedUsers(filteredIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Mutators
  const handleDeleteConfirm = async () => {
    if (!deleteUser) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteUser.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
      setSelectedUsers((prev) => prev.filter((id) => id !== deleteUser.id));
      toast.success("User account deleted successfully");
    } catch (e) {
      toast.error("Failed to delete user profile");
    } finally {
      setDeleting(false);
      setDeleteUser(null);
    }
  };

  const handleToggleStatusConfirm = async () => {
    if (!disableUser) return;
    setToggling(true);
    const isCurrentlyDisabled = disableUser.plan === "DISABLED";
    const nextPlan = isCurrentlyDisabled ? "FREE" : "DISABLED";
    try {
      const res = await fetch(`/api/admin/users/${disableUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: nextPlan }),
      });
      if (!res.ok) throw new Error("Status toggle failed");
      setUsers((prev) =>
        prev.map((u) => (u.id === disableUser.id ? { ...u, plan: nextPlan } : u))
      );
      toast.success(isCurrentlyDisabled ? "User account restored" : "User account suspended");
    } catch (e) {
      toast.error("Failed to update user account status");
    } finally {
      setToggling(false);
      setDisableUser(null);
    }
  };

  // Bulk mutations
  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} user accounts permanently?`)) return;

    let failed = 0;
    for (const id of selectedUsers) {
      try {
        const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
        if (!res.ok) failed++;
      } catch (e) {
        failed++;
      }
    }

    setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u.id)));
    setSelectedUsers([]);
    if (failed > 0) {
      toast.error(`Deleted selected accounts. ${failed} records failed.`);
    } else {
      toast.success("All selected user accounts deleted successfully");
    }
    router.refresh();
  };

  const handleBulkDisable = async () => {
    if (selectedUsers.length === 0) return;
    if (!confirm(`Are you sure you want to suspend ${selectedUsers.length} accounts?`)) return;

    let failed = 0;
    for (const id of selectedUsers) {
      try {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: "DISABLED" }),
        });
        if (!res.ok) failed++;
      } catch (e) {
        failed++;
      }
    }

    setUsers((prev) =>
      prev.map((u) => (selectedUsers.includes(u.id) ? { ...u, plan: "DISABLED" } : u))
    );
    setSelectedUsers([]);
    if (failed > 0) {
      toast.error(`Suspended accounts. ${failed} records failed.`);
    } else {
      toast.success("All selected user accounts suspended successfully");
    }
    router.refresh();
  };

  const handleExportCSV = () => {
    const listToExport = selectedUsers.length > 0 
      ? users.filter((u) => selectedUsers.includes(u.id))
      : filteredUsers;

    if (listToExport.length === 0) {
      toast.error("No records available to export");
      return;
    }

    const headers = ["ID", "Name", "Email", "Role", "Subscription Plan", "Email Verified", "City", "State", "Stream", "Last Login"];
    const rows = listToExport.map((u) => [
      u.id,
      u.name || "",
      u.email,
      u.role,
      u.plan,
      u.emailVerified ? "Yes" : "No",
      u.city || "",
      u.state || "",
      u.stream || "",
      u.lastLogin ? new Date(u.lastLogin).toISOString() : "",
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `collegeblink_users_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV report exported successfully");
  };

  // Filter & Search computation
  const filteredUsers = users
    .filter((user) => {
      const matchSearch =
        search === "" ||
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.stream?.toLowerCase().includes(search.toLowerCase()) ||
        user.city?.toLowerCase().includes(search.toLowerCase()) ||
        user.state?.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "Active" && user.plan !== "DISABLED") ||
        (statusFilter === "Disabled" && user.plan === "DISABLED");

      const matchVerification =
        verificationFilter === "ALL" ||
        (verificationFilter === "Verified" && !!user.emailVerified) ||
        (verificationFilter === "Pending" && !user.emailVerified);

      return matchSearch && matchRole && matchStatus && matchVerification;
    })
    .sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination calculation
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters = search !== "" || roleFilter !== "ALL" || statusFilter !== "ALL" || verificationFilter !== "ALL";

  const handleClearFilters = () => {
    setSearch("");
    setRoleFilter("ALL");
    setStatusFilter("ALL");
    setVerificationFilter("ALL");
    setCurrentPage(1);
    toast.success("Filters reset successfully");
  };

  const filteredIds = filteredUsers.map((u) => u.id);
  const isAllSelectedOnPage = filteredIds.length > 0 && filteredIds.every((id) => selectedUsers.includes(id));

  return (
    <div className="space-y-6">
      
      {/* Search and Filters Toolbar component */}
      <UserToolbar
        search={search}
        onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
        roleFilter={roleFilter}
        onRoleFilterChange={(v) => { setRoleFilter(v); setCurrentPage(1); }}
        statusFilter={statusFilter}
        onStatusFilterChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
        verificationFilter={verificationFilter}
        onVerificationFilterChange={(v) => { setVerificationFilter(v); setCurrentPage(1); }}
        showFilters={showFilters}
        onShowFiltersChange={setShowFilters}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        selectedCount={selectedUsers.length}
        onBulkDelete={handleBulkDelete}
        onBulkDisable={handleBulkDisable}
        onExportCSV={handleExportCSV}
      />

      {/* Main Table view */}
      {isPending ? (
        <TableSkeleton />
      ) : paginatedUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description={
            hasActiveFilters
              ? "No records matched your search parameters. Try removing filters or changing queries."
              : "No user registrations exist in the database registry."
          }
          actionLabel={hasActiveFilters ? "Reset Filters" : undefined}
          onAction={hasActiveFilters ? handleClearFilters : undefined}
        />
      ) : (
        <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E3DFD6] dark:divide-zinc-800 text-left text-sm select-none">
              <thead className="bg-[#FAF8F4] dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-[#6B6660]">
                <tr>
                  <th className="px-6 py-4 w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelectedOnPage}
                      onChange={(e) => handleSelectAll(e.target.checked, filteredIds)}
                      className="rounded border-[#E3DFD6] text-[#1F3A5C] h-4.5 w-4.5 focus:ring-[#1F3A5C]/35 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-zinc-150/40" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1.5">
                      <span>User Details</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-zinc-150/40" onClick={() => handleSort("role")}>
                    <div className="flex items-center gap-1.5">
                      <span>Role</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-zinc-150/40" onClick={() => handleSort("plan")}>
                    <div className="flex items-center gap-1.5">
                      <span>Plan</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3DFD6]/60 dark:divide-zinc-800/60 bg-white dark:bg-zinc-950">
                {paginatedUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    isSelected={selectedUsers.includes(user.id)}
                    onToggleSelect={() => handleSelectUser(user.id)}
                    onView={() => setViewUser(user)}
                    onEdit={() => router.push(`/admin/users/${user.id}`)}
                    onToggleStatus={() => setDisableUser(user)}
                    onDelete={() => setDeleteUser(user)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Table pagination component */}
          <div className="p-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60 bg-[#FAF8F4]/30 dark:bg-zinc-900/10">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              limit={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}

      {/* Confirmation Dialogs */}
      <DeleteUserDialog
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDeleteConfirm}
        userName={deleteUser?.name || deleteUser?.email || ""}
        deleting={deleting}
      />

      <DisableUserDialog
        isOpen={!!disableUser}
        onClose={() => setDisableUser(null)}
        onConfirm={handleToggleStatusConfirm}
        userName={disableUser?.name || disableUser?.email || ""}
        status={disableUser?.plan === "DISABLED" ? "Disabled" : "Active"}
        toggling={toggling}
      />

      {/* User Details Slide Panel Modal */}
      <AnimatePresence>
        {viewUser && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1C1B19]/30 backdrop-blur-[1px]"
              onClick={() => setViewUser(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 h-full shadow-2xl z-10 p-6 flex flex-col justify-between border-l border-[#E3DFD6] dark:border-zinc-800"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-5">
                  <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
                    User Profile Dossier
                  </h3>
                  <button
                    onClick={() => setViewUser(null)}
                    className="p-1 rounded-md text-[#6B6660] hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-[#1F3A5C] to-[#2E5A88] flex items-center justify-center text-lg font-bold text-white shadow-sm">
                      {(viewUser.name || viewUser.email || "U").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-[#1C1B19] dark:text-zinc-100">
                        {viewUser.name || "—"}
                      </h4>
                      <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">{viewUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                    <div>
                      <span className="text-[#6B6660] block font-medium">Access Role</span>
                      <span className="font-semibold text-[#1C1B19] dark:text-zinc-200 mt-0.5 block">{viewUser.role}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6660] block font-medium">Subscription</span>
                      <span className="font-semibold text-[#1C1B19] dark:text-zinc-200 mt-0.5 block">{viewUser.plan}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6660] block font-medium">Academic Stream</span>
                      <span className="font-semibold text-[#1C1B19] dark:text-zinc-200 mt-0.5 block">{viewUser.stream || "—"}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6660] block font-medium">Location</span>
                      <span className="font-semibold text-[#1C1B19] dark:text-zinc-200 mt-0.5 block">
                        {viewUser.city && viewUser.state ? `${viewUser.city}, ${viewUser.state}` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B6660] block font-medium">Email Verification</span>
                      <span className="font-semibold text-[#1C1B19] dark:text-zinc-200 mt-0.5 block">
                        {viewUser.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B6660] block font-medium">Last Login</span>
                      <span className="font-semibold text-[#1C1B19] dark:text-zinc-200 mt-0.5 block">
                        {viewUser.lastLogin ? new Date(viewUser.lastLogin).toLocaleString() : "Never"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E3DFD6] dark:border-zinc-800 pt-4 flex gap-3">
                <button
                  onClick={() => {
                    router.push(`/admin/users/${viewUser.id}`);
                    setViewUser(null);
                  }}
                  className="flex-1 rounded-xl bg-[#1F3A5C] text-white hover:bg-[#1F3A5C]/90 px-4 py-2.5 text-xs font-bold text-center"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setViewUser(null)}
                  className="flex-1 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-bold text-[#6B6660] hover:text-[#1C1B19]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
