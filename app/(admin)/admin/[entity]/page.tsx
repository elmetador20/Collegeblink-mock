import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entity-registry";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/AdminTable";
import { CollegesTable } from "@/components/admin/CollegesTable";
import { CoursesTable } from "@/components/admin/CoursesTable";
import { BlogsTable } from "@/components/admin/BlogsTable";
import { UsersTable } from "@/components/admin/UsersTable";

export default async function EntityListPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const config = getEntity(entity);

  if (!config) notFound();

  const { label, pluralLabel, eyebrow, list, searchPlaceholder } = config;

  // Fetch all records for local fast search/sort/filter
  const result = await list({ search: "", page: 1, limit: 1000 });
  const items = result.data;

  const hasForm = !!config.Form;

  return (
    <div>
      <PageHeader
        eyebrow="Registry"
        title={pluralLabel ?? eyebrow}
        description={`${result.total} ${label.toLowerCase()}${result.total === 1 ? "" : "s"} on record`}
        action={
          hasForm ? (
            <Link
              href={`/admin/${entity}/new`}
              className="rounded-md bg-[#1F3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#1F3A5C]/90 transition-colors shadow-sm"
            >
              Add {label.toLowerCase()}
            </Link>
          ) : undefined
        }
      />

      {entity === "colleges" ? (
        <CollegesTable initialItems={items} />
      ) : entity === "courses" ? (
        <CoursesTable initialItems={items} />
      ) : entity === "blogs" ? (
        <BlogsTable initialItems={items} />
      ) : entity === "users" ? (
        <UsersTable initialItems={items} />
      ) : (
        <AdminTable
          initialItems={items}
          entity={entity as any}
          label={label}
          pluralLabel={pluralLabel || eyebrow}
          searchPlaceholder={searchPlaceholder ?? `Search ${(label as string).toLowerCase()}s`}
          hasForm={hasForm}
        />
      )}
    </div>
  );
}