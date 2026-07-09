import { prisma } from "@/lib/prisma";

interface FindManyParams {
  collegeId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function findMany({
  collegeId,
  search,
  page = 1,
  limit = 10,
}: FindManyParams) {
  const where = {
    ...(collegeId && {
      colleges: {
        some: {
          collegeId,
        },
      },
    }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { degree: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        colleges: {
          include: {
            college: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.course.count({ where }),
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
  return prisma.course.findUnique({
    where: { id },
    include: {
      colleges: {
        include: {
          college: true,
          // Relation specific values: fees, eligibility, totalSeats, availableSeats live here now
        },
      },
      cutoffs: true,
    },
  });
}

export async function findByCollegeId(collegeId: string) {
  return prisma.course.findMany({
    where: {
      colleges: {
        some: {
          collegeId,
        },
      },
    },
    include: {
      colleges: {
        include: {
          college: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function create(data: any) {
  const { collegeIds, slug, ...courseData } = data;

  return prisma.course.create({
    data: {
      ...courseData,
      colleges: collegeIds && Array.isArray(collegeIds) ? {
        create: collegeIds.map((collegeId: string) => ({
          collegeId,
          fees: 1.5 * (data.duration || 4), // Default fee formula (in Lakhs)
          totalSeats: 60,
          availableSeats: 60,
        }))
      } : undefined
    },
    include: {
      colleges: {
        include: {
          college: true,
        },
      },
    },
  });
}

export async function update(id: string, data: any) {
  const { collegeIds, slug, ...courseData } = data;

  // Sync relations by deleting and recreating join records
  if (collegeIds && Array.isArray(collegeIds)) {
    await prisma.courseCollege.deleteMany({
      where: { courseId: id }
    });
    
    if (collegeIds.length > 0) {
      await prisma.courseCollege.createMany({
        data: collegeIds.map((collegeId: string) => ({
          courseId: id,
          collegeId,
          fees: 1.5 * (data.duration || 4),
          totalSeats: 60,
          availableSeats: 60,
        }))
      });
    }
  }

  return prisma.course.update({
    where: { id },
    data: courseData,
    include: {
      colleges: {
        include: {
          college: true,
        },
      },
    },
  });
}

export async function remove(id: string) {
  return prisma.course.delete({
    where: { id },
  });
}