import { createFileRoute } from "@tanstack/react-router";
import { FollicleAnatomy } from "@/components/follicle-anatomy";
import { AppShell, PageHead } from "@/components/shell";
import { cycle } from "@/lib/data";

export const Route = createFileRoute("/biology")({ component: BiologyPage });

function BiologyPage() {
  return (
    <AppShell>
      <PageHead
        kicker="Volume I"
        title="The follicle is a mini-organ."
        lede="It has a stem-cell niche, an inductive mesenchyme, a cycling factory, and a blood supply. You do not ‘grow hair’ so much as you keep this organ in anagen and stop androgens from shrinking it."
      />

      <FollicleAnatomy />

      <section className="mt-16 border-t border-border pt-12">
        <h2 className="font-display text-3xl tracking-tight">The cycle is the product</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Three phases. Only one makes a fiber. AGA is a progressive shortening
          of anagen until the organ is still there and the hair is not.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {cycle.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <p className="font-mono text-xs text-faint">{c.share} of hairs</p>
              <h3 className="mt-2 font-display text-2xl">{c.name}</h3>
              <p className="mt-1 text-sm text-muted">{c.span}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 pb-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight">Miniaturization</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Testosterone is converted by 5α-reductase to DHT. In follicles that
            express enough androgen receptor — typically frontal and vertex —
            DHT shortens anagen and shrinks the papilla. The next hair is
            thinner and paler. Repeat for a decade and you have a ‘bald’ zone
            full of vellus organs. Occipital follicles are relatively deaf to
            this signal. That is donor dominance, not magic.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight">The embryonic cap</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Placodes form in waves between roughly weeks 9 and 14 of gestation
            under Wnt, EDA/EDAR, and Shh. After birth, humans do not add
            follicles under ordinary conditions. You can thicken shafts, prolong
            anagen, and move units around. You cannot, today, stamp new placodes
            onto a bald crown. That limit is the entire reason the Invent
            horizon exists.
          </p>
        </article>
      </section>
    </AppShell>
  );
}
