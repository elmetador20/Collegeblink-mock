const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.college.updateMany({
    where: {
      coverImage: {
        contains: "photo-1555529733-0e670560f8e1"
      }
    },
    data: {
      coverImage: "/images/generic_campus.png"
    }
  });
  console.log(`Updated ${result.count} colleges with broken cover image.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
