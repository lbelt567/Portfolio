import { readFile, writeFile } from 'node:fs/promises'

// Vercel's adapter currently exports only CSP through staticHeaders. Copy the
// complete policy into Build Output so static pages and assets receive it too.
const source = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
const outputUrl = new URL('../.vercel/output/config.json', import.meta.url)
const output = JSON.parse(await readFile(outputUrl, 'utf8'))
const policy = source.headers.find(rule => rule.source === '/(.*)')
if (!policy || output.version !== 3 || !Array.isArray(output.routes)) {
  throw new Error('Cannot apply the portfolio security policy to Vercel Build Output.')
}
const route = { src: '^/.*$', headers: Object.fromEntries(policy.headers.map(({ key, value }) => [key, value])), continue: true }
output.routes = [route, ...output.routes.filter(item => !(item.src === route.src && item.continue && item.headers?.['X-Frame-Options']))]
await writeFile(outputUrl, JSON.stringify(output, null, 2) + '\n')
console.log('Applied global security headers to Vercel Build Output.')
