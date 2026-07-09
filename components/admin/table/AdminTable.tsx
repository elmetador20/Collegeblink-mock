"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import { SortableHeader } from "./SortableHeader";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { FilterDropdown } from "./FilterDropdown";
import { ActionMenu } from "./ActionMenu";
import { EmptyState } from "./EmptyState";
import { StatusBadge } from "./StatusBadge";

interface ColumnDef {
  key: string;
  header: string;
  className?: string;
  render: (item: any) => React.ReactNode;
}

interface AdminTableProps {
  initialItems: any[];
  entity: "colleges" | "courses" | "blogs" | "users";
  label: string;
  pluralLabel: string;
  searchPlaceholder: string;
  hasForm: boolean;
}

export function AdminTable({
  initialItems,
  entity,
  label,
  pluralLabel,
  searchPlaceholder,
  hasForm,
}: AdminTableProps) {
  const router = useRouter();

  const [items, setItems] = useState<any[]>(initialItems);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [showFilters, setShowFilters] = useState(false);
  const [filter1, setFilter1] = useState("all");
  const [filter2, setFilter2] = useState("all");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleFilter1Change = (val: string) => {
    setFilter1(val);
    setPage(1);
  };

  const handleFilter2Change = (val: string) => {
    setFilter2(val);
    setPage(1);
  };

  const filterOptions = useMemo(() => {
    switch (entity) {
      case "colleges":
        return {
          label1: "Type",
          options1: [
            { label: "All Types", value: "all" },
            { label: "Government", value: "Government" },
            { label: "Private", value: "Private" },
          ],
          label2: "Verification Status",
          options2: [
            { label: "All Statuses", value: "all" },
            { label: "Verified Only", value: "verified" },
            { label: "Unverified Only", value: "unverified" },
          ],
        };
      case "courses":
        return {
          label1: "Degree",
          options1: [
            { label: "All Degrees", value: "all" },
            { label: "B.Tech", value: "B.Tech" },
            { label: "M.Tech", value: "M.Tech" },
            { label: "MBA", value: "MBA" },
            { label: "BBA", value: "BBA" },
            { label: "B.Sc", value: "B.Sc" },
            { label: "B.A", value: "B.A" },
            { label: "B.Com", value: "B.Com" },
          ],
          label2: "Status",
          options2: [
            { label: "All Statuses", value: "all" },
            { label: "Active Only", value: "active" },
            { label: "Inactive Only", value: "inactive" },
          ],
        };
      case "blogs":
        return {
          label1: "Category",
          options1: [
            { label: "All Categories", value: "all" },
            { label: "Admissions", value: "Admissions" },
            { label: "Rankings", value: "Rankings" },
            { label: "Trends", value: "Trends" },
            { label: "Placements", value: "Placements" },
            { label: "Finance", value: "Finance" },
            { label: "Campus Life", value: "Campus Life" },
            { label: "Career", value: "Career" },
            { label: "Academics", value: "Academics" },
          ],
          label2: "Status",
          options2: [
            { label: "All Statuses", value: "all" },
            { label: "Published Only", value: "published" },
            { label: "Drafts Only", value: "draft" },
          ],
        };
      case "users":
        return {
          label1: "Role",
          options1: [
            { label: "All Roles", value: "all" },
            { label: "ADMIN", value: "ADMIN" },
            { label: "USER", value: "USER" },
          ],
          label2: "Plan",
          options2: [
            { label: "All Plans", value: "all" },
            { label: "PREMIUM Only", value: "PREMIUM" },
            { label: "FREE Only", value: "FREE" },
          ],
        };
      default:
        return null;
    }
  }, [entity]);

  const columns = useMemo<ColumnDef[]>(() => {
    switch (entity) {
      case "colleges":
        return [
          {
            key: "name",
            header: "College",
            render: (college: any) => (
              <div>
                <div className="font-semibold text-[#1C1B19] text-[14px] hover:text-[#1F3A5C] transition-colors">{college.name}</div>
                <div className="text-[12px] font-mono text-[#6B6660]/75">/{college.slug}</div>
              </div>
            ),
          },
          {
            key: "location",
            header: "Location",
            render: (college: any) => (
              <span className="text-[13px] text-[#6B6660]">{college.city}, {college.state}</span>
            ),
          },
          {
            key: "type",
            header: "Type",
            render: (college: any) => (
              <span className="inline-flex items-center rounded-full bg-[#FAF8F4] border border-[#E3DFD6] px-2.5 py-0.5 text-xs font-medium text-[#1C1B19]">
                {college.type}
              </span>
            ),
          },
          {
            key: "nirfRank",
            header: "NIRF",
            className: "text-center",
            render: (college: any) => (
              <span className="font-mono text-sm font-semibold text-[#1C1B19]">{college.nirfRank ?? "—"}</span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (college: any) => (
              <StatusBadge status={college.verified} type="verified" />
            ),
          },
        ];
      case "courses":
        return [
          {
            key: "name",
            header: "Course",
            render: (course: any) => (
              <div>
                <div className="font-semibold text-[#1C1B19] text-[14px]">{course.name}</div>
                <div className="text-[12px] font-mono text-[#6B6660]/75">/{course.slug || course.id}</div>
              </div>
            ),
          },
          {
            key: "degree",
            header: "Degree",
            render: (course: any) => (
              <span className="inline-flex items-center rounded-full bg-[#1F3A5C]/5 text-[#1F3A5C] px-2.5 py-0.5 text-xs font-medium border border-[#1F3A5C]/10">
                {course.degree || "—"}
              </span>
            ),
          },
          {
            key: "duration",
            header: "Duration",
            render: (course: any) => (
              <span className="text-[13px] text-[#6B6660] font-medium">{course.duration} Years</span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (course: any) => (
              <StatusBadge status={course.active} type="active" />
            ),
          },
        ];
      case "blogs":
        return [
          {
            key: "title",
            header: "Title",
            render: (blog: any) => (
              <div className="max-w-md">
                <div className="font-semibold text-[#1C1B19] text-[14px] truncate">{blog.title}</div>
                <div className="text-[12px] font-mono text-[#6B6660]/75 truncate">/{blog.slug}</div>
              </div>
            ),
          },
          {
            key: "category",
            header: "Category",
            render: (blog: any) => (
              <span className="inline-flex items-center rounded-full bg-[#FAF8F4] border border-[#E3DFD6] px-2.5 py-0.5 text-xs font-medium text-[#1C1B19]">
                {blog.category}
              </span>
            ),
          },
          {
            key: "published",
            header: "Status",
            render: (blog: any) => (
              <StatusBadge status={blog.published} type="published" />
            ),
          },
        ];
      case "users":
        return [
          {
            key: "name",
            header: "User",
            render: (user: any) => (
              <div>
                <div className="font-semibold text-[#1C1B19] text-[14px]">{user.name ?? "—"}</div>
                <div className="text-[12px] text-[#6B6660]">{user.email}</div>
              </div>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: (user: any) => (
              <StatusBadge status={user.role} type="role" />
            ),
          },
          {
            key: "plan",
            header: "Plan",
            render: (user: any) => (
              <StatusBadge status={user.plan} type="plan" />
            ),
          },
          {
            key: "location",
            header: "Location",
            render: (user: any) => (
              <span className="text-[13px] text-[#6B6660]">{user.city && user.state ? `${user.city}, ${user.state}` : "—"}</span>
            ),
          },
          {
            key: "stream",
            header: "Stream",
            render: (user: any) => (
              <span className="text-[13px] text-[#6B6660]">{user.stream || "—"}</span>
            ),
          },
        ];
      default:
        return [];
    }
  }, [entity]);

  const processedItems = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((item) => {
        if (entity === "colleges") {
          return (
            item.name.toLowerCase().includes(q) ||
            item.city.toLowerCase().includes(q) ||
            item.state.toLowerCase().includes(q)
          );
        } else if (entity === "courses") {
          return (
            item.name.toLowerCase().includes(q) ||
            item.degree.toLowerCase().includes(q)
          );
        } else if (entity === "blogs") {
          return (
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          );
        } else if (entity === "users") {
          return (
            (item.name && item.name.toLowerCase().includes(q)) ||
            item.email.toLowerCase().includes(q)
          );
        }
        return false;
      });
    }

    if (filter1 !== "all") {
      if (entity === "colleges") {
        result = result.filter((item) => item.type === filter1);
      } else if (entity === "courses") {
        result = result.filter((item) => item.degree === filter1);
      } else if (entity === "blogs") {
        result = result.filter((item) => item.category === filter1);
      } else if (entity === "users") {
        result = result.filter((item) => item.role === filter1);
      }
    }

    if (filter2 !== "all") {
      if (entity === "colleges") {
        const val = filter2 === "verified";
        result = result.filter((item) => item.verified === val);
      } else if (entity === "courses") {
        const val = filter2 === "active";
        result = result.filter((item) => item.active !== false === val);
      } else if (entity === "blogs") {
        const val = filter2 === "published";
        result = result.filter((item) => item.published === val);
      } else if (entity === "users") {
        result = result.filter((item) => item.plan === filter2);
      }
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
  }, [items, search, filter1, filter2, sortKey, sortOrder, entity]);

  const totalItems = processedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * limit;
    return processedItems.slice(start, start + limit);
  }, [processedItems, page, limit]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const openDeleteModal = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setDeleteName("");
    setDeleting(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const url = `/api/admin/${entity}/${deleteId}`;
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Couldn't delete ${label.toLowerCase()}.`);
      }

      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success(`${label} deleted successfully`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : `Failed to delete ${label.toLowerCase()}.`);
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="mt-6 text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
        />

        <div className="flex items-center gap-2">
          {filterOptions && (
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 rounded-lg border border-[#E3DFD6] px-4 py-2.5 text-sm font-medium transition-colors ${
                showFilters || filter1 !== "all" || filter2 !== "all"
                  ? "bg-[#1F3A5C]/5 border-[#1F3A5C] text-[#1F3A5C]"
                  : "bg-white text-[#1C1B19] hover:bg-[#FAF8F4]"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(filter1 !== "all" || filter2 !== "all") && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1F3A5C] text-[10px] text-white">
                  {(filter1 !== "all" ? 1 : 0) + (filter2 !== "all" ? 1 : 0)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      <FilterDropdown
        showFilters={showFilters}
        filterOptions={filterOptions}
        filter1={filter1}
        filter2={filter2}
        onFilter1Change={handleFilter1Change}
        onFilter2Change={handleFilter2Change}
      />

      <Table>
        <TableHeader>
          <th className="w-12 px-5 py-4 font-semibold text-center select-none">#</th>
          {columns.map((column) => (
            <SortableHeader
              key={column.key}
              label={column.header}
              onClick={() => handleSort(column.key)}
              className={column.className}
            />
          ))}
          {hasForm && <th className="px-5 py-4 font-semibold text-right w-36 select-none">Actions</th>}
        </TableHeader>
        <TableBody>
          {paginatedItems.length === 0 ? (
            <EmptyState colSpan={columns.length + (hasForm ? 2 : 1)} />
          ) : (
            paginatedItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs text-[#6B6660] text-center">
                  {(page - 1) * limit + index + 1}
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={column.className}
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
                {hasForm && (
                  <TableCell className="text-right">
                    <ActionMenu
                      editHref={`/admin/${entity}/${item.id}/edit`}
                      onDeleteClick={() => openDeleteModal(item.id, item.name || item.title)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        limit={limit}
        onPageChange={setPage}
      />

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeleteModal}
              className="fixed inset-0 bg-[#1C1B19]/40 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#E3DFD6] bg-white p-6 shadow-xl z-10"
            >
              <button
                type="button"
                onClick={closeDeleteModal}
                className="absolute right-4 top-4 rounded-md text-[#6B6660] hover:text-[#1C1B19] hover:bg-[#FAF8F4] p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex gap-4 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 border border-red-100 text-[#A23B2E]">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1C1B19]">Delete {label}?</h3>
                  <p className="mt-2 text-sm text-[#6B6660] leading-relaxed">
                    Are you sure you want to delete <span className="font-semibold text-[#1C1B19]">"{deleteName}"</span>? This action cannot be undone and will remove the record completely from the registry.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E3DFD6] pt-4">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="rounded-lg border border-[#E3DFD6] bg-white px-4 py-2 text-sm font-semibold text-[#6B6660] hover:bg-[#FAF8F4] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-lg bg-[#A23B2E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A23B2E]/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default AdminTable;
