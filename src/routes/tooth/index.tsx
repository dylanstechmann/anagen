import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArchField } from "@/components/arch-field";
import { Button } from "@/components/ui/button";
import { methods, toothHorizons, traumaNotes } from "@/lib/tooth-data";

export const Route = createFileRoute("/tooth/")({ component: ToothHome });

function ToothHome() {
  return (
    <>
      <section className="grid gap-10 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
        <div className="stagger-in">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Second organ · teeth and periodontium
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-tight text-fg sm:text-6xl lg:text-7xl">
            A germ, not a
            <br />
            tooth in a vat.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Synthesizing a finished tooth and its ligaments outside the body
            sounds like the honest restoration. It is the worse version of a
            good idea. You assemble a tooth germ ex vivo. You let it erupt in a
            living socket. The ligament is not a spare part. It is what
            development does when you do not skip it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/tooth/lab">
                Open the injury lab
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/tooth/pipeline">Read the pipeline</Link>
            </Button>
          </div>
        </div>
        <div className="h-52 overflow-hidden rounded-2xl border border-border bg-surface text-fg sm:h-64">
          <ArchField />
        </div>
      </section>

      <section className="grid gap-px border-b border-border bg-border sm:grid-cols-3">
        {toothHorizons.map((h) => (
          <article key={h.id} className="bg-bg px-0 py-10 sm:p-8 lg:p-10">
            <p className="font-mono text-xs text-faint">{h.roman}</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">{h.title}</h2>
            <p className="mt-2 text-sm text-muted">{h.kicker}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{h.body}</p>
            <p className="mt-4 text-sm leading-relaxed text-faint">{h.limit}</p>
          </article>
        ))}
      </section>

      <section className="border-b border-border py-14">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Would ex-vivo synthesis work?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Yes — of the germ. No — of a mineralized tooth with a ligament wrapped
          around it like wire. The distinction is the whole field.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {methods.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-7"
            >
              <p className="text-xs uppercase tracking-widest text-faint">{m.rank}</p>
              <h3 className="mt-2 font-display text-2xl tracking-tight">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14">
        <h2 className="font-display text-3xl tracking-tight">Punch, fire, lasers</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {traumaNotes.map((n) => (
            <article key={n.q} className="py-5">
              <h3 className="font-medium text-fg">{n.q}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{n.a}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
