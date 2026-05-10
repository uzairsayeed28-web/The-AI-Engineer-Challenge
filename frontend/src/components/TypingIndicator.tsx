export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-slide-up">
      {/* AI avatar */}
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

      <div className="px-4 py-3.5 rounded-2xl rounded-tl-md bg-navy-800 border border-white/6 shadow-lg">
        <div className="flex items-center gap-1.5 h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
