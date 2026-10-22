import { profile } from '../lib/profile'
const dialog = document.querySelector<HTMLDialogElement>('#chat-dialog')
const form = document.querySelector<HTMLFormElement>('#chat-form')
const input = document.querySelector<HTMLInputElement>('#chat-input')
const log = document.querySelector<HTMLElement>('#chat-messages')
const status = document.querySelector<HTMLElement>('#chat-status')
const close = document.querySelector<HTMLButtonElement>('#chat-close')
interface Message { id: string; role: 'user' | 'assistant'; parts: { type: 'text'; text: string }[] }
let messages: Message[] = []
let busy = false
let controller: AbortController | undefined
let opener: HTMLElement | undefined
if (dialog && form && input && log && status && close) {
  document.querySelectorAll<HTMLButtonElement>('.chat-open').forEach(button => {
    button.hidden = false
    button.addEventListener('click', () => { opener = button; dialog.showModal(); input.focus() })
  })
  close.addEventListener('click', () => dialog.close())
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close() } })
  dialog.addEventListener('close', () => { controller?.abort(); opener?.focus() })
  const setBusy = (value: boolean) => {
    busy = value
    form.querySelectorAll<HTMLInputElement | HTMLButtonElement>('input, button').forEach(item => item.disabled = value)
    dialog.querySelectorAll<HTMLButtonElement>('[data-question]').forEach(item => item.disabled = value)
  }
  const addBubble = (text: string, role: string) => { const p = document.createElement('p'); p.className = `chat-message ${role}`; p.textContent = text; log.append(p); log.scrollTop = log.scrollHeight; return p }
  const submit = async (text: string) => {
    if (busy || !text.trim()) return
    if (messages.length >= 18) { status.textContent = 'Please email Luis to continue the conversation.'; return }
    const user: Message = { id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text }] }
    const previous = [...messages]
    const userBubble = addBubble(text, 'user')
    const bubble = addBubble('', 'assistant')
    messages.push(user)
    setBusy(true)
    status.textContent = 'Thinking…'
    controller = new AbortController()
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }), signal: controller.signal })
      if (!response.ok || !response.body) throw new Error('Chat unavailable')
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        answer += decoder.decode(value, { stream: true })
        bubble.textContent = answer
        log.scrollTop = log.scrollHeight
      }
      answer += decoder.decode()
      if (!answer.trim()) throw new Error('Empty answer')
      bubble.textContent = answer
      messages.push({ id: crypto.randomUUID(), role: 'assistant', parts: [{ type: 'text', text: answer }] })
      status.textContent = ''
      input.value = ''
      log.querySelector('.chat-suggestions')?.remove()
      log.querySelector('.chat-intro')?.remove()
    } catch {
      messages = previous
      userBubble.remove()
      bubble.remove()
      status.textContent = `Chat is unavailable. Please email Luis at ${profile.email}.`
    } finally { setBusy(false); if (dialog.open) input.focus() }
  }
  form.addEventListener('submit', event => { event.preventDefault(); void submit(input.value.trim()) })
  dialog.querySelectorAll<HTMLButtonElement>('[data-question]').forEach(button => button.addEventListener('click', () => void submit(button.dataset.question || '')))
}
