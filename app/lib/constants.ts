// ─── Types ───────────────────────────────────────────────────────────────────

export interface KeyDef {
  code: string;       // KeyboardEvent.code — position-based, shift-agnostic
  label: string;
  width?: string;     // Tailwind width class (default: w-12 → 48 px → 1u)
}

/** A row-group can optionally carry a `gap` class to insert spacing between
 *  physical key clusters (e.g. the gap between F4 and F5). */
export interface RowGroup {
  keys: KeyDef[];
  gap?: string;       // e.g. 'ml-4' to visually separate clusters
}

export interface SoundProfile {
  id: string;
  name: string;
  description: string;
  soundFile: string;
  available: boolean;
}

export interface KeyboardSize {
  id: string;
  name: string;
  description: string;
}

// ─── Sound profiles ──────────────────────────────────────────────────────────

export const SOUND_PROFILES: SoundProfile[] = [
  {
    id: 'thock',
    name: 'Thock',
    description: 'Deep, satisfying thock',
    soundFile: '/thock.mp3',
    available: true,
  },
  {
    id: 'red',
    name: 'Linear Red',
    description: 'Smooth and buttery',
    soundFile: '/red.mp3',
    available: true,
  },
  {
    id: 'brown',
    name: 'Tactile Brown',
    description: 'Subtle bump feedback',
    soundFile: '/brown.mp3',
    available: true,
  },
  {
    id: 'blue',
    name: 'Clicky Blue',
    description: 'Sharp, crispy click',
    soundFile: '/blue.mp3',
    available: true,
  },
  {
    id: 'clacky',
    name: 'Clacky',
    description: 'Loud and proud clack',
    soundFile: '/clack.mp3',
    available: true,
  },
  {
    id: 'laptop',
    name: 'Laptop',
    description: 'Soft chiclet keypress',
    soundFile: '/laptop.wav',
    available: true,
  },
];

// ─── Keyboard sizes ─────────────────────────────────────────────────────────

export const KEYBOARD_SIZES: KeyboardSize[] = [
  { id: '60',      name: '60%',    description: 'Compact – no F-row, no nav' },
  { id: '65',      name: '65%',    description: 'Compact + arrows & nav column' },
  { id: '75',      name: '75%',    description: 'Compact + F-row & nav' },
  { id: '85',      name: '85%',    description: '75% with extra nav cluster' },
  { id: 'tkl',     name: 'TKL',    description: 'Tenkeyless – no numpad' },
  { id: '100',     name: '100%',   description: 'Full-size with numpad' },
  { id: 'laptop',  name: 'Laptop', description: 'Flat chiclet style' },
];


const F_ROW: KeyDef[] = [
  { code: 'Escape', label: 'Esc' },
  { code: 'F1', label: 'F1' },
  { code: 'F2', label: 'F2' },
  { code: 'F3', label: 'F3' },
  { code: 'F4', label: 'F4' },
  { code: 'F5', label: 'F5' },
  { code: 'F6', label: 'F6' },
  { code: 'F7', label: 'F7' },
  { code: 'F8', label: 'F8' },
  { code: 'F9', label: 'F9' },
  { code: 'F10', label: 'F10' },
  { code: 'F11', label: 'F11' },
  { code: 'F12', label: 'F12' },
];

// For TKL/100%
const F_ROW_CLUSTERED: RowGroup[] = [
  { keys: [{ code: 'Escape', label: 'Esc' }] },
  { keys: [
    { code: 'F1', label: 'F1' },
    { code: 'F2', label: 'F2' },
    { code: 'F3', label: 'F3' },
    { code: 'F4', label: 'F4' },
  ], gap: 'ml-6' },
  { keys: [
    { code: 'F5', label: 'F5' },
    { code: 'F6', label: 'F6' },
    { code: 'F7', label: 'F7' },
    { code: 'F8', label: 'F8' },
  ], gap: 'ml-4' },
  { keys: [
    { code: 'F9', label: 'F9' },
    { code: 'F10', label: 'F10' },
    { code: 'F11', label: 'F11' },
    { code: 'F12', label: 'F12' },
  ], gap: 'ml-4' },
];

// Core rows 

