import { mockColleges } from "./colleges";

export interface CourseCollege {
  collegeId: string;
  courseId: string;
  fees: number;
  totalSeats: number;
  availableSeats: number | null;
  eligibility: string | null;
  college: any;
}

export interface Course {
  id: string;
  name: string;
  degree: string;
  duration: number;
  description: string | null;
  careerProspects: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  colleges?: CourseCollege[];
}

export let mockCourses: Course[] = [
  {
    id: "crs_1",
    name: "Computer Science and Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Study of computers and computational systems, focusing on software, algorithms, and hardware integration.",
    careerProspects: ["Software Engineer", "Data Scientist", "System Architect", "Product Manager"],
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    updatedAt: new Date("2025-01-01T00:00:00.000Z")
  },
  {
    id: "crs_2",
    name: "Electronics and Communication Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Focuses on semiconductor devices, communication protocols, signal processing, and hardware systems.",
    careerProspects: ["Hardware Design Engineer", "Telecom Engineer", "Embedded Systems Engineer", "Network Engineer"],
    createdAt: new Date("2025-01-02T00:00:00.000Z"),
    updatedAt: new Date("2025-01-02T00:00:00.000Z")
  },
  {
    id: "crs_3",
    name: "Electrical Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Deals with the study and application of electricity, electronics, and electromagnetism.",
    careerProspects: ["Power Systems Engineer", "Control Engineer", "Electrical Design Engineer"],
    createdAt: new Date("2025-01-03T00:00:00.000Z"),
    updatedAt: new Date("2025-01-03T00:00:00.000Z")
  },
  {
    id: "crs_4",
    name: "Mechanical Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Broad discipline focusing on design, analysis, manufacturing, and maintenance of mechanical systems.",
    careerProspects: ["Automotive Engineer", "Design Engineer", "Aerospace Engineer", "Manufacturing Engineer"],
    createdAt: new Date("2025-01-04T00:00:00.000Z"),
    updatedAt: new Date("2025-01-04T00:00:00.000Z")
  },
  {
    id: "crs_5",
    name: "Civil Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Deals with the design, construction, and maintenance of the physical and naturally built environment.",
    careerProspects: ["Structural Engineer", "Site Engineer", "Transportation Planner", "Geotechnical Engineer"],
    createdAt: new Date("2025-01-05T00:00:00.000Z"),
    updatedAt: new Date("2025-01-05T00:00:00.000Z")
  },
  {
    id: "crs_6",
    name: "Chemical Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Focuses on the conversion of raw materials into useful products using chemical and physical processes.",
    careerProspects: ["Chemical Process Engineer", "Petroleum Engineer", "Environmental Engineer"],
    createdAt: new Date("2025-01-06T00:00:00.000Z"),
    updatedAt: new Date("2025-01-06T00:00:00.000Z")
  },
  {
    id: "crs_7",
    name: "Aerospace Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Specialized study of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
    careerProspects: ["Aerospace Structural Engineer", "Flight Test Engineer", "Satellite Systems Engineer"],
    createdAt: new Date("2025-01-07T00:00:00.000Z"),
    updatedAt: new Date("2025-01-07T00:00:00.000Z")
  },
  {
    id: "crs_8",
    name: "Biotechnology",
    degree: "B.Tech",
    duration: 4,
    description: "Blends biology and technology to develop innovative products in healthcare, agriculture, and industry.",
    careerProspects: ["Biomedical Researcher", "Bioinformatics Analyst", "Quality Control Specialist"],
    createdAt: new Date("2025-01-08T00:00:00.000Z"),
    updatedAt: new Date("2025-01-08T00:00:00.000Z")
  },
  {
    id: "crs_9",
    name: "Master of Business Administration",
    degree: "MBA",
    duration: 2,
    description: "Focuses on developing leadership, strategic management, financial analysis, and marketing skills.",
    careerProspects: ["Management Consultant", "Investment Banker", "Marketing Manager", "HR Director"],
    createdAt: new Date("2025-01-09T00:00:00.000Z"),
    updatedAt: new Date("2025-01-09T00:00:00.000Z")
  },
  {
    id: "crs_10",
    name: "Master of Technology in CSE",
    degree: "M.Tech",
    duration: 2,
    description: "Advanced study in computer science engineering, specializing in AI, cryptography, and big data systems.",
    careerProspects: ["Senior Software Architect", "AI Researcher", "Security Analyst"],
    createdAt: new Date("2025-01-10T00:00:00.000Z"),
    updatedAt: new Date("2025-01-10T00:00:00.000Z")
  },
  {
    id: "crs_11",
    name: "Bachelor of Business Administration",
    degree: "BBA",
    duration: 3,
    description: "Undergraduate degree in commerce and business administration that covers management principles and ethics.",
    careerProspects: ["Business Analyst", "Marketing Executive", "Sales Manager"],
    createdAt: new Date("2025-01-11T00:00:00.000Z"),
    updatedAt: new Date("2025-01-11T00:00:00.000Z")
  },
  {
    id: "crs_12",
    name: "Bachelor of Science in Physics",
    degree: "B.Sc",
    duration: 3,
    description: "Focuses on the fundamental principles of physics, quantum mechanics, electromagnetism, and research methodology.",
    careerProspects: ["Research Assistant", "Data Analyst", "Lab technician"],
    createdAt: new Date("2025-01-12T00:00:00.000Z"),
    updatedAt: new Date("2025-01-12T00:00:00.000Z")
  },
  {
    id: "crs_13",
    name: "Information Technology",
    degree: "B.Tech",
    duration: 4,
    description: "Centers on computing technologies, information security, database management, and network administrations.",
    careerProspects: ["IT Consultant", "Database Administrator", "Cybersecurity Specialist"],
    createdAt: new Date("2025-01-13T00:00:00.000Z"),
    updatedAt: new Date("2025-01-13T00:00:00.000Z")
  },
  {
    id: "crs_14",
    name: "Data Science and Artificial Intelligence",
    degree: "B.Tech",
    duration: 4,
    description: "Specialized computer engineering course concentrating on statistics, machine learning, and neural networks.",
    careerProspects: ["Machine Learning Engineer", "Data Engineer", "AI Consultant"],
    createdAt: new Date("2025-01-14T00:00:00.000Z"),
    updatedAt: new Date("2025-01-14T00:00:00.000Z")
  },
  {
    id: "crs_15",
    name: "Production and Industrial Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Focuses on optimization of complex processes, logistics, supply chain, and manufacturing operations.",
    careerProspects: ["Industrial Engineer", "Operations Manager", "Supply Chain Analyst"],
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
    updatedAt: new Date("2025-01-15T00:00:00.000Z")
  },
  {
    id: "crs_16",
    name: "Metallurgical and Materials Engineering",
    degree: "B.Tech",
    duration: 4,
    description: "Deals with the extraction of metals, structure of alloys, and design of advanced engineering materials.",
    careerProspects: ["Materials Scientist", "Quality Assurance Engineer", "Metallurgist"],
    createdAt: new Date("2025-01-16T00:00:00.000Z"),
    updatedAt: new Date("2025-01-16T00:00:00.000Z")
  },
  {
    id: "crs_17",
    name: "Engineering Physics",
    degree: "B.Tech",
    duration: 4,
    description: "Integrates physics, mathematics, and engineering sciences to solve high-tech industry problems.",
    careerProspects: ["Research Scientist", "Optical Engineer", "Photonics Specialist"],
    createdAt: new Date("2025-01-17T00:00:00.000Z"),
    updatedAt: new Date("2025-01-17T00:00:00.000Z")
  },
  {
    id: "crs_18",
    name: "Master of Computer Applications",
    degree: "MCA",
    duration: 2,
    description: "Postgraduate course emphasizing software development, databases, and enterprise systems.",
    careerProspects: ["Systems Analyst", "Web Developer", "Database Designer"],
    createdAt: new Date("2025-01-18T00:00:00.000Z"),
    updatedAt: new Date("2025-01-18T00:00:00.000Z")
  },
  {
    id: "crs_19",
    name: "Bachelor of Arts in Economics",
    degree: "B.A",
    duration: 3,
    description: "Focuses on microeconomics, macroeconomics, econometrics, and public policy analysis.",
    careerProspects: ["Financial Analyst", "Economic Consultant", "Policy Advisor"],
    createdAt: new Date("2025-01-19T00:00:00.000Z"),
    updatedAt: new Date("2025-01-19T00:00:00.000Z")
  },
  {
    id: "crs_20",
    name: "Bachelor of Commerce",
    degree: "B.Com",
    duration: 3,
    description: "Covers accounting, corporate laws, business finance, and marketing structures.",
    careerProspects: ["Accountant", "Tax Consultant", "Audit Assistant"],
    createdAt: new Date("2025-01-20T00:00:00.000Z"),
    updatedAt: new Date("2025-01-20T00:00:00.000Z")
  }
];

// Initialize relationships
mockCourses.forEach((course, index) => {
  const matchingColleges = mockColleges.slice(index % 5, (index % 5) + 3);
  course.colleges = matchingColleges.map((college) => ({
    collegeId: college.id,
    courseId: course.id,
    fees: 1.5 * course.duration + (index % 3),
    totalSeats: 60 + (index % 5) * 10,
    availableSeats: 5 + (index % 4),
    eligibility: "Class 12th with 75% marks and entrance exam clearance.",
    college: college
  }));
});
