import { prisma } from "@/lib/prisma";
import { DEMO_MODE } from "@/lib/demo";
import { mockBlogs, type BlogPost } from "@/mock/blogs";

interface GetBlogsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getBlogs({ search, page = 1, limit = 10 }: GetBlogsParams) {
  if (DEMO_MODE) {
    let filtered = [...mockBlogs];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(lowerSearch) ||
          b.summary.toLowerCase().includes(lowerSearch) ||
          b.category.toLowerCase().includes(lowerSearch)
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
          { title: { contains: search } },
          { summary: { contains: search } },
          { category: { contains: search } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getBlogById(id: string) {
  if (DEMO_MODE) {
    return mockBlogs.find((b) => b.id === id) || null;
  }

  return prisma.blogPost.findUnique({
    where: { id },
  });
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createBlog(user: any, data: any) {
  const slug = data.slug || generateSlug(data.title);

  if (DEMO_MODE) {
    const existing = mockBlogs.some((b) => b.slug === slug);
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const newBlog: BlogPost = {
      id: `blg_${Date.now()}`,
      title: data.title,
      slug: finalSlug,
      content: data.content || "",
      summary: data.summary || "",
      image: data.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
      category: data.category || "General",
      readTime: data.readTime || "5 min read",
      published: data.published !== undefined ? !!data.published : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockBlogs.unshift(newBlog);
    return newBlog;
  }

  // Verify slug uniqueness
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

  return prisma.blogPost.create({
    data: {
      title: data.title,
      slug: finalSlug,
      content: data.content,
      summary: data.summary,
      image: data.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
      category: data.category,
      readTime: data.readTime || "5 min read",
      published: data.published !== undefined ? data.published : true,
    },
  });
}

export async function updateBlog(user: any, id: string, data: any) {
  const slug = data.slug || generateSlug(data.title);

  if (DEMO_MODE) {
    const index = mockBlogs.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Blog post not found");

    const existing = mockBlogs.some((b) => b.slug === slug && b.id !== id);
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const updated: BlogPost = {
      ...mockBlogs[index],
      title: data.title !== undefined ? data.title : mockBlogs[index].title,
      slug: data.title !== undefined ? finalSlug : mockBlogs[index].slug,
      content: data.content !== undefined ? data.content : mockBlogs[index].content,
      summary: data.summary !== undefined ? data.summary : mockBlogs[index].summary,
      image: data.image !== undefined ? data.image : mockBlogs[index].image,
      category: data.category !== undefined ? data.category : mockBlogs[index].category,
      readTime: data.readTime !== undefined ? data.readTime : mockBlogs[index].readTime,
      published: data.published !== undefined ? !!data.published : mockBlogs[index].published,
      updatedAt: new Date(),
    };
    mockBlogs[index] = updated;
    return updated;
  }

  // Verify slug uniqueness (excluding current post)
  const existing = await prisma.blogPost.findFirst({
    where: {
      slug,
      NOT: { id },
    },
  });
  const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

  return prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: finalSlug,
      content: data.content,
      summary: data.summary,
      image: data.image,
      category: data.category,
      readTime: data.readTime,
      published: data.published,
    },
  });
}

export async function deleteBlog(user: any, id: string) {
  if (DEMO_MODE) {
    const index = mockBlogs.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Blog post not found");
    const [deleted] = mockBlogs.splice(index, 1);
    return deleted;
  }

  return prisma.blogPost.delete({
    where: { id },
  });
}
