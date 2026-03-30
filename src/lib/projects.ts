import { CaseStudy } from "@/types/project"

export const projects: CaseStudy[] = [
  {
    slug: "leather-corral",
    title: "Leather Corral",
    subtitle: "E-Commerce Transformation for a Family Upholstery Business",
    heroImage: "/leather-corral.png",
    type: "E-Commerce / Full Stack",
    dateRange: "2024 – Present",
    problem:
      "A 30-year-old family upholstery business had zero online sales presence and was leaving significant revenue on the table. All orders came through phone and in-person only, with no scalable way to reach customers outside the local area.",
    solution:
      "Built a full e-commerce platform with 4,000+ SKU migration, professional product photography workflow, Stripe payment integration, and targeted SEO strategy to drive organic traffic and enable 24/7 online sales.",
    stack: ["JavaScript", "HTML/CSS", "Stripe", "SEO", "Canva", "Google Analytics"],
    stackNodes: [
      { id: "js", label: "JavaScript", category: "language" },
      { id: "html", label: "HTML/CSS", category: "language" },
      { id: "stripe", label: "Stripe", category: "service" },
      { id: "seo", label: "SEO", category: "tool" },
      { id: "canva", label: "Canva", category: "tool" },
    ],
    metrics: [
      { label: "SKUs Migrated", value: "4,000+" },
      { label: "Sales Channel", value: "24/7 Online" },
      { label: "Payment Processor", value: "Stripe" },
    ],
    outcomes: [
      "Migrated and optimized 4,000+ product SKUs with professional listings",
      "Integrated Stripe payments and full shipping logistics workflow",
      "Applied SEO best practices that drove measurable organic traffic growth",
      "Transformed business from local-only to nationwide online reach",
    ],
    liveUrl: "https://leathercorralinc.com",
    githubUrl: null,
  },
  {
    slug: "ai-tool-recommender",
    title: "AI Tool Recommender",
    subtitle: "Semantic Search Engine for 4,000+ AI Tools",
    heroImage: "/ai-tool-recommender.png",
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
