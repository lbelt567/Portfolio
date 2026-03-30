"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@ai-sdk/react"
import { TextStreamChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const transport = new TextStreamChatTransport({ api: "/api/chat" })

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const { messages, sendMessage, status } = useChat({ transport })
  const isLoading = status === "submitted" || status === "streaming"

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  function handleSuggestion(q: string) {
    sendMessage({ text: q })
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-amber text-background shadow-lg shadow-amber/25 hover:bg-amber-bright transition-colors"
        aria-label="Chat with my experience"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap">Ask about me</span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              style={{ maxHeight: "520px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">Chat with my experience</p>
                  <p className="text-[11px] text-muted-foreground">Ask about skills, projects, or background</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close chat"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 px-5 py-4">
                {messages.length === 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-4">Try asking:</p>
                    {[
                      "What did Luis do at Salesforce?",
                      "Tell me about the fintech pipeline",
                      "What's his strongest tech stack?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestion(q)}
                        className="block w-full text-left text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 px-3 py-2 rounded-lg transition-colors border border-border"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] text-sm px-3 py-2 rounded-xl leading-relaxed ${
                            msg.role === "user"
                              ? "bg-amber text-background font-medium"
                              : "bg-surface-raised text-foreground border border-border"
                          }`}
                        >
                          {msg.parts?.map((part, i) =>
                            part.type === "text" ? <span key={i}>{part.text}</span> : null
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-surface-raised border border-border px-3 py-2 rounded-xl">
                          <div className="flex gap-1 items-center">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border shrink-0">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-amber text-background hover:bg-amber-bright h-8 w-8 p-0 shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
