"use client"

import { motion } from "framer-motion"
import { workHistory } from "@/lib/experience"
import TimelineItem from "./TimelineItem"

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[1.75rem] top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="flex flex-col gap-12">
        {workHistory.map((role, i) => (
          <TimelineItem key={role.company} role={role} index={i} />
        ))}
      </div>
    </div>
  )
}
