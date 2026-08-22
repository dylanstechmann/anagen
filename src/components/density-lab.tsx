import { useMemo, useState } from "react";
import { HairField } from "@/components/hair-field";
import { norwood, ROI_CM2, YOUNG_DENSITY } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DensityLab() {
  const [stage, setStage] = useState<(typeof norwood)[number]["stage"]>(5);
  const row = norwood.find((n) => n.stage === stage) ?? norwood[4]!;

  const model = useMemo(() => {
    const original = YOUNG_DENSITY;
    const visible = Math.round(original * row.visible);
    const dormant = Math.round(original * row.dormant);
    const gone = Math.max(0, original - visible - dormant);
    const rescueNow = Math.round(visible + dormant * 0.38);
    const rescuePipeline = Math.round(visible + dormant * 0.62);
    const multiply = Math.round(
      Math.min(original * 1.15, (visible + dormant) * 1.8 + 40),
    );
    const invent = Math.round(original * 1.35);
    return {
      original,
      visible,
      dormant,
      gone,
      rescueNow,
      rescuePipeline,
      multiply,
      invent,
      massInvent: Math.round((invent / original) * 100),
    };
  }, [row]);

  const chart = [
    { name: "Visible", v: model.visible },
    { name: "Rescue", v: model.rescueNow },
    { name: "Pipeline", v: model.rescuePipeline },
    { name: "Multiply", v: model.multiply },
    { name: "Invent", v: model.invent },
    { name: "Youth", v: model.original },
  ];
  const max = model.invent;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          Norwood map
        </p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {norwood.map((n) => (
            <button
              key={n.stage}
              type="button"
              onClick={() => setStage(n.stage)}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center rounded-lg border text-sm transition-colors duration-150",
                stage === n.stage
                  ? "border-fg bg-fg text-bg"
                  : "border-border text-muted hover:bg-raised hover:text-fg",
              )}
            >
              <span className="font-mono text-xs">{n.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Stage {row.label} — {row.title}. Model of a {ROI_CM2} cm² crown field at{" "}
          {YOUNG_DENSITY} hairs/cm² youthful density. Not a diagnosis.
        </p>
        <div className="mt-5 h-44 overflow-hidden rounded-xl border border-border bg-bg text-fg">
          <HairField
            density={row.visible * 0.92 + 0.05}
            caliber={0.45 + row.visible * 0.55}
            seed={stage * 11}
          />
        </div>
      </div>

      <div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Visible now" value={model.visible} unit="/cm²" />
          <Stat label="Dormant organ" value={model.dormant} unit="/cm²" />
          <Stat label="Likely gone" value={model.gone} unit="/cm²" />
          <Stat label="Rescue now" value={model.rescueNow} unit="/cm²" />
          <Stat label="Multiply" value={model.multiply} unit="/cm²" />
          <Stat
            label="Invent vs youth"
            value={model.massInvent}
            unit="%"
            hint="theoretical"
          />
        </dl>
        <ul className="mt-6 space-y-2.5">
          {chart.map((rowBar) => (
            <li
              key={rowBar.name}
              className="grid grid-cols-[5.5rem_minmax(0,1fr)_3.25rem] items-center gap-3"
            >
              <span className="text-xs text-muted">{rowBar.name}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-raised">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.round((rowBar.v / max) * 100)}%` }}
                />
              </div>
              <span className="text-right font-mono text-xs tabular-nums text-faint">
                {rowBar.v}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted">
          Rescue can reclaim a fraction of dormant units. Transplant moves hair
          from the back; it does not mint organs. Multiply is the first way the
          count can rise. Invent is the only way the field exceeds childhood —
          and it is still a research program, not a clinic.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: number;
  unit: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <dt className="text-xs text-faint">
        {label}
        {hint ? ` · ${hint}` : ""}
      </dt>
      <dd className="mt-1 font-mono text-xl tabular-nums text-fg">
        {value}
        <span className="ml-1 text-xs text-muted">{unit}</span>
      </dd>
    </div>
  );
}
