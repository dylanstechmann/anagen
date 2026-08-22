import { createFileRoute } from "@tanstack/react-router";
import { ToothAnatomy } from "@/components/tooth-anatomy";
import { PageHead } from "@/components/shell";

export const Route = createFileRoute("/tooth/organ")({ component: ToothOrgan });

function ToothOrgan() {
  return (
    <>
      <PageHead
        kicker="Tooth · Organ"
        title="A tooth is six tissues pretending to be one."
        lede="Enamel, dentin, pulp, cementum, periodontal ligament, bone, gingiva. Trauma picks which of them die. Restoration has to name the dead ones or it is just cosmetics."
      />
      <ToothAnatomy />
      <section className="mt-16 grid gap-8 pb-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight">Why implants feel wrong</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Osseointegration is a triumph of materials. Bone fuses to titanium.
            A natural root is separated from bone by a ligament a fraction of a
            millimetre thick, packed with proprioceptors. That gap is the
            difference between chewing and knowing. It is also why a living
            tooth can be straightened and an implant cannot. If the goal is the
            original organ, fusion is the failure mode.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight">Two maps, not one</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Primary teeth form in utero and erupt after birth. Permanent teeth
            are a second map. A vestigial third dental lamina is the object
            Toregem is trying to wake. ‘As when I was born’ is the wrong
            photograph. The one you want is the permanent set before the punch
            — plus jaws that may have changed since.
          </p>
        </article>
      </section>
    </>
  );
}
