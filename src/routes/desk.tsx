import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHead } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { askDesk } from "@/lib/ask-desk";
import { deskPrompts } from "@/lib/data";
import { toothDeskPrompts } from "@/lib/tooth-data";

export const Route = createFileRoute("/desk")({ component: DeskPage });

function DeskPage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(next?: string) {
    const q = (next ?? prompt).trim();
    if (q.length < 8 || pending) return;
    setPending(true);
    setError(null);
    setAnswer(null);
    setPrompt(q);
    try {
      const res = await askDesk({ data: { prompt: q } });
      if (res.ok) setAnswer(res.text);
      else setError(res.error);
    } catch {
      setError("The desk did not answer. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AppShell>
      <PageHead
        kicker="Desk"
        title="Ask a precise question."
        lede="Hair or tooth. One question at a time. The desk is a research assistant, not a clinic."
      />

      <div className="pb-12">
        <p className="text-xs uppercase tracking-widest text-faint">Hair</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {deskPrompts.map((p) => (
            <PromptChip key={p} p={p} onClick={() => void submit(p)} />
          ))}
        </div>
        <p className="mt-5 text-xs uppercase tracking-widest text-faint">Tooth</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {toothDeskPrompts.map((p) => (
            <PromptChip key={p} p={p} onClick={() => void submit(p)} />
          ))}
        </div>

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <label htmlFor="q" className="text-sm text-muted">
            Question
          </label>
          <textarea
            id="q"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="e.g. After thermal necrosis of the ridge, what has to happen before a tooth germ can erupt?"
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-fg placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-faint">{prompt.length}/500</p>
            <Button type="submit" disabled={pending || prompt.trim().length < 8}>
              {pending ? "Reading…" : "Ask the desk"}
            </Button>
          </div>
        </form>

        {error ? (
          <p className="mt-6 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
            {error}
          </p>
        ) : null}

        {answer ? (
          <article className="mt-6 whitespace-pre-wrap rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-fg sm:p-7">
            {answer}
          </article>
        ) : null}
      </div>
    </AppShell>
  );
}

function PromptChip({ p, onClick }: { p: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-10 rounded-full border border-border px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
    >
      {p}
    </button>
  );
}
