import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ExperienceTimeline from "@/components/experience/ExperienceTimeline"
import { education } from "@/lib/experience"
import ChatWidget from "@/components/chat/ChatWidget"

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history and education — Salesforce, Bank of America, Ernst & Young, USC Viterbi, CMC.",
}

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 max-w-4xl mx-auto px-6 pb-24">
        <div className="mb-16">
          <p className="text-[11px] font-mono text-amber uppercase tracking-widest mb-3">Career</p>
          <h1 className="font-display font-bold text-5xl text-foreground mb-4">Experience</h1>
          <p className="text-lg text-muted-foreground">
            Engineering roles at enterprise companies, from banking infrastructure to AI platforms.
          </p>
        </div>

        <ExperienceTimeline />

        {/* Education */}
        <div className="mt-20">
          <p className="text-[11px] font-mono text-amber uppercase tracking-widest mb-8">Education</p>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu.school} className="bg-card border border-border rounded-xl p-6 hover:border-amber/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
                    <span className="text-amber text-xs font-display font-bold">{edu.logoInitials}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{edu.school}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{edu.degree}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-mono text-amber">GPA {edu.gpa}</span>
                      <span className="text-xs text-muted-foreground font-mono">{edu.dateRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
