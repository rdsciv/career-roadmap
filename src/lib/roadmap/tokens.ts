/**
 * Design tokens shared by the web view and the @react-pdf/renderer PDF tree.
 * Web reads via Tailwind config + CSS vars (see globals.css).
 * PDF reads these objects directly via StyleSheet.create.
 */

export const palette = {
  ink: "#15171A",
  paper: "#F7F4EE",
  paperRaised: "#FFFDF7",
  stone: "#76716A",
  stoneSoft: "#B7B0A4",
  rule: "#E5DFD3",
  marker: "#C2410C",
  wash: "#1B3A4B",
  washSoft: "#3A7A95",
  inverseInk: "#F7F4EE",
} as const;

export const fonts = {
  display: "var(--font-display), 'Fraunces', Georgia, serif",
  body: "var(--font-body), 'Source Serif 4', Georgia, serif",
  ui: "var(--font-ui), 'Geist Sans', ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-mono), 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const sizes = {
  h1: { px: 56, lh: 1.02 },
  h2: { px: 34, lh: 1.05 },
  h3: { px: 14, lh: 1.4 },
  bodyLg: { px: 18, lh: 1.45 },
  bodyMd: { px: 16, lh: 1.5 },
  bodySm: { px: 15, lh: 1.55 },
  pillMono: { px: 12.5, lh: 1 },
} as const;

export const motion = {
  reveal: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  hover: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
} as const;
