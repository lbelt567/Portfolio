import type { APIRoute } from 'astro'
import { POST as handleChat } from '../../lib/chat'

export const prerender = false
export const POST: APIRoute = ({ request }) => handleChat(request)
