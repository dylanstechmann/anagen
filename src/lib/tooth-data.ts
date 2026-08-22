export const toothHorizons = [
  {
    id: "rescue",
    roman: "I",
    title: "Rescue",
    kicker: "Keep the organ if the organ is still there",
    body: "A punched or burned tooth is not automatically gone. Pulp can be vital. Periodontal ligament can be salvageable for minutes to hours after avulsion. Gingiva scars instead of vanishing. Rescue is endodontics, reimplantation, regenerative pulp protocols, and periodontal regeneration of what remains.",
    limit: "Enamel does not remodel. A necrotic socket and a dead jawbone will not host a new germ.",
  },
  {
    id: "replace",
    roman: "II",
    title: "Replace",
    kicker: "A screw is not a tooth",
    body: "The titanium implant is one of medicine’s better prostheses. It osseointegrates — fuses to bone. That fusion is the opposite of a periodontal ligament. No proprioception, no shock absorption, no orthodontic movement, different load on the neighbor. Autotransplantation of a wisdom tooth is the closer cousin: a real organ, with a real ligament, moved.",
    limit: "Does not restore the original tooth. Does not restore the original bite by itself.",
  },
  {
    id: "reconstitute",
    roman: "III",
    title: "Reconstitute",
    kicker: "A germ, not a finished tooth in a vat",
    body: "The good version of ‘grow me a tooth’ is epithelial plus mesenchymal cells assembled into a tooth germ, briefly cultured, then transplanted into a prepared socket so it erupts in situ. Ligament, cementum, bone, vessels, and nerves form because development is allowed to finish in the jaw. A fully mineralized tooth built on a bench and screwed in is a decorative implant.",
    limit: "Crown shape, size, and cusp pattern are still poorly controlled. Adult human odontogenic epithelium is scarce. Thermal injury to the alveolus must be rebuilt first.",
  },
] as const;

export const toothAnatomy = [
  {
    id: "enamel",
    name: "Enamel",
    fact: "The hardest tissue in the body, and the least alive. Ameloblasts die after eruption. There is no biological remodel. Fire and lasers crack it, cook the proteins in the rods, and leave a glassy shell that does not heal. Biomimetic remineralization can patch early lesions. It cannot reprint a crown.",
  },
  {
    id: "dentin",
    name: "Dentin",
    fact: "Living, tubular, connected to pulp. Odontoblasts can lay tertiary dentin after insult. That is repair, not a new tooth. Deep thermal injury kills those cells and the pulp they serve.",
  },
  {
    id: "pulp",
    name: "Pulp",
    fact: "The vascular and neural core. A punch can transect it. Heat can cook it. Immature teeth can sometimes revascularize. Mature teeth usually get a root canal or they abscess. Regenerative endodontics tries to refill the canal with living tissue. It does not grow a new crown.",
  },
  {
    id: "pdl",
    name: "Periodontal ligament",
    fact: "The reason a tooth is not an implant. A thin, innervated, vascular sling from cementum to alveolar bone. It senses load, remodels bone, and lets a tooth move. Dry it for an hour after avulsion and it dies. Ankylosis follows: bone fuses to root, then resorbs it. This is the tissue you actually want synthesized — but it has to form in a socket, not in a dish.",
  },
  {
    id: "bone",
    name: "Alveolar bone",
    fact: "The socket is the nest. Extract a tooth and it resorbs. Burn it and osteocytes die. A germ transplanted into necrotic bone does not erupt; it sits in a grave. Guided bone regeneration, sometimes BMP, is the unglamorous prerequisite.",
  },
  {
    id: "gingiva",
    name: "Gingiva",
    fact: "Soft-tissue seal. Thermal injury scars. Recession exposes root. Connective-tissue grafts and, in Japan, FGF-2 (trafermin / REGROTH) and PDL cell sheets are how you rebuild the frame, not how you mint a new tooth.",
  },
] as const;

