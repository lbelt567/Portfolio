import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next()
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  }
  for (const [name, value] of Object.entries(headers)) response.headers.set(name, value)
  return response
})
