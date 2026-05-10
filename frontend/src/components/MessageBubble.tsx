"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { CodeBlock } from "./CodeBlock";
import type { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

// Markdown component overrides — types are inlined to avoid importing
// react-markdown's internal types directly.
const markdownComponents: Components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code({ inline, className, children, ...props }: any) {
    const language = /language-(\w+)/.exec(className ?? "")?.[1] ?? "";
    if (!inline && typeof children === "string") {
      return <CodeBlock language={language}>{children}</CodeBlock>;
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-white/10 text-emerald-300 text-[0.8125rem] font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre({ children }: any) {
    // pre is handled inside CodeBlock; just render children
    return <>{children}</>;
  },
  p({ children }) {
    return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mb-2 list-disc list-inside space-y-1 pl-2">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-2 list-decimal list-inside space-y-1 pl-2">{children}</ol>;
  },
  li({ children }) {
    return <li className="text-white/85">{children}</li>;
  },
  strong({ children }) {
    return <strong className="font-semibold text-white">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic text-white/80">{children}</em>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-emerald-500/50 pl-3 my-2 text-white/60 italic">
        {children}
      </blockquote>
    );
  },
  h1({ children }) { return <h1 className="text-lg font-semibold text-white mb-2">{children}</h1>; },
  h2({ children }) { return <h2 className="text-base font-semibold text-white mb-2">{children}</h2>; },
  h3({ children }) { return <h3 className="text-sm font-semibold text-white mb-1">{children}</h3>; },
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    );
  },
  hr() {
    return <hr className="border-white/10 my-3" />;
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto my-2">
        <table className="text-sm border-collapse w-full">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="text-left px-3 py-2 border border-white/10 bg-white/5 text-white/90 font-medium">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="px-3 py-2 border border-white/10 text-white/75">{children}</td>
    );
  },
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently ignore clipboard errors
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 animate-fade-slide-up">
        <div className="max-w-[75%] sm:max-w-[60%]">
          <div className="px-4 py-3 rounded-2xl rounded-br-md bg-emerald-600 text-white text-sm leading-relaxed shadow-lg shadow-emerald-900/20">
            {message.content}
          </div>
          <p className="text-white/25 text-[10px] mt-1 text-right pr-1">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  if (isAssistant) {
    return (
      <div className="flex items-start gap-3 animate-fade-slide-up group/msg">
        {/* AI Avatar */}
        <div className="flex-shrink-0 mt-1 w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z"
              fill="#10b981"
              fillOpacity="0.3"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative max-w-[85%] sm:max-w-[75%]">
            <div className="px-4 py-3.5 rounded-2xl rounded-tl-md bg-navy-800 border border-white/6 text-white/85 text-sm shadow-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* Copy button — visible on hover */}
            <button
              onClick={handleCopy}
              aria-label="Copy response"
              className="absolute -top-2 -right-2 opacity-0 group-hover/msg:opacity-100 flex items-center gap-1 px-2 py-1 rounded-lg bg-navy-900 border border-white/10 text-white/50 hover:text-white/80 text-xs transition-all shadow-lg"
            >
              {copied ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-white/25 text-[10px] mt-1 pl-1">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
