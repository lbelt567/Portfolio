"use client"

import { motion } from "framer-motion"
import { skills } from "@/lib/experience"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SkillsGrid() {
  const categories = Object.entries(skills)

  return (
    <Tabs defaultValue={categories[0][0]} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto bg-card border border-border p-1 mb-8">
        {categories.map(([cat]) => (
          <TabsTrigger
            key={cat}
            value={cat}
            className="text-xs data-[state=active]:bg-amber data-[state=active]:text-background py-2"
          >
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map(([cat, items]) => (
        <TabsContent key={cat} value={cat}>
          <div className="flex flex-wrap gap-3">
            {items.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group px-4 py-2.5 bg-card border border-border rounded-xl font-mono text-sm text-foreground/80 hover:border-amber/40 hover:text-foreground hover:bg-amber/5 transition-all cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
