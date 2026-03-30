"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { CaseStudy } from "@/types/project"
import Link from "next/link"

interface CaseStudyHeroProps {
  project: CaseStudy
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div ref={ref} className="relative h-[50vh] min-h-[360px] overflow-hidden rounded-2xl mb-16">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-amber transition-colors mb-4 inline-block">
          ← Back
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-mono text-amber uppercase tracking-widest border border-amber/30 px-2 py-0.5 rounded">
            {project.type}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">{project.dateRange}</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground">{project.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{project.subtitle}</p>
      </div>
    </div>
  )
}
