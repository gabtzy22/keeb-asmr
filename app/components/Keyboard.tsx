'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import useSound from 'use-sound';
import Key from './Key';
import {
  LAYOUTS,
  TKL_NAV_ROWS,
  NUMPAD_ROWS,
  buildValidCodes,
  isRowGroups,
  type LayoutRow,
  type KeyDef,
  type RowGroup,
} from '../lib/constants';

/**
 * Every key default browser action blocked (scrolling, menu opening, tab-switching, focus stealing, etc.) 
 * UNLESS the user is holding a genuine modifier combo (Ctrl+C, Alt+Tab …).
 */
const ALWAYS_ALLOW_CODES = new Set<string>([]); // nothing escapes 😈

interface KeyboardProps {
  soundFile: string;
  layoutId: string;
  volume: number;
}

export default function Keyboard({ soundFile, layoutId, volume }: KeyboardProps) {
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});

  // Resolve layout + extras 
  const layout: LayoutRow[] = LAYOUTS[layoutId] ?? LAYOUTS['60'];
  const showNavBlock = layoutId === 'tkl' || layoutId === '100';
  const showNumpad = layoutId === '100';
  const isLaptop = layoutId === 'laptop';

  const extras = useMemo(() => {
    const e: KeyDef[][] = [];
    if (showNavBlock) e.push(...TKL_NAV_ROWS);
    if (showNumpad) e.push(...NUMPAD_ROWS);
    return e;
  }, [showNavBlock, showNumpad]);

  const validCodes = useMemo(
    () => buildValidCodes(layout, extras.length ? extras : undefined),
    [layout, extras],
  );

  // Audio engine 
  const [play] = useSound(soundFile, { interrupt: false, volume });
  const playRef = useRef(play);
  useEffect(() => { playRef.current = play; }, [play]);

  // Keyboard event handlers 
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) return;
      const { code } = e;
      if (!validCodes.has(code)) return;

      // Block default unless a real modifier combo is intended
      if (!ALWAYS_ALLOW_CODES.has(code)) {
        // Allow Ctrl+<key> and Meta+<key> combos  
        const hasModifier = e.ctrlKey || e.metaKey;
        if (!hasModifier) e.preventDefault();
      }

      playRef.current();
      setPressedKeys((prev) => ({ ...prev, [code]: true }));
    },
    [validCodes],
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    e.preventDefault();
    setPressedKeys((prev) => {
      if (!prev[code]) return prev;
      const next = { ...prev };
      delete next[code];
      return next;
    });
  }, []);

  //  Mouse handlers (forwarded from <Key />) 
  const handleMouseDown = useCallback((code: string) => {
    playRef.current();
    setPressedKeys((prev) => ({ ...prev, [code]: true }));
  }, []);

  const handleMouseUp = useCallback((code: string) => {
    setPressedKeys((prev) => {
      if (!prev[code]) return prev;
      const next = { ...prev };
      delete next[code];
      return next;
    });
  }, []);

  // Attach / detach global listeners 
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // Also clear pressed keys on window blur so held keys don't stick - copilot
    const handleBlur = () => setPressedKeys({});
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Clear pressed keys on layout change - copilot
  useEffect(() => { setPressedKeys({}); }, [layoutId]);

  //  Render helpers 
  const renderKey = (k: KeyDef) => (
    <Key
      key={k.code}
      code={k.code}
      label={k.label}
      isPressed={!!pressedKeys[k.code]}
      width={k.width}
      isLaptop={isLaptop}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );

  const renderRow = (row: LayoutRow, idx: number) => {
    if (isRowGroups(row)) {
      // Clustered row (F-row for TKL / 100%)
      return (
        <div key={idx} className="flex gap-[3px]">
          {(row as RowGroup[]).map((group, gi) => (
            <div key={gi} className={`flex gap-[3px] ${group.gap ?? ''}`}>
              {group.keys.map(renderKey)}
            </div>
          ))}
        </div>
      );
    }
    return (
      <div key={idx} className="flex gap-[3px]">
        {(row as KeyDef[]).map(renderKey)}
      </div>
    );
  };

  const renderSideBlock = (rows: KeyDef[][]) => (
    <div className="flex flex-col gap-[3px]">
      {rows.map((row, i) =>
        row.length === 0 ? (
          <div key={i} className="h-12" />  /* spacer */
        ) : (
          <div key={i} className="flex gap-[3px] justify-center">
            {row.map(renderKey)}
          </div>
        ),
      )}
    </div>
  );

  // Gap between F-row and number row for TKL / 100%
  const hasClusteredFRow = layout.length > 0 && isRowGroups(layout[0]);

  // Render 
  const boardClasses = isLaptop
    ? 'rounded-xl border border-zinc-300 dark:border-zinc-800/60 bg-zinc-200/70 dark:bg-zinc-900/60 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]'
    : 'rounded-2xl border border-zinc-300 dark:border-zinc-800/60 bg-zinc-100/80 dark:bg-zinc-900/80 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm';

  return (
    <div className="flex gap-5 items-start">
      {/* Main board  */}
      <div className={`inline-flex flex-col gap-[3px] ${boardClasses}`}>
        {layout.map((row, idx) => (
          <div key={idx}>
            {/* Add spacing after F-row for TKL/100% */}
            {hasClusteredFRow && idx === 1 && <div className="h-2" />}
            {renderRow(row, idx)}
          </div>
        ))}
      </div>

      {/*  Nav block (TKL + 100%) - copilot */}
      {showNavBlock && (
        <div className={`inline-flex flex-col gap-[3px] ${boardClasses}`}>
          {/* top 3 keys */}
          <div className="flex gap-[3px] justify-center">
            {TKL_NAV_ROWS[0].map(renderKey)}
          </div>
          <div className="h-2" />
          {/* Ins/Hm/PU */}
          <div className="flex gap-[3px] justify-center">
            {TKL_NAV_ROWS[1].map(renderKey)}
          </div>
          {/* Del/End/PD */}
          <div className="flex gap-[3px] justify-center">
            {TKL_NAV_ROWS[2].map(renderKey)}
          </div>
          {/* spacer */}
          <div className="h-12" />
          {/* ↑ centred */}
          <div className="flex gap-[3px] justify-center">
            <div className="w-12" /> {/* spacer for alignment */}
            {TKL_NAV_ROWS[4].map(renderKey)}
            <div className="w-12" />
          </div>
          {/* ← ↓ → */}
          <div className="flex gap-[3px] justify-center">
            {TKL_NAV_ROWS[5].map(renderKey)}
          </div>
        </div>
      )}

      {/*  Numpad (100%)  */}
      {showNumpad && (
        <div className={`inline-flex flex-col gap-[3px] ${boardClasses}`}>
          {/* spacer to align with main board's first row */}
          <div className="h-12" />
          <div className="h-2" />
          {renderSideBlock(NUMPAD_ROWS.slice(1))}
        </div>
      )}
    </div>
  );
}
