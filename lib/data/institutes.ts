export interface Institute {
  id: string;
  name: string;
  slug: string;
  logo: string;
  location: string;
  rating: number;
  reviewCount: number;
  totalFees: string;
  programs: string[];
  courses: string[];
  centers: string[];
  type: string;
  category: string;
  exams: string[];
}

export const institutes: Institute[] = [
  {
    id: "1",
    name: "IACE Dilsukhnagar",
    slug: "iace-dilsukhnagar-hyderabad",
    logo: "https://images.collegedunia.com/public/college_data/images/logos/1589542036logo.png",
    location: "Hyderabad, Telangana",
    rating: 9.2,
    reviewCount: 450,
    totalFees: "₹ 15,000 - 45,000",
    programs: ["Banking", "SSC", "Railway"],
    courses: ["IBPS PO", "SBI Clerk", "SSC CGL", "RRB NTPC"],
    centers: ["Dilsukhnagar", "Ameerpet", "Himayatnagar"],
    type: "Coaching",
    category: "Competitive Exams",
    exams: ["IBPS", "SBI", "SSC", "RRB"]
  },
  {
    id: "2",
    name: "Akash Institute",
    slug: "akash-institute-delhi",
    logo: "https://images.collegedunia.com/public/college_data/images/logos/akash.png",
    location: "New Delhi, Delhi",
    rating: 8.8,
    reviewCount: 1200,
    totalFees: "₹ 80,000 - 1,50,000",
    programs: ["Medical", "Engineering"],
    courses: ["NEET", "JEE Main", "JEE Advanced"],
    centers: ["Janakpuri", "South Ext", "Rohini"],
    type: "Coaching",
    category: "Entrance Exams",
    exams: ["NEET", "JEE"]
  },
  {
    id: "3",
    name: "Simplilearn Online",
    slug: "simplilearn-online",
    logo: "https://images.collegedunia.com/public/college_data/images/logos/simplilearn.png",
    location: "Bangalore, Karnataka",
    rating: 9.5,
    reviewCount: 850,
    totalFees: "₹ 50,000 - 2,00,000",
    programs: ["Data Science", "Digital Marketing", "Cloud Computing"],
    courses: ["PMP", "AWS Solutions Architect", "Data Scientist Master's"],
    centers: ["Online"],
    type: "Online Learning",
    category: "Professional Certification",
    exams: ["None"]
  },
  {
    id: "4",
    name: "IMS Learning Resources",
    slug: "ims-learning-resources-mumbai",
    logo: "https://images.collegedunia.com/public/college_data/images/logos/ims.png",
    location: "Mumbai, Maharashtra",
    rating: 9.0,
    reviewCount: 980,
    totalFees: "₹ 30,000 - 60,000",
    programs: ["Management", "Law", "BBA"],
    courses: ["CAT", "CLAT", "IPMAT"],
    centers: ["Andheri", "Dadar", "Borivali"],
    type: "Coaching",
    category: "Entrance Exams",
    exams: ["CAT", "CLAT", "IPMAT"]
  }
];
