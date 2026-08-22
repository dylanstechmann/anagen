import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/shell";
import { toothPipeline } from "@/lib/tooth-data";

export const Route = createFileRoute("/tooth/pipeline")({
  component: ToothPipeline,
});

function ToothPipeline() {
  return (
    <>
      <PageHead
        kicker="Tooth · Pipeline"
        title="What is actually in motion."
        lede="One antibody in humans. One germ method that already erupted teeth in adult animals, with the ligament attached. Cell sheets and FGF-2 for the gums and bone you still have. Dates as of August 2026."
      />
      <ol className="relative ml-3 space-y-4 border-l border-border pb-12 sm:ml-4">
        {toothPipeline.map((item) => (
          <li key={item.id} className="pl-8 sm:pl-10">
            <span className="absolute -left-[5px] mt-6 size-2.5 rounded-full bg-fg" />
            <article className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-xs text-faint">
                  {item.year} · {item.phase}
                </p>
                <p className="text-xs text-muted">{item.verdict}</p>
              </div>
              <h2 className="mt-2 font-display text-2xl tracking-tight">{item.name}</h2>
              <p className="text-sm text-muted">{item.org}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.mechanism}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg">{item.signal}</p>
              <p className="mt-3 text-sm leading-relaxed text-faint">{item.why}</p>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
}
