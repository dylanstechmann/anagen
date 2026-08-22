import { useState } from "react";
import { toothAnatomy } from "@/lib/tooth-data";
import { cn } from "@/lib/utils";

export function ToothAnatomy() {
  const [active, setActive] = useState<string>(toothAnatomy[3]!.id);
  const current = toothAnatomy.find((a) => a.id === active) ?? toothAnatomy[0]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <svg
          viewBox="0 0 280 440"
          className="mx-auto h-auto w-full max-w-sm text-fg"
          role="img"
          aria-label="Cross-section of a tooth in its socket"
        >
          <rect x="8" y="8" width="264" height="424" rx="18" fill="currentColor" opacity="0.03" />
          <path d="M36 168 h208 v232 h-208 z" fill="currentColor" opacity="0.05" />
          <path
            d="M78 168 C78 168 70 250 72 360 L208 360 C210 250 202 168 202 168"
            fill="currentColor"
            opacity="0.08"
          />
          <path
            d="M96 168 C94 248 96 330 98 360"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.25"
          />
          <path
            d="M184 168 C186 248 184 330 182 360"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.25"
          />
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M ${104 + i * 8} 176 q 4 18 0 34`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              opacity="0.35"
            />
          ))}
          <path
            d="M108 48 C100 70 92 110 96 168 L184 168 C188 110 180 70 172 48 C160 28 120 28 108 48 Z"
            fill="currentColor"
            opacity="0.16"
          />
          <path
            d="M118 72 C112 96 108 130 110 168 L170 168 C172 130 168 96 162 72 C154 56 126 56 118 72 Z"
            fill="currentColor"
            opacity="0.12"
          />
          <path
            d="M132 96 C128 120 128 150 130 168 L150 168 C152 150 152 120 148 96 C144 86 136 86 132 96 Z"
            fill="currentColor"
            opacity="0.2"
          />
          <Hotspot cx={140} cy={58} id="enamel" active={active} onSelect={setActive} />
          <Hotspot cx={140} cy={118} id="dentin" active={active} onSelect={setActive} />
          <Hotspot cx={140} cy={148} id="pulp" active={active} onSelect={setActive} />
          <Hotspot cx={100} cy={220} id="pdl" active={active} onSelect={setActive} />
          <Hotspot cx={64} cy={280} id="bone" active={active} onSelect={setActive} />
          <Hotspot cx={140} cy={168} id="gingiva" active={active} onSelect={setActive} />
        </svg>
        <p className="mt-3 text-center text-xs text-faint">
          Tap a node. The ligament is the organ people forget to want.
        </p>
      </div>

      <div>
        <ul className="flex flex-wrap gap-2">
          {toothAnatomy.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "min-h-10 rounded-full border px-3 py-2 text-sm transition-colors duration-150",
                  active === item.id
                    ? "border-fg bg-fg text-bg"
                    : "border-border text-muted hover:bg-raised hover:text-fg",
                )}
              >
                {item.name}
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
