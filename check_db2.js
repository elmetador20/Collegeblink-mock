const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const colleges = await prisma.college.findMany({
    select: { slug: true, logo: true, coverImage: true },
    take: 5
  });
  console.log("Colleges:", colleges);
}
check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
