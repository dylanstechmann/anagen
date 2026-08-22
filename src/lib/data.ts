export type Horizon = "rescue" | "multiply" | "invent";
export type Evidence =
  | "fda"
  | "offlabel"
  | "cleared"
  | "phase3"
  | "phase2"
  | "phase1"
  | "preclinical"
  | "theoretical";

export const AS_OF = "August 2026";

export const horizons: {
  id: Horizon;
  roman: string;
  title: string;
  kicker: string;
  body: string;
  limit: string;
}[] = [
  {
    id: "rescue",
    roman: "I",
    title: "Rescue",
    kicker: "The follicle is usually still there",
    body: "Pattern baldness is miniaturization, not erasure. Genetically susceptible follicles shrink under DHT until the shaft is vellus or the cycle stalls in telogen. Rescue means keeping the organ alive, blocking the androgen signal, and pushing the cycle back into anagen so existing follicles make terminal hair again.",
    limit: "Cannot create follicles you were never born with. Donor-limited if you transplant.",
  },
  {
    id: "multiply",
    roman: "II",
    title: "Multiply",
    kicker: "One follicle into many",
    body: "Hair cloning is not sci-fi branding. It is epithelial–mesenchymal reconstitution: take a follicle, expand the inductive cells, and rebuild germs. Takashi Tsuji’s method reports 50–100 follicles from one. That is how you stop playing zero-sum with the occipital donor.",
    limit: "Still your genome, still your androgen receptors, still a delivery problem. Not approved. First-in-human aimed around late 2026.",
  },
  {
    id: "invent",
    roman: "III",
    title: "Invent",
    kicker: "De novo organs after birth",
    body: "Humans lay down their scalp follicle map in utero, roughly weeks 9–14. After that, new follicles do not appear — except in rare wound-induced neogenesis, and in theory via iPSC organoids or forced placode programs (Wnt, EDA/EDAR, Shh). Invention is how you exceed the original endowment. Thicker than it ever was, as a count, not a memory.",
    limit: "No clinical path yet. Geometry, blood supply, and cancer-safe Wnt control are the real ceilings.",
  },
];

export const anatomy = [
  {
    id: "shaft",
    name: "Hair shaft",
    fact: "Dead keratin extruded by the matrix. Diameter is set by dermal papilla volume, not by wishing. Terminal scalp hair is typically 60–100 µm; vellus is ~30 µm or less.",
  },
  {
    id: "bulge",
    name: "Bulge — stem-cell niche",
    fact: "The regenerative warehouse. Quiescent epithelial stem cells sit where the arrector pili inserts. PP405’s claim is metabolic: wake these cells by shifting mitochondria toward lactate, not by pouring on more minoxidil.",
  },
  {
    id: "sebaceous",
    name: "Sebaceous gland",
    fact: "Same pilosebaceous unit. Oily scalp is not the disease; androgen-sensitive follicles are. Ketoconazole is a weak anti-androgen and antifungal adjunct, not a primary therapy.",
  },
  {
    id: "isthmus",
    name: "Isthmus",
    fact: "The permanent portion of the follicle. Below it, the cycling part can regress. This is why a ‘bald’ scalp can still hold an organ.",
  },
  {
    id: "bulb",
    name: "Bulb & matrix",
    fact: "The factory floor. Matrix keratinocytes proliferate only in anagen. When the cycle shortens under DHT, the factory closes early and the shaft never reaches terminal caliber.",
  },
  {
    id: "papilla",
    name: "Dermal papilla",
    fact: "The inductive mesenchyme. Papilla size tracks shaft thickness. Lose inductive identity in culture and you lose the ability to grow a follicle — the central unsolved problem of cloning until 3D germ methods.",
  },
];

