# ANAGEN

A research atlas of two mini-organs: the hair follicle and the tooth.

Hair loss is usually miniaturization, not erasure. A lost tooth is six tissues, not a white gap. This site's core map dates to August 2026; updated trial records show individual review dates and sources. It maps approved approaches, trials, and where reconstitution (a germ, not a cream or a screw) actually sits.

Not medical or dental advice.

## Use it (phone, tablet, desktop)

**Live:** [https://dylanstechmann.github.io/anagen/](https://dylanstechmann.github.io/anagen/)

Direct atlas page: [https://dylanstechmann.github.io/anagen/docs/](https://dylanstechmann.github.io/anagen/docs/)

Open that link in Safari or Chrome. On a phone: Share → Add to Home Screen.

The Pages site is a static reader of the atlas (hair + tooth). No account. No API key.

### Atlas Static Reader Enhancements

- **Dark & Light Mode Theming**: Full dark and light theme palette with an in-header toggle button (`#theme-toggle`) and `localStorage` persistence, honoring system `prefers-color-scheme`.
- **Mobile Responsiveness**: Fluid typography scaling (`clamp()`), touch-friendly horizontal tab scrolling (`scroll-snap-type: x mandatory`), and adaptive single/dual-column layouts across small screens.
- **Side-by-Side Trial Comparison**: Interactive trial evaluation panel (`Compare` tab) for both hair and tooth programs:
  - Compares candidates across biological targets, mechanisms of action, clinical trial phases, human evidence, and honest biological limitations.
  - One-click quick comparison presets (e.g. *Clascoterone vs PP405*, *Rescue vs Multiply*, *TRG035 vs Bioengineered Germ*, *PDL Sheets vs REGROTH*).
  - Every trial record links directly to primary sources and clinical registries reviewed as of September 2026.

The full TanStack Start app still runs locally:

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

### Verification

```bash
npm test
npm run typecheck
```

## GitHub Pages

Enabled from branch `main`. Root `index.html` forwards to `docs/`, which is the phone-friendly atlas.

Do not commit API keys.

## License

Personal research project. Cite the papers, not this site, if you write about the biology.
