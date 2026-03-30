import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ChatWidget from "@/components/chat/ChatWidget"

export const metadata: Metadata = {
  title: "Lab",
  description: "Current experiments and works in progress.",
}

export default function LabPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 max-w-5xl mx-auto px-6 pb-24">
        <div className="mb-16">
          <p className="text-[11px] font-mono text-amber uppercase tracking-widest mb-3">In Progress</p>
          <h1 className="font-display font-bold text-5xl text-foreground mb-4">The Lab</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Active experiments and research projects — things being built right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              name: "Polymarket Sentiment Tracker",
              status: "In Progress",
              description: "Real-time prediction market sentiment correlated with asset price movements.",
              stack: ["Python", "Polymarket API", "DuckDB"],
              url: null,
            },
            {
              name: "LLM Trading Signal Generator",
              status: "Research",
              description: "Using Claude to synthesize macro news, earnings transcripts, and technical indicators.",
              stack: ["Claude API", "DuckDB", "Python"],
              url: null,
            },
            {
              name: "Fintech Data Pipeline",
              status: "Active",
              description: "Automated daily ingestion of market data into cloud Parquet files. 1TB+ queryable via DuckDB.",
              stack: ["Python", "GitHub Actions", "GCS", "DuckDB"],
              url: "https://github.com/lbelt567/TradingData",
            },
            {
              name: "AI Tool Recommender",
              status: "Planning",
              description: "Extending the recommender with user sessions, saved tools, and personalized ranking.",
              stack: ["Flask", "FAISS", "OpenAI"],
              url: "https://aitoolrec.com",
            },
          ].map((exp) => {
            const card = (
              <div className={`bg-card border border-border rounded-xl p-6 transition-colors h-full ${exp.url ? "hover:border-amber/40 cursor-pointer" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground">{exp.name}</h3>
                    {exp.url && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </div>
                  <span className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border ${
                    exp.status === "In Progress" || exp.status === "Active"
                      ? "bg-terminal/10 text-terminal border-terminal/20"
                      : "bg-amber/10 text-amber border-amber/20"
                  }`}>
                    {exp.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/8 rounded text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )

            return exp.url ? (
              <a key={exp.name} href={exp.url} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </a>
            ) : (
              <div key={exp.name}>{card}</div>
            )
          })}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
