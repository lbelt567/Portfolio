"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import BentoCell from "./BentoCell"
import HeroTerminal from "./HeroTerminal"
import StatCounter from "./StatCounter"
import { projects } from "@/lib/projects"
import { skills } from "@/lib/experience"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function BentoGrid() {
  const topSkills = skills["Frameworks & Tools"].slice(0, 8)

  return (
    <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-12 auto-rows-[120px] gap-3"
      >
        {/* ── ROW 1-2: Terminal (5×2) ── */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 md:col-span-5 row-span-2 rounded-xl bg-[#050505] border border-white/6 overflow-hidden"
        >
          <HeroTerminal />
        </motion.div>

        {/* Available badge (4×1) */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 md:col-span-4 row-span-1 rounded-xl bg-card border border-border flex items-center px-5 gap-3"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="status-dot absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-terminal" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Available nationwide</p>
            <p className="text-xs text-muted-foreground">Open to opportunities in 2026</p>
          </div>
        </motion.div>

        {/* Years exp (3×1) */}
        <motion.div
          variants={itemVariants}
          className="col-span-6 md:col-span-3 row-span-1 rounded-xl bg-card border border-border"
        >
          <StatCounter value={3} suffix="+" label="Years Exp" />
        </motion.div>

        {/* Projects stat (4×1) */}
        <motion.div
          variants={itemVariants}
          className="col-span-6 md:col-span-4 row-span-1 rounded-xl bg-card border border-border flex items-center justify-around px-4"
        >
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-amber">5+</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Projects</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-amber">3</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Companies</div>
          </div>
        </motion.div>

        {/* USC badge (3×1) */}
        <motion.div
          variants={itemVariants}
          className="col-span-6 md:col-span-3 row-span-1 rounded-xl bg-amber/10 border border-amber/20 flex items-center px-5 gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-amber flex items-center justify-center shrink-0">
            <span className="text-background text-xs font-display font-bold">USC</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">M.S. AI</p>
            <p className="text-xs text-muted-foreground">GPA 3.9 · Viterbi</p>
          </div>
        </motion.div>

        {/* ── ROW 3-4: Project cards (4×2 each) ── */}
        {projects.slice(0, 2).map((project) => (
          <motion.div
            key={project.slug}
            variants={itemVariants}
            className="col-span-12 md:col-span-4 row-span-2 rounded-xl border border-border overflow-hidden relative group cursor-pointer"
          >
            <Link href={`/projects/${project.slug}`} className="relative block h-full">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[10px] font-mono text-amber uppercase tracking-widest">{project.type}</span>
                <h3 className="font-display font-bold text-base text-foreground mt-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.subtitle}</p>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* What I'm building (4×1) */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 md:col-span-4 row-span-1 rounded-xl bg-card border border-border px-5 py-4"
        >
          <p className="text-[10px] font-mono text-amber uppercase tracking-widest mb-2">Currently Building</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Quant trading signals · AI recommendation systems · Client AI automations
          </p>
        </motion.div>

        {/* Top skills (4×1) */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 md:col-span-4 row-span-1 rounded-xl bg-card border border-border px-5 py-4 flex flex-wrap gap-1.5 items-start content-start"
        >
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/8 rounded text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* ── ROW 5: Company logos ── */}
        {[
          { name: "Salesforce", role: "SWE Intern", color: "#00A1E0", initials: "SF" },
          { name: "Bank of America", role: "SWE Intern", color: "#E31837", initials: "BA" },
          { name: "Ernst & Young", role: "Tech Consulting", color: "#FFE600", initials: "EY" },
        ].map((company) => (
          <motion.div
            key={company.name}
            variants={itemVariants}
            className="col-span-6 md:col-span-3 row-span-1 rounded-xl bg-card border border-border flex items-center gap-3 px-5"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-display font-bold"
              style={{ backgroundColor: company.color, color: company.color === "#FFE600" ? "#000" : "#fff" }}
            >
              {company.initials}
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground truncate">{company.name}</p>
              <p className="text-[10px] text-muted-foreground">{company.role}</p>
            </div>
          </motion.div>
        ))}

        <motion.div
          variants={itemVariants}
          className="col-span-12 md:col-span-3 row-span-1 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center"
        >
          <Link href="/experience" className="text-sm font-semibold text-amber hover:text-amber-bright transition-colors flex items-center gap-2">
            Full experience <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* ── ROW 6: Ventures strip ── */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 row-span-1 rounded-xl bg-[#050505] border border-white/6 flex items-center gap-6 px-6 overflow-x-auto"
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest shrink-0">Ventures</span>
          <div className="w-px h-6 bg-border shrink-0" />
          {[
            { name: "Genius Home Finds", rev: "$2k+/mo", url: "https://geniushomefinds.com" },
            { name: "Curated Balance", rev: "$1k+/mo", url: "https://curatedbalance.com" },
            { name: "The Snatched House", rev: null, url: "https://thesnattchedhouse.com" },
            { name: "Leather Corral Inc.", rev: "Live store", url: "https://leathercorralinc.com" },
          ].map((v) => (
            <a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 shrink-0 group"
            >
              <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {v.name}
              </span>
              {v.rev && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-terminal/10 text-terminal border border-terminal/20">
                  {v.rev}
                </span>
              )}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
