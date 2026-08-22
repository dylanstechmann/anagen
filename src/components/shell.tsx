import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AS_OF } from "@/lib/data";

const HAIR_NAV = [
  { to: "/", label: "Atlas" },
  { to: "/biology", label: "Organ" },
  { to: "/stack", label: "Stack" },
  { to: "/pipeline", label: "Pipeline" },
  { to: "/ceiling", label: "Ceiling" },
  { to: "/lab", label: "Lab" },
  { to: "/desk", label: "Desk" },
] as const;

const TOOTH_NAV = [
  { to: "/tooth", label: "Atlas" },
  { to: "/tooth/organ", label: "Organ" },
  { to: "/tooth/stack", label: "Stack" },
  { to: "/tooth/pipeline", label: "Pipeline" },
  { to: "/tooth/lab", label: "Lab" },
  { to: "/desk", label: "Desk" },
] as const;

export function AppShell({
  children,
  organ = "hair",
}: {
  children: ReactNode;
  organ?: "hair" | "tooth";
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const mode = organ === "tooth" || pathname.startsWith("/tooth") ? "tooth" : "hair";
  const NAV = mode === "tooth" ? TOOTH_NAV : HAIR_NAV;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          <Link
            to="/"
            className="shrink-0 font-display text-xl tracking-tight text-fg"
          >
            Anagen
          </Link>
          <div className="flex shrink-0 rounded-lg border border-border p-0.5">
            <Link
              to="/"
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-medium min-h-9 inline-flex items-center",
                mode === "hair" ? "bg-raised text-fg" : "text-muted hover:text-fg",
              )}
            >
              Hair
            </Link>
            <Link
              to="/tooth"
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-medium min-h-9 inline-flex items-center",
                mode === "tooth" ? "bg-raised text-fg" : "text-muted hover:text-fg",
              )}
            >
              Tooth
            </Link>
          </div>
          <nav
            className="scroll-hide flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto"
            aria-label="Atlas"
          >
            {NAV.map((item) => {
              const active =
                item.to === "/" || item.to === "/tooth"
                  ? pathname === item.to
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "shrink-0 rounded-md px-2.5 py-2 text-sm transition-colors duration-150",
                    active
                      ? "bg-raised text-fg"
                      : "text-muted hover:bg-raised/70 hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="hidden shrink-0 text-xs text-faint tabular-nums sm:block">
            {AS_OF}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
      <footer className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="border-t border-border pt-6 text-sm text-faint">
          {mode === "tooth"
            ? "Research education, not dental advice. A bioengineered germ is not a treatment you can book. Trauma, implants, and orthodontics belong with a clinician."
            : "Research education, not medical advice. No protocol here is a prescription. Hair loss has several diseases; androgenetic alopecia is only one of them."}
        </div>
      </footer>
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="stagger-in max-w-3xl py-10 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-widest text-muted">
        {kicker}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {lede}
      </p>
    </header>
  );
}
