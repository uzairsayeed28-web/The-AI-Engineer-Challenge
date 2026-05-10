"use client";

import { useState, useCallback, useRef } from "react";
import type { Message, ChatRequest, ChatResponse } from "@/types/chat";

const API_URL = "http://localhost:8000/api/chat";
const TIMEOUT_MS = 30_000;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retryLast: () => void;
  clearMessages: () => void;
  cancelRequest: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<string>("");

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    lastUserMessageRef.current = content;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Attach a timeout that aborts the request after TIMEOUT_MS
    const timeoutId = setTimeout(() => controller.abort("timeout"), TIMEOUT_MS);

    try {
      const body: ChatRequest = { message: content.trim() };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const detail = await response.json().catch(() => null);
        const msg =
          detail?.detail ?? `Server error: ${response.status} ${response.statusText}`;
        throw new Error(msg);
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof Error && err.name === "AbortError") {
        const reason = (err as Error & { cause?: string }).cause;
        if (reason === "timeout") {
          setError("Request timed out. The server took too long to respond.");
        } else {
          // Cancelled by user — don't show an error
          return;
        }
      } else if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Network error — could not reach the server. Make sure the backend is running on http://localhost:8000."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [isLoading]);

  const retryLast = useCallback(() => {
    if (!lastUserMessageRef.current) return;
    // Remove any trailing error state and re-send
    setError(null);
    sendMessage(lastUserMessageRef.current);
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    lastUserMessageRef.current = "";
  }, []);

  const cancelRequest = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLast,
    clearMessages,
    cancelRequest,
  };
}
