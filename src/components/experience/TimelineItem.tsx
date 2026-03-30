"use client"

import { motion } from "framer-motion"
import { WorkRole } from "@/lib/experience"

interface TimelineItemProps {
  role: WorkRole
  index: number
}

export default function TimelineItem({ role, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex gap-6"
    >
      {/* Dot */}
      <div className="relative shrink-0 hidden md:flex items-start pt-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display font-bold z-10"
          style={{
            backgroundColor: role.logoColor,
            color: role.logoColor === "#FFE600" ? "#000" : "#fff",
          }}
        >
          {role.logoInitials}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-card border border-border rounded-xl p-6 hover:border-amber/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">{role.title}</h3>
            <p className="text-amber font-semibold text-sm">{role.company}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm text-muted-foreground font-mono">{role.dateRange}</p>
            <p className="text-xs text-muted-foreground">{role.location}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {role.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/80">
              <span className="text-amber mt-1 shrink-0">›</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-1 bg-white/5 border border-white/8 rounded text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
