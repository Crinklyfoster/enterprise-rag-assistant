"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import ThemeToggle from "@/components/layout/theme-toggle";
import { useDeleteSession } from "@/hooks/useDeleteSession";
import { useRenameSession } from "@/hooks/useRenameSession";
import { useSessions } from "@/hooks/useSessions";

function formatCreatedAt(createdAt: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

function displaySessionTitle(title: string) {
  return title.trim().toLowerCase() === "new chat"
    ? "Untitled Chat"
    : title;
}

export default function SessionSidebar() {
  const router = useRouter();
  const { sessionId } = useParams<{
    sessionId?: string;
  }>();
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSessions();
  const renameMutation = useRenameSession();
  const deleteMutation = useDeleteSession();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load sessions");
    }
  }, [isError]);

  const handleRename = (
    id: string,
    currentTitle: string
  ) => {
    const title = window.prompt(
      "Enter session title",
      currentTitle
    )?.trim();

    if (!title || title === currentTitle) return;

    renameMutation.mutate(
      {
        sessionId: id,
        title,
      },
      {
        onSuccess: () => {
          toast.success("Session renamed");
        },

        onError: () => {
          toast.error("Failed to rename session");
        },
      }
    );
  };

  const handleDelete = (
    id: string,
    title: string
  ) => {
    const sessionTitle = displaySessionTitle(title);
    if (
      !window.confirm(
        `Delete "${sessionTitle}"? This cannot be undone.`
      )
    ) {
      return;
    }

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Chat session deleted");

        if (id === sessionId) {
          router.push("/chat");
        }
      },

      onError: () => {
        toast.error("Failed to delete chat session");
      },
    });
  };

  return (
    <aside className="max-h-56 w-full shrink-0 overflow-y-auto border-b border-gray-300 bg-white p-4 text-black md:max-h-none md:w-72 md:border-r md:border-b-0 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
      <div className="mb-4">
        <ThemeToggle />
      </div>

      <h2 className="font-bold">Chats</h2>

      <div className="mt-4 space-y-2">
        {isLoading && (
          <div
            className="space-y-2"
            aria-label="Loading chat sessions"
            aria-busy="true"
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="py-6 text-center">
            <p className="text-sm font-medium">
              Failed to load sessions.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="mt-3 rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
            >
              {isFetching ? "Retrying..." : "Retry"}
            </button>
          </div>
        )}

        {!isLoading && !isError && !data?.length && (
          <div className="py-6 text-center">
            <p className="font-medium">
              No chat sessions yet
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Create a session from a document.
            </p>
          </div>
        )}

        {!isLoading && !isError && data?.map((session) => {
          const isActive = session.id === sessionId;
          const sessionTitle = displaySessionTitle(
            session.title
          );

          return (
            <div
              key={session.id}
              className={`block rounded border border-gray-300 p-2 dark:border-gray-700 ${
                isActive
                  ? "bg-muted font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <Link
                  href={`/chat/${session.id}`}
                  className="min-w-0 flex-1"
                >
                  <span className="block truncate">
                    {sessionTitle}
                  </span>

                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    Created:{" "}
                    {formatCreatedAt(session.created_at)}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleRename(
                      session.id,
                      session.title
                    )
                  }
                  disabled={renameMutation.isPending}
                  aria-label={`Rename ${sessionTitle}`}
                  className="rounded p-1 hover:bg-gray-200 disabled:opacity-50 dark:hover:bg-gray-700"
                >
                  <Pencil className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      session.id,
                      session.title
                    )
                  }
                  disabled={deleteMutation.isPending}
                  aria-label={`Delete ${sessionTitle}`}
                  className="rounded p-1 hover:bg-gray-200 disabled:opacity-50 dark:hover:bg-gray-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
