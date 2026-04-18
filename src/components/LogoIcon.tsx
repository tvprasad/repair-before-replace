interface LogoIconProps {
  size?: number;
  className?: string;
}

/**
 * Two-arc circular renewal loop with open chevron arrowheads and green leaf.
 *
 * Arc A: lower-left (P2) → CW over top → upper-right (P1)
 * Arc B: upper-right (P1) → CW under bottom → lower-left (P2)
 * Arrowheads: open chevrons (no fill) at P1 (pointing SE) and P2 (pointing NW)
 * Leaf: broad oval, centered, rotated 40° CW, green fill, white outline, midrib
 */
export function LogoIcon({ size = 48, className = "" }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Repair Before Replace"
    >
      {/* Arc A: P2(15,46) → CW over top → P1(48,16) — small-arc CW = over the top ~135° */}
      <path d="M 15 46 A 22 22 0 0 1 48 16"
        stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Open chevron at P1 — arc arrives heading SE, wings spread back toward N and W */}
      <polyline points="43,16 50,18 48,11"
        stroke="#f1f5f9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Arc B: P1(48,16) → CW under bottom → P2(15,46) — large-arc CW = under the bottom ~225° */}
      <path d="M 48 16 A 22 22 0 1 1 15 46"
        stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Open chevron at P2 — arc arrives heading NW, wings spread back toward S and E */}
      <polyline points="20,46 13,44 15,51"
        stroke="#f1f5f9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Green leaf: broad oval, 26px tall × 13px wide, rotated 40° CW, white outline, dark midrib */}
      <g transform="rotate(40, 32, 32)">
        <path
          d="M 32 19 C 38.5 24 38.5 40 32 45 C 25.5 40 25.5 24 32 19 Z"
          fill="#22c55e"
          stroke="#f1f5f9"
          strokeWidth="1.4"
        />
        <line x1="32" y1="19" x2="32" y2="45"
          stroke="#15803d" strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function LogoFavicon({ size = 32, className = "" }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Repair Before Replace"
    >
      <path d="M 15 46 A 22 22 0 0 1 48 16"
        stroke="#f1f5f9" strokeWidth="3.8" strokeLinecap="round" fill="none" />
      <polyline points="42,15 51,18 48,10"
        stroke="#f1f5f9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <path d="M 48 16 A 22 22 0 1 1 15 46"
        stroke="#f1f5f9" strokeWidth="3.8" strokeLinecap="round" fill="none" />
      <polyline points="21,47 12,44 14,52"
        stroke="#f1f5f9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <g transform="rotate(40, 32, 32)">
        <path
          d="M 32 17 C 40 23 40 41 32 47 C 24 41 24 23 32 17 Z"
          fill="#22c55e"
          stroke="#f1f5f9"
          strokeWidth="1.6"
        />
        <line x1="32" y1="17" x2="32" y2="47"
          stroke="#15803d" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
