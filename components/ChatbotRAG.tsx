"use client";

import { useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type SourceRef = {
  id: string;
  title: string;
};

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  sources?: SourceRef[];
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const starterPrompts = [
  "What are Aditya's strongest achievements?",
  "What projects use AI or RAG?",
  "How can I contact Aditya?",
];

export default function ChatbotRAG() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm Aditya's FAQ Assistant. I can answer questions about projects, skills, achievements, and contact info based on the portfolio content.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const canSend = input.trim().length > 0 && !loading;

  const visibleSources = useMemo(() => {
    const assistantMessages = messages.filter((message) => message.role === "assistant");
    const latestWithSources = [...assistantMessages].reverse().find((item) => item.sources?.length);
    return latestWithSources?.sources ?? [];
  }, [messages]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  const toggleChat = () => {
    setOpen(!open);
  };

  const handleMessagesWheel = (event: WheelEvent<HTMLDivElement>) => {
    const container = messagesRef.current;
    if (!container) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isDown = event.deltaY > 0;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if (scrollHeight <= clientHeight || (isDown && isAtBottom) || (!isDown && isAtTop)) {
      event.preventDefault();
    }

    event.stopPropagation();
  };

  const handleMessagesTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage: Message = {
      id: createId(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error("chat_request_failed");
      }

      const data = (await response.json()) as {
        answer?: string;
        sources?: SourceRef[];
      };

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: data.answer ?? "I could not find a good answer for that yet.",
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: "I ran into an issue answering that. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleChat}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="chatbot-fab"
      >
        <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!open && <span className="chatbot-ripple" />}
          {open ? <X size={20} /> : <MessageCircle size={20} />}
        </span>
      </button>

      {open ? (
        <div
          data-lenis-prevent="true"
          className="fixed bottom-24 right-6 z-[94] flex h-[min(72vh,540px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#060b18]/95 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.9)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-cyan-200">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">FAQ Assistant</p>
                <p className="text-[11px] text-slate-400">Keyword-based answers from portfolio</p>
              </div>
            </div>
          </div>

          <div
            ref={messagesRef}
            data-lenis-prevent="true"
            onWheel={handleMessagesWheel}
            onTouchMove={handleMessagesTouchMove}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-3"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-indigo-500/80 text-white"
                    : "mr-auto bg-white/[0.06] text-slate-200"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs text-slate-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                Thinking...
              </div>
            ) : null}

            <div ref={endRef} />
          </div>

          <div className="border-t border-white/10 px-3 py-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    void sendMessage(prompt);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {visibleSources.length > 0 ? (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {visibleSources.slice(0, 3).map((source) => (
                  <span
                    key={source.id}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] uppercase tracking-wide text-cyan-200"
                  >
                    {source.title}
                  </span>
                ))}
              </div>
            ) : null}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills, ratings..."
                className="h-10 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300/40"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/85 text-slate-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
