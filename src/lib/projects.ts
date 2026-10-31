import type { CaseStudy } from "@/types/project"

export const projects: CaseStudy[] = [
  {
    slug: 'steadyfollow',
    title: 'SteadyFollow',
    subtitle: 'Bilingual follow-up automation for local trade and supply businesses',
    heroImage: '/images/steadyfollow-site.webp',
    imageAlt: 'SteadyFollow homepage with its logo, “Your follow-ups, automated” headline, business-counter photography, and booking invitation.',
    type: 'Founder & Engineer',
    dateRange: 'Ongoing',
    problem: 'Small businesses lose repeat customers simply because nobody has time to follow up. Growing up around my family’s upholstery supply business, I saw customers slip away after a single purchase and large accounts quietly move to a competitor, with no system to notice.',
    solution: 'Founded SteadyFollow to set up and manage follow-up systems for local trade and supply businesses in Los Angeles and the Inland Empire. I built the brand, a mobile-first marketing website, and a reusable CRM system, with an English/Spanish offering for Spanish-speaking owners.',
    sections: [
      {
        title: 'Marketing website',
        description: 'Built a mobile-first, bilingual site with Astro and deployed it on Cloudflare Workers. The site includes an embedded booking calendar, a Content Security Policy and other security headers, local business structured data for search, and privacy-friendly analytics.',
      },
      {
        title: 'Reusable CRM',
        description: 'Built the CRM in GoHighLevel and saved it as a reusable template that can be installed for each new client.',
        items: [
          'Customer records include personal notes, lead source, preferred language, and purchase history.',
          'Customer stages: New Lead → Quoted → First Order → Repeat → Large Account.',
          'Follow-up schedule: Day 0 welcome email → Day 3 call reminder → Day 7 email → Day 14 call → Day 30 check-in. The sequence stops as soon as the customer orders.',
          'Alerts flag large accounts that go quiet so the business can reconnect.',
        ],
      },
      {
        title: 'AI-assisted follow-up',
        description: 'GoHighLevel workflows use OpenAI to draft personalized follow-up emails and call scripts from each customer’s purchase history and notes. A human review step comes before automated message delivery.',
      },
    ],
    stack: ['Astro', 'Cloudflare Workers', 'GoHighLevel', 'OpenAI', 'JavaScript / TypeScript', 'English/Spanish i18n'],
    stackNodes: [],
    metrics: [
      { label: 'Businesses served', value: '2' },
      { label: 'Monthly service fee', value: '$350' },
      { label: 'Languages', value: 'English / Spanish' },
    ],
    outcomes: [
      'Built follow-up automations for two small businesses, with positive feedback so far.',
      'Charge $350 per month to set up and manage the follow-up service.',
      'Created a reusable CRM template for onboarding each new client.',
    ],
    liveUrl: 'https://steadyfollow.com',
    githubUrl: null,
  },
  {
    slug: 'polymarket-sentinel',
    title: 'Polymarket Sentinel',
    subtitle: 'Real-time prediction market monitoring and an AI agent trading pipeline',
    heroImage: '/images/polymarket-sentinel.svg',
    imageAlt: 'Polymarket Sentinel architecture: live WebSocket prices pass through a waterfall detector into Researcher, Analyst, Executor, and Outcome Observer agents, with execution controls, SQLite hot storage, and Parquet/DuckDB archives.',
    type: 'Real-time systems / AI agents',
    dateRange: 'March 2026 – Present',
    problem: 'Monitoring hundreds of prediction markets requires continuous price ingestion, a way to identify meaningful changes over multiple timeframes, and reliable data storage for later research. Agent-driven trading also needs explicit execution and risk controls.',
    solution: 'Built a fully asynchronous Python system that streams live prices over WebSocket, detects price shifts with a multi-timeframe waterfall detector, and archives tick data to Parquet for backtesting with DuckDB. A four-stage AI pipeline connects Researcher, Analyst, Executor, and Outcome Observer through lease-based job queues and typed data contracts.',
    stack: ['Python', 'asyncio', 'WebSocket', 'SQLite', 'Parquet', 'DuckDB', 'Docker', 'systemd'],
    stackNodes: [],
    metrics: [{ label: 'Markets monitored', value: '200+' }, { label: 'AI agent stages', value: '4' }, { label: 'Concurrent tasks', value: '6' }],
    outcomes: [
      'Streams live prices for 200+ prediction markets and detects significant changes across multiple timeframes.',
      'Archives tick data to Parquet for backtesting with DuckDB, with SQLite in WAL mode for hot storage.',
      'Implements Researcher, Analyst, Executor, and Outcome Observer agents with lease-based queues and typed contracts.',
      'Uses idempotent order execution and circuit breaker risk controls.',
      'Runs six concurrent asyncio tasks with Docker deployment, health checks, and systemd integration.',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/lbelt567/Polymarket_Sentinal',
  },
  {
    slug: 'tauroi-technologies',
    title: 'Tauroi Technologies',
    subtitle: 'Harvey Mudd Clinic Project: financial market research and trading signals',
    heroImage: '/images/profile-research.webp',
    type: 'Financial research / Clinic project',
    dateRange: 'September 2024 – May 2025',
    problem: 'Identifying patterns in Alternative Trading System activity requires high-frequency financial data, access to non-traditional datasets, and an efficient way to collect, store, and explore historical observations.',
    solution: 'Designed and engineered a predictive model to identify ATS activity patterns and generate real-time trading signals for short-term strategies. Developed an application that downloads and aggregates financial data from Interactive Brokers into SQLite, with compressed historical storage and a modular command-line filtering tool.',
    stack: ['Predictive modeling', 'High-frequency market data', 'Interactive Brokers', 'SQLite', 'Data compression', 'Command-line tools'],
    stackNodes: [],
    metrics: [{ label: 'Research focus', value: 'ATS activity' }, { label: 'Data collection', value: 'Interactive Brokers' }, { label: 'Storage', value: 'SQLite' }],
    outcomes: [
      'Engineered a predictive model using high-frequency financial market data to identify ATS patterns and generate real-time signals.',
      'Identified and evaluated non-traditional datasets for short-term trading strategies.',
      'Built an application to download and aggregate Interactive Brokers data into SQLite for the trading platform.',
      'Applied compression for historical storage and created a modular command-line tool for filtering historical data.',
    ],
    liveUrl: null,
    githubUrl: null,
  },
  {
    slug: "ai-tool-recommender",
    title: "AI Tool Recommender",
    subtitle: "Semantic Search Engine for 4,000+ AI Tools",
    heroImage: "/images/aitoolrecupdated.webp",
    type: "AI / Full Stack",
    dateRange: "July 2025 – Present",
    problem:
      "The AI tools landscape has exploded to thousands of products across hundreds of categories. Searching for the right tool for a specific use case required hours of manual research across scattered review sites with no semantic understanding of user intent.",
    solution:
      "Built a Flask REST API with FAISS vector search and OpenAI embeddings over a scraped dataset of 4,000+ AI tools. LLM-generated summaries enable natural language queries that return highly relevant ranked recommendations.",
    stack: ["Python", "Flask", "FAISS", "OpenAI", "REST API", "Web Scraping"],
    stackNodes: [
      { id: "python", label: "Python", category: "language" },
      { id: "flask", label: "Flask", category: "framework" },
      { id: "faiss", label: "FAISS", category: "framework" },
      { id: "openai", label: "OpenAI", category: "service" },
    ],
    metrics: [
      { label: "Tools Indexed", value: "4,000+" },
      { label: "Research Time Saved", value: "80%" },
      { label: "Search Method", value: "Vector / Semantic" },
    ],
    outcomes: [
      "Reduced user research time by 80% via semantic vector-based search",
      "Scraped and structured metadata for 4,000+ AI tools programmatically",
      "LLM-generated summaries enable intelligent, context-aware recommendations",
      "Built end-to-end from data pipeline to deployed REST API",
    ],
    liveUrl: "https://aitoolrec.com",
    githubUrl: null,
  },
  {
    slug: "leather-corral",
    title: "Leather Corral",
    subtitle: "E-Commerce Transformation for a Family Upholstery Business",
    heroImage: "/images/leathercorralframer.webp",
    type: "E-Commerce / Full Stack",
    dateRange: 'May 2025 – May 2026',
    problem: 'The family upholstery business needed a stronger digital presence and a competitive product sourcing strategy to grow its customer base and revenue.',
    solution: 'Built and launched the WordPress website, paired digital advertising with SEO, and developed a go-to-market strategy around sourcing from international manufacturers. Managed supplier relationships, product onboarding, and logistics.',
    stack: ['WordPress', 'SEO', 'Digital advertising', 'Product sourcing', 'Supply chain & logistics'],
    stackNodes: [],
    metrics: [{ label: 'Year-to-date revenue growth', value: '25%' }, { label: 'New customers', value: '30+' }, { label: 'SKUs sourced & onboarded', value: '200+' }],
    outcomes: [
      'Grew revenue by 25% year-to-date through international sourcing and competitive pricing.',
      'Built and launched the WordPress website, acquiring 30+ new customers through digital advertising and SEO.',
      'Sourced and onboarded 200+ SKUs by identifying high-demand opportunities.',
      'Managed international supplier relationships and coordinated logistics.',
    ],
    liveUrl: 'https://wholesale.leathercorral.com/',
    liveNote: 'The current live site is built in Framer. I’m upgrading the e-commerce site.',
    githubUrl: null,
  },
  {
    slug: "fintech-pipeline",
    title: "Fintech Data Pipeline",
    subtitle: "High-Frequency Trading Data Infrastructure at Scale",
    heroImage: "/finance-data-pipeline.png",
    type: "Fintech / Data Engineering",
    dateRange: "2024 – Present",
    problem:
      "Building reliable ML workflows and trading signal models requires clean, consistent, high-volume market data. Existing solutions were expensive, fragmented, or didn't support the custom schema and query patterns needed for quantitative research.",
    solution:
      "Designed a modular, cloud-native data pipeline using DuckDB on Parquet files stored in GCS/S3, with Supabase PostgreSQL for metadata tracking, and GitHub Actions for automated daily ingestion. Handles terabytes of market data with SQL-native analytics.",
    stack: ["Python", "DuckDB", "Parquet", "GCS", "GitHub Actions", "Supabase", "PostgreSQL"],
    stackNodes: [
      { id: "python", label: "Python", category: "language" },
      { id: "duckdb", label: "DuckDB", category: "framework" },
      { id: "parquet", label: "Parquet", category: "tool" },
      { id: "gcs", label: "GCS/S3", category: "infra" },
      { id: "ghactions", label: "GitHub Actions", category: "infra" },
      { id: "supabase", label: "Supabase", category: "service" },
    ],
    metrics: [
      { label: "Data Scale", value: "1TB+ Parquet" },
      { label: "Ingestion", value: "Daily Automated" },
      { label: "Query Engine", value: "DuckDB on Cloud" },
    ],
    outcomes: [
      "PostgreSQL (Supabase) tracks all pipeline runs, tickers, and job statuses",
      "GitHub Actions automate daily data ingestion with zero manual intervention",
      "DuckDB enables real-time SQL queries directly on 1TB+ cloud Parquet files",
      "Modular design supports multiple data sources and downstream ML workflows",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/lbelt567/TradingData",
  },
]

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug)
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}
