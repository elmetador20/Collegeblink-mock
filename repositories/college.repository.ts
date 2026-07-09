import { prisma } from "@/lib/prisma";

interface FindManyParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function findMany({ search, page = 1, limit = 10 }: FindManyParams) {
  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { city: { contains: search } },
          { state: { contains: search } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.college.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function findById(id: string) {
  return prisma.college.findUnique({ where: { id } });
}

export async function findBySlug(slug: string) {
  return prisma.college.findUnique({ where: { slug } });
}

export async function create(data: any) {
  return prisma.college.create({ data });
}

export async function update(id: string, data: any) {
  return prisma.college.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.college.delete({ where: { id } });
}