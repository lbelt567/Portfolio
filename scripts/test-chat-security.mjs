import assert from "node:assert/strict"
import { readFile, writeFile, mkdir, rm } from "node:fs/promises"
import { pathToFileURL } from "node:url"
import path from "node:path"
import ts from "typescript"

// Load the actual handler without running Astro or contacting Anthropic.
const root = process.cwd()
const cache = path.join(root, "node_modules/.cache/portfolio-security")
await mkdir(cache, { recursive: true })
const target = path.join(cache, "route.mjs")
const contextModules = ['profile', 'experience', 'projects', 'resume-context']
for (const name of contextModules) {
  const source = await readFile(`src/lib/${name}.ts`, 'utf8')
  let compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
  for (const dependency of contextModules) compiled = compiled.replaceAll(`"./${dependency}"`, `"./${dependency}.mjs"`).replaceAll(`'./${dependency}'`, `'./${dependency}.mjs'`)
  await writeFile(path.join(cache, `${name}.mjs`), compiled)
}
const source = (await readFile("src/lib/chat.ts", "utf8"))
  .replace("./resume-context", "./resume-context.mjs")
await writeFile(target, ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText)

const previousKey = process.env.ANTHROPIC_API_KEY
delete process.env.ANTHROPIC_API_KEY
try {
  const { POST } = await import(pathToFileURL(target).href)
  const user = { id: "1", role: "user", parts: [{ type: "text", text: "Tell me about Luis." }] }
  const cases = [
    ["valid request without a configured key", { messages: [user] }, {}, 503],
    ["foreign origin", { messages: [user] }, { origin: "https://untrusted.example" }, 403],
    ["missing origin", { messages: [user] }, { origin: null }, 403],
    ["wrong content type", { messages: [user] }, { "content-type": "text/plain" }, 415],
    ["malformed JSON", "{", {}, 400],
    ["null body", "null", {}, 400],
    ["empty conversation", { messages: [] }, {}, 400],
    ["too many messages", { messages: Array(21).fill(user) }, {}, 400],
    ["system role injection", { messages: [{ ...user, role: "system" }] }, {}, 400],
    ["remote file attachment", { messages: [{ ...user, parts: [{ type: "file", url: "http://127.0.0.1/private", mediaType: "text/plain" }] }] }, {}, 400],
    ["oversized message", { messages: [{ ...user, parts: [{ type: "text", text: "x".repeat(4001) }] }] }, {}, 400],
    ["assistant as final message", { messages: [{ ...user, role: "assistant" }] }, {}, 400],
    ["oversized body without content-length", " ".repeat(32769), {}, 413],
    ["oversized body with dishonest content-length", " ".repeat(32769), { "content-length": "1" }, 413],
  ]
  for (const [name, body, overrides, status] of cases) {
    const headers = new Headers({ origin: "https://portfolio.example", "content-type": "application/json" })
    for (const [key, value] of Object.entries(overrides)) {
      if (value === null) headers.delete(key)
      else headers.set(key, value)
    }
    const response = await POST(new Request("https://portfolio.example/api/chat", {
      method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body),
    }))
    assert.equal(response.status, status, name)
    assert.equal(response.headers.get("cache-control"), "no-store", name)
    console.log(`PASS ${name}`)
  }
} finally {
  if (previousKey === undefined) delete process.env.ANTHROPIC_API_KEY
  else process.env.ANTHROPIC_API_KEY = previousKey
  await rm(target, { force: true })
  for (const name of contextModules) await rm(path.join(cache, `${name}.mjs`), { force: true })
}
