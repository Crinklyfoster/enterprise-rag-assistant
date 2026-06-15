import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-300 px-4 py-4 sm:px-6 dark:border-gray-700">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Link className="hover:underline" href="/">
          Home
        </Link>

        <Link className="hover:underline" href="/documents">
          Documents
        </Link>

        <Link className="hover:underline" href="/chat">
          Chats
        </Link>
      </div>
    </nav>
  );
}
