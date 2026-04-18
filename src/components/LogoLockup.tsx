import { LogoIcon } from "./LogoIcon";

interface LogoLockupProps {
  iconSize?: number;
  className?: string;
}

/**
 * Stacked wordmark lockup.
 * Icon centered above two-line text:
 *   REPAIR          (large, bold, wide tracking)
 *   BEFORE REPLACE  (smaller, medium weight, wider tracking)
 */
export function LogoLockup({ iconSize = 48, className = "" }: LogoLockupProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <LogoIcon size={iconSize} />
      <div className="flex flex-col items-center leading-tight">
        <span
          style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.18em" }}
          className="text-white font-bold text-xl uppercase"
        >
          Repair
        </span>
        <span
          style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.12em" }}
          className="text-slate-400 font-medium text-xs uppercase"
        >
          Before Replace
        </span>
      </div>
    </div>
  );
}
