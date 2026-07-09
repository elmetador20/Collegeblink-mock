const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const colleges = await prisma.college.findMany({
    select: { slug: true, logo: true, coverImage: true },
    orderBy: { createdAt: "desc" },
    take: 12
  });
  console.log("Colleges on homepage:", colleges);
}
check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
