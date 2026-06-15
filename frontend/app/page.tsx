"use client";

import Link from "next/link";

import { useDocuments } from "@/hooks/useDocuments";
import { useSessions } from "@/hooks/useSessions";

export default function HomePage() {
  const documents = useDocuments();
  const sessions = useSessions();
  const stats = [
    {
      label: "Documents",
      value: documents.data?.length,
      isLoading: documents.isLoading,
      isError: documents.isError,
    },
    {
      label: "Chat Sessions",
      value: sessions.data?.length,
      isLoading: sessions.isLoading,
      isError: sessions.isError,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Enterprise RAG Assistant
      </h1>

      <p className="mt-2 text-muted-foreground">
        Upload documents and chat with them.
      </p>

      <section
        className="mt-8 grid gap-4 sm:grid-cols-2"
        aria-label="Dashboard statistics"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-300 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>

            {stat.isLoading ? (
              <div
                className="mt-3 h-9 w-16 animate-pulse rounded bg-muted"
                aria-label={`Loading ${stat.label.toLowerCase()} count`}
              />
            ) : (
              <p className="mt-2 text-3xl font-bold">
                {stat.isError ? "Unavailable" : stat.value ?? 0}
              </p>
            )}
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/documents"
          className="rounded-lg border border-gray-300 p-6 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <h2 className="text-xl font-semibold">
            Documents
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload, manage, and inspect documents.
          </p>
        </Link>

        <Link
          href="/chat"
          className="rounded-lg border border-gray-300 p-6 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <h2 className="text-xl font-semibold">Chats</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            View and continue chat sessions.
          </p>
        </Link>
      </section>
    </main>
  );
}
