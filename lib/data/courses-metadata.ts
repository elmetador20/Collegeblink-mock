export interface SyllabusYear {
    semester: string;
    topics: string[];
}

export interface CareerOutcome {
    role: string;
    package: string;
}

export interface CourseMetadata {
    id: string;
    syllabus: SyllabusYear[];
    careerOutcomes: CareerOutcome[];
    description: string;
}

export const COURSES_METADATA: CourseMetadata[] = [
    {
        id: "btech-cse",
        description: "A comprehensive four-year professional engineering program that combines theoretical foundations with practical computer systems development. The curriculum deeply covers programming paradigms, data structures, algorithms, computer architecture, database management systems, operating systems, and computer networks, alongside advanced specializations in Artificial Intelligence, Machine Learning, Cloud Computing, DevOps, and Cybersecurity to prepare graduates for high-tier global tech roles.",
        syllabus: [
            { semester: "Year 1", topics: ["Engineering Mathematics", "Programming for Problem Solving (C/Python)", "Engineering Physics/Chemistry", "Digital Logic Design"] },
            { semester: "Year 2", topics: ["Data Structures & Algorithms", "Database Management Systems", "Discrete Mathematics", "Computer Organization & Architecture"] },
            { semester: "Year 3", topics: ["Operating Systems", "Computer Networks", "Design and Analysis of Algorithms", "Formal Languages & Automata Theory"] },
            { semester: "Final Year", topics: ["Machine Learning & Artificial Intelligence", "Cloud Computing & DevOps", "Cybersecurity / Blockchain Elective", "Major Capstone Project"] }
        ],
        careerOutcomes: [
            { role: "Software Engineer", package: "₹4.5–9 LPA" },
            { role: "Full Stack Developer", package: "₹6–14 LPA" },
            { role: "Data Scientist / ML Engineer", package: "₹8–18 LPA" },
            { role: "Tech Lead / Systems Architect", package: "₹18–35 LPA" }
        ]
    },
    {
        id: "mtech-cse",
        description: "An advanced, research-driven postgraduate engineering program designed to cultivate high-level expertise in complex computational frameworks. Students engage in rigorous technical coursework covering advanced data structures, high-performance computer architecture, and the mathematical foundations of data science, alongside specialized research tracks in distributed systems and deep learning, culminating in a mandatory multi-semester dissertation and peer-reviewed research publication.",
        syllabus: [
            { semester: "Year 1", topics: ["Advanced Data Structures & Algorithms", "Mathematical Foundations of Computer Science", "Advanced Computer Architecture", "Research Methodology & IPR"] },
            { semester: "Final Year", topics: ["Advanced Database Systems", "Distributed Systems & Cloud Computing", "Deep Learning Models & Computer Vision", "Industry Thesis & Dissertation Defense"] }
        ],
        careerOutcomes: [
            { role: "Senior Research Scientist", package: "₹12–28 LPA" },
            { role: "AI/ML Specialist", package: "₹10–26 LPA" },
            { role: "Principal Software Engineer", package: "₹15–35 LPA" },
            { role: "Technical Lead", package: "₹14–30 LPA" }
        ]
    },
    {
        id: "bca",
        description: "A professional undergraduate application-oriented program focusing on the practical deployment of information technology. This course builds solid technical competencies in computer programming languages (like C and Java), software engineering principles, database structures, operating systems, and dynamic web design frameworks. Under the updated National Education Policy, it operates on a flexible 3 to 4-year structure, offering an optional fourth year for an Honours or Research degree.",
        syllabus: [
            { semester: "Year 1", topics: ["Foundation Course in Mathematics", "Computer Fundamentals & IT", "Programming Concepts using C", "Business Communication"] },
            { semester: "Year 2", topics: ["Data Structures using C++", "Operating System Concepts", "Database Management Systems", "Web Technology (HTML/CSS/JavaScript)"] },
            { semester: "Year 3", topics: ["Java Programming", "Software Engineering", "Computer Networks", "Statistical Methods"] },
            { semester: "Final Year (Optional / NEP)", topics: ["Python Programming", "Introduction to Cloud Computing", "Mobile Application Development (Android)", "Major Project & Industrial Internship"] }
        ],
        careerOutcomes: [
            { role: "Web Developer", package: "₹3.5–8 LPA" },
            { role: "System Administrator", package: "₹3–7 LPA" },
            { role: "Software Quality Analyst", package: "₹3.5–7.5 LPA" },
            { role: "IT Support Specialist", package: "₹2.5–5 LPA" }
        ]
    },
    {
        id: "mca",
        description: "An intensive postgraduate program designed to build professional software development expertise and enterprise-level application architecture management skills. The curriculum targets advanced Java and Python frameworks, cloud computing architectures, relational and non-relational database management, data analytics, and microservices, fully optimized within a streamlined, AICTE-mandated two-year timeline that includes a mandatory six-month industrial internship.",
        syllabus: [
            { semester: "Year 1", topics: ["Advanced Java Programming", "Relational & Non-Relational Databases", "Design and Analysis of Algorithms", "Mathematical Foundations of Computing", "Advanced Web Tech & Frameworks (MERN/Django)"] },
            { semester: "Final Year", topics: ["Software Architecture & Design Patterns", "Data Science & Big Data Analytics", "Cloud Computing & DevOps", "6-Month Mandatory Industrial Internship"] }
        ],
        careerOutcomes: [
            { role: "Full-Stack Developer", package: "₹6–16 LPA" },
            { role: "Database Administrator", package: "₹5–12 LPA" },
            { role: "DevOps Engineer", package: "₹7–18 LPA" },
            { role: "Systems Analyst", package: "₹5.5–14 LPA" }
        ]
    },
    {
        id: "bsc-cs",
        description: "An analytically rigorous science-stream undergraduate program that establishes a robust mathematical and algorithmic base for computing. Rather than just technical programming, the program emphasizes theoretical computer science, discrete mathematical structures, algorithm modeling, operating system mechanics, and data structures. It functions on the flexible 3 or 4-year NEP framework with optional pathways for an Honours or Research suffix.",
        syllabus: [
            { semester: "Year 1", topics: ["Introduction to Programming using Python", "Calculus and Analytic Geometry", "Applied Electronics", "Programming in C++"] },
            { semester: "Year 2", topics: ["Discrete Structures", "Computer System Architecture", "Data Structures and Algorithms", "Operating Systems"] },
            { semester: "Year 3", topics: ["Linear Algebra & Numerical Methods", "Software Engineering Foundations", "Database Management Concepts", "Computer Networks"] },
            { semester: "Final Year (Optional / NEP)", topics: ["Theory of Computation", "Introduction to Data Science", "Artificial Intelligence Foundations", "Capstone Project & Viva Voce"] }
        ],
        careerOutcomes: [
            { role: "Technical Analyst", package: "₹3.5–8 LPA" },
            { role: "Database Assistant", package: "₹3–6 LPA" },
            { role: "UI Developer", package: "₹3.5–7 LPA" },
            { role: "Data Analyst Associate", package: "₹4–9 LPA" }
        ]
    },
    {
        id: "phd-cs",
        description: "The highest academic tier doctoral research program, designed for scholars aiming to pioneer breakthrough methodologies in computer science. The roadmap features intensive initial coursework in quantitative research methodology and advanced specialization credits, followed by independent laboratory experimentation, research paper compilation for Scopus/UGC-CARE journals, teaching assistantships, and a final comprehensive pre-synopsis defense and thesis dissertation.",
        syllabus: [
            { semester: "Year 1", topics: ["Advanced Research Methodology & Quantitative Tools", "Research and Publication Ethics (RPE)", "Domain-Specific Elective I (Advanced ML/Quantum Computing)", "Research Proposal Formulation & Comprehensive Synopsis Exam"] },
            { semester: "Year 2 to 3+", topics: ["Independent Core Laboratory Research", "Periodic Research Advisory Committee (RAC) Progress Reviews", "Teaching Assistantship Practicums", "Scopus/UGC-CARE Journal Publications", "Thesis Submission & Final Viva-Voce Oral Exam"] }
        ],
        careerOutcomes: [
            { role: "Professor / Academician", package: "₹10–24 LPA" },
            { role: "Principal R&D Consultant", package: "₹16–40 LPA" },
            { role: "Postdoctoral Research Fellow", package: "₹8–18 LPA" },
            { role: "Senior Scientific Officer", package: "₹12–25 LPA" }
        ]
    },
    {
        id: "mba",
        description: "A prestigious, two-year postgraduate professional program crafted to build elite leadership competencies, strategic execution frameworks, and global management acumen. Students navigate complex core structures in managerial economics, financial accounting, marketing dynamics, organizational behavior, and corporate governance, before deep-diving into analytics-driven specializations and a mandatory corporate summer internship project.",
        syllabus: [
            { semester: "Year 1", topics: ["Management Principles & Perspectives", "Managerial Economics", "Financial Accounting for Managers", "Organizational Behavior & HR", "Corporate Finance Architecture", "Marketing Management"] },
            { semester: "Final Year", topics: ["Business Research Methodology", "Operations & Supply Chain Management", "Strategic Management Processes", "Specialization Core Electives", "Summer Internship Project Appraisal", "Corporate Governance, Law & Ethics"] }
        ],
        careerOutcomes: [
            { role: "Management Consultant", package: "₹9–24 LPA" },
            { role: "Investment Banker", package: "₹12–30 LPA" },
            { role: "Product Manager", package: "₹10–26 LPA" },
            { role: "Human Resource Manager", package: "₹6–15 LPA" }
        ]
    },
    {
        id: "bba",
        description: "A professional, foundation-building undergraduate management program focused on introducing administrative workflows, team operations, startup entrepreneurship, and organizational leadership. Students explore functional business dimensions including marketing practices, human resource rules, basic financial accounting, and business statistics. This program aligns with the 3 to 4-year NEP flexible graduation structure with optional research pathways.",
        syllabus: [
            { semester: "Year 1", topics: ["Principles of Management", "Business Economics", "Financial Accounting Basics", "Business Communication Skills", "Organizational Behavior"] },
            { semester: "Year 2", topics: ["Macroeconomic Principles", "Business Mathematics & Statistics", "Marketing Frameworks", "Human Resource Management Rules"] },
            { semester: "Year 3", topics: ["Cost and Management Accounting", "Business Law Basics", "Financial Management Basics", "Production and Operations Management"] },
            { semester: "Final Year (Optional / NEP)", topics: ["Digital Marketing Practices", "Strategic Management Intro", "Specialization Track Subjects", "Comprehensive Capstone Project & Summer Evaluation"] }
        ],
        careerOutcomes: [
            { role: "Business Development Executive", package: "₹3.5–8 LPA" },
            { role: "Marketing Associate", package: "₹4–8.5 LPA" },
            { role: "Operations Coordinator", package: "₹3.5–7 LPA" },
            { role: "Talent Acquisition Specialist", package: "₹3–6.5 LPA" }
        ]
    },
    {
        id: "bcom",
        description: "The traditional undergraduate gateway for high-level commercial training, tracking financial structures, corporate accounting metrics, and market economics. Key learning areas encompass direct and indirect taxation systems, auditing standards, cost and management accounting frameworks, and corporate legal guidelines. It operates on the modern 3 or 4-year NEP paradigm, providing a pathway to a 1-year Master's degree for 4-year Honours graduates.",
        syllabus: [
            { semester: "Year 1", topics: ["Financial Accounting I & II", "Business Organization and Management", "Microeconomics & Macroeconomics Principles", "Business Communications & Statistics"] },
            { semester: "Year 2", topics: ["Advanced Corporate Accounting", "Income Tax Law and Practice", "Company Law and Compliance", "Indian Economy Frameworks", "Cost Accounting Structures"] },
            { semester: "Year 3", topics: ["Indirect Tax Laws (GST)", "Management Accounting Metrics", "Auditing Principles & Assurances", "Financial Markets & Institutions", "Financial Management Strategies"] },
            { semester: "Final Year (Optional / NEP)", topics: ["International Business Dynamics", "Entrepreneurship Concepts", "Research Methodology Fundamentals", "Honours Project Viva Voce Evaluation"] }
        ],
        careerOutcomes: [
            { role: "Accountant", package: "₹3–7 LPA" },
            { role: "Tax Consultant Associate", package: "₹3.5–8 LPA" },
            { role: "Financial Analyst Intern", package: "₹4–9 LPA" },
            { role: "Audit Assistant", package: "₹3–6.5 LPA" }
        ]
    },
    {
        id: "mcom",
        description: "An advanced postgraduate academic program specializing in institutional asset allocation, financial reporting, and macroeconomic regulations. The curriculum features high-level exposures to strategic financial management techniques, advanced audit assurance protocols, international business dynamics, and data-driven corporate research, preparing postgraduates for senior analytical, banking, tax consultancy, and academic positions.",
        syllabus: [
            { semester: "Year 1", topics: ["Advanced Financial Policy & Reporting", "Managerial Economics Analysis", "Corporate Governance & Business Environment", "Statistical Frameworks for Business Decisions", "Strategic Financial Management"] },
            { semester: "Final Year", topics: ["Advanced Cost and Management Accounting", "Accounting for Managerial Decisions", "Business Research Methodology Tooling", "Advanced Income Tax & Corporate Tax Planning", "Field Work Research Thesis Dissertations"] }
        ],
        careerOutcomes: [
            { role: "Senior Accounts Manager", package: "₹6.5–15 LPA" },
            { role: "Financial Advisory Lead", package: "₹7–18 LPA" },
            { role: "Investment Portfolio Analyst", package: "₹8–20 LPA" },
            { role: "Accounts Auditor Consultant", package: "₹6–14 LPA" }
        ]
    },
    {
        id: "mbbs",
        description: "The standard professional medical degree framework in India, integrating rigorous human biological theory with clinical medical execution. The five-and-a-half-year journey spans preclinical disciplines (Anatomy, Physiology, Biochemistry), paraclinical studies (Pathology, Pharmacology, Microbiology, FMT), and extensive clinical postings across primary departments, concluding with a mandatory 1-year Compulsory Rotatory Residential Internship (CRRI) and exit examination clearing.",
        syllabus: [
            { semester: "Pre-Clinical (Year 1)", topics: ["Human Anatomy & Embryology", "Human Physiology & Biophysics", "Medical Biochemistry"] },
            { semester: "Para-Clinical (Year 2-3)", topics: ["Systemic Pathology", "Medical Pharmacology & Therapeutics", "Medical Microbiology & Immunology", "Forensic Medicine & Toxicology"] },
            { semester: "Clinical Phase (Year 4-5)", topics: ["Community Medicine & Public Health", "Oto-Rhino-Laryngology (ENT)", "Ophthalmology Clinical Practices", "General Medicine & Surgery", "Obstetrics & Gynecology", "Pediatrics"] },
            { semester: "Internship (Final Year)", topics: ["12-Month Mandatory Compulsory Rotatory Residential Internship (CRRI) Across Hospital Wards"] }
        ],
        careerOutcomes: [
            { role: "General Physician / Medical Officer", package: "₹9–18 LPA" },
            { role: "Clinical Consultant", package: "₹8–16 LPA" },
            { role: "Public Health Administrator", package: "₹7–15 LPA" }
        ]
    },
    {
        id: "bds",
        description: "A professional healthcare program focused on oral and maxillo-facial surgery, dental aesthetics, and preventive dental practice. Over a five-year timeline, students cover general human anatomy, pathobiology, and pharmacology alongside specific pre-clinical dental disciplines, culminating in deep clinical practice in conservative dentistry, orthodontics, prosthodontics, and a mandatory paid rotatory hospital internship year.",
        syllabus: [
            { semester: "Year 1-2", topics: ["General Human Anatomy, Histology & Embryology", "General Human Physiology & Biochemistry", "Dental Anatomy & Oral Histology", "General Pathology & Microbiology", "Dental Materials Science"] },
            { semester: "Year 3-4", topics: ["General Medicine & Surgery Wards", "Oral Pathology & Oral Microbiology", "Oral Medicine & Radiology", "Oral & Maxillofacial Surgery", "Orthodontics & Dentofacial Orthopedics", "Prosthodontics, Endodontics & Periodontology"] },
            { semester: "Year 5", topics: ["12-Month Compulsory Rotatory Internship in Dental Hospital Clinics"] }
        ],
        careerOutcomes: [
            { role: "Dental Surgeon", package: "₹4.5–12 LPA" },
            { role: "Oral Health Consultant", package: "₹4–10 LPA" },
            { role: "Dental Product Expert", package: "₹5–11 LPA" }
        ]
    },
    {
        id: "bpharm",
        description: "A professional four-year undergraduate program that bridges the chemical engineering and biomedical healthcare spaces. Students master pharmaceutical analysis, complex organic/inorganic chemistry, drug synthesis engineering, physical pharmaceutics, advanced pharmacology, and corporate pharma jurisprudence, preparing them for industrial drug development, quality assurance operations, and regulatory affairs management.",
        syllabus: [
            { semester: "Year 1", topics: ["Human Anatomy and Physiology I & II", "Pharmaceutical Analysis I", "Pharmaceutics I", "Pharmaceutical Inorganic & Organic Chemistry I"] },
            { semester: "Year 2", topics: ["Biochemistry", "Pathophysiology", "Pharmaceutical Organic Chemistry II & III", "Physical Pharmaceutics I & II", "Pharmaceutical Microbiology & Engineering"] },
            { semester: "Year 3", topics: ["Pharmacology I & II", "Pharmacognosy and Phytochemistry I", "Medicinal Chemistry I & II", "Industrial Pharmacy I", "Pharmaceutical Jurisprudence"] },
            { semester: "Year 4", topics: ["Pharmacology III", "Herbal Drug Technology", "Biopharmaceutics & Pharmacokinetics", "Medicinal Chemistry III", "Instrumental Methods of Analysis", "Industrial Pharmacy Practice", "Novel Drug Delivery Systems"] }
        ],
        careerOutcomes: [
            { role: "Drug Regulatory Officer", package: "₹4.5–10 LPA" },
            { role: "Quality Assurance Chemist", package: "₹3.5–8 LPA" },
            { role: "Pharmaceutical Researcher", package: "₹5–12 LPA" },
            { role: "Medical Writer", package: "₹4–8.5 LPA" }
        ]
    },
    {
        id: "pharm-d",
        description: "An intensive six-year professional doctoral tier qualification specializing in direct clinical pharmacy management and evidence-based medicine. Unlike manufacturing-focused tracks, this program integrates clinical toxicologies, pharmacotherapeutics, hospital bedside diagnostics, and biostatistics, concluding with a comprehensive, mandatory final-year residency within an accredited hospital to optimize patient-centric drug therapies.",
        syllabus: [
            { semester: "Year 1-2", topics: ["Human Anatomy and Physiology", "Pharmaceutics", "Medicinal Biochemistry", "Pharmaceutical Organic & Inorganic Chemistry", "Pathophysiology", "Pharmaceutical Microbiology", "Pharmacognosy"] },
            { semester: "Year 3-4", topics: ["Pharmacology I & II", "Pharmaceutical Analysis", "Pharmacotherapeutics I, II & III", "Pharmaceutical Jurisprudence", "Hospital & Clinical Pharmacy", "Biostatistics & Research Methodology", "Clinical Toxicology"] },
            { semester: "Year 5", topics: ["Clinical Research Methodologies", "Pharmacoepidemiology and Pharmacoeconomics", "Clinical Pharmacokinetics & Therapeutic Drug Monitoring", "Clerkship Project Rotation"] },
            { semester: "Year 6", topics: ["12-Month Mandatory Hospital Clinical Residency & Ward Rounds Internships"] }
        ],
        careerOutcomes: [
            { role: "Clinical Pharmacist", package: "₹6–14 LPA" },
            { role: "Clinical Research Director", package: "₹8–20 LPA" },
            { role: "Medical Safety Advisor", package: "₹7–16 LPA" },
            { role: "Pharmacovigilance Lead", package: "₹6.5–15 LPA" }
        ]
    },
    {
        id: "bsc-nursing",
        description: "A specialized four-year healthcare degree program engineered to train critical-care frontline professionals. The academic structure merges applied anatomy, physiology, and nutrition sciences with nursing foundations, adult health conditions (medical-surgical), pediatric nursing, and midwifery, heavily reinforced by thousands of hours of mandatory clinical shifts inside intensive care units and emergency wards.",
        syllabus: [
            { semester: "Year 1", topics: ["Communicative English", "Applied Anatomy & Physiology", "Applied Sociology & Psychology", "Applied Biochemistry & Nutrition", "Nursing Foundations I & II including Health Assessment"] },
            { semester: "Year 2", topics: ["Introduction to Community Health Nursing", "Applied Microbiology and Infection Control", "Pharmacology I & II", "Pathology I & II", "Adult Health Nursing I & II (Medical Surgical)"] },
            { semester: "Year 3", topics: ["Child Health Nursing I & II (Pediatrics)", "Mental Health Nursing I & II (Psychiatric)", "Community Health Nursing I", "Midwifery / Obstetrics and Gynecology Nursing I"] },
            { semester: "Year 4", topics: ["Midwifery / Obstetrics and Gynecology Nursing II", "Introduction to Forensic Nursing & Indian Laws", "Nursing Research and Statistics", "24-Week Intensive Hospital Ward Competency Internship"] }
        ],
        careerOutcomes: [
            { role: "Critical Care Nurse", package: "₹4–9 LPA" },
            { role: "Nursing Supervisor", package: "₹5–11 LPA" },
            { role: "Clinical Research Nurse", package: "₹4.5–10 LPA" }
        ]
    },
    {
        id: "llb",
        description: "A professional three-year core graduate-entry law qualification dealing with statutory interpretation, case analysis frameworks, and judicial processing. The structural curriculum provides deep-dive analytical insights into Constitutional Law, Contract Acts, Family Laws, Corporate Compliance regulations, and updated Indian Penal legislation, supported by practical trial modeling, legal drafting, and moot court practice.",
        syllabus: [
            { semester: "Year 1", topics: ["Jurisprudence (Legal Theory)", "Law of Contract I & II", "Law of Torts & Consumer Protection Act", "Family Law I & II", "Constitutional Law I"] },
            { semester: "Year 2", topics: ["Constitutional Law II", "Law of Crimes I (IPC Context)", "Property Law & Transfer of Property Act", "Labor & Industrial Law I & II", "Public International Law", "Administrative Law"] },
            { semester: "Year 3", topics: ["Law of Crimes II (CrPC)", "Law of Evidence", "Company Law and Corporate Systems", "Civil Procedure Code", "Drafting, Pleading and Conveyancing", "Alternative Dispute Resolution (ADR)", "Moot Court Exercise"] }
        ],
        careerOutcomes: [
            { role: "Legal Advisor / Corporate Counsel", package: "₹6–16 LPA" },
            { role: "Litigation Lawyer / Advocate", package: "₹4–15 LPA" },
            { role: "Judicial Magistrate Candidate", package: "₹9–14 LPA" }
        ]
    },
    {
        id: "ba-llb",
        description: "An integrated five-year professional dual-degree law program meticulously tailored for candidates stepping directly out of high school. The course seamlessly combines liberal humanities disciplines—such as Political Science, Sociology, and Economic History—with structural jurisprudential disciplines, alternate dispute resolution strategies, international protocols, and corporate mock trials over an expanded legal timeline.",
        syllabus: [
            { semester: "Year 1", topics: ["Political Science I & II", "Sociology I & II", "English Literature & Grammar Foundations", "Economics I (Microeconomics Intro)", "Law of Torts Basics & Consumer Protection"] },
            { semester: "Year 2", topics: ["Political Science III", "Economics II", "Jurisprudence", "Law of Contract I & II", "History of Indian Legal System", "Constitutional Law I"] },
            { semester: "Year 3", topics: ["Constitutional Law II", "Family Law I & II", "Environmental Law Infrastructure", "Property Law Frameworks", "Administrative Law", "Labor Laws I"] },
            { semester: "Year 4", topics: ["Company Law Frameworks", "Public International Law", "Law of Crimes I & II", "Labor Laws II", "Law of Evidence", "Intellectual Property Rights (IPR) Elective"] },
            { semester: "Year 5", topics: ["Civil Procedure Code", "Taxation Jurisprudence", "Cyber Law Elective", "Drafting, Pleading and Conveyancing", "Alternative Dispute Resolution Systems", "Moot Court Simulation Trials & Chamber Internship"] }
        ],
        careerOutcomes: [
            { role: "Corporate Legal Associate", package: "₹7–18 LPA" },
            { role: "Legal Consultant / Policy Analyst", package: "₹6–14 LPA" },
            { role: "Compliance Officer", package: "₹5.5–12 LPA" }
        ]
    },
    {
        id: "barch",
        description: "An intensive five-year professional architectural program focusing on creative visual aesthetics, physical structural engineering, and corporate urban mapping. Students spend multiple semesters inside design studios learning structural mechanics, history of spaces, CAD/BIM technologies, and climate-responsive planning, alongside compiling an independent architectural design thesis and serving a multi-semester professional studio placement.",
        syllabus: [
            { semester: "Year 1", topics: ["Architectural Design Studio I & II", "Visual Arts and Creative Sketching", "Building Materials and Construction I & II", "Theory of Architecture", "Architectural Graphics and Drawing", "Structural Mechanics I"] },
            { semester: "Year 2", topics: ["Architectural Design Studio III & IV", "History of Architecture I & II", "Building Construction & Systems III", "Climate-Responsive Architecture Design", "Structural Design for Concrete structures", "Computer Applications (CAD/BIM)"] },
            { semester: "Year 3", topics: ["Architectural Design Studio V & VI", "Building Services I & II (Water, Sanitation, Electrical, HVAC)", "Specification Writing and Estimation", "Working Drawing Development Studio", "Contemporary Architecture Trends", "Urban Human Settlement Studies"] },
            { semester: "Year 4", topics: ["Architectural Design Studio VII", "Landscape Design Engineering", "Housing Typologies & Planning Principles", "Professional Practice Management", "Multi-Month Mandatory Professional Studio Office Internship Placement"] },
            { semester: "Year 5", topics: ["Advanced Architectural Design Studio VIII", "Urban Design Frameworks", "Elective Specialization Seminar", "Independent Terminal Architectural Design Thesis Project", "Comprehensive Final Viva Voce"] }
        ],
        careerOutcomes: [
            { role: "Architect", package: "₹5–15 LPA" },
            { role: "Urban Planner / Spatial Designer", package: "₹6–14 LPA" },
            { role: "Interior Architect Consultant", package: "₹4.5–12 LPA" }
        ]
    },
    {
        id: "bsc-physics",
        description: "A foundational science undergraduate program designed to decode the fundamental laws that govern structural matter and physical forces. The course details classical mechanics, electromagnetic theory, advanced wave optics, thermal dynamics, and introductory quantum logic via structured mathematical proofs and extensive laboratory testing, following the standard flexible 3 or 4-year NEP honors path.",
        syllabus: [
            { semester: "Year 1", topics: ["Mathematical Physics I", "Mechanics & Relativity Proofs", "Electricity and Magnetism Core", "Waves and Oscillations Equations", "Physics Laboratory Frameworks I & II"] },
            { semester: "Year 2", topics: ["Mathematical Physics II & III", "Thermal Physics & Thermodynamics", "Digital Systems and Applications", "Elements of Modern Physics", "Analog Systems and Electronics", "Advanced Optics Practicals"] },
            { semester: "Year 3", topics: ["Quantum Mechanics Foundations", "Solid State Physics Systems", "Electromagnetic Theory Frameworks", "Statistical Mechanics Equations", "Atomic, Molecular, Nuclear & Particle Physics", "Advanced Physics Lab I & II"] },
            { semester: "Final Year (Optional / NEP)", topics: ["Advanced Quantum Field Theory", "Materials Science & Nanotechnology", "Astrophysics & Cosmology Elective", "Honours Research Thesis & Project Work"] }
        ],
        careerOutcomes: [
            { role: "Research Laboratory Assistant", package: "₹4–9 LPA" },
            { role: "Data Analyst / Numeric Modeler", package: "₹4.5–11 LPA" },
            { role: "Subject Matter Expert Physics", package: "₹3.5–8 LPA" }
        ]
    },
    {
        id: "msc-mathematics",
        description: "An advanced postgraduate program dedicated to pure abstract mathematical logic and applied computational equations. The curriculum details complex variables, real analysis, measure theories, abstract structural algebra, topology, and predictive numerical calculations, training postgraduates for advanced predictive data analysis, scientific computing, economics research, or teaching profiles.",
        syllabus: [
            { semester: "Year 1", topics: ["Real Analysis & Measure Theory", "Abstract Algebra & Group Structures", "Ordinary & Partial Differential Equations", "Discrete Mathematical Proofs", "Complex Analysis & Conformal Mapping", "Advanced Linear Algebra Engine", "Topology Foundations"] },
            { semester: "Final Year", topics: ["Functional Analysis Methods", "Numerical Analysis and Fluid Mechanics", "Mathematical Statistics & Probability", "Operations Research Models", "Differential Geometry & Tensor Analysis", "Number Theory & Cryptography Algorithms", "Master's Project Dissertation Defense"] }
        ],
        careerOutcomes: [
            { role: "Data Analytics Consultant", package: "₹7–16 LPA" },
            { role: "Statistical Modeler", package: "₹6.5–15 LPA" },
            { role: "Quantitative Risk Analyst", package: "₹8–20 LPA" },
            { role: "Academic Lecturer Mathematics", package: "₹5–12 LPA" }
        ]
    },
    {
        id: "ba-english",
        description: "An undergraduate literary program designed to cultivate elite critical decoding, professional copy communications, and structural text analysis. Students comprehensively read Indian classical texts, European literary masterpieces, Romantic and Victorian eras, postcolonial developments, and modern linguistics, following the 3 to 4-year flexible choice-based credit timeline under the NEP.",
        syllabus: [
            { semester: "Year 1", topics: ["Indian Classical Literature Translation", "European Classical Literature Historiography", "Academic Writing and Composition", "Indian Writing in English Literature", "British Poetry and Drama (14th to 17th Century)"] },
            { semester: "Year 2", topics: ["American Literature Anthology", "British Poetry and Drama (17th and 18th Century)", "British Literature (18th Century Concepts)", "Creative Writing Workshops", "British Romantic Literature Era", "British Literature (19th Century Victorian Frameworks)"] },
            { semester: "Year 3", topics: ["Women's Writing Narratives", "Linguistics & Phonetics Base", "20th Century British Literature Developments", "Literary Theory and Critique Frameworks I", "Postcolonial Literatures Studies", "Modern European Drama Analysis"] },
            { semester: "Final Year (Optional / NEP)", topics: ["Modern Literary Criticism Models II", "World Literatures Anthology", "Partition Literature Profiles", "Senior Creative Literary Dissertation Submission"] }
        ],
        careerOutcomes: [
            { role: "Content Marketing Manager / Copywriter", package: "₹4–10 LPA" },
            { role: "Corporate Editor / Publisher", package: "₹3.5–9 LPA" },
            { role: "Public Relations Specialist", package: "₹4.5–11 LPA" }
        ]
    },
    {
        id: "ma-economics",
        description: "A data-heavy postgraduate program emphasizing advanced econometric modeling, institutional fiscal policies, market supply logistics, and macroeconomic dynamics. Students learn quantitative tracking mechanisms to evaluate structural banking systems, development metrics, international trade frameworks, and corporate financial risks.",
        syllabus: [
            { semester: "Year 1", topics: ["Microeconomic Analysis Frameworks", "Macroeconomic Policy Formulations", "Quantitative Methods & Matrix Algebra", "Economic History Patterns", "Advanced Microeconomic Theory", "Advanced Macroeconomic Dynamics", "Basic Econometric Software Modeling", "Public Economics & Fiscal Finance"] },
            { semester: "Final Year", topics: ["Advanced Econometric Theory & Time Series Analysis", "International Trade Logistics", "Development Economics Theory", "Financial Institutions Regulations Elective", "Indian Economic Policy Analytics", "Environmental Economics Metrics", "Industrial Economics Optimization", "Field Research Thesis Project Portfolio"] }
        ],
        careerOutcomes: [
            { role: "Economic Data Analyst", package: "₹7.5–18 LPA" },
            { role: "Financial Risk Advisory Lead", package: "₹8–22 LPA" },
            { role: "Policy Research Analyst", package: "₹6–14 LPA" }
        ]
    },
    {
        id: "ma-psychology",
        description: "An advanced, comprehensive study of clinical, counseling, cognitive, and industrial-organizational psychology. The curriculum balances intense theoretical frameworks covering neurobiology and personality models with practical psychometric testing, mental healthcare diagnostic modalities, supervised industrial clinical internships, and research dissertations.",
        syllabus: [
            { semester: "Year 1", topics: ["Advanced Cognitive Psychology Dynamics", "Biological Bases of Human Behavior", "Research Methodology Tools & Statistics in Behavioral Sciences", "Theories of Personality Development", "Psychopathology and Psychiatric Diagnostic Criteria", "Psychometric Testing and Evaluation Labs"] },
            { semester: "Final Year", topics: ["Clinical Psychodiagnostics and Interventions", "Counseling Concepts and Psychotherapy Protocols", "Organizational Behavior Metrics", "Field Case-Study Seminar Project", "Rehabilitation Psychology / Neuropsychology", "Supervised Hospital/Industrial Internship Posting", "Empirical Research Dissertation"] }
        ],
        careerOutcomes: [
            { role: "Clinical Psychologist / Specialist", package: "₹5.5–14 LPA" },
            { role: "Corporate Human Counselor", package: "₹5–12 LPA" },
            { role: "Mental Health Rehabilitation Director", package: "₹6–15 LPA" }
        ]
    },
    {
        id: "bfa",
        description: "A four-year creative, portfolio-driven undergraduate program intended to build professional fine arts expression capabilities. The roadmap covers classical freehand sketching, clay modeling, oil painting media, and sculpture aesthetics alongside contemporary UI/UX visual designs, digital layout illustrations, photography frameworks, and curated public gallery exhibitions.",
        syllabus: [
            { semester: "Year 1", topics: ["Basic Freehand Drawing & Sketching Techniques", "Fundamentals of Visual Arts Design Theory", "Introduction to Color Mediums (Water/Pastel)", "Aesthetics & Art History Intro", "Still Life Composition Studies", "Clay Modeling and Physical Form Sculpting Mechanics", "Printmaking Basics"] },
            { semester: "Year 2", topics: ["Anatomy Drawing and Human Figure Composition", "Landscape and Perspective Painting Mediums", "History of Western & Indian Art Movements", "Typography and Graphic Design Elements", "Portraiture Studies in Oil/Acrylic Mediums", "Advanced Sculpture Architecture (Wood/Metal Casting)", "Photography and Digital Illustration"] },
            { semester: "Year 3", topics: ["Creative Composition and Conceptual Art Development", "Digital Media Projects & Computer Graphics Studio", "Exhibition Display Layout Techniques", "Aesthetics Philosophy Modules", "Mural Painting Foundations", "Contemporary Art Global Practices Study", "Visual Communication Formats"] },
            { semester: "Final Year", topics: ["Advanced Visual Workspace Specialization Practice", "Art Marketing Protocols & Gallery Curation Logic", "Pre-Thesis Seminar Research Document", "Final Comprehensive Solo Creative Exhibition Portfolio Display", "Grand Viva Assessment Panel Verification"] }
        ],
        careerOutcomes: [
            { role: "Commercial Visual UI/UX Artist", package: "₹4.5–12 LPA" },
            { role: "Art Gallery Curator / Director", package: "₹5–14 LPA" },
            { role: "Professional Creative Designer", package: "₹4–11 LPA" }
        ]
    },
    {
        id: "bed",
        description: "A professional teacher-training program required to enter regular secondary school educational careers. The two-year structure details childhood psychological growth, multi-stream instructional pedagogies, classroom ICT deployment, inclusive learning ecosystems, and educational assessment rules, heavily reinforced by compulsory block teaching school placements.",
        syllabus: [
            { semester: "Year 1", topics: ["Childhood and Growing Up Psychological Frameworks", "Contemporary India and Education Ecosystems", "Language Across the School Curriculum Rules", "Understanding Disciplines and School Subjects", "Learning and Teaching Methodology Frameworks", "Pedagogy of School Subject I (e.g., Mathematics/English)", "Assessment for Active Student Learning", "Drama and Art in Educational Formats"] },
            { semester: "Final Year", topics: ["Pedagogy of School Subject II", "Compulsory Multi-Week Block Teaching Practice & School Internship Posting", "Gender, School and Societal Dynamics", "Knowledge and School Syllabus Formatting", "Creating an Inclusive Learning Classroom Environmental Model", "Critical Understanding of ICT Tools in Classrooms"] }
        ],
        careerOutcomes: [
            { role: "Trained Graduate Teacher (TGT)", package: "₹4–8.5 LPA" },
            { role: "Educational Curriculum Developer", package: "₹4.5–9 LPA" },
            { role: "School Administrator / Coordinator", package: "₹5–10 LPA" }
        ]
    },
    {
        id: "phd-history",
        description: "An advanced doctoral research program designed for scholars exploring ancient, medieval, or modern historiographies. Following a foundation year focused on archival research methodologies and literature analysis, scholars dive into deep independent field studies, document epigraphy decoding, source validations, and conference defenses, leading to an extensive original historical thesis publication.",
        syllabus: [
            { semester: "Year 1", topics: ["Historical Research Methodologies and Source Evidentiary Analysis", "Historiography Trends (From Classical to Post-Modern Philosophies)", "Research and Publication Ethics Validation Documentation", "Advanced Area Specialization Seminar Elective", "Doctoral Synopsis Framing & Comprehensive Academic Defense Presentation Exam"] },
            { semester: "Year 2 to 3+", topics: ["Archival Exploration and Independent Primary Source Epigraphy Tracking", "Field Explorations / Excavation / Museum Cataloging Protocols", "Periodic Technical Research Progress Reports to Faculty Advisory Panel", "Academic Paper Drafting for Scopus / UGC-CARE Indexed Journal Protocols", "Final Doctoral Thesis Compilation, Pre-Synopsis Oral Defense Presentation, and Grand Viva Voce Verification Review"] }
        ],
        careerOutcomes: [
            { role: "Chief Historian / Archivist Director", package: "₹8–18 LPA" },
            { role: "Senior Heritage Specialist Consultant", package: "₹7.5–16 LPA" },
            { role: "University History Professor", package: "₹9–22 LPA" }
        ]
    }
];