import { streamText, convertToModelMessages, UIMessage } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { LUIS_CONTEXT } from "@/lib/resume-context"

export const runtime = "edge"

export async function POST(req: Request) {
  const body = await req.json()
  // New @ai-sdk/react sends { messages: UIMessage[] }
  const uiMessages: UIMessage[] = body.messages ?? []

  // Convert UIMessages to model-compatible messages
  const messages = await convertToModelMessages(uiMessages)

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
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

  return result.toTextStreamResponse()
}
