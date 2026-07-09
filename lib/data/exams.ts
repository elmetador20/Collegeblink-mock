export interface Exam {
  id: string;
  name: string;
  fullName: string;
  slug: string;
  description: string;
  category: "Engineering" | "Medical" | "MBA" | "Law" | "Other" | "Language";
  type: "Domestic" | "Abroad";
  colleges: number;
  duration: string;
  mode: string;
  frequency: string;
  officialWebsite: string;
  logo?: string;
}

export const EXAMS_DATA: Exam[] = [
  {
    id: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination Main",
    slug: "jee-main",
    description: "National level engineering entrance exam for NITs, IIITs, and GFTIs.",
    category: "Engineering",
    type: "Domestic",
    colleges: 31,
    duration: "3 hours",
    mode: "Computer-based",
    frequency: "Twice a year",
    officialWebsite: "https://jeemain.nta.nic.in"
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination Advanced",
    slug: "jee-advanced",
    description: "Gateway to the prestigious Indian Institutes of Technology (IITs).",
    category: "Engineering",
    type: "Domestic",
    colleges: 23,
    duration: "6 hours",
    mode: "Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://jeeadv.ac.in"
  },
  {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    slug: "neet",
    description: "Single entrance exam for all medical courses in India.",
    category: "Medical",
    type: "Domestic",
    colleges: 600,
    duration: "3 hours 20 minutes",
    mode: "Pen and paper",
    frequency: "Once a year",
    officialWebsite: "https://neet.nta.nic.in"
  },
  {
    id: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    slug: "cat",
    description: "Premier management entrance exam for IIMs and top B-schools.",
    category: "MBA",
    type: "Domestic",
    colleges: 20,
    duration: "2 hours",
    mode: "Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://iimcat.ac.in"
  },
  {
    id: "clat",
    name: "CLAT",
    fullName: "Common Law Admission Test",
    slug: "clat",
    description: "National level law entrance exam for NLUs and other law colleges.",
    category: "Law",
    type: "Domestic",
    colleges: 22,
    duration: "2 hours",
    mode: "Pen and paper / Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://consortiumofnlus.ac.in"
  },
  {
    id: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    slug: "gate",
    description: "For M.Tech/Ph.D admissions and PSU recruitments.",
    category: "Engineering",
    type: "Domestic",
    colleges: 1000,
    duration: "3 hours",
    mode: "Computer-based",
    frequency: "Once a year",
    officialWebsite: "https://gate.iitd.ac.in"
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    slug: "sat",
    description: "Widely used for undergraduate admissions in the US and globally.",
    category: "Other",
    type: "Abroad",
    colleges: 4000,
    duration: "2 hours 14 minutes",
    mode: "Digital",
    frequency: "7 times a year",
    officialWebsite: "https://satsuite.collegeboard.org"
  },
  {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    slug: "ielts",
    description: "Most popular English proficiency test for study and migration.",
    category: "Language",
    type: "Abroad",
    colleges: 10000,
    duration: "2 hours 45 minutes",
    mode: "Computer/Paper",
    frequency: "Multiple times",
    officialWebsite: "https://www.ielts.org"
  },
  {
    id: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    slug: "toefl",
    description: "Preferred English test for US and many global universities.",
    category: "Language",
    type: "Abroad",
    colleges: 11000,
    duration: "2 hours",
    mode: "Internet-based",
    frequency: "Over 60 times",
    officialWebsite: "https://www.ets.org/toefl"
  },
  {
    id: "gre",
    name: "GRE",
    fullName: "Graduate Record Examination",
    slug: "gre",
    description: "Standardized test for most graduate schools in the US and abroad.",
    category: "Other",
    type: "Abroad",
    colleges: 1000,
    duration: "1 hour 58 minutes",
    mode: "Computer-based",
    frequency: "Anytime",
    officialWebsite: "https://www.ets.org/gre"
  }
];
