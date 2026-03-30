import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SkillsGrid from "@/components/stack/SkillsGrid"
import ChatWidget from "@/components/chat/ChatWidget"

export const metadata: Metadata = {
  title: "Stack",
  description: "Technologies and tools — Python, PyTorch, DuckDB, GCP, React, and more.",
}

export default function StackPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 max-w-4xl mx-auto px-6 pb-24">
        <div className="mb-16">
          <p className="text-[11px] font-mono text-amber uppercase tracking-widest mb-3">Technology</p>
          <h1 className="font-display font-bold text-5xl text-foreground mb-4">The Stack</h1>
          <p className="text-lg text-muted-foreground">
            Tools and technologies I use to build intelligent systems, data pipelines, and products.
          </p>
        </div>

        <SkillsGrid />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
