import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HairField } from "@/components/hair-field";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { AS_OF, horizons } from "@/lib/data";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <section className="grid gap-10 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
        <div className="stagger-in">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Research atlas · {AS_OF}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Thicker than it
            <br />
            ever was.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Height is finished when the plates fuse. Follicles and teeth are
            mini-organs. The honest project is rescue of what is still there,
            reconstitution of a germ when it is not, and — only in theory —
            invention past the original map.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/lab">
                Hair density lab
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/tooth">Tooth atlas</Link>
            </Button>
          </div>
        </div>
        <div className="h-56 overflow-hidden rounded-2xl border border-border bg-surface text-fg sm:h-72">
          <HairField density={0.78} caliber={0.95} seed={3} />
        </div>
      </section>

      <section className="grid gap-px border-b border-border bg-border py-0 sm:grid-cols-3">
        {horizons.map((h) => (
          <article key={h.id} className="bg-bg px-0 py-10 sm:p-8 lg:p-10">
            <p className="font-mono text-xs text-faint">{h.roman}</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">{h.title}</h2>
            <p className="mt-2 text-sm text-muted">{h.kicker}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{h.body}</p>
            <p className="mt-4 text-sm leading-relaxed text-faint">{h.limit}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-10 border-b border-border py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            The other organ
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Teeth do not miniaturize. They are lost, fractured, burned, or
            extracted. The implant is a fused prosthesis. The original is an
            organ with a periodontal ligament. Same reconstitution logic as
            hair — epithelial plus mesenchymal germ — and a second, possibly
            better path: wake a suppressed third dentition with an antibody.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link to="/tooth">
                Open the tooth atlas
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Hair
          </p>
          <ul className="mt-4 divide-y divide-border">
            {[
              { to: "/biology", t: "The organ", d: "Anatomy, cycle, miniaturization." },
              { to: "/stack", t: "The stack", d: "What is approved, off-label, or noise." },
              { to: "/pipeline", t: "The pipeline", d: "Clascoterone, PP405, cloning germs." },
              { to: "/desk", t: "The desk", d: "Ask a precise question." },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-baseline justify-between gap-4 py-3 text-fg transition-colors hover:text-muted"
                >
                  <span className="font-medium">{item.t}</span>
                  <span className="text-sm text-faint">{item.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
