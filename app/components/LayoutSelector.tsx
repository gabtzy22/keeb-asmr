'use client';

import { useState, useRef, useEffect } from 'react';
import type { KeyboardSize } from '../lib/constants';

interface LayoutSelectorProps {
  sizes: KeyboardSize[];
  selectedId: string;
  onSelect: (size: KeyboardSize) => void;
}

export default function LayoutSelector({
  sizes,
  selectedId,
  onSelect,
}: LayoutSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = sizes.find((s) => s.id === selectedId);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 transition-colors hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
      >
        <svg className="h-4 w-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span className="font-medium">{selected?.name ?? 'Layout'}</span>
        <svg
          className={`ml-1 h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-2xl backdrop-blur-md">
          {sizes.map((size) => {
            const isSelected = size.id === selectedId;
            return (
              <button
                key={size.id}
                onClick={() => { onSelect(size); setIsOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800/80'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    isSelected
                      ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                      : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {size.name}
                  </span>
                  <p className="truncate text-xs text-zinc-500">
                    {size.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
