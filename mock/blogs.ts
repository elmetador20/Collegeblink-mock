export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  image: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export let mockBlogs: BlogPost[] = [
  {
    id: "blg_1",
    title: "How to Crack JEE Advanced: Tips from Top Rankers",
    slug: "how-to-crack-jee-advanced",
    content: "<p>Cracking the Joint Entrance Examination (JEE) Advanced requires a balance of smart work, dedication, and robust planning. Top rankers always emphasize conceptual clarity over rote learning...</p>",
    summary: "A comprehensive guide filled with actionable advice and schedules from past JEE toppers to help you ace the exam.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    category: "Admissions",
    readTime: "6 min read",
    published: true,
    createdAt: new Date("2025-02-01T10:00:00.000Z"),
    updatedAt: new Date("2025-02-01T10:00:00.000Z")
  },
  {
    id: "blg_2",
    title: "Top 10 Engineering Colleges in India for 2025",
    slug: "top-10-engineering-colleges-india",
    content: "<p>Choosing the right college sets the foundation for your career. Our latest rankings analyze placement records, campus facilities, and NIRF scores...</p>",
    summary: "Discover the top 10 engineering institutions in India based on key performance indicators and student reviews.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    category: "Rankings",
    readTime: "8 min read",
    published: true,
    createdAt: new Date("2025-02-03T11:00:00.000Z"),
    updatedAt: new Date("2025-02-03T11:00:00.000Z")
  },
  {
    id: "blg_3",
    title: "The Rise of AI & Data Science Branches in B.Tech",
    slug: "rise-of-ai-data-science-btech",
    content: "<p>Artificial Intelligence and Data Science are reshaping fields globally. Naturally, universities have introduced focused engineering courses...</p>",
    summary: "Learn why AI and Data Science are becoming the most sought-after B.Tech streams and what career prospects they offer.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800",
    category: "Trends",
    readTime: "5 min read",
    published: true,
    createdAt: new Date("2025-02-05T09:30:00.000Z"),
    updatedAt: new Date("2025-02-05T09:30:00.000Z")
  },
  {
    id: "blg_4",
    title: "Understanding NIT Placements: What You Need to Know",
    slug: "understanding-nit-placements",
    content: "<p>National Institutes of Technology (NITs) boast phenomenal placement records. Let's break down the average packages, top recruiters, and salary trends...</p>",
    summary: "An in-depth analysis of NIT placement metrics, packages, and major recruiters across branches.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    category: "Placements",
    readTime: "7 min read",
    published: true,
    createdAt: new Date("2025-02-07T14:00:00.000Z"),
    updatedAt: new Date("2025-02-07T14:00:00.000Z")
  },
  {
    id: "blg_5",
    title: "Guide to Education Loans & Scholarships in India",
    slug: "guide-education-loans-scholarships",
    content: "<p>Higher education can be costly, but numerous financial aids can support your dreams. Here's how to apply for national scholarships and loans...</p>",
    summary: "A step-by-step walkthrough on securing educational loans, interest rates, and applying for government scholarships.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
    category: "Finance",
    readTime: "9 min read",
    published: true,
    createdAt: new Date("2025-02-10T12:00:00.000Z"),
    updatedAt: new Date("2025-02-10T12:00:00.000Z")
  },
  {
    id: "blg_6",
    title: "Hostel Life vs Day Scholaring: The Ultimate Choice",
    slug: "hostel-life-vs-day-scholar",
    content: "<p>Living in a hostel fosters independence, but staying at home offers comfort. We compare both options on cost, study environment, and social growth...</p>",
    summary: "A comparison of campus hostel life versus living off-campus to help college freshmen decide.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?w=800",
    category: "Campus Life",
    readTime: "5 min read",
    published: true,
    createdAt: new Date("2025-02-12T08:00:00.000Z"),
    updatedAt: new Date("2025-02-12T08:00:00.000Z")
  },
  {
    id: "blg_7",
    title: "A Day in the Life of an IIT Bombay Student",
    slug: "day-in-life-iit-bombay",
    content: "<p>Curious about what goes on inside the Powai campus? From morning lectures to late-night coding sessions at the hostel labs, here is the routine...</p>",
    summary: "Take a virtual tour of the hectic yet exciting daily schedule of a computer science student at IIT Bombay.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    category: "Campus Life",
    readTime: "6 min read",
    published: true,
    createdAt: new Date("2025-02-14T15:30:00.000Z"),
    updatedAt: new Date("2025-02-14T15:30:00.000Z")
  },
  {
    id: "blg_8",
    title: "B.Tech vs B.Sc: Which Science Stream is Right for You?",
    slug: "btech-vs-bsc-comparison",
    content: "<p>Students often get confused between pursuing a professional engineering degree and a pure sciences program. Let's compare curriculum and opportunities...</p>",
    summary: "Compare structural differences, curriculum scopes, and job opportunities of B.Tech versus B.Sc degrees.",
    image: "https://images.unsplash.com/photo-1627556704353-016fb123971c?w=800",
    category: "Admissions",
    readTime: "7 min read",
    published: true,
    createdAt: new Date("2025-02-16T11:45:00.000Z"),
    updatedAt: new Date("2025-02-16T11:45:00.000Z")
  },
  {
    id: "blg_9",
    title: "Importance of NIRF Rankings in College Admission",
    slug: "importance-nirf-rankings",
    content: "<p>The Ministry of Education releases NIRF rankings annually. While it's an important index, you should also look closely at individual parameters...</p>",
    summary: "An analysis of the parameters used to calculate NIRF rankings and their actual relevance to students.",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800",
    category: "Rankings",
    readTime: "5 min read",
    published: false,
    createdAt: new Date("2025-02-18T10:00:00.000Z"),
    updatedAt: new Date("2025-02-18T10:00:00.000Z")
  },
  {
    id: "blg_10",
    title: "How to Build a Killer Tech Resume in College",
    slug: "how-to-build-tech-resume",
    content: "<p>Your resume is your ticket to internships and placements. Focus on showcasing projects, open source contributions, and your DSA skills...</p>",
    summary: "Practical advice on designing and writing a professional resume that gets shortlisted by top tech firms.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    category: "Career",
    readTime: "6 min read",
    published: true,
    createdAt: new Date("2025-02-20T09:00:00.000Z"),
    updatedAt: new Date("2025-02-20T09:00:00.000Z")
  },
  {
    id: "blg_11",
    title: "Why Liberal Arts is Gaining Momentum in India",
    slug: "liberal-arts-momentum-india",
    content: "<p>Education in India is shifting towards multidisciplinary tracks. Liberal arts programs are drawing students away from traditional engineering...</p>",
    summary: "Examine the growth of multidisciplinary liberal arts institutes and their career potential.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    category: "Trends",
    readTime: "8 min read",
    published: true,
    createdAt: new Date("2025-02-22T13:00:00.000Z"),
    updatedAt: new Date("2025-02-22T13:00:00.000Z")
  },
  {
    id: "blg_12",
    title: "Preparing for the CAT Exam: A 6-Month Roadmap",
    slug: "cat-exam-6-month-roadmap",
    content: "<p>Securing a seat in the top IIMs requires a structured study path. Divide your 6 months into concept building, mock tests, and analysis phases...</p>",
    summary: "Get a month-by-month study guide to crack the Common Admission Test (CAT) with 99+ percentile.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800",
    category: "Admissions",
    readTime: "7 min read",
    published: true,
    createdAt: new Date("2025-02-24T16:00:00.000Z"),
    updatedAt: new Date("2025-02-24T16:00:00.000Z")
  },
  {
    id: "blg_13",
    title: "Off-Campus Placements: Strategies that Work",
    slug: "off-campus-placements-strategies",
    content: "<p>If your college doesn't attract top employers, don't worry. Networking on LinkedIn, referrals, and competitive programming can help you land jobs...</p>",
    summary: "A practical guide for college graduates on how to navigate the off-campus placement landscape successfully.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
    category: "Placements",
    readTime: "6 min read",
    published: true,
    createdAt: new Date("2025-02-26T10:30:00.000Z"),
    updatedAt: new Date("2025-02-26T10:30:00.000Z")
  },
  {
    id: "blg_14",
    title: "VITEEE Preparation Guide: Syllabus and Mock Tests",
    slug: "viteee-preparation-guide",
    content: "<p>VIT Vellore's entrance test requires high speed and accuracy. Focus on NCERT concepts and practice past year papers extensively...</p>",
    summary: "Crucial strategies and resources to score a high rank in the VIT Engineering Entrance Exam.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?w=800",
    category: "Admissions",
    readTime: "5 min read",
    published: true,
    createdAt: new Date("2025-02-27T11:00:00.000Z"),
    updatedAt: new Date("2025-02-27T11:00:00.000Z")
  },
  {
    id: "blg_15",
    title: "Is an MBA Abroad Worth the Cost for Indian Students?",
    slug: "mba-abroad-worth-cost",
    content: "<p>An MBA from a top international school offers global network and prestige, but comes with heavy debt. Let's calculate the ROI compared to Indian B-schools...</p>",
    summary: "We evaluate the costs, post-MBA salaries, and long-term career benefits of studying abroad versus in India.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    category: "Finance",
    readTime: "8 min read",
    published: true,
    createdAt: new Date("2025-03-01T12:00:00.000Z"),
    updatedAt: new Date("2025-03-01T12:00:00.000Z")
  },
  {
    id: "blg_16",
    title: "Top 5 Extracurricular Clubs to Join in College",
    slug: "top-extracurricular-clubs-college",
    content: "<p>Academics is only half the story. Joining coding clubs, debate societies, or drama groups shapes your personality and builds leadership skills...</p>",
    summary: "Examine the benefits of participating in university clubs and which ones look best on your resume.",
    image: "https://images.unsplash.com/photo-1627556704353-016fb123971c?w=800",
    category: "Campus Life",
    readTime: "5 min read",
    published: true,
    createdAt: new Date("2025-03-03T09:00:00.000Z"),
    updatedAt: new Date("2025-03-03T09:00:00.000Z")
  },
  {
    id: "blg_17",
    title: "Understanding CGPA Calculations & How to Maintain It",
    slug: "understanding-cgpa-calculations",
    content: "<p>CGPA plays a vital role during college placements and higher studies. We outline how SGPA and CGPA are calculated and offer tips to keep it above 8.5...</p>",
    summary: "Clear guidelines on how GPA systems work and practical tips to improve your academic performance.",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800",
    category: "Academics",
    readTime: "5 min read",
    published: true,
    createdAt: new Date("2025-03-05T14:20:00.000Z"),
    updatedAt: new Date("2025-03-05T14:20:00.000Z")
  },
  {
    id: "blg_18",
    title: "Product vs Service Based Companies: The Placement Duel",
    slug: "product-vs-service-companies-placements",
    content: "<p>Students often wonder whether to aim for FAANG or IT consulting giants. Let's compare work culture, pay packages, and growth paths...</p>",
    summary: "Understand differences in job roles, compensation, and career growth in product versus service tech firms.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800",
    category: "Career",
    readTime: "7 min read",
    published: true,
    createdAt: new Date("2025-03-07T10:00:00.000Z"),
    updatedAt: new Date("2025-03-07T10:00:00.000Z")
  },
  {
    id: "blg_19",
    title: "A Complete Guide to GATE Exam Preparation",
    slug: "complete-guide-gate-exam",
    content: "<p>The Graduate Aptitude Test in Engineering opens doors to PSU jobs and M.Tech in IITs. Start early, focus on math, and take mock series regularly...</p>",
    summary: "Explore the exam pattern, eligibility criteria, and best resources to prepare for the GATE exam.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
    category: "Admissions",
    readTime: "8 min read",
    published: false,
    createdAt: new Date("2025-03-09T16:15:00.000Z"),
    updatedAt: new Date("2025-03-09T16:15:00.000Z")
  },
  {
    id: "blg_20",
    title: "Mental Health Tips for Engineering Students",
    slug: "mental-health-tips-engineering",
    content: "<p>Engineering can be stressful with assignments, exams, and projects. Don't hesitate to seek support, manage your time, and balance your sleep...</p>",
    summary: "Useful tips and coping mechanisms to handle academic stress and maintain good mental health in college.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?w=800",
    category: "Campus Life",
    readTime: "6 min read",
    published: true,
    createdAt: new Date("2025-03-12T11:00:00.000Z"),
    updatedAt: new Date("2025-03-12T11:00:00.000Z")
  }
];
