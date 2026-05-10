"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { EmptyState } from "./EmptyState";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export function MessageList({
  messages,
  isLoading,
  error,
  onRetry,
  onSelectPrompt,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll to newest message whenever messages change or loading starts
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0 && !isLoading;

  if (isEmpty) {
    return <EmptyState onSelectPrompt={onSelectPrompt} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-5 scroll-smooth">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isLoading && <TypingIndicator />}

      {/* Error inline banner */}
      {error && (
        <div className="flex items-start gap-3 animate-fade-slide-up">
          <div className="flex-shrink-0 mt-1 w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="px-4 py-3.5 rounded-2xl rounded-tl-md bg-red-500/8 border border-red-500/20 text-red-300 text-sm max-w-[85%] sm:max-w-[75%]">
              <p className="mb-2">{error}</p>
              <button
                onClick={onRetry}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors underline underline-offset-2"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-4.94" />
                </svg>
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
