import { NextRequest, NextResponse } from "next/server";
import { collegeSearchSchema } from "@/types";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const params = {
      search: searchParams.get("search") || undefined,
      states: searchParams.getAll("state").filter(Boolean),
      cities: searchParams.getAll("city").filter(Boolean),
      types: searchParams.getAll("type").filter(Boolean),
      minFees: searchParams.get("feesMin") ? parseInt(searchParams.get("feesMin")!) : undefined,
      maxFees: searchParams.get("feesMax") ? parseInt(searchParams.get("feesMax")!) : undefined,
      minNirfRank: searchParams.get("nirfMin") ? parseInt(searchParams.get("nirfMin")!) : undefined,
      maxNirfRank: searchParams.get("nirfMax") ? parseInt(searchParams.get("nirfMax")!) : undefined,
      entranceExams: searchParams.get("exam") ? [searchParams.get("exam")!] : undefined,
      minRating: searchParams.get("rating") ? parseFloat(searchParams.get("rating")!) : undefined,
      accreditation: searchParams.getAll("accreditation").filter(Boolean),
      country: searchParams.get("country") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "12"),
      sortBy: searchParams.get("sort") || "nirfRank",
      sortOrder: "asc" as const,
    };

    const validation = collegeSearchSchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: validation.error.errors },
        { status: 400 }
      );
    }

    const where: Prisma.CollegeWhereInput = {};

    if (params.search) {
      where.OR = [
        { name: { contains: params.search } },
        { city: { contains: params.search } },
        { state: { contains: params.search } },
      ];
    }
    
    if (params.states?.length) where.state = { in: params.states };
    if (params.cities?.length) where.city = { in: params.cities };
    if (params.types?.length) where.type = { in: params.types };
    if (params.country) where.country = params.country;
    if (params.minFees !== undefined || params.maxFees !== undefined) {
      where.totalFees = {};
      if (params.minFees !== undefined) where.totalFees.gte = params.minFees;
      if (params.maxFees !== undefined) where.totalFees.lte = params.maxFees;
    }
    if (params.minNirfRank !== undefined || params.maxNirfRank !== undefined) {
      where.nirfRank = {};
      if (params.minNirfRank !== undefined) where.nirfRank.gte = params.minNirfRank;
      if (params.maxNirfRank !== undefined) where.nirfRank.lte = params.maxNirfRank;
    }
    // For arrays like entranceExams, Prisma requires specific JSON filtering or string matching if it's a JSON column.
    // Assuming entranceExams is a JSON array in Prisma
    if (params.entranceExams?.length) {
      // Simplified: Just match if the array contains any of the search terms
      // Prisma MySQL json filtering is limited, so we skip complex JSON array overlap filtering for now
      // or implement basic string matching if needed.
    }

    const skip = (params.page - 1) * params.limit;
    
    let orderBy: any = {};
    if (params.sortBy === "nirfRank") orderBy.nirfRank = params.sortOrder;
    else if (params.sortBy === "fees") orderBy.totalFees = params.sortOrder;
    else if (params.sortBy === "package") orderBy.highestPackage = "desc";
    else orderBy.createdAt = "desc";

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: params.limit,
        orderBy,
      }),
      prisma.college.count({ where })
    ]);

    return NextResponse.json({
      colleges,
      total,
      hasMore: skip + colleges.length < total,
      page: params.page,
      totalPages: Math.ceil(total / params.limit)
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
