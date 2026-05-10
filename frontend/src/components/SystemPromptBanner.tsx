"use client";

const SYSTEM_PROMPT =
  "You are a helpful AI assistant with expertise in finance, invoicing, and business operations.";

export function SystemPromptBanner() {
  return (
    <div className="mx-4 md:mx-6 mt-4 mb-2 flex items-start gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 flex-shrink-0 opacity-80"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-emerald-400/70 text-xs leading-relaxed">
        <span className="text-emerald-400/90 font-medium">System prompt: </span>
        {SYSTEM_PROMPT}
      </p>
    </div>
  );
}
