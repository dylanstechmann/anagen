import { useMemo } from "react";
import { cn } from "@/lib/utils";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function HairField({
  density = 0.7,
  caliber = 0.8,
  className,
  seed = 7,
}: {
  density?: number;
  caliber?: number;
  className?: string;
  seed?: number;
}) {
  const hairs = useMemo(() => {
    const rand = mulberry32(seed);
    const cols = 36;
    const rows = 16;
    const items: {
      x: number;
      y: number;
      h: number;
      lean: number;
      on: boolean;
      thin: boolean;
    }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitter = rand();
        const on = jitter < density * (0.55 + r / rows);
        const thin = on && jitter > density * 0.62;
        items.push({
          x: (c + 0.2 + rand() * 0.6) * (100 / cols),
          y: 22 + r * 4.85 + rand() * 1.4,
          h: 14 + rand() * 16 * caliber * (thin ? 0.5 : 1),
          lean: (rand() - 0.5) * 10,
          on,
          thin,
        });
      }
    }
    return items;
  }, [caliber, density, seed]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      {hairs.map((h, i) =>
        h.on ? (
          <path
            key={i}
            d={`M ${h.x} ${h.y} q ${h.lean} ${-h.h * 0.55} ${h.lean * 0.28} ${-h.h}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={h.thin ? 0.22 : 0.48 * caliber + 0.16}
            strokeLinecap="round"
            opacity={h.thin ? 0.22 : 0.78}
          />
        ) : null,
      )}
    </svg>
  );
}
