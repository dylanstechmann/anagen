import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHead } from "@/components/shell";
import { evidenceLabel, horizonLabel, treatments } from "@/lib/data";

export const Route = createFileRoute("/stack")({ component: StackPage });

function StackPage() {
  return (
    <AppShell>
      <PageHead
        kicker="Volume II"
        title="The stack, ranked by evidence."
        lede="Thirty years of two FDA drugs taught the field the wrong lesson — that nothing new could exist. The lesson was that androgen and anagen biology is conservative, not that it is finished."
      />

      <div className="space-y-4 pb-10">
        {treatments.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl border border-border bg-surface p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl tracking-tight">{t.name}</h2>
                {t.aka ? <p className="text-sm text-faint">{t.aka}</p> : null}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-border px-2.5 py-1 text-muted">
                  {evidenceLabel(t.evidence)}
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 text-muted">
                  {horizonLabel(t.horizon)}
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
            <p className="mt-4 text-sm text-faint">{t.note}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
