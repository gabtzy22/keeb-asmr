'use client';

import { useState, useRef, useEffect } from 'react';
import type { SoundProfile } from '../lib/constants';

interface SoundProfileDropdownProps {
  profiles: SoundProfile[];
  selectedId: string;
  onSelect: (profile: SoundProfile) => void;
}

export default function SoundProfileDropdown({
  profiles,
  selectedId,
  onSelect,
}: SoundProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = profiles.find((p) => p.id === selectedId);

  // Close on outside click
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
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 transition-colors hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
        <span className="font-medium">{selected?.name ?? 'Select Profile'}</span>
        <svg
          className={`ml-1 h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-2xl backdrop-blur-md">
          {profiles.map((profile) => {
            const isSelected = profile.id === selectedId;
            const disabled = !profile.available;

            return (
              <button
                key={profile.id}
                onClick={() => {
                  if (!disabled) {
                    onSelect(profile);
                    setIsOpen(false);
                  }
                }}
                disabled={disabled}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800/80'
                    : disabled
                      ? 'cursor-not-allowed opacity-40'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {/* Status dot */}
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    isSelected
                      ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                      : disabled
                        ? 'bg-zinc-400 dark:bg-zinc-700'
                        : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                />

                {/* Label + description */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {profile.name}
                    </span>
                    {disabled && (
                      <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-zinc-500">
                    {profile.description}
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
