"use client"

import { motion } from "framer-motion"
import { StackNode } from "@/types/project"

const categoryColors: Record<StackNode["category"], { bg: string; text: string; border: string }> = {
  language: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  framework: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  infra: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  service: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20" },
  tool: { bg: "bg-amber/10", text: "text-amber", border: "border-amber/20" },
}

interface StackDiagramProps {
  nodes: StackNode[]
}

export default function StackDiagram({ nodes }: StackDiagramProps) {
  const grouped = nodes.reduce((acc, node) => {
    if (!acc[node.category]) acc[node.category] = []
    acc[node.category].push(node)
    return acc
  }, {} as Record<string, StackNode[]>)

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([category, items], gi) => (
        <div key={category}>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">{category}</p>
          <div className="flex flex-wrap gap-2">
            {items.map((node, i) => {
              const colors = categoryColors[node.category]
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (gi * 3 + i) * 0.08, duration: 0.3 }}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-mono font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {node.label}
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
