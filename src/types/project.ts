export interface StackNode {
  id: string
  label: string
  category: "language" | "framework" | "infra" | "service" | "tool"
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  heroImage: string
  imageAlt?: string
  type: string
  dateRange: string
  problem: string
  solution: string
  sections?: { title: string; description?: string; items?: string[] }[]
  stack: string[]
  stackNodes: StackNode[]
  metrics: ProjectMetric[]
  outcomes: string[]
  liveUrl: string | null
  liveNote?: string
  githubUrl: string | null
}
