import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold">
        Enterprise RAG Assistant
      </h1>

      <p className="mt-2 text-muted-foreground">
        Upload documents and chat with them.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
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
      </div>
    </main>
  );
}