const NUM_ROW: KeyDef[] = [
  { code: 'Backquote', label: '`' },
  { code: 'Digit1', label: '1' },
  { code: 'Digit2', label: '2' },
  { code: 'Digit3', label: '3' },
  { code: 'Digit4', label: '4' },
  { code: 'Digit5', label: '5' },
  { code: 'Digit6', label: '6' },
  { code: 'Digit7', label: '7' },
  { code: 'Digit8', label: '8' },
  { code: 'Digit9', label: '9' },
  { code: 'Digit0', label: '0' },
  { code: 'Minus', label: '–' },
  { code: 'Equal', label: '=' },
  { code: 'Backspace', label: 'Bksp', width: 'w-[6rem]' },
];

const NUM_ROW_60: KeyDef[] = [
  { code: 'Escape', label: 'Esc' },
  { code: 'Digit1', label: '1' },
  { code: 'Digit2', label: '2' },
  { code: 'Digit3', label: '3' },
  { code: 'Digit4', label: '4' },
  { code: 'Digit5', label: '5' },
  { code: 'Digit6', label: '6' },
  { code: 'Digit7', label: '7' },
  { code: 'Digit8', label: '8' },
  { code: 'Digit9', label: '9' },
  { code: 'Digit0', label: '0' },
  { code: 'Minus', label: '–' },
  { code: 'Equal', label: '=' },
  { code: 'Backspace', label: 'Bksp', width: 'w-[6rem]' },
];

const QWERTY_ROW: KeyDef[] = [
  { code: 'Tab', label: 'Tab', width: 'w-[4.5rem]' },
  { code: 'KeyQ', label: 'Q' },
  { code: 'KeyW', label: 'W' },
  { code: 'KeyE', label: 'E' },
  { code: 'KeyR', label: 'R' },
  { code: 'KeyT', label: 'T' },
  { code: 'KeyY', label: 'Y' },
  { code: 'KeyU', label: 'U' },
  { code: 'KeyI', label: 'I' },
  { code: 'KeyO', label: 'O' },
  { code: 'KeyP', label: 'P' },
  { code: 'BracketLeft', label: '[' },
  { code: 'BracketRight', label: ']' },
  { code: 'Backslash', label: '\\', width: 'w-[4.5rem]' },
];

const HOME_ROW: KeyDef[] = [
  { code: 'CapsLock', label: 'Caps', width: 'w-[5.25rem]' },
  { code: 'KeyA', label: 'A' },
  { code: 'KeyS', label: 'S' },
  { code: 'KeyD', label: 'D' },
  { code: 'KeyF', label: 'F' },
  { code: 'KeyG', label: 'G' },
  { code: 'KeyH', label: 'H' },
  { code: 'KeyJ', label: 'J' },
  { code: 'KeyK', label: 'K' },
  { code: 'KeyL', label: 'L' },
  { code: 'Semicolon', label: ';' },
  { code: 'Quote', label: "'" },
  { code: 'Enter', label: 'Enter', width: 'w-[6.75rem]' },
];

const SHIFT_ROW: KeyDef[] = [
  { code: 'ShiftLeft', label: 'Shift', width: 'w-[6.75rem]' },
  { code: 'KeyZ', label: 'Z' },
  { code: 'KeyX', label: 'X' },
  { code: 'KeyC', label: 'C' },
  { code: 'KeyV', label: 'V' },
  { code: 'KeyB', label: 'B' },
  { code: 'KeyN', label: 'N' },
  { code: 'KeyM', label: 'M' },
  { code: 'Comma', label: ',' },
  { code: 'Period', label: '.' },
  { code: 'Slash', label: '/' },
  { code: 'ShiftRight', label: 'Shift', width: 'w-[8.25rem]' },
];

const BOTTOM_ROW_60: KeyDef[] = [
  { code: 'ControlLeft', label: 'Ctrl', width: 'w-[3.75rem]' },
  { code: 'MetaLeft', label: 'Win', width: 'w-[3.75rem]' },
  { code: 'AltLeft', label: 'Alt', width: 'w-[3.75rem]' },
  { code: 'Space', label: '', width: 'flex-1' },
  { code: 'AltRight', label: 'Alt', width: 'w-[3.75rem]' },
  { code: 'MetaRight', label: 'Fn', width: 'w-[3.75rem]' },
  { code: 'ContextMenu', label: '☰', width: 'w-[3.75rem]' },
  { code: 'ControlRight', label: 'Ctrl', width: 'w-[3.75rem]' },
];

// Navigation keys

const NAV_ARROWS: KeyDef[] = [
  { code: 'ArrowLeft', label: '←' },
  { code: 'ArrowDown', label: '↓' },
  { code: 'ArrowRight', label: '→' },
];

