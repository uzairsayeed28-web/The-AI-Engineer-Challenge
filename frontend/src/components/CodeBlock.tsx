"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  language: string;
  children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — silently fail
    }
  };

  return (
    <div className="relative group/code my-3 rounded-xl overflow-hidden border border-white/8">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1f30] border-b border-white/8">
        <span className="text-white/40 text-xs font-mono lowercase">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-white/50 hover:text-white/80 hover:bg-white/8 transition-all"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#141824",
          fontSize: "0.8125rem",
          lineHeight: "1.6",
          padding: "1rem",
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-mono, monospace)" } }}
        PreTag="div"
        showLineNumbers={children.split("\n").length > 4}
        lineNumberStyle={{ color: "#ffffff22", minWidth: "2.5em" }}
      >
        {children.replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}
