const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const colleges = await prisma.college.findMany({
    select: { slug: true, image: true, logo: true },
    take: 5
  });
  console.log("Colleges:", colleges);
}
check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
