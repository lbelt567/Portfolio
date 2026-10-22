import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { LUIS_CONTEXT } from "./resume-context"

const MAX_BODY_BYTES = 32_768

function error(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } })
}

export async function POST(req: Request) {
  // Browser-origin protection is not a substitute for distributed rate limits.
  if (req.headers.get("origin") !== new URL(req.url).origin) {
    return error("This request must come from the portfolio website.", 403)
  }
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return error("Expected JSON.", 415)
  }

  const reader = req.body?.getReader()
  if (!reader) return error("A message is required.", 400)

  // Limit actual bytes, including requests without a Content-Length header.
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        return error("Conversation is too large. Please start a new chat.", 413)
      }
      chunks.push(value)
    }
  } catch {
    return error("Unable to read the request.", 400)
  } finally {
    reader.releaseLock()
  }

  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  let body
  try {
    body = JSON.parse(new TextDecoder().decode(bytes))
  } catch {
    return error("Invalid JSON.", 400)
  }

  if (!body || !Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 20) {
    return error("Send between 1 and 20 messages.", 400)
  }

  const uiMessages: UIMessage[] = []
  for (const message of body.messages) {
    if (!message || typeof message.id !== "string" || message.id.length > 128 ||
        !["user", "assistant"].includes(message.role) ||
        !Array.isArray(message.parts) || message.parts.length < 1 || message.parts.length > 10) {
      return error("Invalid message.", 400)
    }
    const parts: { type: "text"; text: string }[] = []
    for (const part of message.parts) {
      // No files, remote URLs, tool calls, or client-supplied system messages.
      if (!part || part.type !== "text" || typeof part.text !== "string" ||
          !part.text.trim() || part.text.length > 4000) {
        return error("Only text messages of up to 4,000 characters are supported.", 400)
      }
      parts.push({ type: "text", text: part.text })
    }
    uiMessages.push({ id: message.id, role: message.role, parts })
  }
  if (uiMessages.at(-1)?.role !== "user") return error("End with a user message.", 400)

  if (!process.env.ANTHROPIC_API_KEY) {
    return error("Chat is temporarily unavailable. Please contact Luis by email.", 503)
  }

  // Convert UIMessages to model-compatible messages
  const messages = await convertToModelMessages(uiMessages)

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    maxOutputTokens: 512,
    maxRetries: 0,
    abortSignal: AbortSignal.any([req.signal, AbortSignal.timeout(25_000)]),
    system: `You are an AI assistant for Luis Beltran Jr.'s portfolio website.
You answer questions about his experience, projects, skills, and background.
Use only the verified context below — do not fabricate or guess details.
Be specific: cite real metrics, company names, project names, and tech stacks.
Keep answers concise (2-4 sentences) unless the visitor explicitly asks for more detail.
If asked something outside Luis's professional background, politely redirect.

--- CONTEXT ---
${LUIS_CONTEXT}
--- END CONTEXT ---`,
    messages,
  })

  return result.toTextStreamResponse({ headers: { "Cache-Control": "no-store" } })
}
