import { cn } from "@/lib/utils";

const TEETH = [
  { w: 9, h: 20, dmg: false },
  { w: 11, h: 26, dmg: true },
  { w: 13, h: 32, dmg: true },
  { w: 15, h: 28, dmg: false },
  { w: 15, h: 28, dmg: false },
  { w: 13, h: 32, dmg: true },
  { w: 11, h: 26, dmg: false },
  { w: 9, h: 20, dmg: false },
];

export function ArchField({ className }: { className?: string }) {
  const start = 16;
  const gap = 10.5;
  return (
    <svg
      viewBox="0 0 100 52"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M4 34 Q50 48 96 34 L96 52 L4 52 Z"
        fill="currentColor"
        opacity="0.08"
      />
      {TEETH.map((t, i) => {
        const x = start + i * gap - t.w / 2;
        const y = 34 - t.h;
        return (
          <g key={i} opacity={t.dmg ? 0.38 : 0.9}>
            <path
              d={
                t.dmg
                  ? `M ${x} ${y + 7} L ${x + t.w * 0.35} ${y} L ${x + t.w * 0.55} ${y + 9} L ${x + t.w} ${y + 3} L ${x + t.w} ${y + t.h} Q ${x + t.w / 2} ${y + t.h + 5} ${x} ${y + t.h} Z`
                  : `M ${x} ${y} Q ${x + t.w / 2} ${y - 3} ${x + t.w} ${y} L ${x + t.w} ${y + t.h} Q ${x + t.w / 2} ${y + t.h + 5} ${x} ${y + t.h} Z`
              }
              fill="currentColor"
            />
          </g>
        );
      })}
    </svg>
  );
}