// TKL/100% navigation block
const NAV_BLOCK_TOP: KeyDef[] = [
  { code: 'Insert', label: 'Ins' },
  { code: 'Home', label: 'Hm' },
  { code: 'PageUp', label: 'PU' },
];
const NAV_BLOCK_MID: KeyDef[] = [
  { code: 'Delete', label: 'Del' },
  { code: 'End', label: 'End' },
  { code: 'PageDown', label: 'PD' },
];

// Numpad 

const NUMPAD_ROW0: KeyDef[] = [
  { code: 'NumLock', label: 'Num' },
  { code: 'NumpadDivide', label: '/' },
  { code: 'NumpadMultiply', label: '*' },
  { code: 'NumpadSubtract', label: '–' },
];
const NUMPAD_ROW1: KeyDef[] = [
  { code: 'Numpad7', label: '7' },
  { code: 'Numpad8', label: '8' },
  { code: 'Numpad9', label: '9' },
  { code: 'NumpadAdd', label: '+' },
];
const NUMPAD_ROW2: KeyDef[] = [
  { code: 'Numpad4', label: '4' },
  { code: 'Numpad5', label: '5' },
  { code: 'Numpad6', label: '6' },
];
const NUMPAD_ROW3: KeyDef[] = [
  { code: 'Numpad1', label: '1' },
  { code: 'Numpad2', label: '2' },
  { code: 'Numpad3', label: '3' },
  { code: 'NumpadEnter', label: '↵' },
];
const NUMPAD_ROW4: KeyDef[] = [
  { code: 'Numpad0', label: '0', width: 'w-[6.25rem]' },
  { code: 'NumpadDecimal', label: '.' },
];

//  Layout type: KeyDef[] or RowGroup[] for clusters.

export type LayoutRow = KeyDef[] | RowGroup[];

export function isRowGroups(row: LayoutRow): row is RowGroup[] {
  return row.length > 0 && 'keys' in row[0];
}

// Helper to flatMap all KeyDef out of a LayoutRow
function flatRow(row: LayoutRow): KeyDef[] {
  if (isRowGroups(row)) return row.flatMap((g) => g.keys);
  return row;
}


// 60 % 
const LAYOUT_60: LayoutRow[] = [
  NUM_ROW_60,
  QWERTY_ROW,
  HOME_ROW,
  SHIFT_ROW,
  BOTTOM_ROW_60,
];

// 65 % 
const SHIFT_ROW_65: KeyDef[] = [
  { code: 'ShiftLeft', label: 'Shift', width: 'w-[6.75rem]' },
  { code: 'KeyZ', label: 'Z' },
  { code: 'KeyX', label: 'X' },
  { code: 'KeyC', label: 'C' },
  { code: 'KeyV', label: 'V' },
  { code: 'KeyB', label: 'B' },
  { code: 'KeyN', label: 'N' },
  { code: 'KeyM', label: 'M' },
  { code: 'Comma', label: ',' },
  { code: 'Period', label: '.' },
  { code: 'Slash', label: '/' },
  { code: 'ShiftRight', label: 'Shift', width: 'w-[5.25rem]' },
  { code: 'ArrowUp', label: '↑' },
  { code: 'Delete', label: 'Del' },
];

const BOTTOM_ROW_65: KeyDef[] = [
  { code: 'ControlLeft', label: 'Ctrl', width: 'w-[3.75rem]' },
  { code: 'MetaLeft', label: 'Win', width: 'w-[3.75rem]' },
  { code: 'AltLeft', label: 'Alt', width: 'w-[3.75rem]' },
  { code: 'Space', label: '', width: 'flex-1' },
  { code: 'AltRight', label: 'Alt', width: 'w-[3.75rem]' },
  { code: 'ControlRight', label: 'Ctrl', width: 'w-[3.75rem]' },
  ...NAV_ARROWS,
];

const LAYOUT_65: LayoutRow[] = [
  [...NUM_ROW_60, { code: 'Delete', label: 'Del' } as KeyDef],
  [...QWERTY_ROW, { code: 'PageUp', label: 'PU' } as KeyDef],
  [...HOME_ROW, { code: 'PageDown', label: 'PD' } as KeyDef],
  SHIFT_ROW_65,
  BOTTOM_ROW_65,
];

// 75 % 
const LAYOUT_75: LayoutRow[] = [
  [...F_ROW, { code: 'Delete', label: 'Del' } as KeyDef],
  [...NUM_ROW, { code: 'Home', label: 'Hm' } as KeyDef],
  [...QWERTY_ROW, { code: 'PageUp', label: 'PU' } as KeyDef],
  [...HOME_ROW, { code: 'PageDown', label: 'PD' } as KeyDef],
  SHIFT_ROW_65,
  BOTTOM_ROW_65,
];

