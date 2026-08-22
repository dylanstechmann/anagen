import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHead } from "@/components/shell";
import { genes, myths, packing } from "@/lib/data";

export const Route = createFileRoute("/ceiling")({ component: CeilingPage });

function CeilingPage() {
  return (
    <AppShell>
      <PageHead
        kicker="Volume IV"
        title="Thicker than childhood."
        lede="Two different questions hide in that sentence. Can a shaft exceed its youthful caliber? Sometimes. Can a scalp exceed its embryonic follicle count? Not with anything you can buy. That is the invent horizon."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <Figure
          k="~180–220"
          u="hairs / cm²"
          d="Typical youthful scalp density. Occipital donor can run higher."
        />
        <Figure
          k={`~${packing.denseOccipital}`}
          u="hairs / cm²"
          d="Dense occipital packing. This is why FUE has a budget."
        />
        <Figure
          k={`~${packing.geometricCap}`}
          u="FU / cm² cap"
          d="A geometric guess before follicles crowd their own blood supply. Not a measured human maximum."
        />
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <article>
          <h2 className="font-display text-3xl tracking-tight">Caliber versus count</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Shaft diameter tracks dermal papilla volume. Rescue can walk a
            miniaturized follicle back toward terminal. Oral minoxidil’s
            off-target hypertrichosis — face, arms — is an existence proof that
            shafts can outgrow a remembered baseline. That is mass, not new
            organs.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Count is assigned in utero. Transplants rearrange it. Cloning would
            copy it. Neogenesis would write new addresses on the map. Congenital
            hypertrichosis and the EDAR V370A variant already show the genome
            knows how to issue more or thicker appendages. We do not yet have a
            safe, local way to ask an adult scalp to do that.
          </p>
        </article>
        <article>
          <h2 className="font-display text-3xl tracking-tight">Why not height</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Long bones finish when growth plates fuse. There is no residual
            organ cycling through anagen. Follicles keep a stem-cell niche for
            life unless scarring disease destroys it. Teeth are closer to hair
            than to height — another epithelial–mesenchymal organ, which is why
            the same Japanese reconstitution program names both.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Wnt is the dangerous gift. Raise it in epidermis and you can
            nucleate follicles. Leave it on and you exhaust the niche or invite
            tumors. Any invent therapy that cannot be spatially and temporally
            boxed is not a therapy.
          </p>
        </article>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl tracking-tight">Levers in the genome</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {genes.map((g) => (
            <article key={g.id} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-mono text-sm text-fg">{g.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 pb-8">
        <h2 className="font-display text-3xl tracking-tight">Discards</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {myths.map((m) => (
            <article key={m.q} className="py-5">
              <h3 className="font-medium text-fg">{m.q}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{m.a}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Figure({ k, u, d }: { k: string; u: string; d: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="font-mono text-2xl tabular-nums text-fg">{k}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-faint">{u}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
    </div>
  );
}
