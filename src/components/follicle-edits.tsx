import { follicleEditLimit, follicleEdits } from "@/lib/follicle-edits-data";

export function FollicleEdits() {
  return (
    <section className="mt-14">
      <h2 className="font-display text-3xl tracking-tight">Editing the follicle</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Two different edits get collapsed into one wish. Stopping pattern loss
        means changing how a papilla hears DHT. Changing color means changing
        the melanocyte that paints the next shaft. Neither is a treatment on
        this map.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {follicleEdits.map((edit) => (
          <article
            key={edit.id}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-faint">
              {edit.aim}
            </p>
            <h3 className="mt-2 font-display text-2xl tracking-tight">{edit.cell}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{edit.change}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <span className="text-fg">Cannot. </span>
              {edit.cannot}
            </p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-faint">{edit.status}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{follicleEditLimit}</p>
    </section>
  );
}