export const toothTreatments = [
  {
    id: "reimplant",
    name: "Reimplantation after avulsion",
    evidence: "Standard of care",
    horizon: "Rescue",
    mechanism:
      "The original tooth, replaced in its original socket, with the original PDL if the extra-oral dry time was short. Milk, saline, or a specialized medium — not a napkin.",
    can: "Give the original organ a second chance. Best in children with open apices.",
    cannot: "Undo a cooked PDL. Undo a shattered root. Undo hours of drying.",
  },
  {
    id: "endo",
    name: "Endodontics / regenerative endodontics",
    evidence: "Standard / emerging",
    horizon: "Rescue",
    mechanism:
      "Remove or revascularize the pulp. Apexification, revascularization of immature teeth, and cell-based pulp engineering all assume the shell is worth keeping.",
    can: "Keep a rooted tooth in the arch for decades.",
    cannot: "Restore enamel. Restore a ligament that is already gone.",
  },
  {
    id: "gtr",
    name: "Periodontal regeneration",
    evidence: "Approved / indicated",
    horizon: "Rescue",
    mechanism:
      "Membranes, enamel-matrix derivatives (amelogenin), rhPDGF-BB, and in Japan 0.3% FGF-2 (REGROTH). Aim: new cementum, PDL, and bone on a tooth that is still there.",
    can: "Regain attachment on remaining roots. Improve the nest for whatever comes next.",
    cannot: "Grow a missing tooth. Reverse a scarred, avascular burn of the whole ridge.",
  },
  {
    id: "pdl-sheet",
    name: "PDL cell sheets",
    evidence: "Early human",
    horizon: "Rescue",
    mechanism:
      "Autologous periodontal-ligament cells stacked as sheets (Iwata / Okano, Tokyo Medical and Dental) and returned to an infrabony defect, often with a bone filler.",
    can: "Rebuild ligament-like attachment where a root still exists.",
    cannot: "Invent a root. Survive in a thermally necrotic bed.",
  },
  {
    id: "autotransplant",
    name: "Autotransplantation",
    evidence: "Clinical",
    horizon: "Replace",
    mechanism:
      "Move your own tooth — usually a third molar — into the gap. A living PDL comes along if the extraction is gentle.",
    can: "A real organ in the real socket. Can erupt and be moved orthodontically.",
    cannot: "Supply an extra tooth you do not have. Copy the exact crown of the lost incisor.",
  },
  {
    id: "implant",
    name: "Osseointegrated implant",
    evidence: "Standard of care",
    horizon: "Replace",
    mechanism:
      "Titanium fused to bone. Sometimes a ‘bio-hybrid’ coating of ligament cells is attempted in research. The clinical object is still ankylosis by design.",
    can: "Chew. Look like a tooth from the outside. Last years to decades.",
    cannot: "Feel like a tooth. Move like a tooth. Remodel like a tooth. Be the tooth you were born with.",
  },
  {
    id: "ortho",
    name: "Orthodontics / orthognathic",
    evidence: "Standard of care",
    horizon: "Rescue",
    mechanism:
      "Alignment is not a property of enamel. It is arch form, jaw relationship, and time. Trauma can fracture teeth and also change the skeleton they sit in.",
    can: "Restore a bite among whatever organs remain or are added.",
    cannot: "Be skipped just because a bioengineered tooth has pretty cusps.",
  },
] as const;

export const toothPipeline = [
  {
    id: "toregem",
    name: "TRG035 — anti-USAG-1 antibody",
    org: "Toregem BioPharma / Kyoto (Katsu Takahashi)",
    phase: "Phase I done → Phase IIa 2026",
    year: "2024–2026",
    mechanism:
      "USAG-1 (SOSTDC1) antagonizes BMP and Wnt during tooth development. Neutralize it and a suppressed tooth bud can complete. Mice grew missing and even supernumerary teeth. Humans keep a vestigial third dental lamina after the permanent set.",
    signal:
      "Phase I safety in adults. June 2026: moving to Phase II in severe congenital hypodontia (six or more missing permanent teeth), after ~$29M total funding. First target is congenital agenesis, not a punched adult socket.",
    why: "If the latent program is still there, this is better than growing an organ in a dish. A drug. No ex-vivo assembly. Unproven for trauma where the bud and the socket are both gone.",
    verdict: "Better method — when a bud exists.",
  },
  {
    id: "tsuji-tooth",
    name: "Bioengineered tooth germ",
    org: "Tsuji / OrganTech",
    phase: "Preclinical; translation intended",
    year: "2009–2026",
    mechanism:
      "Reconstitute an early-bell germ from epithelial and mesenchymal cells, organ-culture it for days, transplant into a bony hole with correct orientation. In adult mice it erupted, reached occlusion, formed enamel, dentin, pulp, PDL, cementum, bone, and vessels (Ikeda 2009 PNAS; Oshima 2011; autologous large-animal work 2017).",
    signal:
      "Proof that a germ, not a finished tooth, is the unit of reconstitution. Tsuji noted the erupted crowns were smaller and that cusp pattern, width, and A–P / B–L polarity are not yet controllable in the dish. Same group is also the hair-germ program.",
    why: "This is the correct reading of ‘synthesize teeth and ligaments ex vivo.’ You synthesize the germ. The ligament is grown in the jaw.",
    verdict: "The good ex-vivo method.",
  },
  {
    id: "pdl-sheets",
    name: "Autologous PDL cell sheets",
    org: "TMDU / Iwata",
    phase: "Human safety/efficacy series",
    year: "2018–",
    mechanism:
      "Cell-sheet engineering of periodontal ligament cells, transplanted onto remaining roots with β-TCP.",
    signal:
      "Ten-patient study: clinical and radiographic improvement. Not a tooth factory. A ligament factory for teeth that still exist.",
    why: "If the punch loosened teeth but left roots, this is closer to original than an implant.",
    verdict: "Gums and ligament, not a new tooth.",
  },
  {
    id: "fgf2",
    name: "FGF-2 (trafermin, REGROTH)",
    org: "Kaken — Japan approval",
    phase: "Approved in Japan",
    year: "2016–",
    mechanism:
      "0.3% recombinant FGF-2 in a periodontal defect after flap surgery. Stimulates PDL and bone fill.",
    signal:
      "Phase II/III: more bone height than vehicle. Not available as a US indication.",
    why: "A real regenerative drug for the socket wall and attachment. Prerequisite tissue, not a crown.",
    verdict: "Frame, not the painting.",
  },
  {
    id: "ipsc-tooth",
    name: "iPSC tooth organoids",
    org: "Academic",
    phase: "Preclinical",
    year: "—",
    mechanism:
      "Reprogram a patient’s cells, differentiate odontogenic epithelium and mesenchyme, assemble a germ. Solves the adult epithelial-cell shortage in principle.",
    signal:
      "Organoids and chimeric germs in animals. No Phase 3. Tumor and patterning risk identical to other iPSC organs.",
    why: "How you get a germ when you no longer have a tooth bud to harvest.",
    verdict: "The cell-source answer.",
  },
] as const;

