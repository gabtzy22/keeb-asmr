'use client';

import { useState, useRef, useEffect } from 'react';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) return '🔇'; // muted
    if (volume < 0.3) return '🔈'; // low
    if (volume < 0.7) return '🔉'; // medium
    return '🔊'; // high
  };

  return (
    <div ref={ref} className="relative z-50">
      {/* ── Trigger ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 transition-colors hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
      >
        <span className="text-lg">{getVolumeIcon()}</span>
        <span className="font-medium">{Math.round(volume * 100)}%</span>
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

      {/* ── Volume slider ───────────────────────────────────────────────── */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-2xl backdrop-blur-md p-4">
          <div className="flex items-center gap-3">
            <span className="text-lg">{getVolumeIcon()}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleSliderChange}
              className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 min-w-[3rem] text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}