'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  // read system/stored preference
  useEffect(() => {
    const stored = localStorage.getItem('keeb-theme');
    if (stored === 'light') {
      setDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('keeb-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('keeb-theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 transition-colors hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-200"
    >
      {dark ? (
        // Sun icon
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      )}
    </button>
  );
}
