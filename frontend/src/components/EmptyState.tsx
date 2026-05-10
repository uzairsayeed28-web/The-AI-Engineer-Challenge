"use client";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    label: "Invoice & billing",
    prompt: "How do I create a professional invoice for a freelance project? What should it include?",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "Cash flow advice",
    prompt: "What are the best practices for managing cash flow in a small business?",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: "Financial analysis",
    prompt: "Explain the key financial ratios I should track to assess my company's financial health.",
  },
];

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 select-none">
      {/* Logo */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z"
              fill="#10b981"
              fillOpacity="0.15"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="#10b981"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      <h2 className="text-white text-xl font-semibold mb-2 text-center">
        How can I help you today?
      </h2>
      <p className="text-white/40 text-sm text-center mb-8 max-w-sm">
        I specialize in finance, invoicing, and business operations. Ask me
        anything.
      </p>

      {/* Suggested prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
        {SUGGESTED_PROMPTS.map(({ icon, label, prompt }) => (
          <button
            key={label}
            onClick={() => onSelectPrompt(prompt)}
            className="group flex flex-col gap-3 p-4 rounded-xl bg-navy-800/60 border border-white/5 hover:border-emerald-500/30 hover:bg-navy-800 transition-all text-left"
          >
            <span className="text-emerald-500/70 group-hover:text-emerald-400 transition-colors">
              {icon}
            </span>
            <div>
              <p className="text-white/80 text-sm font-medium mb-0.5 group-hover:text-white transition-colors">
                {label}
              </p>
              <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
                {prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
