import type { APIRoute } from 'astro'
import { projects } from '../lib/projects'
import { posts } from '../lib/blog'
export const GET: APIRoute = () => {
  const paths = ['/', '/experience', '/stack', '/lab', '/blog', ...projects.map(p => `/projects/${p.slug}`), ...posts.map(p => `/blog/${p.slug}`)]
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>https://www.luisbeltranjr.com${path}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } })
}
