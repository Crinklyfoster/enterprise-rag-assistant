import Link from "next/link";

import SessionSidebar from "@/components/chat/SessionSidebar";

export default function ChatHomePage() {
  return (
    <div className="flex h-[calc(100dvh-57px)] flex-col md:flex-row">
      <SessionSidebar />

      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold">Chats</h1>

          <p className="mt-2 text-muted-foreground">
            Select a chat session from the sidebar.
          </p>

          <Link
            href="/documents"
            className="mt-4 inline-block rounded underline underline-offset-4 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:text-blue-400"
          >
            Go to Documents
          </Link>
        </div>
      </main>
    </div>
  );
}
