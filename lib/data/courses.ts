export interface Course {
    id: string;
    title: string;
    fullTitle: string;
    slug: string;
    description: string;
    level: "Undergraduate" | "Postgraduate" | "Doctoral";
    duration: string;
    eligibility: string;
    department: string;
    mode: "Full Time" | "Part Time";
}

export const COURSES_DATA: Course[] = [
    {
        id: "btech-cse",
        title: "B.Tech CSE",
        fullTitle: "Bachelor of Technology in Computer Science & Engineering",
        slug: "btech-computer-science-engineering",
        description: "Four-year engineering program covering software development, AI, databases, cloud computing, and computer systems.",
        level: "Undergraduate",
        duration: "4 years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics",
        department: "Engineering",
        mode: "Full Time"
    },

    {
        id: "mtech-cse",
        title: "M.Tech CSE",
        fullTitle: "Master of Technology in Computer Science & Engineering",
        slug: "mtech-computer-science-engineering",
        description: "Advanced specialization in machine learning, distributed systems, cybersecurity, and research.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "B.Tech/B.E. in relevant discipline",
        department: "Engineering",
        mode: "Full Time"
    },

    {
        id: "bca",
        title: "BCA",
        fullTitle: "Bachelor of Computer Applications",
        slug: "bca",
        description: "Professional undergraduate program focused on programming, databases, networking, and web technologies.",
        level: "Undergraduate",
        duration: "3-4 years",
        eligibility: "10+2 in any stream",
        department: "Computer Applications",
        mode: "Full Time"
    },

    {
        id: "mca",
        title: "MCA",
        fullTitle: "Master of Computer Applications",
        slug: "mca",
        description: "Advanced software development and enterprise application program with focus on modern technologies.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "Bachelor's degree with Mathematics",
        department: "Computer Applications",
        mode: "Full Time"
    },

    {
        id: "bsc-cs",
        title: "B.Sc Computer Science",
        fullTitle: "Bachelor of Science in Computer Science",
        slug: "bsc-computer-science",
        description: "Strong foundation in computing, mathematics, algorithms, and software systems.",
        level: "Undergraduate",
        duration: "3-4 years",
        eligibility: "10+2 with Mathematics",
        department: "Science",
        mode: "Full Time"
    },

    {
        id: "phd-cs",
        title: "Ph.D Computer Science",
        fullTitle: "Doctor of Philosophy in Computer Science",
        slug: "phd-computer-science",
        description: "Research-focused doctoral program in AI, systems, data science, and theoretical computer science.",
        level: "Doctoral",
        duration: "3-6 years",
        eligibility: "Master's degree in relevant discipline",
        department: "Engineering",
        mode: "Full Time"
    },

    {
        id: "mba",
        title: "MBA",
        fullTitle: "Master of Business Administration",
        slug: "mba",
        description: "Professional management program covering marketing, finance, HR, analytics, and operations.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "Bachelor's degree in any discipline",
        department: "Management",
        mode: "Full Time"
    },

    {
        id: "bba",
        title: "BBA",
        fullTitle: "Bachelor of Business Administration",
        slug: "bba",
        description: "Management-focused undergraduate program with emphasis on entrepreneurship and leadership.",
        level: "Undergraduate",
        duration: "3-4 years",
        eligibility: "10+2 in any stream",
        department: "Management",
        mode: "Full Time"
    },

    {
        id: "bcom",
        title: "B.Com",
        fullTitle: "Bachelor of Commerce",
        slug: "bcom",
        description: "Comprehensive program covering accounting, finance, taxation, and business studies.",
        level: "Undergraduate",
        duration: "3-4 years",
        eligibility: "10+2 in any stream",
        department: "Commerce",
        mode: "Full Time"
    },

    {
        id: "mcom",
        title: "M.Com",
        fullTitle: "Master of Commerce",
        slug: "mcom",
        description: "Advanced study of accounting, auditing, finance, and corporate management.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "B.Com or equivalent degree",
        department: "Commerce",
        mode: "Full Time"
    },

    {
        id: "mbbs",
        title: "MBBS",
        fullTitle: "Bachelor of Medicine and Bachelor of Surgery",
        slug: "mbbs",
        description: "Professional medical degree combining academic study and extensive clinical training.",
        level: "Undergraduate",
        duration: "5.5 years",
        eligibility: "10+2 with Physics, Chemistry, Biology and NEET qualification",
        department: "Medicine",
        mode: "Full Time"
    },

    {
        id: "bds",
        title: "BDS",
        fullTitle: "Bachelor of Dental Surgery",
        slug: "bds",
        description: "Professional program in oral healthcare, dentistry, and clinical dental practice.",
        level: "Undergraduate",
        duration: "5 years",
        eligibility: "10+2 with PCB and NEET qualification",
        department: "Medicine",
        mode: "Full Time"
    },

    {
        id: "bpharm",
        title: "B.Pharm",
        fullTitle: "Bachelor of Pharmacy",
        slug: "bpharm",
        description: "Study of pharmaceuticals, drug formulation, healthcare systems, and pharmacology.",
        level: "Undergraduate",
        duration: "4 years",
        eligibility: "10+2 with Physics, Chemistry, Biology/Mathematics",
        department: "Pharmacy",
        mode: "Full Time"
    },

    {
        id: "pharm-d",
        title: "Pharm.D",
        fullTitle: "Doctor of Pharmacy",
        slug: "pharm-d",
        description: "Professional doctoral program emphasizing clinical pharmacy and patient care.",
        level: "Doctoral",
        duration: "6 years",
        eligibility: "10+2 with Physics, Chemistry, Biology/Mathematics",
        department: "Pharmacy",
        mode: "Full Time"
    },

    {
        id: "bsc-nursing",
        title: "B.Sc Nursing",
        fullTitle: "Bachelor of Science in Nursing",
        slug: "bsc-nursing",
        description: "Healthcare program focused on nursing practice, patient care, and community health.",
        level: "Undergraduate",
        duration: "4 years",
        eligibility: "10+2 with Physics, Chemistry and Biology",
        department: "Nursing",
        mode: "Full Time"
    },

    {
        id: "llb",
        title: "LLB",
        fullTitle: "Bachelor of Legislative Law",
        slug: "llb",
        description: "Professional legal education covering constitutional, criminal, and civil law.",
        level: "Undergraduate",
        duration: "3 years",
        eligibility: "Graduation in any discipline",
        department: "Law",
        mode: "Full Time"
    },

    {
        id: "ba-llb",
        title: "BA LLB",
        fullTitle: "Bachelor of Arts and Bachelor of Legislative Law",
        slug: "ba-llb",
        description: "Integrated law program combining social sciences and legal education.",
        level: "Undergraduate",
        duration: "5 years",
        eligibility: "10+2 in any stream",
        department: "Law",
        mode: "Full Time"
    },

    {
        id: "barch",
        title: "B.Arch",
        fullTitle: "Bachelor of Architecture",
        slug: "barch",
        description: "Professional program in architecture, urban planning, and building design.",
        level: "Undergraduate",
        duration: "5 years",
        eligibility: "10+2 with PCM and NATA/JEE Paper 2 qualification",
        department: "Architecture",
        mode: "Full Time"
    },

    {
        id: "bsc-physics",
        title: "B.Sc Physics",
        fullTitle: "Bachelor of Science in Physics",
        slug: "bsc-physics",
        description: "Study of mechanics, electromagnetism, quantum physics, and applied sciences.",
        level: "Undergraduate",
        duration: "3-4 years",
        eligibility: "10+2 with Physics and Mathematics",
        department: "Science",
        mode: "Full Time"
    },

    {
        id: "msc-mathematics",
        title: "M.Sc Mathematics",
        fullTitle: "Master of Science in Mathematics",
        slug: "msc-mathematics",
        description: "Advanced mathematical studies in algebra, analysis, statistics, and computation.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "B.Sc Mathematics or equivalent",
        department: "Science",
        mode: "Full Time"
    },

    {
        id: "ba-english",
        title: "B.A English",
        fullTitle: "Bachelor of Arts in English Literature",
        slug: "ba-english",
        description: "Study of literature, language, communication, and critical analysis.",
        level: "Undergraduate",
        duration: "3-4 years",
        eligibility: "10+2 in any stream",
        department: "Arts",
        mode: "Full Time"
    },

    {
        id: "ma-economics",
        title: "M.A Economics",
        fullTitle: "Master of Arts in Economics",
        slug: "ma-economics",
        description: "Advanced economic theory, econometrics, policy analysis, and research.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "Bachelor's degree",
        department: "Arts",
        mode: "Full Time"
    },

    {
        id: "ma-psychology",
        title: "M.A Psychology",
        fullTitle: "Master of Arts in Psychology",
        slug: "ma-psychology",
        description: "Advanced study of cognitive, clinical, counseling, and organizational psychology.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "Bachelor's degree in Psychology or related discipline",
        department: "Arts",
        mode: "Full Time"
    },

    {
        id: "bfa",
        title: "BFA",
        fullTitle: "Bachelor of Fine Arts",
        slug: "bfa",
        description: "Creative arts program covering painting, sculpture, digital arts, and design.",
        level: "Undergraduate",
        duration: "4 years",
        eligibility: "10+2 in any stream",
        department: "Arts",
        mode: "Full Time"
    },

    {
        id: "bed",
        title: "B.Ed",
        fullTitle: "Bachelor of Education",
        slug: "bed",
        description: "Teacher training program preparing graduates for school education careers.",
        level: "Postgraduate",
        duration: "2 years",
        eligibility: "Bachelor's degree in any discipline",
        department: "Education",
        mode: "Full Time"
    },

    {
        id: "phd-history",
        title: "Ph.D History",
        fullTitle: "Doctor of Philosophy in History",
        slug: "phd-history",
        description: "Research program focused on Indian, world, cultural, and social history.",
        level: "Doctoral",
        duration: "3-6 years",
        eligibility: "Master's degree in History or related discipline",
        department: "Arts",
        mode: "Full Time"
    }
];