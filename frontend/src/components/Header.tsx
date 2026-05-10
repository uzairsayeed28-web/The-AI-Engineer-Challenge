"use client";

import { useState } from "react";

interface HeaderProps {
  onClearChat: () => void;
  hasMessages: boolean;
}

export function Header({ onClearChat, hasMessages }: HeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    if (!hasMessages) return;
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onClearChat();
    setShowConfirm(false);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Branding */}
      <div className="flex items-center gap-3">
        {/* Emerald logo mark */}
        <div className="relative flex items-center justify-center w-8 h-8">
          <div className="absolute inset-0 rounded-lg bg-emerald-500/20 animate-pulse" />
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="relative z-10"
            aria-hidden="true"
          >
            <path
              d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z"
              fill="#10b981"
              fillOpacity="0.2"
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
        <div>
          <h1 className="text-white font-semibold text-base leading-tight tracking-tight">
            Haiku AI
          </h1>
          <p className="text-white/40 text-xs">Powered by Claude Haiku</p>
        </div>
      </div>

      {/* Clear chat button + confirm tooltip */}
      <div className="relative">
        <button
          onClick={handleClearClick}
          disabled={!hasMessages}
          aria-label="Clear chat"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
          <span className="hidden sm:inline">Clear chat</span>
        </button>

        {/* Confirmation tooltip */}
        {showConfirm && (
          <div className="absolute right-0 top-full mt-2 z-30 bg-navy-800 border border-white/10 rounded-xl shadow-2xl p-4 w-56 animate-fade-slide-up">
            <p className="text-white/80 text-sm mb-3">
              Clear all messages? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm font-medium transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
