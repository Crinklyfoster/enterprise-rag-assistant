"use client";

import { useHealthCheck } from "@/hooks/useHealthCheck";

export default function HomePage() {
  const { data, isLoading, isError } = useHealthCheck();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          Enterprise RAG Assistant
        </h1>

        <p className="text-muted-foreground">
          Frontend Sprint F1
        </p>

        {isLoading && (
          <p>Checking backend...</p>
        )}

        {isError && (
          <p className="text-red-500">
            Backend Disconnected
          </p>
        )}

        {data && (
          <p className="text-green-600">
            Backend Connected ({data.status})
          </p>
        )}
      </div>
    </main>
  );
}