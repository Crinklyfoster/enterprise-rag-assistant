import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-300 px-6 py-4 dark:border-gray-700">
      <div className="flex gap-6">
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
