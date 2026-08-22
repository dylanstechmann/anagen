import { useState } from "react";
import { anatomy } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FollicleAnatomy() {
  const [active, setActive] = useState(anatomy[1]!.id);
  const current = anatomy.find((a) => a.id === active) ?? anatomy[0]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <svg
          viewBox="0 0 280 440"
          className="mx-auto h-auto w-full max-w-sm text-fg"
          role="img"
          aria-label="Cross-section of a hair follicle"
        >
          <rect x="8" y="8" width="264" height="424" rx="18" fill="currentColor" opacity="0.03" />
          <path d="M20 72h240" stroke="currentColor" strokeWidth="10" opacity="0.12" />
          <path d="M20 78h240" stroke="currentColor" strokeWidth="22" opacity="0.06" />
          <path
            d="M132 18 c4 20 6 36 6 54 v18"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M118 88 c2 70 4 130 22 188"
            fill="none"
            stroke="currentColor"
            strokeWidth="26"
            strokeLinecap="round"
            opacity="0.14"
          />
          <path
            d="M118 88 c2 70 4 130 22 188"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.28"
          />
          <ellipse cx="148" cy="168" rx="22" ry="16" fill="currentColor" opacity="0.12" />
          <path
            d="M96 150 c18 8 28 22 32 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.35"
          />
          <circle cx="154" cy="318" r="34" fill="currentColor" opacity="0.1" />
          <circle cx="154" cy="322" r="16" fill="currentColor" opacity="0.2" />
          <circle cx="154" cy="324" r="7" fill="currentColor" opacity="0.55" />
          <Hotspot cx={134} cy={36} id="shaft" active={active} onSelect={setActive} />
          <Hotspot cx={148} cy={168} id="bulge" active={active} onSelect={setActive} />
          <Hotspot cx={188} cy={118} id="sebaceous" active={active} onSelect={setActive} />
          <Hotspot cx={128} cy={128} id="isthmus" active={active} onSelect={setActive} />
          <Hotspot cx={154} cy={292} id="bulb" active={active} onSelect={setActive} />
          <Hotspot cx={154} cy={324} id="papilla" active={active} onSelect={setActive} />
        </svg>
        <p className="mt-3 text-center text-xs text-faint">
          Tap a node. The organ is still there even when the shaft is not.
        </p>
      </div>

      <div>
        <ul className="flex flex-wrap gap-2">
          {anatomy.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "rounded-full border px-3 py-2 text-sm transition-colors duration-150 min-h-10",
                  active === item.id
                    ? "border-fg bg-fg text-bg"
                    : "border-border text-muted hover:text-fg hover:bg-raised",
                )}
              >
                {item.name.split("—")[0]!.trim()}
              </button>
            </li>
          ))}
        </ul>
        <h2 className="mt-6 font-display text-3xl tracking-tight">{current.name}</h2>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
          {current.fact}
        </p>
      </div>
    </div>
  );
}

function Hotspot({
  cx,
  cy,
  id,
  active,
  onSelect,
}: {
  cx: number;
  cy: number;
  id: string;
  active: string;
  onSelect: (id: string) => void;
}) {
  const is = active === id;
  return (
    <g className="cursor-pointer" onClick={() => onSelect(id)}>
      <circle cx={cx} cy={cy} r={is ? 11 : 9} fill="var(--color-bg)" opacity="0.9" />
      <circle
        cx={cx}
        cy={cy}
        r={is ? 7 : 5.5}
        fill={is ? "var(--color-fg)" : "var(--color-muted)"}
      />
    </g>
  );
}
