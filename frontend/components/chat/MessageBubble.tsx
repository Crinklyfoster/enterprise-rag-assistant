"use client";

import { useState } from "react";

import { Message } from "@/types/message";

import SourceCard from "./SourceCard";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`min-w-0 max-w-[92%] break-words rounded-lg px-4 py-3 sm:max-w-[80%] ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
        }`}
      >
        {message.content}

        {message.sources?.length ? (
          <div className="mt-3">
            <button
              onClick={() => setShowSources(!showSources)}
              className="text-sm underline"
            >
              {showSources
                ? "Hide Sources"
                : `Show Sources (${message.sources.length})`}
            </button>

            {showSources && (
              <div className="mt-2 space-y-2">
                {message.sources.map((source, index) => (
                  <SourceCard
                    key={index}
                    source={source}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}

        <p
          className={`mt-2 text-xs ${
            isUser ? "text-blue-100" : "text-muted-foreground"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
