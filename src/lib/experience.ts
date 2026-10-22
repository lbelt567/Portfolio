export interface WorkRole {
  company: string
  title: string
  location: string
  dateRange: string
  achievements: string[]
  tags: string[]
}

export interface Education {
  school: string
  degree: string
  location: string
  gpa?: string
  dateRange: string
  coursework?: string[]
}

export const workHistory: WorkRole[] = [
  {
    company: 'SST Automation',
    title: 'Technical Solutions Engineer',
    location: 'Ontario, CA',
    dateRange: 'May 2026 – October 2026',
    achievements: [
      'Designed the UX/UI for Modbus serial-to-Ethernet protocol gateway configuration software using JavaScript and CSS. The design was adopted as the standard template for future SST product configuration software releases.',
      'Identified an untapped data center vertical for industrial automation protocol gateways and built the go-to-market engine from market thesis to CRM pipeline, with segmented email campaigns and automated workflows across 200+ contacts.',
      'Built domain expertise in Modbus, BACnet, PROFINET, EtherNet/IP, HART, and MQTT within the first 60 days, enabling independent technical conversations and client-facing solution design.',
      'Launched SST’s U.S. digital marketing presence across LinkedIn and email, producing technical content that generated inbound engagement from controls engineers and facility managers. Established a documentation quality review framework for the international engineering team.',
    ],
    tags: ['JavaScript', 'CSS', 'Industrial protocols', 'UX/UI', 'Go-to-market strategy'],
  },
  {
    company: 'Leather Corral Inc.',
    title: 'E-Commerce & Operations Lead',
    location: 'North Hollywood, CA',
    dateRange: 'May 2025 – May 2026',
    achievements: [
      'Grew revenue by 25% year-to-date through a go-to-market strategy centered on sourcing products from international manufacturers and pricing competitively against U.S. incumbents.',
      'Built and launched the company website on WordPress, acquiring 30+ new customers through digital advertising and SEO.',
      'Sourced and onboarded 200+ SKUs by identifying high-demand opportunities, managing international supplier relationships, and coordinating logistics.',
    ],
    tags: ['WordPress', 'SEO', 'Digital advertising', 'Operations', 'Supply chain & logistics'],
  },
  {
    company: 'Salesforce',
    title: 'Software Engineering Intern, Hyperforce ROSS (Release Orchestration Service Systems)',
    location: 'San Francisco, CA',
    dateRange: 'May 2024 – August 2024',
    achievements: [
      'Designed, developed, and deployed a Java API for deployment pre-checks within the Hyperforce Falcon platform, cutting average deployment time by over 10 minutes, a 30% reduction.',
      'Delivered a preview experience allowing engineers to view release artifacts through environment-specific “buckets,” increasing pre-deployment visibility and reducing errors across staging environments.',
      'Used GitHub Copilot and Einstein GPT to test deployment logic variations, accelerating development velocity by 50% while maintaining security and code integrity standards.',
    ],
    tags: ['Java', 'API development', 'Hyperforce', 'Release orchestration', 'AI development tools'],
  },
  {
    company: 'Bank of America',
    title: 'Software Development Intern, GTMS (Global Transaction Management Services)',
    location: 'Charlotte, NC',
    dateRange: 'May 2023 – August 2023',
    achievements: [
      'Designed, developed, and implemented a C# program that reduced manual entry creation time by 20% for changes to lower-level testing environments, ensuring consistent deployment across testing environments.',
      'Resolved 60+ Jira tickets addressing bugs and code defects across critical financial transaction systems.',
    ],
    tags: ['C#', 'Jira', 'Testing', 'Financial transaction systems'],
  },
]

// Preserved from the previous portfolio; separate from the updated resume's main roles.
export const earlierWorkHistory: WorkRole[] = [
  {
    company: 'Ernst & Young',
    title: 'Tech Consulting Intern',
    location: 'San Jose, CA',
    dateRange: 'June 2022 – August 2022',
    achievements: [
      'Evaluated IT processes for Fortune 500 clients across change management, logical access controls, and IT operations.',
      'Built a web scraper that automated Canvas-to-Excel data transfer, saving 20 minutes of manual work daily.',
    ],
    tags: ['IT consulting', 'Web scraping', 'Process automation', 'Risk management'],
  },
]

export const education: Education[] = [
  {
    school: 'University of Southern California',
    degree: 'Master of Science in Computer Science, Artificial Intelligence',
    location: 'Los Angeles, CA',
    dateRange: 'Expected May 2028',
    coursework: ['Analysis of Algorithms', 'Web Development', 'Foundations of Artificial Intelligence'],
  },
  {
    school: 'Claremont McKenna College',
    degree: 'Bachelor of Arts in Computer Science (via Harvey Mudd College)',
    location: 'Claremont, CA',
    gpa: '3.3',
    dateRange: 'May 2025',
  },
]

export const skills = {
  Languages: ['Java', 'Python', 'C/C++', 'SQL', 'JavaScript', 'HTML/CSS', 'R'],
  'Tools & Frameworks': ['React', 'Node.js', 'Flask', 'WordPress', 'FastAPI', 'GitHub', 'SQLite', 'Docker', 'PyTorch', 'Jira', 'GCP', 'LangChain', 'MATLAB', 'Cursor', 'Excel', 'Linux', 'Django', 'Git', 'VS Code', 'PyCharm', 'IntelliJ', 'Eclipse', 'ServiceNow', 'DuckDB', 'asyncio', 'WebSocket', 'Parquet'],
  Concepts: ['Software Engineering', 'Data Analytics', 'Natural Language Processing', 'Digital Marketing', 'Sales Engineering', 'Process Automation', 'Machine Learning', 'Information Security', 'Product Management', 'Financial Markets', 'Automated Securities Trading', 'Data Pipelines', 'Risk Management', 'AI Agent Workflows', 'E-Commerce', 'Operations Strategy', 'Supply Chain & Logistics', 'Real-Time Systems', 'Event-Driven Architecture'],
}

export const ventures = [
  { slug: 'genius-home-finds', kind: 'E-commerce', heroImage: '/images/genius-home-finds.webp', name: 'Genius Home Finds', description: 'Home goods dropshipping store', revenue: '$2k+/month', url: 'https://geniushomefinds.com' },
  { slug: 'curated-balance', kind: 'E-commerce', heroImage: '/images/curated-balance.webp', name: 'Curated Balance', description: 'Health & wellness dropshipping store', revenue: '$1k+/month', url: 'https://curatedbalance.com' },
  { slug: 'the-snatched-house', kind: 'Client website', heroImage: '/images/the-snatched-house.webp', name: 'The Snatched House', description: 'Website for beauty studio (eyebrows, lashes, makeup)', revenue: null, url: 'https://d3yw31kq8pj4.cloudfront.net' },
]
