export interface WorkRole {
  company: string
  title: string
  location: string
  dateRange: string
  achievements: string[]
  tags: string[]
  logoInitials: string
  logoColor: string
}

export interface Education {
  school: string
  degree: string
  gpa: string
  dateRange: string
  logoInitials: string
}

export const workHistory: WorkRole[] = [
  {
    company: "Salesforce",
    title: "Software Engineering Intern",
    location: "San Francisco, CA",
    dateRange: "May 2024 – Aug 2024",
    achievements: [
      "Reduced deployment time by 10+ minutes (30% reduction) by building a Java-based API for the Hyperforce Falcon platform",
      "Leveraged AI developer tools (GitHub Copilot, Einstein GPT) to achieve a 50% improvement in development speed",
    ],
    tags: ["Java", "API Development", "AI Tools", "Hyperforce"],
    logoInitials: "SF",
    logoColor: "#00A1E0",
  },
  {
    company: "Bank of America",
    title: "Software Development Intern",
    location: "Charlotte, NC",
    dateRange: "May 2023 – Aug 2023",
    achievements: [
      "Built a C# program that reduced manual entry creation time by 20% for transaction system testing environments",
      "Resolved 60+ Jira tickets addressing bugs and code smells across critical banking transaction systems",
    ],
    tags: ["C#", "Jira", "Testing", "Banking Systems"],
    logoInitials: "BA",
    logoColor: "#E31837",
  },
  {
    company: "Ernst & Young",
    title: "Tech Consulting Intern",
    location: "San Jose, CA",
    dateRange: "June 2022 – Aug 2022",
    achievements: [
      "Evaluated IT processes for Fortune 500 clients across change management, logical access controls, and IT operations",
      "Built a web scraper that automated Canvas-to-Excel data transfer, saving 20 minutes of manual work daily",
    ],
    tags: ["IT Consulting", "Web Scraping", "Automation", "Risk Management"],
    logoInitials: "EY",
    logoColor: "#FFE600",
  },
]

export const education: Education[] = [
  {
    school: "University of Southern California",
    degree: "M.S. in Artificial Intelligence",
    gpa: "3.9",
    dateRange: "Jan 2026 – Dec 2027",
    logoInitials: "USC",
  },
  {
    school: "Claremont McKenna College",
    degree: "B.A. in Computer Science",
    gpa: "3.4",
    dateRange: "Aug 2021 – May 2025",
    logoInitials: "CMC",
  },
]

export const skills = {
  Languages: ["Python", "Java", "JavaScript", "C/C++", "C#", "SQL", "HTML/CSS", "R"],
  "Frameworks & Tools": ["React", "Node.js", "Flask", "FastAPI", "Django", "PyTorch", "LangChain", "Docker"],
  "Data & Cloud": ["DuckDB", "Supabase", "GCP", "FAISS", "Git/GitHub", "Linux", "MATLAB", "Excel"],
  Concepts: ["Machine Learning", "NLP", "Process Automation", "Data Analytics", "Digital Marketing", "Sales Engineering"],
}

export const ventures = [
  {
    name: "Genius Home Finds",
    description: "Home goods dropshipping store",
    revenue: "$2k+/month",
    url: "https://geniushomefinds.com",
  },
  {
    name: "Curated Balance",
    description: "Health & wellness dropshipping store",
    revenue: "$1k+/month",
    url: "https://curatedbalance.com",
  },
  {
    name: "The Snatched House",
    description: "Website for beauty studio (eyebrows, lashes, makeup)",
    revenue: null,
    url: "https://thesnattchedhouse.com",
  },
]
