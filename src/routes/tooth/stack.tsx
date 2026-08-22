import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/shell";
import { toothTreatments } from "@/lib/tooth-data";

export const Route = createFileRoute("/tooth/stack")({ component: ToothStack });

function ToothStack() {
  return (
    <>
      <PageHead
        kicker="Tooth · Stack"
        title="What dentistry already knows how to do."
        lede="Most of a damaged mouth is still a rescue and replace problem. Reconstitution is for the gap that those cannot honestly fill: a living organ with a ligament, in an adult, after the original is gone."
      />
      <div className="space-y-4 pb-10">
        {toothTreatments.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl border border-border bg-surface p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl tracking-tight">{t.name}</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-border px-2.5 py-1 text-muted">
                  {t.evidence}
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 text-muted">
                  {t.horizon}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.mechanism}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-widest text-faint">Can</dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg">{t.can}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-faint">Cannot</dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg">{t.cannot}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
