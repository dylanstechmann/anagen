import { useMemo, useState } from "react";
import { HairField } from "@/components/hair-field";
import { norwood, ROI_CM2, YOUNG_DENSITY } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DensityLab() {
  const [stage, setStage] = useState<(typeof norwood)[number]["stage"]>(5);
  const [rescueNowShare, setRescueNowShare] = useState(0.38);
  const [pipelineRescueShare, setPipelineRescueShare] = useState(0.62);
  const [multiplyFactor, setMultiplyFactor] = useState(1.8);
  const [inventFactor, setInventFactor] = useState(1.35);
  const row = norwood.find((n) => n.stage === stage) ?? norwood[4]!;

  const model = useMemo(() => {
    const original = YOUNG_DENSITY;
    const visible = Math.round(original * row.visible);
    const dormant = Math.round(original * row.dormant);
    const gone = Math.max(0, original - visible - dormant);
    const rescueNow = Math.round(visible + dormant * rescueNowShare);
    const rescuePipeline = Math.round(visible + dormant * pipelineRescueShare);
    const multiply = Math.round((visible + dormant) * multiplyFactor);
    const invent = Math.round(original * inventFactor);
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
      rescueRange: [visible, visible + dormant] as const,
      multiplyRange: [Math.round((visible + dormant) * 1), Math.round((visible + dormant) * 2)] as const,
      inventRange: [original, Math.round(original * 1.5)] as const,
    };
  }, [row, rescueNowShare, pipelineRescueShare, multiplyFactor, inventFactor]);

  const chart = [
    { name: "Visible", v: model.visible },
    { name: "Rescue", v: model.rescueNow },
    { name: "Pipeline", v: model.rescuePipeline },
    { name: "Multiply", v: model.multiply },
    { name: "Invent", v: model.invent },
    { name: "Youth", v: model.original },
  ];
  const max = Math.max(...chart.map((item) => item.v));

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
          Stage {row.label} — {row.title}. Teaching scenario for a {ROI_CM2} cm² crown
          field with an assumed youthful reference of {YOUNG_DENSITY} hairs/cm².
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
          <Stat label="Rescue scenario" value={model.rescueNow} unit="/cm²" hint="assumed" />
          <Stat label="Multiply scenario" value={model.multiply} unit="/cm²" hint="assumed" />
          <Stat
            label="Invent vs youth"
            value={model.massInvent}
            unit="%"
            hint="theoretical"
          />
        </dl>
        <section className="mt-6 rounded-xl border border-border bg-surface p-4" aria-label="Scenario assumptions">
          <h2 className="text-sm font-semibold text-fg">Illustrative assumptions</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            These controls are teaching inputs, not measured response rates or treatment forecasts.
          </p>
          <ScenarioSlider label="Dormant share rescued · current scenario" value={rescueNowShare} min={0} max={1} onChange={setRescueNowShare} />
          <ScenarioSlider label="Dormant share rescued · pipeline scenario" value={pipelineRescueShare} min={0} max={1} onChange={setPipelineRescueShare} />
          <ScenarioSlider label="Multiply scenario factor" value={multiplyFactor} min={1} max={2} step={0.05} onChange={setMultiplyFactor} suffix="×" />
          <ScenarioSlider label="Invent scenario vs reference" value={inventFactor} min={1} max={1.5} step={0.05} onChange={setInventFactor} suffix="×" />
        </section>
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
          Sensitivity spans from these controls are {model.rescueRange[0]}–{model.rescueRange[1]} hairs/cm² for
          rescue, {model.multiplyRange[0]}–{model.multiplyRange[1]} for multiply, and
          {model.inventRange[0]}–{model.inventRange[1]} for invent. These are arithmetic
          scenario bounds, not expected outcomes. No treatment response is predicted.
        </p>
      </div>
    </div>
  );
}

function ScenarioSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  suffix = "%",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  const shown = suffix === "%" ? `${Math.round(value * 100)}%` : `${value.toFixed(2)}${suffix}`;
  return (
    <label className="mt-3 block text-xs text-muted">
      <span className="flex justify-between gap-4"><span>{label}</span><span className="font-mono text-fg">{shown}</span></span>
      <input
        className="mt-2 w-full accent-current"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
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
