import { useMemo, useState } from "react";
import { tissueOptions } from "@/lib/tooth-data";
import { cn } from "@/lib/utils";

type Key = keyof typeof tissueOptions;
type Ids = { [K in Key]: (typeof tissueOptions)[K][number]["id"] };

const defaults: Ids = {
  enamel: "crazed",
  pulp: "dead",
  pdl: "dry",
  bone: "ok",
  gingiva: "scar",
};

function advise(s: Ids) {
  if (s.bone === "necrotic") {
    return {
      title: "Rebuild the nest first",
      body: "Thermal necrosis of alveolar bone is a contraindication for a germ, an implant, and a daydream. Debride, wait for living bone, regenerate the ridge, then talk about organs. A germ in dead bone does not erupt. It sequesters.",
      path: "Bone → gingiva → germ or implant",
      germ: "Blocked",
      original: "Unlikely",
    };
  }
  if (s.pulp !== "na" && s.pdl === "ok" && s.bone === "ok") {
    return {
      title: "Rescue the original organ",
      body: "The tooth is still an organ. If the pulp is vital, protect it. If not, endodontics or regenerative pulp keeps the root and the ligament. Crowns and composites fake enamel. That is not failure — enamel never was alive.",
      path: "Endo / reimplantation → crown → ortho if the bite drifted",
      germ: "Not indicated",
      original: "Possible, minus enamel",
    };
  }
  if (s.pdl === "dry" && s.pulp !== "na") {
    return {
      title: "Ligament is the clock",
      body: "Avulsion with a dried PDL often ends in ankylosis and replacement resorption. Reimplantation can still be tried. Do not confuse a fused root with a restored organ. If the root is lost later, you are in the reconstitution queue — with a socket that may still be usable.",
      path: "Urgent replant if the extra-oral time was short → watch for ankylosis → germ or autotransplant if the root fails",
      germ: "Later, if the socket lives",
      original: "Time-limited",
    };
  }
  if (s.pulp === "na" && s.bone === "ok") {
    return {
      title: "Germ, not a finished tooth",
      body: "The nest is empty and the bone is alive. An implant will chew. A bioengineered germ is how you get a periodontal ligament, proprioception, and a tooth that can still be moved. A vat-grown mineralized tooth is a custom screw. USAG-1 antibody is only in play if a latent third-dentition bud still exists at that address — unlikely after trauma destroyed the site.",
      path: "Soft-tissue frame → germ transplant (research) or implant (clinic) or autotransplant if a donor molar exists",
      germ: "The research path",
      original: "Shape not yet controllable",
    };
  }
  return {
    title: "Mixed injury — sequence the tissues",
    body: "Gingiva and bone set the order. Scar and recession are grafts, FGF-2, or cell sheets. Fractured sockets need reduction and time. Only then does the organ question become real. Alignment is orthodontics after whatever you put in the hole has roots.",
    path: "Frame (gingiva, bone) → organ (rescue, autotransplant, germ, implant) → bite",
    germ: "After the nest",
    original: "Partial",
  };
}

export function ToothLab() {
  const [state, setState] = useState<Ids>(defaults);
  const rec = useMemo(() => advise(state), [state]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          Tissue status
        </p>
        {(Object.keys(tissueOptions) as Key[]).map((key) => (
          <fieldset key={key}>
            <legend className="text-sm capitalize text-fg">{key}</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tissueOptions[key].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, [key]: opt.id }))}
                  className={cn(
                    "min-h-10 rounded-lg border px-3 text-sm transition-colors duration-150",
                    state[key] === opt.id
                      ? "border-fg bg-fg text-bg"
                      : "border-border text-muted hover:bg-raised hover:text-fg",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          What the model would do
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-tight">{rec.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-muted">{rec.body}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <Note label="Sequence" value={rec.path} />
          <Note label="Germ" value={rec.germ} />
          <Note label="Original organ" value={rec.original} />
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-faint">
          Teaching tool. Not a diagnosis, not a surgical plan, not a reason to
          delay emergency care after avulsion.
        </p>
      </div>
    </div>
  );
}

function Note({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-sm leading-snug text-fg">{value}</dd>
    </div>
  );
}