export const cycle = [
  {
    id: "anagen",
    name: "Anagen",
    span: "2–6 years",
    share: "85–90%",
    body: "Growth. Matrix on. This is the only phase that produces a visible fiber. Prolong it and you get longer, often thicker-looking hair without new follicles.",
  },
  {
    id: "catagen",
    name: "Catagen",
    span: "2–3 weeks",
    share: "~1%",
    body: "Controlled involution. The bulb detaches from the papilla. A brief demolition, not disease.",
  },
  {
    id: "telogen",
    name: "Telogen",
    span: "2–4 months",
    share: "10–15%",
    body: "Rest. The club hair waits. DHT-driven AGA shortens anagen and relatively lengthens telogen until the fiber is a vellus ghost.",
  },
];

export type Treatment = {
  id: string;
  name: string;
  aka?: string;
  evidence: Evidence;
  horizon: Horizon;
  mechanism: string;
  can: string;
  cannot: string;
  note: string;
};

export const treatments: Treatment[] = [
  {
    id: "minoxidil-topical",
    name: "Topical minoxidil",
    aka: "Rogaine 5%",
    evidence: "fda",
    horizon: "rescue",
    mechanism:
      "KATP opener. Increases VEGF, prostaglandins, and blood flow; prolongs anagen; can widen shaft diameter. The sulfotransferase in the follicle has to activate it — non-responders are often enzymatic, not lazy.",
    can: "Thicken miniaturizing hairs. Slow loss. Modest count increases over 4–12 months.",
    cannot: "Build new follicles. Reverse a fibrotic, empty scalp. Work if the enzyme is absent.",
    note: "Approved 1988. Still a cornerstone because the organ, not the brand, is the target.",
  },
  {
    id: "finasteride",
    name: "Oral finasteride 1 mg",
    aka: "Propecia",
    evidence: "fda",
    horizon: "rescue",
    mechanism:
      "Type II 5α-reductase inhibitor. Cuts circulating DHT ~70% and scalp DHT ~60%. Removes the ligand that miniaturizes genetically susceptible follicles.",
    can: "Halt most AGA progression in men. Partial regrowth on vertex more than hairline.",
    cannot: "Help follicles that are gone. Avoid sexual/mood adverse effects in a minority. Treat female-pattern loss the same way.",
    note: "Approved 1997. The last new FDA mechanism for male AGA until the current wave.",
  },
  {
    id: "dutasteride",
    name: "Dutasteride 0.5 mg",
    aka: "Avodart",
    evidence: "offlabel",
    horizon: "rescue",
    mechanism:
      "Dual type I + II 5α-reductase blockade. ~90% DHT suppression. Roughly 3× type II potency of finasteride and ~100× on type I.",
    can: "Outperform finasteride on hair count in multiple RCTs. Approved for AGA in Japan, Korea, Taiwan.",
    cannot: "Erase residual DHT signaling entirely. Longer half-life means a longer tail if you stop.",
    note: "Off-label in the US. Stronger pharmacology, not a different philosophy.",
  },
  {
    id: "oral-minox",
    name: "Low-dose oral minoxidil",
    evidence: "offlabel",
    horizon: "rescue",
    mechanism:
      "Systemic KATP opening. Bypasses follicular sulfotransferase. Hypertrichosis is the feature, not only a side effect — existence proof that shafts can exceed a person’s remembered baseline in non-scalp skin.",
    can: "Improve density and caliber when topical fails. Useful in women and men under specialist care.",
    cannot: "Ignore hemodynamics. Fluid retention, tachycardia, and rare pericardial risk scale with dose — the old Loniten doses are not the hair doses.",
    note: "Typical studied hair ranges are low milligrams. This atlas does not prescribe.",
  },
  {
    id: "transplant",
    name: "Follicular unit transplant",
    aka: "FUE / FUT",
    evidence: "fda",
    horizon: "rescue",
    mechanism:
      "Donor dominance (Orentreich): occipital follicles keep their androgen resistance after moving. You redistribute a finite organ inventory.",
    can: "Rebuild a hairline and crown with living, cycling follicles. Permanent in the transplanted units.",
    cannot: "Increase total count. Outrun progressive native loss without medical rescue. Invent density above donor supply.",
    note: "Surgery is logistics. Biology is the bottleneck.",
  },
  {
    id: "lllt",
    name: "Low-level laser",
    evidence: "cleared",
    horizon: "rescue",
    mechanism:
      "Red/near-IR photobiomodulation (~650–680 nm) on cytochrome c oxidase; downstream nitric oxide and ATP. Adjunct, not a substitute.",
    can: "Small density gains as add-on in early AGA.",
    cannot: "Replace anti-androgens or surgery. Overcome empty scalp.",
    note: "FDA-cleared devices, heterogeneous trials.",
  },
  {
    id: "prp",
    name: "Platelet-rich plasma",
    evidence: "offlabel",
    horizon: "rescue",
    mechanism:
      "Autologous growth factors (PDGF, VEGF, IGF-1) injected into dermis. Protocol chaos is the evidence problem.",
    can: "Modest density/thickness in some RCTs, especially women.",
    cannot: "Be compared across clinics. Guarantee a response. Create follicles.",
    note: "Signal is real enough to study, too noisy to worship.",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    evidence: "offlabel",
    horizon: "rescue",
    mechanism:
      "Controlled wounding. Wnt, growth-factor release, and better topical penetration. Related in spirit to wound-induced neogenesis — but cosmetic needling is not full-thickness WIHN.",
    can: "Boost minoxidil response in small trials.",
    cannot: "Safely de novo a hairline. Replace drugs.",
    note: "Technique-sensitive. Infection and scarring are the failure mode.",
  },
  {
    id: "jak",
    name: "JAK inhibitors",
    aka: "Baricitinib, ritlecitinib, deuruxolitinib",
    evidence: "fda",
    horizon: "rescue",
    mechanism:
      "Block IFN-γ / JAK-STAT attack on the follicle in alopecia areata. This is immune privilege restored, not DHT reversed.",
    can: "Regrow complete heads of hair in severe AA. First-line for that disease.",
    cannot: "Treat androgenetic alopecia. They are the wrong disease.",
    note: "If the loss is patchy and sudden, you may not have the problem you think you have.",
  },
];

