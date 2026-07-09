"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { GeneralSection } from "./GeneralSection";
import { LocationSection } from "./LocationSection";
import { MediaSection } from "./MediaSection";
import { SeoSection } from "./SeoSection";
import { DetailsSection } from "./DetailsSection";
import { PublishSection } from "./PublishSection";

interface CollegeFormValues {
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  city: string;
  state: string;
  country: string;
  type: string;
  established: string;
  nirfRank: string;
  naacRating: string;
  accreditation: string[];
  website: string;
  latitude: string;
  longitude: string;
  description: string;
  about: string;
  facilities: string[];
  highlights: string[];
  entranceExams: string[];
  avgPackage: string;
  highestPackage: string;
  tuitionFees: string;
  totalFees: string;
  seats: string;
  placementRate: string;
  campusSize: string;
  tags: string[];
  verified: boolean;
}

function toFormState(data?: any): CollegeFormValues {
  return {
    name: data?.name ?? "",
    slug: data?.slug ?? "",
    logo: data?.logo ?? "",
    coverImage: data?.coverImage ?? "",
    city: data?.city ?? "",
    state: data?.state ?? "",
    country: data?.country ?? "India",
    type: data?.type ?? "",
    established: data?.established?.toString() ?? "",
    nirfRank: data?.nirfRank?.toString() ?? "",
    naacRating: data?.naacRating ?? "",
    accreditation: data?.accreditation ?? [],
    website: data?.website ?? "",
    latitude: data?.latitude?.toString() ?? "",
    longitude: data?.longitude?.toString() ?? "",
    description: data?.description ?? "",
    about: data?.about ?? "",
    facilities: data?.facilities ?? [],
    highlights: data?.highlights ?? [],
    entranceExams: data?.entranceExams ?? [],
    avgPackage: data?.avgPackage?.toString() ?? "",
    highestPackage: data?.highestPackage?.toString() ?? "",
    tuitionFees: data?.tuitionFees?.toString() ?? "",
    totalFees: data?.totalFees?.toString() ?? "",
    seats: data?.seats?.toString() ?? "",
    placementRate: data?.placementRate?.toString() ?? "",
    campusSize: data?.campusSize ?? "",
    tags: data?.tags ?? [],
    verified: data?.verified ?? false,
  };
}

function toIntOrNull(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function toFloatOrNull(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CollegeForm({
  mode,
  collegeId,
  initialData,
}: {
  mode: "create" | "edit";
  collegeId?: string;
  initialData?: any;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CollegeFormValues>(() => toFormState(initialData));
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(mode === "create");
  const [submitting, setSubmitting] = useState(false);

  // Drag and drop states
  const [dragActiveLogo, setDragActiveLogo] = useState(false);
  const [dragActiveCover, setDragActiveCover] = useState(false);

  const fileInputLogoRef = useRef<HTMLInputElement>(null);
  const fileInputCoverRef = useRef<HTMLInputElement>(null);

  // Update a form field value
  const update = <K extends keyof CollegeFormValues>(key: K, value: CollegeFormValues[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && autoGenerateSlug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  // Keep slug synced with auto-generator
  useEffect(() => {
    if (autoGenerateSlug && form.name) {
      update("slug", slugify(form.name));
    }
  }, [autoGenerateSlug]);

  // Form Validation checks
  const isNameValid = form.name.trim().length > 0;
  const isSlugValid = form.slug.trim().length > 0 && /^[a-z0-9-]+$/.test(form.slug);
  const isCityValid = form.city.trim().length > 0;
  const isStateValid = form.state.trim().length > 0;
  const isTypeValid = form.type.trim().length > 0;

  const isFormValid = isNameValid && isSlugValid && isCityValid && isStateValid && isTypeValid;

  // Handle local File drop conversion to base64
  const processImageFile = (file: File, target: "logo" | "coverImage") => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please drop an image file.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image file must be under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      update(target, base64Data);
      toast.success(`${target === "logo" ? "Logo" : "Cover image"} uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields and correct any errors.");
      return;
    }

    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      slug: slugify(form.slug),
      logo: form.logo.trim() || null,
      coverImage: form.coverImage.trim() || null,
      city: form.city.trim(),
      state: form.state.trim(),
      country: form.country.trim() || null,
      type: form.type.trim(),
      established: toIntOrNull(form.established),
      nirfRank: toIntOrNull(form.nirfRank),
      naacRating: form.naacRating.trim() || null,
      accreditation: form.accreditation,
      website: form.website.trim() || null,
      latitude: toFloatOrNull(form.latitude),
      longitude: toFloatOrNull(form.longitude),
      description: form.description.trim() || null,
      about: form.about.trim() || null,
      facilities: form.facilities,
      highlights: form.highlights,
      entranceExams: form.entranceExams,
      avgPackage: toFloatOrNull(form.avgPackage),
      highestPackage: toFloatOrNull(form.highestPackage),
      tuitionFees: toFloatOrNull(form.tuitionFees),
      totalFees: toFloatOrNull(form.totalFees),
      seats: toIntOrNull(form.seats),
      placementRate: toFloatOrNull(form.placementRate),
      campusSize: form.campusSize.trim() || null,
      tags: form.tags,
      verified: form.verified,
    };

    try {
      const url = mode === "create" ? "/api/admin/colleges" : `/api/admin/colleges/${collegeId}`;
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

      toast.success(mode === "create" ? "College created successfully" : "College updated successfully");
      router.push("/admin/colleges");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save the college profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      <GeneralSection
        form={form}
        update={update}
        isNameValid={isNameValid}
        autoGenerateSlug={autoGenerateSlug}
        setAutoGenerateSlug={setAutoGenerateSlug}
        isSlugValid={isSlugValid}
        isTypeValid={isTypeValid}
      />

      <LocationSection
        form={form}
        update={update}
        isCityValid={isCityValid}
        isStateValid={isStateValid}
      />

      <DetailsSection
        form={form}
        update={update}
      />

      <MediaSection
        form={form}
        update={update}
        dragActiveLogo={dragActiveLogo}
        setDragActiveLogo={setDragActiveLogo}
        dragActiveCover={dragActiveCover}
        setDragActiveCover={setDragActiveCover}
        fileInputLogoRef={fileInputLogoRef}
        fileInputCoverRef={fileInputCoverRef}
        processImageFile={processImageFile}
      />

      <SeoSection
        form={form}
        update={update}
      />

      <PublishSection
        form={form}
        update={update}
        submitting={submitting}
        isFormValid={isFormValid}
        isNameValid={isNameValid}
        isSlugValid={isSlugValid}
        isTypeValid={isTypeValid}
        isCityValid={isCityValid}
        isStateValid={isStateValid}
        mode={mode}
        onCancel={() => router.push("/admin/colleges")}
      />
    </form>
  );
}
