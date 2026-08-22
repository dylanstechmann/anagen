import { createServerFn } from "@tanstack/react-start";

const SYSTEM = `You are the research desk of ANAGEN, an atlas of two mini-organs: the hair follicle and the tooth/periodontium.
Answer like a careful scientist: precise, sourced when you can, honest about uncertainty.
Time context: August 2026.

Hair frame:
- Androgenetic alopecia is usually miniaturization of existing follicles, not instant erasure.
- Rescue cannot exceed the original follicle map as a count. Multiply (Tsuji germs) and Invent (WIHN, iPSC, EDA/Wnt) are how count could rise.
- Clascoterone 5% (Cosmo) Phase 3 2025–2026. PP405 (Pelage) topical MPC inhibitor, Phase 2a, Phase 3 slated 2026. VDPHL01 XR oral minoxidil Phase 3 hit April 2026.
- JAK inhibitors treat alopecia areata, not AGA.

Tooth frame:
- A tooth is enamel (dead after eruption), dentin, pulp, cementum, PDL, alveolar bone, gingiva.
- An osseointegrated implant fuses to bone. That is the opposite of a periodontal ligament. It is a good prosthesis, not the original organ.
- Synthesizing a FINISHED mineralized tooth plus ligaments in a vat then inserting it is the worse method: no eruption program, poor enamel, ligament that does not develop in the socket.
- The good ex-vivo method is assembling a tooth GERM (epithelium + mesenchyme, early bell) and transplanting it so it erupts in situ. Tsuji/Ikeda 2009 PNAS: adult mice, occlusion, PDL, nerves, vessels. Crown size and cusp pattern still poorly controlled.
- Possibly better when a latent tooth bud remains: TRG035 anti-USAG-1 antibody (Toregem, Kyoto). Phase I done; Phase IIa 2026 for congenital hypodontia. Unproven for trauma sockets. Humans have a vestigial third dental lamina.
- After punch/avulsion: extra-oral dry time decides if the original PDL lives. After fire/laser: thermal necrosis of bone must be rebuilt (GBR, FGF-2/REGROTH in Japan, grafts) before any germ.
- Alignment is jaws plus orthodontics, not a property a germ reprints from a childhood photo. Primary teeth are not the permanent set.
- PDL cell sheets (Iwata/TMDU) regenerate attachment on remaining roots. Autotransplantation moves a living organ.

Rules:
- Not medical or dental advice. Do not prescribe, dose, or tell the user to delay emergency care.
- If unknown, say unknown. Keep answers under 350 words.
- Plain prose only. No markdown, no asterisks, no bullet symbols. Short paragraphs.`;

export const askDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const prompt =
      typeof input === "object" &&
      input !== null &&
      "prompt" in input &&
      typeof (input as { prompt: unknown }).prompt === "string"
        ? (input as { prompt: string }).prompt.trim()
        : "";
    if (prompt.length < 8) throw new Error("Ask a fuller question.");
    if (prompt.length > 500) throw new Error("Keep questions under 500 characters.");
    return { prompt };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "The research desk is offline in this environment." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 500,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: "The desk could not reach the model. Try once more." };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Empty reply." };
    return { ok: true as const, text };
  });
