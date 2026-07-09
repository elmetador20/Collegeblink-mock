import * as collegeRepo from "@/repositories/college.repository";
import { DEMO_MODE } from "@/lib/demo";
import { mockColleges, type College } from "@/mock/colleges";

export interface GetCollegesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getColleges(params: GetCollegesParams) {
  if (DEMO_MODE) {
    const { search, page = 1, limit = 10 } = params;
    let filtered = [...mockColleges];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerSearch) ||
          c.city.toLowerCase().includes(lowerSearch) ||
          c.state.toLowerCase().includes(lowerSearch)
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  return collegeRepo.findMany(params);
}

export async function getCollegeById(id: string) {
  if (DEMO_MODE) {
    return mockColleges.find((c) => c.id === id) || null;
  }
  return collegeRepo.findById(id);
}

export async function getCollegeBySlug(slug: string) {
  if (DEMO_MODE) {
    return mockColleges.find((c) => c.slug === slug) || null;
  }
  return collegeRepo.findBySlug(slug);
}

export async function createCollege(user: any, data: any) {
  if (user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  if (DEMO_MODE) {
    const newCollege: College = {
      id: `col_${Date.now()}`,
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      logo: data.logo || null,
      coverImage: data.coverImage || null,
      city: data.city,
      state: data.state,
      country: data.country || "India",
      type: data.type || "Private",
      established: data.established ? Number(data.established) : null,
      nirfRank: data.nirfRank ? Number(data.nirfRank) : null,
      naacRating: data.naacRating || null,
      accreditation: data.accreditation || [],
      website: data.website || null,
      latitude: data.latitude ? Number(data.latitude) : null,
      longitude: data.longitude ? Number(data.longitude) : null,
      description: data.description || null,
      about: data.about || null,
      avgPackage: data.avgPackage ? Number(data.avgPackage) : null,
      highestPackage: data.highestPackage ? Number(data.highestPackage) : null,
      tuitionFees: data.tuitionFees ? Number(data.tuitionFees) : null,
      totalFees: data.totalFees ? Number(data.totalFees) : null,
      seats: data.seats ? Number(data.seats) : null,
      placementRate: data.placementRate ? Number(data.placementRate) : null,
      campusSize: data.campusSize || null,
      verified: data.verified !== undefined ? !!data.verified : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockColleges.unshift(newCollege);
    return newCollege;
  }

  return collegeRepo.create(data);
}

export async function updateCollege(user: any, id: string, data: any) {
  if (user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  if (DEMO_MODE) {
    const index = mockColleges.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("College not found");

    const updated: College = {
      ...mockColleges[index],
      ...data,
      established: data.established !== undefined ? (data.established ? Number(data.established) : null) : mockColleges[index].established,
      nirfRank: data.nirfRank !== undefined ? (data.nirfRank ? Number(data.nirfRank) : null) : mockColleges[index].nirfRank,
      avgPackage: data.avgPackage !== undefined ? (data.avgPackage ? Number(data.avgPackage) : null) : mockColleges[index].avgPackage,
      highestPackage: data.highestPackage !== undefined ? (data.highestPackage ? Number(data.highestPackage) : null) : mockColleges[index].highestPackage,
      tuitionFees: data.tuitionFees !== undefined ? (data.tuitionFees ? Number(data.tuitionFees) : null) : mockColleges[index].tuitionFees,
      totalFees: data.totalFees !== undefined ? (data.totalFees ? Number(data.totalFees) : null) : mockColleges[index].totalFees,
      seats: data.seats !== undefined ? (data.seats ? Number(data.seats) : null) : mockColleges[index].seats,
      placementRate: data.placementRate !== undefined ? (data.placementRate ? Number(data.placementRate) : null) : mockColleges[index].placementRate,
      updatedAt: new Date(),
    };
    mockColleges[index] = updated;
    return updated;
  }

  return collegeRepo.update(id, data);
}

export async function deleteCollege(user: any, id: string) {
  if (user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  if (DEMO_MODE) {
    const index = mockColleges.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("College not found");
    const [deleted] = mockColleges.splice(index, 1);
    return deleted;
  }

  return collegeRepo.remove(id);
}