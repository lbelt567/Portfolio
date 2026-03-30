"use client"

import { useEffect, useState } from "react"

const commands = [
  "python pipeline/ingest.py --ticker AAPL --source polygon",
  'duckdb query "SELECT ticker, close FROM parquet_scan(\'gs://...\')"',
  "flask run --host=0.0.0.0 --port=5000",
  "git push origin main  # deploy to Hyperforce staging",
  "faiss.IndexFlatL2(1536)  # embedding search over 4k tools",
]

const history = [
  { prompt: "~", cmd: "cd projects/TradingData", output: null },
  { prompt: "~/projects/TradingData", cmd: "git log --oneline -3", output: [
    "a3f2c91 add polygon websocket ingest for real-time ticks",
    "b8e1d04 optimize duckdb queries on parquet partitions",
    "c7a9f12 supabase schema: pipeline_runs table",
  ]},
]

export default function HeroTerminal() {
  const [displayedCmd, setDisplayedCmd] = useState("")
  const [cmdIndex, setCmdIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = commands[cmdIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setDisplayedCmd(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        }, 45)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedCmd(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        }, 22)
      } else {
        setIsDeleting(false)
        setCmdIndex((i) => (i + 1) % commands.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, cmdIndex, isDeleting])

  return (
    <div className="h-full w-full bg-[#050505] rounded-xl border border-white/8 overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[#0a0a0a] shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-muted-foreground text-[11px]">luis — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col gap-2 text-[11px] leading-relaxed">
        {history.map((item, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span className="text-terminal shrink-0">{item.prompt} $</span>
              <span className="text-foreground/80">{item.cmd}</span>
            </div>
            {item.output && (
              <div className="pl-0 mt-0.5">
                {item.output.map((line, j) => (
                  <div key={j} className="text-muted-foreground">{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Live typing line */}
        <div className="flex gap-2 items-center mt-1">
          <span className="text-amber shrink-0">~ $</span>
          <span className="text-foreground/90">{displayedCmd}</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  )
}
