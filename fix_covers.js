const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { slug: "harvard-university", file: "/images/colleges/harvard_cover.png" },
    { slug: "university-of-cambridge", file: "/images/colleges/cambridge_cover.png" },
    { slug: "university-of-toronto", file: "/images/colleges/toronto_cover.png" },
    { slug: "eth-zurich", file: "/images/colleges/eth_zurich_cover.png" },
    { slug: "amity-university-online", file: "/images/colleges/amity_online_cover.png" },
    { slug: "manipal-university-jaipur-online", file: "/images/colleges/manipal_online_cover.png" },
    { slug: "ignou-new-delhi", file: "/images/colleges/ignou_cover.png" },
    { slug: "lpu-online", file: "/images/colleges/lpu_online_cover.png" },
    { slug: "chandigarh-university-online", file: "/images/colleges/chandigarh_online_cover.png" }
  ];

  for (const u of updates) {
    try {
      await prisma.college.update({
        where: { slug: u.slug },
        data: { coverImage: u.file }
      });
      console.log("Updated", u.slug);
    } catch (e) {
      console.log("Skipped or Error on", u.slug);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
