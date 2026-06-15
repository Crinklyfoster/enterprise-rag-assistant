"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="rounded border border-gray-300 bg-white px-3 py-2 text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
