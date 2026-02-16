'use client';

import { memo } from 'react';

interface KeyProps {
  code: string;
  label: string;
  isPressed: boolean;
  width?: string;
  isLaptop?: boolean;
  onMouseDown: (code: string) => void;
  onMouseUp: (code: string) => void;
}

/**
 * A "dumb" visual key. It knows nothing about keyboard events or audio —
 * the parent <Keyboard /> tells it whether it's pressed via props.
 *
 * Mouse clicks are forwarded up so the parent can play audio + update state.
 *
 * We stick to hardware-accelerated CSS (transform, opacity, box-shadow)
 * for buttery-smooth animations even on high-refresh displays.
 */
function Key({
  code,
  label,
  isPressed,
  width = 'w-12',
  isLaptop = false,
  onMouseDown,
  onMouseUp,
}: KeyProps) {
  const laptopCls = isLaptop ? 'h-9 rounded-[5px] text-[11px]' : 'h-12 rounded-lg text-[13px]';

  return (
    <div
      onMouseDown={(e) => { e.preventDefault(); onMouseDown(code); }}
      onMouseUp={() => onMouseUp(code)}
      onMouseLeave={() => { if (isPressed) onMouseUp(code); }}
      className={`
        ${width} ${laptopCls} flex items-center justify-center
        select-none cursor-pointer
        font-medium tracking-wide
        will-change-transform
        transition-[transform,box-shadow,background-color,color,border-color]
        ease-out
        ${
          isPressed
            ? isLaptop
              ? // ── Laptop pressed ─────────────────────────────────────────
                'bg-zinc-300 dark:bg-zinc-600/80 translate-y-[1px] scale-[0.97] '
              + 'text-cyan-600 dark:text-cyan-300 '
              + 'border border-cyan-400/30 dark:border-cyan-400/20 '
              + 'shadow-[0_0_18px_rgba(34,211,238,0.25)] '
              + 'duration-[50ms]'
              : // ── Mech pressed ───────────────────────────────────────────
                'bg-zinc-300 dark:bg-zinc-600/80 translate-y-[2px] scale-[0.96] '
              + 'text-cyan-600 dark:text-cyan-300 '
              + 'border border-cyan-400/30 dark:border-cyan-400/20 '
              + 'shadow-[0_0_24px_rgba(34,211,238,0.35),inset_0_0_12px_rgba(34,211,238,0.08)] '
              + 'duration-[50ms]'
            : isLaptop
              ? // ── Laptop resting ─────────────────────────────────────────
                'bg-zinc-100 dark:bg-zinc-800/70 '
              + 'border border-zinc-300 dark:border-zinc-700/50 '
              + 'text-zinc-600 dark:text-zinc-400 '
              + 'shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)] '
              + 'hover:bg-zinc-200 dark:hover:bg-zinc-700/70 hover:text-zinc-800 dark:hover:text-zinc-300 '
              + 'duration-200'
              : // ── Mech resting ───────────────────────────────────────────
                'bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-700/90 dark:to-zinc-800 '
              + 'border border-zinc-300/60 border-b-[3px] border-b-zinc-400/50 '
              + 'dark:border-zinc-700/40 dark:border-b-[3px] dark:border-b-zinc-900/80 '
              + 'text-zinc-600 dark:text-zinc-400 '
              + 'shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.4)] '
              + 'hover:from-zinc-100 hover:to-zinc-200 dark:hover:from-zinc-600/90 dark:hover:to-zinc-700 '
              + 'hover:text-zinc-800 dark:hover:text-zinc-300 '
              + 'duration-200'
        }
      `}
    >
      {label}
    </div>
  );
}

export default memo(Key);
