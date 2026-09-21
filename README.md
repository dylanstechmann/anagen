# ANAGEN

A research atlas of two mini-organs: the hair follicle and the tooth.

Hair loss is usually miniaturization, not erasure. A lost tooth is six tissues, not a white gap. This site maps what is approved, what is in trial as of August 2026, and where reconstitution (a germ, not a cream or a screw) actually sits.

Not medical or dental advice.

## Use it (phone, tablet, desktop)

**Live:** [https://dylanstechmann.github.io/anagen/](https://dylanstechmann.github.io/anagen/)

Open that link in Safari or Chrome. On a phone: Share → Add to Home Screen.

The Pages site is a static, offline-friendly reader of the atlas (hair + tooth). No account. No API key.

The full TanStack Start app (density lab canvas, optional research desk) still runs locally:

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Atlas

| Wing | In the app | On GitHub Pages |
| --- | --- | --- |
| Hair | `/` organ, stack, pipeline, ceiling, density lab | Hair tabs: Atlas, Stack, Pipeline, Biology, Lab, Myths |
| Tooth | `/tooth` organ, stack, pipeline, injury lab | Tooth tabs: Atlas, Methods, Stack, Pipeline, Organ, Trauma |
| Desk | `/desk` — optional; needs `XAI_API_KEY` | Not on Pages (needs a server key) |

Auth is off. There are no accounts and no patient records.

## GitHub Pages

Static files live in `docs/`. A workflow deploys them to GitHub Pages on every push to `main`.

If the `.io` link 404s on the first hour: Repo **Settings → Pages → Source → GitHub Actions** (or Deploy from branch `main` / folder `/docs`).

Do not commit API keys.

## Stack

TanStack Start, React 19, Tailwind 4, Vite. The research desk calls the xAI API when a key is present.

## License

Personal research project. Cite the papers, not this site, if you write about the biology.
