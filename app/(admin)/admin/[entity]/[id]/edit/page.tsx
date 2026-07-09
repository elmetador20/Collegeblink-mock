import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entity-registry";
import { PageHeader } from "@/components/admin/page-header";

export default async function EditEntityPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const config = getEntity(entity);

  if (!config || !config.Form) notFound();

  const { Form, formProps, getById, label, eyebrow } = config;

  const record = await getById(id);

  if (!record) notFound();

  const displayName = "name" in record
    ? (record as any).name
    : (record as any).title ?? "Record";

  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={`Edit ${displayName}`} />
      <div className="mt-8">
        <Form mode="edit" initialData={record} {...formProps(id)} />
      </div>
    </div>
  );
}