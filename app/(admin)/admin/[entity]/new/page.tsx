import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entity-registry";
import { PageHeader } from "@/components/admin/page-header";
import Link from "next/link";

export default async function NewEntityPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const config = getEntity(entity);

  if (!config || !config.Form) notFound();

  const { Form, formProps, label, eyebrow } = config;

  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={`Add a new ${label.toLowerCase()}`} />
      <div className="mt-8">
        <Form mode="create" {...formProps(undefined)} />
      </div>
    </div>
  );
}