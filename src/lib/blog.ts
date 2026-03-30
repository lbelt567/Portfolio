// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW BLOG POST
// 1. Copy one of the post objects below and paste it at the TOP of the array
//    (newest post first).
// 2. Fill in: slug, title, date, excerpt, tags, image (optional), and content.
// 3. For images: drop your image into /public/blog/ and set image: "/blog/your-image.jpg"
// 4. Content uses Markdown — use ## for headings, **bold**, - for bullet lists, etc.
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  date: string           // "YYYY-MM-DD"
  excerpt: string        // shown on the listing card
  tags: string[]
  image: string | null   // "/blog/filename.jpg" or null for gradient header
  content: string        // Markdown
}

export const posts: BlogPost[] = [
  {
    slug: "anthropic-13-free-ai-courses",
    title: "Anthropic Just Dropped 13 Free AI Courses — No Hype, No Paywall, No Fluff",
    date: "2026-03-30",
    excerpt:
      "Anthropic quietly released 13 free AI courses and they are actually good. No intro fluff, no upsell, just technical depth. I already completed Claude Code in Action and here's what stood out.",
    tags: ["AI", "Learning", "Anthropic", "Claude"],
    image: "/blog/anthropicacademy.png",
    content: `
## The Drop

Anthropic released 13 free courses on AI — and unlike most "free AI courses" floating around the internet, these are not 45-minute YouTube videos repackaged with a certificate at the end.

No paywall. No "enroll now to unlock the good stuff." No 30-minute intro module that could have been a README.

They go straight into it.

## What's in the Catalog

The courses cover a real range — from prompt engineering fundamentals to building production systems with the Claude API. A few that caught my attention:

- **Claude Code in Action** — hands-on with Claude as a coding agent inside real workflows
- **Building with the Claude API** — proper API usage, tool use, streaming, multi-turn conversations
- **Prompt Engineering** — not the fluff version; actual structured techniques with examples that show why they work

The depth surprised me. These aren't marketing materials dressed up as education.

## I Already Finished Claude Code in Action

This one was worth doing even if you've already been using Claude Code. A few things I picked up:

**The agentic loop matters more than the prompts.** Claude Code isn't just autocomplete — it's an agent that reads files, runs commands, edits code, and checks its own output. Understanding how to structure tasks around that loop (and when to interrupt it) made me significantly more effective.

**Hooks are underused.** You can attach shell commands to Claude Code events — before a tool runs, after an edit, on session start. I've started using this for things like auto-running tests after edits and enforcing project-specific conventions automatically.

**Context is everything.** A CLAUDE.md file in your repo tells the agent how the project is structured, what commands to use, and what patterns to follow. The difference between a session with a well-written CLAUDE.md and one without is massive.

## Why This Matters

Most AI education right now is either too surface-level (here's how to use ChatGPT for your emails) or locked behind expensive bootcamps. Anthropic publishing serious technical content for free and making it actually good is a meaningful move.

If you're building with AI in any capacity — engineer, researcher, founder — the Claude API course and the Claude Code one are worth your time.

I'll be working through the rest of the catalog and posting notes here as I go.
`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