export type PipelineItem = {
  id: string;
  name: string;
  org: string;
  phase: string;
  year: string;
  mechanism: string;
  signal: string;
  why: string;
  horizon: Horizon;
};

export const pipeline: PipelineItem[] = [
  {
    id: "clascoterone",
    name: "Clascoterone 5% solution",
    org: "Cosmo Pharmaceuticals",
    phase: "Phase 3 — submissions",
    year: "2025–2026",
    mechanism:
      "Topical androgen-receptor antagonist. Same molecule as Winlevi 1% for acne, ten times the concentration, aimed at the follicle AR instead of systemic 5AR.",
    signal:
      "SCALP-1 and SCALP-2 (1,465 men): relative target-area hair-count improvements of 168% and 539% vs vehicle at 6 months; combined ~252%. Twelve-month data (April 2026): men who stayed on drug the full year had 2.39× TAHC vs those switched to vehicle at month 6. Safety comparable to vehicle. US/EU filings following the safety dataset.",
    why: "First new AGA mechanism at FDA scale in ~30 years if approved. Local AR blockade without castrating serum DHT.",
    horizon: "rescue",
  },
  {
    id: "pp405",
    name: "PP405",
    org: "Pelage Pharmaceuticals (UCLA lineage)",
    phase: "Phase 3 start 2026",
    year: "2025–2026",
    mechanism:
      "Topical mitochondrial pyruvate carrier inhibitor. Hair-follicle stem cells run a metabolic switch; forcing lactate production is the published reactivation thesis (Christofk / Lowry). Directly aims at dormant HFSCs, not androgens.",
    signal:
      "Phase 2a, 78 men and women, 0.05% gel once daily for 4 weeks. Primary safety met; no systemic absorption detected. At week 8, 31% of men with more advanced loss had >20% density increase vs 0% on placebo. Reports of new terminal hair from units that had none. $120M Series B, October 2025 (GV, ARCH).",
    why: "If the dormant-organ model is right, this is rescue of follicles drugs currently write off. Early, short dosing, secondary efficacy — treat as a signal, not a prescription.",
    horizon: "rescue",
  },
  {
    id: "vdphl01",
    name: "VDPHL01",
    org: "Veradermics",
    phase: "Phase 3 positive",
    year: "April 2026",
    mechanism:
      "Extended-release oral minoxidil. Same pharmacology, flatter plasma curve, intended as the first oral specifically labeled for AGA.",
    signal:
      "Phase 3 primary endpoint: 79–86% of participants reported improvement vs 36% placebo. NDA targeted 2026–27; possible approval 2027–28.",
    why: "Does not invent a pathway. Industrializes the one that already grows hair on faces by accident.",
    horizon: "rescue",
  },
  {
    id: "organtech",
    name: "Follicle germ reconstitution",
    org: "OrganTech / Takashi Tsuji",
    phase: "First-in-human aimed late 2026",
    year: "2026+",
    mechanism:
      "Bioengineered hair-follicle germs from epithelial and mesenchymal cells. Claim: one follicle expanded into 50–100. Adjacent program in tooth regeneration — same organ-germ logic.",
    signal:
      "Decades of mouse and reconstituted-human work. Company has stated an intent to open clinical trials by end of 2026. Not a Phase 3 dataset.",
    why: "This is the multiply horizon. Donor ceases to be a hard cap if germs take and cycle in humans.",
    horizon: "multiply",
  },
  {
    id: "hmi115",
    name: "HMI-115",
    org: "Hope Medicine",
    phase: "Phase 2",
    year: "2024–2026",
    mechanism:
      "Monoclonal antibody against the prolactin receptor. Prolactin signaling sits in a less-traveled follicle axis than DHT.",
    signal: "Early AGA signals in men and women; still a mid-stage bet.",
    why: "Diversifies beyond anti-androgens. Useful if AR blockade plateaus.",
    horizon: "rescue",
  },
  {
    id: "amp303",
    name: "AMP-303",
    org: "Amplifica",
    phase: "Early clinical",
    year: "2025–2026",
    mechanism:
      "Intradermal candidate aimed at dermal sheath cup / inductive mesenchyme — the same neighborhood cloning cares about.",
    signal: "Limited public efficacy. Mechanism is the reason it is on this list.",
    why: "If inductive cells can be re-specified in place, you get multiplication without a bioreactor.",
    horizon: "multiply",
  },
  {
    id: "et02",
    name: "ET-02",
    org: "Eirion Therapeutics",
    phase: "Early clinical",
    year: "2025–2026",
    mechanism: "Topical small molecule in AGA; non-hormonal positioning.",
    signal: "Sparse public data. Listed because it is actually in humans, unlike most Twitter molecules.",
    why: "Pipeline diversity. Not a lead.",
    horizon: "rescue",
  },
  {
    id: "wihn",
    name: "Wound-induced neogenesis",
    org: "Academic (Ito 2007 → present)",
    phase: "Preclinical / translational",
    year: "—",
    mechanism:
      "Large full-thickness wounds in mice regenerate de novo follicles via epidermal Wnt, Fgf9 from γδ T cells, Shh, IL-6/STAT3, and TLR3–retinoic acid. Adult humans usually scar instead.",
    signal:
      "Proof that the embryonic placode program can rerun after birth. Human WIHN is unreliable; that is the research problem.",
    why: "The existence proof for Invent. Not a clinic you book.",
    horizon: "invent",
  },
  {
    id: "ipsc",
    name: "iPSC follicle organoids",
    org: "Stemson-class approaches",
    phase: "Preclinical",
    year: "—",
    mechanism:
      "Reprogram a patient’s cells to pluripotency, differentiate epithelial and dermal lineages, assemble a follicle. In principle unbounded count.",
    signal:
      "Stemson Therapeutics pursued this and wound down around 2024. The biology did not become false when the company did.",
    why: "The only path that is truly unlimited. Tumor risk, assembly, and vascularization are why it is slow.",
    horizon: "invent",
  },
];

