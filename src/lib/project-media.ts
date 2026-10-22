export function projectImage(source: string): string {
  if (source.startsWith('/images/')) return source
  return `/images/${source.split('/').at(-1)?.replace(/\.png$/, '.webp')}`
}
