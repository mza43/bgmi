export function rangeBackground(
  value: number,
  min: number,
  max: number,
  primary = "var(--mint)",
  track = "#2e2e2e"
) {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, ${primary} 0%, ${primary} ${pct}%, ${track} ${pct}%, ${track} 100%)`,
  } as React.CSSProperties;
}
