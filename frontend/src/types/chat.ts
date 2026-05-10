export type MessageRole = "user" | "assistant" | "error";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
