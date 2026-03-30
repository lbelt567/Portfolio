"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
  size?: "sm" | "lg"
}

export default function StatCounter({ value, suffix = "", label, size = "lg" }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-full gap-1 text-center">
      <div className={`font-display font-bold text-amber leading-none ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}
