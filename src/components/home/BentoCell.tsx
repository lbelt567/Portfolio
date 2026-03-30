import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"

type CellSize = "1x1" | "2x1" | "3x1" | "4x1" | "4x2" | "5x2" | "7x1" | "8x1" | "12x1" | "full"

const sizeMap: Record<CellSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "3x1": "col-span-3 row-span-1",
  "4x1": "col-span-4 row-span-1",
  "4x2": "col-span-4 row-span-2",
  "5x2": "col-span-5 row-span-2",
  "7x1": "col-span-7 row-span-1",
  "8x1": "col-span-8 row-span-1",
  "12x1": "col-span-12 row-span-1",
  full: "col-span-full row-span-1",
}

type CellVariant = "default" | "dark" | "accent" | "muted" | "image"

const variantMap: Record<CellVariant, string> = {
  default: "bg-card border border-border",
  dark: "bg-[#050505] border border-white/6",
  accent: "bg-amber/10 border border-amber/20",
  muted: "bg-surface-raised border border-border",
  image: "border border-border overflow-hidden",
}

interface BentoCellProps {
  size: CellSize
  variant?: CellVariant
  href?: string
  className?: string
  children: React.ReactNode
}

export default function BentoCell({
  size,
  variant = "default",
  href,
  className,
  children,
}: BentoCellProps) {
  const base = cn(
    "rounded-xl relative",
    sizeMap[size],
    variantMap[variant],
    href && "cursor-pointer transition-all duration-200 hover:border-amber/40 hover:bg-white/[0.03]",
    className
  )

  const inner = <div className="h-full w-full p-5">{children}</div>

  if (href) {
    return (
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={base}>
        <Link href={href} className="block h-full w-full">
          {inner}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={base}>
      {inner}
    </motion.div>
  )
}
