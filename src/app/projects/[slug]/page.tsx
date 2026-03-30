import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CaseStudyHero from "@/components/projects/CaseStudyHero"
import StackDiagram from "@/components/projects/StackDiagram"
import ChatWidget from "@/components/chat/ChatWidget"
import { projects, getProjectBySlug } from "@/lib/projects"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      images: [{ url: project.heroImage }],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <Navbar />
      <main className="pt-24 max-w-4xl mx-auto px-6 pb-24">
        <CaseStudyHero project={project} />

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 space-y-12">
            {/* Problem */}
            <section>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-3">
                <span className="text-[11px] font-mono text-amber uppercase tracking-widest">01</span>
                The Problem
              </h2>
              <p className="text-foreground/80 leading-relaxed">{project.problem}</p>
            </section>

            {/* Solution */}
            <section>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-3">
                <span className="text-[11px] font-mono text-amber uppercase tracking-widest">02</span>
                The Solution
              </h2>
              <p className="text-foreground/80 leading-relaxed">{project.solution}</p>
            </section>

            {/* Outcomes */}
            <section>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-3">
                <span className="text-[11px] font-mono text-amber uppercase tracking-widest">03</span>
                Outcomes
              </h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-3 text-foreground/80">
                    <span className="text-amber mt-1 shrink-0">›</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metrics */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">Key Numbers</p>
              <div className="space-y-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <span className="text-sm font-mono font-medium text-amber">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">Tech Stack</p>
              <StackDiagram nodes={project.stackNodes} />
            </div>

            {/* Links */}
            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-amber/10 border border-amber/20 rounded-xl text-sm font-semibold text-amber hover:bg-amber/20 transition-colors"
                >
                  <span>View Live Site</span>
                  <span aria-hidden>↗</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-card border border-border rounded-xl text-sm font-semibold text-foreground/80 hover:border-amber/30 hover:text-foreground transition-colors"
                >
                  <span>View on GitHub</span>
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
