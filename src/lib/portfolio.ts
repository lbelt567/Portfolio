import { projects } from './projects'
import { ventures } from './experience'
import { projectSummaries } from './site'
import { projectImage } from './project-media'

export interface PortfolioEntry {
  slug: string
  title: string
  type: string
  description: string
  subtitle: string
  image: string | null
  imageAlt?: string
  href: string
  liveUrl: string | null
  external: boolean
  action: string
  dateRange: string
  stack: string[]
}

export const portfolio: PortfolioEntry[] = [
  ...projects.map(project => ({
    slug: project.slug,
    title: project.title,
    type: project.type.replace(' / ', ' & '),
    description: projectSummaries[project.slug],
    subtitle: project.subtitle,
    image: projectImage(project.heroImage),
    imageAlt: project.imageAlt,
    href: `/projects/${project.slug}`,
    liveUrl: project.liveUrl,
    external: false,
    action: 'Read case study',
    dateRange: project.dateRange,
    stack: project.stack.slice(0, 4),
  })),
  ...ventures.map(venture => ({
    slug: venture.slug,
    type: venture.kind,
    image: venture.heroImage,
    title: venture.name,
    description: venture.description,
    subtitle: venture.description,
    href: venture.url,
    liveUrl: null,
    external: true,
    action: 'Visit website',
    dateRange: venture.revenue ? `Reported revenue: ${venture.revenue}` : '',
    stack: [],
  })),
]