export const methods = [
  {
    id: "vat",
    title: "Finished tooth, grown in a vat, then inserted",
    rank: "Worse",
    body: "A fully formed crown and root built outside the body looks like the science-fiction object. It is the wrong object. Enamel made without an ameloblast lifecycle is not enamel. A ligament wrapped around a root in a bioreactor does not know your socket, does not insert into your cementum and bone as a developing follicle would, and does not erupt. You have built a custom implant with extra failure modes.",
  },
  {
    id: "germ",
    title: "Tooth germ, assembled ex vivo, erupted in situ",
    rank: "The method",
    body: "Take odontogenic epithelium and mesenchyme. Let them make a germ. Culture it to early bell. Plant it, oriented, in a living bony hole. The organ finishes itself: cusp, root, PDL, nerve, vessel. That is Ikeda/Tsuji. It is synthesizing the instruction, not the mineral. Ligaments belong to this method because they are a developmental outcome, not a spare part.",
  },
  {
    id: "usag",
    title: "Wake a third dentition in place",
    rank: "Better, if the bud is there",
    body: "Humans form a vestigial third dental lamina. USAG-1 helps suppress it. TRG035 tries to take the brake off. No surgery of an organ. No dish. First human target is congenital missing teeth, 2026. For a mouth whose sockets were punched and burned, you still need a nest, and you may no longer have a bud in that address.",
  },
  {
    id: "hybrid",
    title: "Rebuild the nest, then choose the organ",
    rank: "Required after fire",
    body: "Thermal and laser injury kill osteocytes, scar gingiva, and can necrose the ridge. A germ in dead bone is a sequestered curiosity. Sequence: debride, revascularize, regenerate bone and soft tissue (GBR, FGF-2, grafts, cell sheets), restore vertical dimension, then germ or implant or autotransplant. Alignment is a later orthodontic problem, not a property the germ invents.",
  },
] as const;

export const traumaNotes = [
  {
    q: "Punched in the teeth",
    a: "Luxation, fracture, avulsion, pulp hemorrhage, alveolar fracture. Time-to-replant decides whether the original PDL lives. A fractured crown with a living root is a rescue problem. A missing tooth with a living socket is a reconstitution candidate. A shattered ridge is a bone problem first.",
  },
  {
    q: "Fire and lasers",
    a: "Enamel crazes. Pulp proteins coagulate. Gingiva scars. Bone can undergo thermal necrosis that does not declare itself on day one. Lasers at surgical wavelengths can be precise; at assault energies they are just heat. Heat does not respect the organ boundaries the atlas likes to draw.",
  },
  {
    q: "Perfect as when I was born",
    a: "You were born with primary teeth. They were supposed to leave. The permanent set is the second map, laid down in childhood, not at birth. ‘Perfect alignment’ is also jaws and lips and time. A reconstituted germ will not automatically reprint a childhood photograph. Shape control is the unsolved part of Tsuji’s own papers. Orthodontics remains.",
  },
] as const;

export const tissueOptions = {
  enamel: [
    { id: "ok", label: "Intact" },
    { id: "crazed", label: "Crazed / laser" },
    { id: "gone", label: "Crown gone" },
  ],
  pulp: [
    { id: "vital", label: "Vital" },
    { id: "dead", label: "Necrotic" },
    { id: "na", label: "No tooth" },
  ],
  pdl: [
    { id: "ok", label: "Alive" },
    { id: "dry", label: "Avulsed / dried" },
    { id: "gone", label: "Destroyed" },
  ],
  bone: [
    { id: "ok", label: "Socket intact" },
    { id: "fracture", label: "Fractured" },
    { id: "necrotic", label: "Thermal necrosis" },
  ],
  gingiva: [
    { id: "ok", label: "Healthy" },
    { id: "recede", label: "Receded" },
    { id: "scar", label: "Burn scar" },
  ],
} as const;

export const toothDeskPrompts = [
  "Is growing a whole tooth in a lab then implanting it a good idea?",
  "Why does a bioengineered germ make a periodontal ligament when an implant does not?",
  "Can USAG-1 antibody replace tooth transplantation after trauma?",
  "How do you rebuild a socket after thermal injury before placing a germ?",
  "Can a reconstituted tooth be as straight as the original?",
];
