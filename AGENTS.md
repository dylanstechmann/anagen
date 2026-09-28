# Agent instructions — anagen

Work only in this repository. This is a static research map of hair-follicle
and tooth regeneration. It is not medical or dental advice and not a stack.

The live reader is GitHub Pages (`docs/` plus root `index.html`). Trial status
was described as “as of August 2026.” Do not leave that sentence unchanged if you edit trial rows.

## Do not

- Invent trial phase, approval, or enrollment. If you cannot open a primary source in this session, leave the row and write `UNVERIFIED` in your commit message rather than upgrading a status.
- Add product prices, clinics, or “what to take.”
- Couple this site to `geroscience-compound-atlas` hypothesis cards.
- Commit API keys.

## First commands

```bash
npm install
npm test
```

If `npm test` is not defined, run the project's existing check script if one exists (`npm run build` or the Pages static check). Do not add a heavy framework to force a test.

## Improve, in this order

1. Stamp a “reviewed on YYYY-MM-DD” next to any trial row you touch, with the URL you actually opened.
2. Keep phone layout working. Do not break `docs/` as the Pages target.
3. One content fix per session, not a redesign.

## Done when

The static atlas still builds or the existing Pages files still form a readable page, and every status you changed has a source.
