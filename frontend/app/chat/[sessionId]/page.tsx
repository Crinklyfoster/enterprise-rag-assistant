"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import MessageList from "@/components/chat/MessageList";
import SessionSidebar from "@/components/chat/SessionSidebar";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { useMessages } from "@/hooks/useMessages";
import { Message } from "@/types/message";

export default function ChatPage() {
  const { sessionId } = useParams<{
    sessionId: string;
  }>();
  const searchParams = useSearchParams();
  const documentId = searchParams.get("documentId");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    data: history,
    isLoading: isLoadingMessages,
    isError: isMessagesError,
    isFetching: isFetchingMessages,
    refetch: refetchMessages,
  } = useMessages(sessionId);
  const chatMutation = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!history) return;

    // History initializes the mutable message list used for optimistic sends.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(
      history.map((message) => ({
        role: message.role,
        content: message.content,
        timestamp: new Date(message.created_at),
      }))
    );
  }, [history]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!documentId) {
      alert("Document ID missing");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const question = input;

    setInput("");

    try {
      const response =
        await chatMutation.mutateAsync({
          session_id: sessionId,
          document_id: documentId,
          question,
        });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch {
      // The mutation error is rendered below the message list.
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100dvh-57px)] flex-col md:flex-row">
      <SessionSidebar />

      <main className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col">
        <header className="shrink-0 px-4 pt-6 sm:px-8 sm:pt-8">
          <h1 className="text-3xl font-bold">
            Chat
          </h1>

          <p className="mt-2 break-all text-sm text-muted-foreground">
            Session: {sessionId}
            {documentId && ` | Document: ${documentId}`}
          </p>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          {isLoadingMessages && (
            <div
              className="space-y-4"
              aria-label="Loading messages"
              aria-busy="true"
            >
              <div className="ml-auto h-20 w-2/3 animate-pulse rounded-lg bg-muted" />
              <div className="h-28 w-4/5 animate-pulse rounded-lg bg-muted" />
              <div className="ml-auto h-16 w-1/2 animate-pulse rounded-lg bg-muted" />
            </div>
          )}

          {isMessagesError && (
            <div className="py-12 text-center">
              <p className="font-medium">
                Failed to load messages.
              </p>

              <button
                type="button"
                onClick={() => void refetchMessages()}
                disabled={isFetchingMessages}
                className="mt-4 rounded border border-gray-300 px-4 py-2 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
              >
                {isFetchingMessages
                  ? "Retrying..."
                  : "Retry"}
              </button>
            </div>
          )}

          {!isLoadingMessages && !isMessagesError && (
            <MessageList messages={messages} />
          )}

          {chatMutation.isPending && (
            <div className="mt-4">
              <TypingIndicator />
            </div>
          )}

          {chatMutation.isError && (
            <div
              role="alert"
              className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              Failed to send message. Please try again.
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="shrink-0 border-t border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-950 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <textarea
              autoFocus
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={3}
              className="min-h-20 flex-1 resize-none rounded border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={
                chatMutation.isPending || !input.trim()
              }
              className="rounded border border-gray-300 bg-white px-4 py-2 text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