//  85 %
const LAYOUT_85: LayoutRow[] = [
  [...F_ROW, { code: 'PrintScreen', label: 'PS' } as KeyDef,
   { code: 'Delete', label: 'Del' } as KeyDef],
  [...NUM_ROW, { code: 'Home', label: 'Hm' } as KeyDef,
   { code: 'End', label: 'End' } as KeyDef],
  [...QWERTY_ROW, { code: 'PageUp', label: 'PU' } as KeyDef,
   { code: 'Insert', label: 'Ins' } as KeyDef],
  [...HOME_ROW, { code: 'PageDown', label: 'PD' } as KeyDef],
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'w-[6.75rem]' },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' },
    { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: 'Shift', width: 'w-[5.25rem]' },
    { code: 'ArrowUp', label: '↑' },
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 'w-[3.75rem]' },
    { code: 'MetaLeft', label: 'Win', width: 'w-[3.75rem]' },
    { code: 'AltLeft', label: 'Alt', width: 'w-[3.75rem]' },
    { code: 'Space', label: '', width: 'flex-1' },
    { code: 'AltRight', label: 'Alt', width: 'w-[3.75rem]' },
    { code: 'ContextMenu', label: '☰', width: 'w-[3.75rem]' },
    ...NAV_ARROWS,
  ],
];

// TKL 
const LAYOUT_TKL: LayoutRow[] = [
  F_ROW_CLUSTERED as RowGroup[],
  NUM_ROW,
  QWERTY_ROW,
  HOME_ROW,
  SHIFT_ROW,
  BOTTOM_ROW_60,
];

// Extra TKL nav column keys — rendered as a side-block by the Keyboard component
export const TKL_NAV_ROWS: KeyDef[][] = [
  [{ code: 'PrintScreen', label: 'PS' }, { code: 'ScrollLock', label: 'SL' }, { code: 'Pause', label: 'PB' }],
  NAV_BLOCK_TOP,
  NAV_BLOCK_MID,
  [], // spacer lang
  [{ code: 'ArrowUp', label: '↑' }],
  NAV_ARROWS,
];

// 100 % 

const LAYOUT_100: LayoutRow[] = LAYOUT_TKL; // same main block; numpad added as side

export const NUMPAD_ROWS: KeyDef[][] = [
  [], // spacer lang
  NUMPAD_ROW0,
  NUMPAD_ROW1,
  NUMPAD_ROW2,
  NUMPAD_ROW3,
  NUMPAD_ROW4,
];

//  Laptop 

const LAPTOP_BOTTOM: KeyDef[] = [
  { code: 'ControlLeft', label: 'Ctrl', width: 'w-[3.75rem]' },
  { code: 'MetaLeft', label: 'Fn', width: 'w-[3.75rem]' },
  { code: 'AltLeft', label: 'Alt', width: 'w-[3.75rem]' },
  { code: 'Space', label: '', width: 'flex-1' },
  { code: 'AltRight', label: 'Alt', width: 'w-[3.75rem]' },
  { code: 'ArrowLeft', label: '←' },
  { code: 'ArrowUp', label: '↑' },
  { code: 'ArrowDown', label: '↓' },
  { code: 'ArrowRight', label: '→' },
  { code: 'ControlRight', label: 'Ctrl', width: 'w-[3.75rem]' },
];

const LAYOUT_LAPTOP: LayoutRow[] = [
  F_ROW,
  NUM_ROW,
  QWERTY_ROW,
  HOME_ROW,
  SHIFT_ROW,
  LAPTOP_BOTTOM,
];

//  Layout map

export const LAYOUTS: Record<string, LayoutRow[]> = {
  '60':     LAYOUT_60,
  '65':     LAYOUT_65,
  '75':     LAYOUT_75,
  '85':     LAYOUT_85,
  'tkl':    LAYOUT_TKL,
  '100':    LAYOUT_100,
  'laptop': LAYOUT_LAPTOP,
};

/** idk wtf this is pinagawa ko lang to sa copilot
 */
export function buildValidCodes(
  layout: LayoutRow[],
  extras?: KeyDef[][],
): Set<string> {
  const codes = layout.flatMap(flatRow).map((k) => k.code);
  if (extras) {
    extras.forEach((row) => row.forEach((k) => codes.push(k.code)));
  }
  return new Set(codes);
}
