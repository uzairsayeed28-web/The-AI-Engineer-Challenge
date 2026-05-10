"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const CHAR_LIMIT = 2000;
const MAX_ROWS = 4;

interface ChatInputProps {
  onSend: (message: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, onCancel, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea up to MAX_ROWS lines
  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(el).lineHeight || "24", 10);
    const maxHeight = lineHeight * MAX_ROWS + 24; // 24px padding
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, []);

  useEffect(() => {
    resize();
  }, [value, resize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || trimmed.length > CHAR_LIMIT) return;
    onSend(trimmed);
    setValue("");
    // Reset height after clear
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const charCount = value.length;
  const isOverLimit = charCount > CHAR_LIMIT;
  const canSend = value.trim().length > 0 && !isLoading && !isOverLimit;

  return (
    <div className="sticky bottom-0 bg-navy-950/80 backdrop-blur-sm px-4 md:px-6 pt-3 pb-4 border-t border-white/5">
      <div
        className={`flex items-end gap-3 rounded-2xl border px-4 py-3 transition-all ${
          isOverLimit
            ? "border-red-500/50 bg-navy-800/80"
            : "border-white/8 bg-navy-800/60 focus-within:border-emerald-500/40 focus-within:bg-navy-800"
        }`}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask me anything about finance or business…"
          rows={1}
          aria-label="Message input"
          className="flex-1 resize-none bg-transparent text-sm text-white placeholder-white/25 outline-none leading-6 py-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ maxHeight: `${24 * MAX_ROWS + 24}px` }}
        />

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
          {/* Character counter — only show when approaching limit */}
          {charCount > CHAR_LIMIT * 0.7 && (
            <span
              className={`text-[10px] tabular-nums transition-colors ${
                isOverLimit ? "text-red-400" : "text-white/30"
              }`}
            >
              {charCount}/{CHAR_LIMIT}
            </span>
          )}

          {/* Cancel button while loading */}
          {isLoading && (
            <button
              onClick={onCancel}
              aria-label="Cancel request"
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
            </button>
          )}

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/30"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-white/20 text-[10px] mt-1.5 text-center">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
