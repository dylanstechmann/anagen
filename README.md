# ANAGEN

A research atlas of two mini-organs: the hair follicle and the tooth.

Hair loss is usually miniaturization, not erasure. A lost tooth is six tissues, not a white gap. This site maps what is approved, what is in trial as of August 2026, and where reconstitution (a germ, not a cream or a screw) actually sits.

Not medical or dental advice.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

```bash
npm run typecheck
npm run build
npm run preview
```

## Atlas

| Wing | Routes |
| --- | --- |
| Hair | `/` organ, stack, pipeline, ceiling, density lab |
| Tooth | `/tooth` organ, stack, pipeline, injury lab |
| Desk | `/desk` — optional; needs `XAI_API_KEY` |

Auth is off. There are no accounts and no patient records.

## Stack

TanStack Start, React 19, Tailwind 4, Vite. The research desk calls the xAI API when a key is present.

## License

Personal research project. Cite the papers, not this site, if you write about the biology.
