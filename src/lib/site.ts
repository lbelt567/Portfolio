export const projectSummaries: Record<string, string> = {
  'steadyfollow': 'A bilingual follow-up automation service for local trade and supply businesses. I built the brand, marketing site, and a reusable CRM that sends personal follow-up emails, schedules call reminders with AI-written scripts, and flags large accounts that go quiet.',
  'polymarket-sentinel': 'Live monitoring for 200+ prediction markets, with a four-stage AI agent pipeline and explicit risk controls.',
  'tauroi-technologies': 'High-frequency market research, ATS activity modeling, and a data collection tool built for the Harvey Mudd Clinic.',
  'ai-tool-recommender': 'Finding the right AI tool through semantic search across a catalog of more than 4,000 tools.',
  'leather-corral': 'A storefront and sourcing strategy that grew revenue by 25% year-to-date. The current site is on Framer, with an e-commerce upgrade in progress.',
  'fintech-pipeline': 'Turning 1TB+ of market data into a queryable foundation for quantitative research and machine learning.',
}

export const experiments = [
  { name: 'Polymarket Sentinel', status: 'Active', description: 'Real-time monitoring for 200+ prediction markets, a multi-timeframe waterfall detector, and a four-stage AI agent trading pipeline with execution and risk controls.', stack: ['Python', 'asyncio', 'WebSocket', 'SQLite', 'Parquet', 'DuckDB', 'Docker'], url: 'https://github.com/lbelt567/Polymarket_Sentinal' },
  { name: 'LLM Trading Signal Generator', status: 'Research', description: 'Using Claude to synthesize macro news, earnings transcripts, and technical indicators.', stack: ['Claude API', 'DuckDB', 'Python'], url: null },
  { name: 'Fintech Data Pipeline', status: 'Active', description: 'Automated daily ingestion of market data into cloud Parquet files. 1TB+ queryable via DuckDB.', stack: ['Python', 'GitHub Actions', 'GCS', 'DuckDB'], url: 'https://github.com/lbelt567/TradingData' },
  { name: 'AI Tool Recommender', status: 'Planning', description: 'Extending the recommender with user sessions, saved tools, and personalized ranking.', stack: ['Flask', 'FAISS', 'OpenAI'], url: 'https://aitoolrec.com' },
]