export const norwood = [
  { stage: 1, label: "I", title: "No recession", visible: 1, dormant: 0.02 },
  { stage: 2, label: "II", title: "Temporal recession", visible: 0.88, dormant: 0.08 },
  { stage: 3, label: "III", title: "Deep temples", visible: 0.7, dormant: 0.18 },
  { stage: 4, label: "IV", title: "Vertex opens", visible: 0.48, dormant: 0.28 },
  { stage: 5, label: "V", title: "Bridge thinning", visible: 0.32, dormant: 0.3 },
  { stage: 6, label: "VI", title: "Crown–frontal merge", visible: 0.16, dormant: 0.28 },
  { stage: 7, label: "VII", title: "Horseshoe", visible: 0.06, dormant: 0.18 },
] as const;

export const YOUNG_DENSITY = 220;
export const ROI_CM2 = 100;

export const packing = {
  typicalYoung: 180,
  denseOccipital: 280,
  thinningVertex: 80,
  geometricCap: 420,
  hypertrichosisMultiple: 1.8,
};

export const genes = [
  {
    id: "ar",
    name: "AR",
    role: "Androgen receptor in the follicle. Poly-Q repeats and scalp expression explain why brothers diverge. Topical antagonists (clascoterone) and future HFSC-restricted editing both point here.",
  },
  {
    id: "edar",
    name: "EDA / EDAR",
    role: "Placode-density pathway. Gain-of-function EDAR (East Asian V370A) already thickens hair and increases gland density. The existence proof that follicle number is genetically tunable.",
  },
  {
    id: "wnt",
    name: "Wnt / β-catenin",
    role: "The on-switch for anagen and for neogenesis. Too little: telogen. Too much, too long: stem-cell exhaustion and tumor risk (Castilho 2009). The invent horizon lives or dies on spatiotemporal control.",
  },
  {
    id: "shh",
    name: "Sonic hedgehog",
    role: "Required to complete a follicle after the placode. Also required for WIHN. Not a cream.",
  },
  {
    id: "cxxc5",
    name: "CXXC5",
    role: "Wnt negative regulator upregulated in AGA. Inhibitors (KY19382 class) are preclinical attempts to potentiate Wnt without soaking the whole epidermis.",
  },
  {
    id: "mpc",
    name: "MPC1 / lactate",
    role: "Metabolic gate in HFSCs. PP405’s target neighborhood. A reminder that stem cells can be present and still asleep.",
  },
];

