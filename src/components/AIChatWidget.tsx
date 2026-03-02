"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatarSmall } from "@/components/AIAvatar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MSG =
  "Hey there! 👋 I'm Krishna's AI assistant — trained on everything about his background. Ask me about his experience, tech stack, projects, or anything professional. What's on your mind?";

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-violet-400"
          style={{
            animation: `typing-bounce 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        setMessages([{ role: "assistant", content: WELCOME_MSG }]);
      }, 350);
    }
  }, [isOpen, hasOpened]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Request failed");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (!reader) throw new Error("No response stream");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content ?? "";
            accumulated += token;
            setStreamingContent(accumulated);
          } catch {
            // skip malformed lines
          }
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Hmm, I ran into a snag: ${msg}. Try again in a moment!`,
        },
      ]);
    } finally {
      setIsLoading(false);
      setStreamingContent("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:right-6">
      {/* ── Chat Panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className="flex w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl border border-violet-500/20 shadow-[0_24px_80px_rgba(0,0,0,0.75),0_0_60px_rgba(124,58,237,0.12)]"
            style={{
              height: "min(540px, 80vh)",
              background: "rgba(13,10,28,0.96)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.07] px-4 py-3"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.14)0%,rgba(6,182,212,0.07)100%)",
              }}
            >
              <div className="shrink-0">
                <AIAvatarSmall />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-white">Krishna&apos;s AI Assistant</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-emerald-400">Online · Ready to chat</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/[0.08] hover:text-zinc-200"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="no-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar dot for assistant */}
                  {msg.role === "assistant" && (
                    <div className="mb-0.5 shrink-0">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 text-[10px] font-bold text-white">
                        K
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-sm bg-gradient-to-br from-violet-600 to-violet-700 text-white"
                        : "rounded-bl-sm border border-white/[0.07] bg-white/[0.06] text-zinc-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Streaming response */}
              {streamingContent && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 text-[10px] font-bold text-white">
                    K
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-bl-sm border border-white/[0.07] bg-white/[0.06] px-3.5 py-2.5 text-sm leading-relaxed text-zinc-200">
                    {streamingContent}
                    <span className="terminal-cursor ml-0.5" />
                  </div>
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && !streamingContent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 text-[10px] font-bold text-white">
                    K
                  </div>
                  <div className="rounded-2xl rounded-bl-sm border border-white/[0.07] bg-white/[0.06] px-3.5 py-3">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-white/[0.07] p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2.5 transition-colors focus-within:border-violet-500/40 focus-within:bg-white/[0.06]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Krishna's experience…"
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-[0_0_16px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] disabled:opacity-40 disabled:shadow-none"
                  aria-label="Send"
                >
                  <SendIcon />
                </button>
              </div>
              <p className="mt-2 text-center font-mono text-[10px] tracking-wide text-zinc-700">
                ⚡ Powered by NVIDIA NIM + Llama 3.1
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Button ────────────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group flex items-center gap-2.5 rounded-full px-5 py-3 text-white shadow-[0_8px_32px_rgba(124,58,237,0.45)] transition-shadow hover:shadow-[0_12px_48px_rgba(124,58,237,0.6)]"
        style={{
          background: "linear-gradient(135deg,#7C3AED 0%,#6D28D9 50%,#4C1D95 100%)",
        }}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
      >
        <span className="text-violet-200 transition-transform group-hover:scale-110">
          <BrainIcon />
        </span>
        <span className="text-sm font-semibold tracking-wide">
          {isOpen ? "Close Chat" : "Ask AI about me"}
        </span>
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute right-5 top-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-300" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
