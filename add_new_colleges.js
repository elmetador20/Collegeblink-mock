const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newColleges = [
    // Study Abroad
    {
      name: "Harvard University",
      slug: "harvard-university",
      city: "Cambridge",
      state: "Massachusetts",
      country: "USA",
      type: "PRIVATE",
      established: 1636,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts.",
      totalFees: 5400000,
      placementRate: 98,
      tags: ["Ivy League", "Study Abroad", "Top Ranked"],
      verified: true
    },
    {
      name: "University of Cambridge",
      slug: "university-of-cambridge",
      city: "Cambridge",
      state: "England",
      country: "UK",
      type: "PUBLIC",
      established: 1209,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Cambridge_University_Coat_Of_Arms.svg/1200px-Cambridge_University_Coat_Of_Arms.svg.png",
      coverImage: "https://images.unsplash.com/photo-1583307611593-132d431c379a?q=80&w=1000",
      description: "The University of Cambridge is a collegiate research university in Cambridge, United Kingdom.",
      totalFees: 3500000,
      placementRate: 95,
      tags: ["Study Abroad", "Top Ranked"],
      verified: true
    },
    {
      name: "University of Toronto",
      slug: "university-of-toronto",
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
      type: "PUBLIC",
      established: 1827,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "The University of Toronto is a public research university in Toronto, Ontario, Canada.",
      totalFees: 3800000,
      placementRate: 94,
      tags: ["Study Abroad", "Canada"],
      verified: true
    },
    {
      name: "ETH Zurich",
      slug: "eth-zurich",
      city: "Zurich",
      state: "Zurich",
      country: "Switzerland",
      type: "PUBLIC",
      established: 1855,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/ETH_Z%C3%BCrich_Logo.svg/1200px-ETH_Z%C3%BCrich_Logo.svg.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "ETH Zurich is a public research university in the city of Zürich, Switzerland.",
      totalFees: 120000,
      placementRate: 96,
      tags: ["Study Abroad", "Engineering"],
      verified: true
    },
    // Online Colleges in India
    {
      name: "Amity University Online",
      slug: "amity-university-online",
      city: "Noida",
      state: "Uttar Pradesh",
      country: "India",
      type: "PRIVATE",
      established: 2005,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Amity_University_logo.svg/1200px-Amity_University_logo.svg.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "Amity University Online offers UGC recognized online degree programs.",
      totalFees: 150000,
      placementRate: 85,
      tags: ["Online", "Distance Learning", "UGC Approved"],
      verified: true
    },
    {
      name: "Manipal University Jaipur Online",
      slug: "manipal-university-jaipur-online",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      type: "PRIVATE",
      established: 2011,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Manipal_University_Jaipur_logo.png/1200px-Manipal_University_Jaipur_logo.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "Online Manipal provides globally recognized degrees.",
      totalFees: 130000,
      placementRate: 82,
      tags: ["Online", "Distance Learning"],
      verified: true
    },
    {
      name: "Indira Gandhi National Open University (IGNOU)",
      slug: "ignou-new-delhi",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      type: "GOVT",
      established: 1985,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/IGNOU_logo.svg/1200px-IGNOU_logo.svg.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "IGNOU is a central open learning university located in New Delhi.",
      totalFees: 25000,
      placementRate: 60,
      tags: ["Online", "Distance Learning", "Government"],
      verified: true
    },
    {
      name: "Lovely Professional University (LPU) Online",
      slug: "lpu-online",
      city: "Phagwara",
      state: "Punjab",
      country: "India",
      type: "PRIVATE",
      established: 2005,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Lovely_Professional_University_logo.svg/1200px-Lovely_Professional_University_logo.svg.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "LPU Online provides UGC-entitled online degrees.",
      totalFees: 110000,
      placementRate: 75,
      tags: ["Online", "Distance Learning"],
      verified: true
    },
    {
      name: "Chandigarh University Online",
      slug: "chandigarh-university-online",
      city: "Chandigarh",
      state: "Punjab",
      country: "India",
      type: "PRIVATE",
      established: 2012,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Chandigarh_University_logo.png/1200px-Chandigarh_University_logo.png",
      coverImage: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1000",
      description: "Chandigarh University offers NAAC A+ graded online programs.",
      totalFees: 120000,
      placementRate: 80,
      tags: ["Online", "Distance Learning"],
      verified: true
    }
  ];

  for (const c of newColleges) {
    await prisma.college.upsert({
      where: { slug: c.slug },
      update: c,
      create: c
    });
    console.log(`Added/Updated: ${c.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
