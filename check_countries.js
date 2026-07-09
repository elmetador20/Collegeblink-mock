const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.findMany({
    select: { name: true, country: true },
    take: 10
  });
  console.log("Sample colleges:", colleges);
  
  const studyAbroad = await prisma.college.findMany({
    where: { country: { not: null, notIn: ["India"] } },
    select: { name: true, country: true },
    take: 5
  });
  console.log("Study abroad colleges:", studyAbroad);
}
main().catch(console.error).finally(() => prisma.$disconnect());
