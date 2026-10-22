import type { PortfolioEntry } from '../lib/portfolio'
const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')
const header = document.querySelector<HTMLElement>('.site-header')
const nav = document.querySelector<HTMLElement>('#navigation')
if (menu && header && nav) {
  menu.hidden = false
  header.classList.add('menu-ready')
  const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu' }
  menu.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open')
    nav.classList.toggle('is-open', open)
    menu.setAttribute('aria-expanded', String(open))
    menu.textContent = open ? 'Close' : 'Menu'
  })
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu))
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus() } })
  document.addEventListener('click', event => { if (!header.contains(event.target as Node)) closeMenu() })
}

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-entering')
      observer.unobserve(entry.target)
    }
  }, { threshold: .12 })
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
}

const data = document.querySelector<HTMLScriptElement>('#project-data')
if (data?.textContent) {
  const projects: PortfolioEntry[] = JSON.parse(data.textContent)
  const options = document.querySelector<HTMLElement>('.project-options')
  const image = document.querySelector<HTMLImageElement>('#preview-image')
  const link = document.querySelector<HTMLAnchorElement>('#preview-link')
  const caption = document.querySelector<HTMLElement>('#preview-caption')
  const date = document.querySelector<HTMLElement>('#preview-date')
  const stack = document.querySelector<HTMLElement>('#preview-stack')
  if (options && image && link && caption && date && stack) {
    options.classList.add('interactive')
    const buttons = options.querySelectorAll<HTMLButtonElement>('.project-select')
    for (const button of buttons) {
      button.hidden = false
      button.addEventListener('click', () => {
        const project = projects.find(item => item.slug === button.dataset.preview)
        if (!project) return
        buttons.forEach(item => { const selected = item === button; item.setAttribute('aria-pressed', String(selected)); item.closest('.project-option')?.classList.toggle('selected', selected) })
        const textPreview = document.querySelector<HTMLElement>('#preview-text')
        const previewTitle = document.querySelector<HTMLElement>('#preview-title')
        const previewDescription = document.querySelector<HTMLElement>('#preview-description')
        const previewAction = document.querySelector<HTMLAnchorElement>('#preview-action')
        link.hidden = !project.image
        if (textPreview) textPreview.hidden = !!project.image
        if (project.image) image.src = project.image
        image.alt = `${project.title} project preview`
        link.href = project.href
        link.target = project.external ? '_blank' : '_self'
        link.rel = project.external ? 'noopener noreferrer' : ''
        link.setAttribute('aria-label', `${project.action}: ${project.title}`)
        if (previewTitle) previewTitle.textContent = project.title
        if (previewDescription) previewDescription.textContent = project.description
        if (previewAction) {
          previewAction.href = project.href
          previewAction.textContent = project.action
          previewAction.target = project.external ? '_blank' : '_self'
          previewAction.rel = project.external ? 'noopener noreferrer' : ''
        }
        caption.textContent = project.subtitle
        date.textContent = project.dateRange
        date.hidden = !project.dateRange
        stack.hidden = project.stack.length === 0
        stack.replaceChildren(...project.stack.slice(0, 4).map(item => { const span = document.createElement('span'); span.textContent = item; return span }))
        if (matchMedia('(max-width: 650px)').matches) document.querySelector('#project-preview')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) image.animate([{ opacity: .5 }, { opacity: 1 }], { duration: 300 })
      })
    }
  }
}
