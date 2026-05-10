"use client";

import { useCallback } from "react";
import { useChat } from "@/hooks/useChat";
import { Header } from "@/components/Header";
import { SystemPromptBanner } from "@/components/SystemPromptBanner";
import { MessageList } from "@/components/MessageList";
import { ChatInput } from "@/components/ChatInput";

export default function HomePage() {
  const { messages, isLoading, error, sendMessage, retryLast, clearMessages, cancelRequest } =
    useChat();

  const handleSelectPrompt = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage]
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0f1e]">
      <Header onClearChat={clearMessages} hasMessages={messages.length > 0} />

      <SystemPromptBanner />

      {/* Main chat area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          error={error}
          onRetry={retryLast}
          onSelectPrompt={handleSelectPrompt}
        />
      </div>

      <ChatInput onSend={sendMessage} onCancel={cancelRequest} isLoading={isLoading} />
    </div>
  );
}
