import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://www.luisbeltranjr.com',
  output: 'static',
  adapter: vercel({ maxDuration: 30 }),
  devToolbar: { enabled: false },
  server: { port: 4321 },
})
