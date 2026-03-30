"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/lab", label: "Lab" },
  { href: "/stack", label: "Stack" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <motion.nav
      style={{
        backgroundColor: scrolled ? "rgba(8, 8, 8, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg tracking-tight">
          <span className="text-amber">LBJ</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-amber bg-amber/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:luisbelt@usc.edu"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-amber text-background hover:bg-amber-bright transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                pathname === link.href
                  ? "text-amber bg-amber/10"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:luisbelt@usc.edu"
            className="mt-2 px-4 py-2 bg-amber text-background rounded-md text-sm font-semibold text-center"
          >
            Get in Touch
          </a>
        </div>
      )}
    </motion.nav>
  )
}