export const myths = [
  {
    q: "Bald means the follicles are gone.",
    a: "Often false in AGA. Miniaturized and telogen-arrested organs can persist for years. Scarring alopecias (lichen planopilaris, CCCA) actually destroy the organ — different disease, different hopelessness.",
  },
  {
    q: "You can out-supplement DHT.",
    a: "Saw palmetto is a weak 5AR story. Biotin fixes biotin deficiency, not AGA. Iron/vitamin D matter when deficient. None of them invent follicles.",
  },
  {
    q: "Transplants give you more hair.",
    a: "They give you rearranged hair. Donor is finite. That is why multiply exists as a research program.",
  },
  {
    q: "A drug will make you denser than childhood.",
    a: "Rescue restores toward the original map. Shafts can occasionally outgrow a remembered baseline (oral minoxidil hypertrichosis). Count above endowment requires invention.",
  },
  {
    q: "Hair loss is one disease.",
    a: "AGA, AA, telogen effluvium, traction, scarring. JAK inhibitors can resurrect an AA scalp and do nothing for a Norwood V. Diagnosis before stack.",
  },
];

export const deskPrompts = [
  "Can a bald scalp grow more follicles than it was born with?",
  "What does PP405 actually do that minoxidil does not?",
  "Why is the occipital donor resistant to DHT?",
  "Is clascoterone just topical finasteride?",
  "What would CRISPR on scalp androgen receptors have to solve?",
];

export function evidenceLabel(e: Evidence) {
  const map: Record<Evidence, string> = {
    fda: "FDA approved / indicated",
    offlabel: "Off-label, human data",
    cleared: "FDA cleared device",
    phase3: "Phase 3",
    phase2: "Phase 2",
    phase1: "Phase 1",
    preclinical: "Preclinical",
    theoretical: "Theoretical",
  };
  return map[e];
}

export function horizonLabel(h: Horizon) {
  return h[0]!.toUpperCase() + h.slice(1);
}
