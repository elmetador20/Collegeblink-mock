import { prisma } from "@/lib/prisma";
import { DEMO_MODE } from "@/lib/demo";
import { mockUsers, type User } from "@/mock/users";

export interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getUsers({ search, page = 1, limit = 10 }: GetUsersParams) {
  if (DEMO_MODE) {
    let filtered = [...mockUsers];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          (u.name && u.name.toLowerCase().includes(lowerSearch)) ||
          u.email.toLowerCase().includes(lowerSearch)
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

  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getUserById(id: string) {
  if (DEMO_MODE) {
    return mockUsers.find((u) => u.id === id) || null;
  }
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(user: any, data: any) {
  const email = data.email.toLowerCase().trim();

  if (DEMO_MODE) {
    const existing = mockUsers.some((u) => u.email.toLowerCase() === email);
    if (existing) throw new Error("Email already registered");

    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name: data.name || null,
      avatar: data.avatar || null,
      role: data.role || "USER",
      plan: data.plan || "FREE",
      emailVerified: data.emailVerified ? new Date() : null,
      stream: data.stream || null,
      targetYear: data.targetYear ? Number(data.targetYear) : null,
      city: data.city || null,
      state: data.state || null,
      board: data.board || null,
      percentage: data.percentage ? Number(data.percentage) : null,
      jeemainsRank: data.jeemainsRank ? Number(data.jeemainsRank) : null,
      jeeadvancedRank: data.jeeadvancedRank ? Number(data.jeeadvancedRank) : null,
      neetRank: data.neetRank ? Number(data.neetRank) : null,
      catPercentile: data.catPercentile ? Number(data.catPercentile) : null,
      cuetScore: data.cuetScore ? Number(data.cuetScore) : null,
      category: data.category || null,
      familyIncome: data.familyIncome ? Number(data.familyIncome) : null,
      preferredCities: data.preferredCities || [],
      preferredStreams: data.preferredStreams || [],
      budgetRange: data.budgetRange ? Number(data.budgetRange) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUsers.unshift(newUser);
    return newUser;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already registered");

  return prisma.user.create({
    data: {
      email,
      name: data.name || null,
      avatar: data.avatar || null,
      role: data.role || "USER",
      plan: data.plan || "FREE",
      emailVerified: data.emailVerified ? new Date() : null,
      stream: data.stream || null,
      targetYear: data.targetYear ? Number(data.targetYear) : null,
      city: data.city || null,
      state: data.state || null,
      board: data.board || null,
      percentage: data.percentage ? Number(data.percentage) : null,
      jeemainsRank: data.jeemainsRank ? Number(data.jeemainsRank) : null,
      jeeadvancedRank: data.jeeadvancedRank ? Number(data.jeeadvancedRank) : null,
      neetRank: data.neetRank ? Number(data.neetRank) : null,
      catPercentile: data.catPercentile ? Number(data.catPercentile) : null,
      cuetScore: data.cuetScore ? Number(data.cuetScore) : null,
      category: data.category || null,
      familyIncome: data.familyIncome ? Number(data.familyIncome) : null,
      preferredCities: data.preferredCities ? (data.preferredCities as any) : undefined,
      preferredStreams: data.preferredStreams ? (data.preferredStreams as any) : undefined,
      budgetRange: data.budgetRange ? Number(data.budgetRange) : null,
      password: data.password || null,
    },
  });
}

export async function updateUser(user: any, id: string, data: any) {
  if (DEMO_MODE) {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");

    const existingEmail = mockUsers.some((u) => u.email.toLowerCase() === data.email?.toLowerCase() && u.id !== id);
    if (existingEmail) throw new Error("Email already registered by another user");

    const updated: User = {
      ...mockUsers[index],
      email: data.email ? data.email.toLowerCase().trim() : mockUsers[index].email,
      name: data.name !== undefined ? data.name : mockUsers[index].name,
      avatar: data.avatar !== undefined ? data.avatar : mockUsers[index].avatar,
      role: data.role !== undefined ? data.role : mockUsers[index].role,
      plan: data.plan !== undefined ? data.plan : mockUsers[index].plan,
      emailVerified: data.emailVerified === true
        ? (mockUsers[index].emailVerified || new Date())
        : data.emailVerified === false
        ? null
        : mockUsers[index].emailVerified,
      stream: data.stream !== undefined ? data.stream : mockUsers[index].stream,
      targetYear: data.targetYear !== undefined ? (data.targetYear ? Number(data.targetYear) : null) : mockUsers[index].targetYear,
      city: data.city !== undefined ? data.city : mockUsers[index].city,
      state: data.state !== undefined ? data.state : mockUsers[index].state,
      category: data.category !== undefined ? data.category : mockUsers[index].category,
      updatedAt: new Date(),
    };
    mockUsers[index] = updated;
    return updated;
  }

  const existingEmail = await prisma.user.findFirst({
    where: {
      email: data.email ? data.email.toLowerCase().trim() : undefined,
      NOT: { id },
    },
  });
  if (existingEmail) throw new Error("Email already registered by another user");

  const updatePayload: any = {
    email: data.email ? data.email.toLowerCase().trim() : undefined,
    name: data.name !== undefined ? data.name : undefined,
    avatar: data.avatar !== undefined ? data.avatar : undefined,
    role: data.role !== undefined ? data.role : undefined,
    plan: data.plan !== undefined ? data.plan : undefined,
    emailVerified: data.emailVerified === true
      ? new Date()
      : data.emailVerified === false
      ? null
      : undefined,
    stream: data.stream !== undefined ? data.stream : undefined,
    targetYear: data.targetYear !== undefined ? (data.targetYear ? Number(data.targetYear) : null) : undefined,
    city: data.city !== undefined ? data.city : undefined,
    state: data.state !== undefined ? data.state : undefined,
    category: data.category !== undefined ? data.category : undefined,
  };

  if (data.password) {
    updatePayload.password = data.password;
  }

  // Remove keys with undefined values
  Object.keys(updatePayload).forEach(
    (key) => updatePayload[key] === undefined && delete updatePayload[key]
  );

  return prisma.user.update({
    where: { id },
    data: updatePayload,
  });
}

export async function deleteUser(user: any, id: string) {
  if (DEMO_MODE) {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    const [deleted] = mockUsers.splice(index, 1);
    return deleted;
  }

  return prisma.user.delete({
    where: { id },
  });
}
