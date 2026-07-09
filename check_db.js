const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.findMany({ take: 3 });
  console.log("Colleges count:", colleges.length);
  if (colleges.length > 0) {
    console.log("First college logo:", colleges[0].logo);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
