const norwood = [
  { stage: 1, label: "I", title: "No recession", visible: 1, dormant: 0.02 },
  { stage: 2, label: "II", title: "Temporal recession", visible: 0.88, dormant: 0.08 },
  { stage: 3, label: "III", title: "Deep temples", visible: 0.7, dormant: 0.18 },
  { stage: 4, label: "IV", title: "Vertex opens", visible: 0.48, dormant: 0.28 },
  { stage: 5, label: "V", title: "Bridge thinning", visible: 0.32, dormant: 0.3 },
  { stage: 6, label: "VI", title: "Crown-frontal merge", visible: 0.16, dormant: 0.28 },
  { stage: 7, label: "VII", title: "Horseshoe", visible: 0.06, dormant: 0.18 }
];

const hairHorizons = [
  ["I", "Rescue", "The follicle is usually still there", "Pattern baldness is miniaturization, not erasure. Genetically susceptible follicles shrink under DHT until the shaft is vellus or the cycle stalls in telogen. Rescue means keeping the organ alive, blocking the androgen signal, and pushing the cycle back into anagen.", "Cannot create follicles you were never born with. Donor-limited if you transplant."],
  ["II", "Multiply", "One follicle into many", "Hair cloning is epithelial-mesenchymal reconstitution: take a follicle, expand the inductive cells, and rebuild germs. Takashi Tsuji's method reports 50-100 follicles from one. That is how you stop playing zero-sum with the occipital donor.", "Still your genome, still your androgen receptors. Not approved. First-in-human aimed around late 2026."],
  ["III", "Invent", "De novo organs after birth", "Humans lay down their scalp follicle map in utero, roughly weeks 9-14. After that, new follicles do not appear except in rare wound-induced neogenesis, and in theory via iPSC organoids or forced placode programs.", "No clinical path yet. Geometry, blood supply, and cancer-safe Wnt control are the real ceilings."]
];

const treatments = [
  ["Topical minoxidil", "Rogaine 5%", "FDA", "Rescue", "KATP opener. Prolongs anagen; can widen shaft diameter. Follicular sulfotransferase must activate it.", "Thicken miniaturizing hairs. Slow loss.", "Build new follicles. Reverse a fibrotic empty scalp."],
  ["Oral finasteride 1 mg", "Propecia", "FDA", "Rescue", "Type II 5-alpha-reductase inhibitor. Cuts circulating DHT ~70% and scalp DHT ~60%.", "Halt most AGA progression in men. Partial vertex regrowth.", "Help follicles that are gone. Treat female-pattern loss the same way."],
  ["Dutasteride 0.5 mg", "Avodart", "Off-label US", "Rescue", "Dual type I + II blockade. ~90% DHT suppression.", "Outperform finasteride on hair count in multiple RCTs.", "Erase residual DHT signaling entirely."],
  ["Low-dose oral minoxidil", "", "Off-label", "Rescue", "Systemic KATP opening. Bypasses follicular sulfotransferase.", "Improve density when topical fails, under specialist care.", "Ignore hemodynamics. This atlas does not prescribe."],
  ["Follicular unit transplant", "FUE / FUT", "Standard", "Rescue", "Donor dominance: occipital follicles keep androgen resistance after moving.", "Rebuild a hairline with living, cycling follicles.", "Increase total count. Invent density above donor supply."],
  ["Low-level laser", "", "FDA cleared", "Rescue", "Red/near-IR photobiomodulation on cytochrome c oxidase.", "Small density gains as add-on in early AGA.", "Replace anti-androgens or surgery."],
  ["Platelet-rich plasma", "", "Off-label", "Rescue", "Autologous growth factors injected into dermis. Protocol chaos is the evidence problem.", "Modest density in some RCTs.", "Guarantee a response. Create follicles."],
  ["Microneedling", "", "Off-label", "Rescue", "Controlled wounding. Wnt release and better topical penetration.", "Boost minoxidil response in small trials.", "Safely de novo a hairline."],
  ["JAK inhibitors", "Baricitinib, ritlecitinib", "FDA for AA", "Rescue", "Block IFN-gamma / JAK-STAT attack in alopecia areata.", "Regrow complete heads of hair in severe AA.", "Treat androgenetic alopecia. Wrong disease."]
];

const pipeline = [
  ["Clascoterone 5%", "Cosmo", "Phase 3 filings", "2025-2026", "Topical androgen-receptor antagonist. Same molecule as Winlevi, 10x concentration.", "SCALP-1/2 in 1,465 men: large TAHC gains vs vehicle at 6 months. 12-month stay-on-drug data April 2026.", "First new AGA mechanism at FDA scale in ~30 years if approved."],
  ["PP405", "Pelage / UCLA", "Phase 3 start 2026", "2025-2026", "Topical mitochondrial pyruvate carrier inhibitor. Aims at dormant hair-follicle stem cells via a lactate switch.", "Phase 2a, 78 people, 4 weeks. Safety met; no systemic absorption detected. Signal of density gain in advanced men at week 8.", "Rescue of follicles drugs currently write off. Early, short dosing - a signal, not a prescription."],
  ["VDPHL01", "Veradermics", "Phase 3 positive", "April 2026", "Extended-release oral minoxidil. Same pharmacology, flatter plasma curve.", "79-86% reported improvement vs 36% placebo. NDA targeted 2026-27.", "Industrializes the pathway that already grows hair on faces by accident."],
  ["Follicle germ reconstitution", "OrganTech / Tsuji", "First-in-human aimed late 2026", "2026+", "Bioengineered hair-follicle germs from epithelial and mesenchymal cells. Claim: one follicle into 50-100.", "Decades of mouse and reconstituted-human work. Not a Phase 3 dataset.", "The multiply horizon. Donor ceases to be a hard cap if germs take."],
  ["HMI-115", "Hope Medicine", "Phase 2", "2024-2026", "Monoclonal antibody against the prolactin receptor.", "Early AGA signals in men and women.", "Diversifies beyond anti-androgens."],
  ["Wound-induced neogenesis", "Academic (Ito 2007)", "Preclinical", "-", "Large full-thickness wounds in mice regenerate de novo follicles via epidermal Wnt and related programs.", "Proof the embryonic placode program can rerun after birth. Human WIHN is unreliable.", "Existence proof for Invent. Not a clinic you book."],
  ["iPSC follicle organoids", "Stemson-class", "Preclinical", "-", "Reprogram a patient's cells, differentiate lineages, assemble a follicle.", "Stemson wound down around 2024. The biology did not become false when the company did.", "The only path that is truly unlimited. Tumor risk and vascularization are why it is slow."]
];

const anatomy = [
  ["Hair shaft", "Dead keratin extruded by the matrix. Diameter is set by dermal papilla volume. Terminal scalp hair is typically 60-100 um; vellus is ~30 um or less."],
  ["Bulge - stem-cell niche", "Quiescent epithelial stem cells sit where the arrector pili inserts. PP405's claim is metabolic: wake these cells by shifting mitochondria toward lactate."],
  ["Sebaceous gland", "Same pilosebaceous unit. Oily scalp is not the disease; androgen-sensitive follicles are."],
  ["Isthmus", "The permanent portion of the follicle. Below it, the cycling part can regress. This is why a bald scalp can still hold an organ."],
  ["Bulb and matrix", "The factory floor. Matrix keratinocytes proliferate only in anagen. DHT shortens the cycle so the shaft never reaches terminal caliber."],
  ["Dermal papilla", "The inductive mesenchyme. Papilla size tracks shaft thickness. Lose inductive identity in culture and you lose cloning."]
];

const cycle = [
  ["Anagen", "2-6 years / 85-90%", "Growth. Matrix on. The only phase that produces a visible fiber."],
  ["Catagen", "2-3 weeks / ~1%", "Controlled involution. The bulb detaches from the papilla."],
  ["Telogen", "2-4 months / 10-15%", "Rest. AGA shortens anagen and relatively lengthens telogen until the fiber is a vellus ghost."]
];

const genes = [
  ["AR", "Androgen receptor in the follicle. Explains why brothers diverge. Topical antagonists (clascoterone) point here."],
  ["EDA / EDAR", "Placode-density pathway. Gain-of-function EDAR already thickens hair. Follicle number is genetically tunable."],
  ["Wnt / beta-catenin", "On-switch for anagen and neogenesis. Too much, too long: stem-cell exhaustion and tumor risk."],
  ["Sonic hedgehog", "Required to complete a follicle after the placode. Also required for wound-induced neogenesis."],
  ["CXXC5", "Wnt negative regulator upregulated in AGA. Preclinical inhibitors try to potentiate Wnt locally."],
  ["MPC1 / lactate", "Metabolic gate in hair-follicle stem cells. PP405's target neighborhood."]
];

const myths = [
  ["Bald means the follicles are gone.", "Often false in AGA. Miniaturized organs can persist for years. Scarring alopecias actually destroy the organ - different disease."],
  ["You can out-supplement DHT.", "Saw palmetto is a weak 5AR story. Biotin fixes biotin deficiency, not AGA. None of them invent follicles."],
  ["Transplants give you more hair.", "They give you rearranged hair. Donor is finite. That is why multiply exists as a research program."],
  ["A drug will make you denser than childhood.", "Rescue restores toward the original map. Count above endowment requires invention."],
  ["Hair loss is one disease.", "AGA, AA, telogen effluvium, traction, scarring. JAK inhibitors can resurrect an AA scalp and do nothing for a Norwood V."]
];

const toothHorizons = [
  ["I", "Rescue", "Keep the organ if the organ is still there", "A punched or burned tooth is not automatically gone. Pulp can be vital. Periodontal ligament can be salvageable for minutes to hours after avulsion. Rescue is endodontics, reimplantation, regenerative pulp protocols, and periodontal regeneration.", "Enamel does not remodel. A necrotic socket will not host a new germ."],
  ["II", "Replace", "A screw is not a tooth", "The titanium implant osseointegrates - fuses to bone. That fusion is the opposite of a periodontal ligament. Autotransplantation of a wisdom tooth is the closer cousin: a real organ, moved.", "Does not restore the original tooth."],
  ["III", "Reconstitute", "A germ, not a finished tooth in a vat", "Assemble epithelial plus mesenchymal cells into a tooth germ, briefly culture it, transplant into a prepared socket so it erupts in situ. Ligament, cementum, bone, vessels, and nerves form because development is allowed to finish in the jaw.", "Crown shape and cusp pattern are still poorly controlled. Adult odontogenic epithelium is scarce."]
];

const methods = [
  ["Worse", "Finished tooth, grown in a vat, then inserted", "A fully formed crown built outside the body looks like the science-fiction object. It is the wrong object. A ligament wrapped around a root in a bioreactor does not know your socket."],
  ["The method", "Tooth germ, assembled ex vivo, erupted in situ", "Let epithelium and mesenchyme make a germ. Culture it to early bell. Plant it, oriented, in a living bony hole. The organ finishes itself. That is Ikeda/Tsuji."],
  ["Better, if the bud is there", "Wake a third dentition in place", "Humans form a vestigial third dental lamina. USAG-1 helps suppress it. TRG035 tries to take the brake off. First human target is congenital missing teeth, 2026."],
  ["Required after fire", "Rebuild the nest, then choose the organ", "A germ in dead bone is a sequestered curiosity. Sequence: debride, revascularize, regenerate bone and soft tissue, then germ or implant or autotransplant."]
];

const toothTreatments = [
  ["Reimplantation after avulsion", "Standard of care", "Rescue", "The original tooth, replaced in its original socket, with the original PDL if extra-oral dry time was short. Milk, saline, or specialized medium - not a napkin.", "Give the original organ a second chance.", "Undo a cooked PDL or hours of drying."],
  ["Endodontics / regenerative endodontics", "Standard / emerging", "Rescue", "Remove or revascularize the pulp. Assumes the shell is worth keeping.", "Keep a rooted tooth in the arch for decades.", "Restore enamel or a ligament that is already gone."],
  ["Periodontal regeneration", "Approved / indicated", "Rescue", "Membranes, enamel-matrix derivatives, rhPDGF-BB, and in Japan FGF-2 (REGROTH).", "Regain attachment on remaining roots.", "Grow a missing tooth."],
  ["PDL cell sheets", "Early human", "Rescue", "Autologous periodontal-ligament cells stacked as sheets (Iwata / Okano) and returned to a defect.", "Rebuild ligament-like attachment where a root still exists.", "Invent a root. Survive in thermally necrotic bone."],
  ["Autotransplantation", "Clinical", "Replace", "Move your own tooth - usually a third molar - into the gap.", "A real organ in the real socket. Can erupt and be moved orthodontically.", "Supply an extra tooth you do not have."],
  ["Osseointegrated implant", "Standard of care", "Replace", "Titanium fused to bone. Ankylosis by design.", "Chew. Look like a tooth from the outside.", "Feel, move, or remodel like a tooth."],
  ["Orthodontics / orthognathic", "Standard of care", "Rescue", "Alignment is arch form, jaw relationship, and time - not a property of enamel.", "Restore a bite among whatever organs remain.", "Be skipped just because a bioengineered tooth has pretty cusps."]
];

const toothPipe = [
  ["TRG035 - anti-USAG-1", "Toregem / Kyoto", "Phase I done to IIa 2026", "Neutralize USAG-1 and a suppressed tooth bud can complete. Mice grew missing and even supernumerary teeth.", "Phase I safety in adults. June 2026: moving to Phase II in severe congenital hypodontia.", "Better method - when a bud exists. Unproven for a punched adult socket."],
  ["Bioengineered tooth germ", "Tsuji / OrganTech", "Preclinical; translation intended", "Reconstitute an early-bell germ, organ-culture it, transplant into a bony hole. In adult mice it erupted and formed enamel, dentin, pulp, PDL, cementum, bone, and vessels.", "Proof that a germ, not a finished tooth, is the unit of reconstitution.", "The good ex-vivo method."],
  ["Autologous PDL cell sheets", "TMDU / Iwata", "Human series", "Cell-sheet engineering of periodontal ligament cells onto remaining roots.", "Ten-patient study: clinical and radiographic improvement.", "A ligament factory for teeth that still exist."],
  ["FGF-2 (trafermin, REGROTH)", "Kaken - Japan approval", "Approved in Japan 2016-", "0.3% recombinant FGF-2 in a periodontal defect after flap surgery.", "Phase II/III: more bone height than vehicle. Not a US indication.", "Frame, not the painting."],
  ["iPSC tooth organoids", "Academic", "Preclinical", "Reprogram a patient's cells, differentiate odontogenic lineages, assemble a germ.", "Organoids and chimeric germs in animals. No Phase 3.", "The cell-source answer when you no longer have a bud to harvest."]
];

const toothAnatomy = [
  ["Enamel", "The hardest tissue in the body, and the least alive. Ameloblasts die after eruption. Fire and lasers crack it. It cannot reprint a crown."],
  ["Dentin", "Living, tubular, connected to pulp. Odontoblasts can lay tertiary dentin after insult. That is repair, not a new tooth."],
  ["Pulp", "The vascular and neural core. Immature teeth can sometimes revascularize. Mature teeth usually get a root canal or they abscess."],
  ["Periodontal ligament", "The reason a tooth is not an implant. Dry it for an hour after avulsion and it dies. Ankylosis follows."],
  ["Alveolar bone", "The socket is the nest. A germ transplanted into necrotic bone does not erupt; it sits in a grave."],
  ["Gingiva", "Soft-tissue seal. Thermal injury scars. Grafts and FGF-2 rebuild the frame, not a new tooth."]
];

const trauma = [
  ["Punched in the teeth", "Luxation, fracture, avulsion, pulp hemorrhage, alveolar fracture. Time-to-replant decides whether the original PDL lives."],
  ["Fire and lasers", "Enamel crazes. Pulp proteins coagulate. Bone can undergo thermal necrosis that does not declare itself on day one."],
  ["Perfect as when I was born", "You were born with primary teeth. They were supposed to leave. A reconstituted germ will not automatically reprint a childhood photograph. Orthodontics remains."]
];

function cards(target, rows) {
  target.innerHTML = rows.map(([roman, title, kicker, body, limit]) =>
    '<article class="card"><p class="roman">' + roman + '</p><h2>' + title + '</h2><p class="muted">' + kicker + '</p><p class="muted">' + body + '</p><p class="faint">' + limit + '</p></article>'
  ).join('');
}
function panels(el, items) { el.innerHTML = items.join(''); }

cards(document.getElementById('hair-horizons'), hairHorizons);
panels(document.getElementById('hair-stack'), treatments.map(([n, aka, ev, h, m, c, no]) =>
  '<article class="panel"><p class="meta">' + ev + ' \u00b7 ' + h + '</p><h3>' + n + '</h3>' + (aka ? '<p class="faint">' + aka + '</p>' : '') + '<p class="muted">' + m + '</p><p class="can">Can: ' + c + '</p><p class="cannot">Cannot: ' + no + '</p></article>'));
panels(document.getElementById('hair-pipe'), pipeline.map(([n, org, phase, year, m, s, w]) =>
  '<article class="panel"><p class="meta">' + org + ' \u00b7 ' + phase + ' \u00b7 ' + year + '</p><h3>' + n + '</h3><p class="muted">' + m + '</p><p class="muted">' + s + '</p><p class="faint">' + w + '</p></article>'));
panels(document.getElementById('hair-bio'), [].concat(
  anatomy.map(([n, f]) => '<article class="panel"><h3>' + n + '</h3><p class="muted">' + f + '</p></article>'),
  cycle.map(([n, s, b]) => '<article class="panel"><p class="meta">' + s + '</p><h3>' + n + '</h3><p class="muted">' + b + '</p></article>'),
  genes.map(([n, r]) => '<article class="panel"><p class="meta">Gene</p><h3>' + n + '</h3><p class="muted">' + r + '</p></article>')
));
panels(document.getElementById('hair-myths'), myths.map(([q, a]) =>
  '<article class="panel"><h3>' + q + '</h3><p class="muted">' + a + '</p></article>'));

cards(document.getElementById('tooth-horizons'), toothHorizons);
panels(document.getElementById('tooth-methods'), methods.map(([rank, title, body]) =>
  '<article class="panel"><p class="meta">' + rank + '</p><h3>' + title + '</h3><p class="muted">' + body + '</p></article>'));
panels(document.getElementById('tooth-stack'), toothTreatments.map(([n, ev, h, m, c, no]) =>
  '<article class="panel"><p class="meta">' + ev + ' \u00b7 ' + h + '</p><h3>' + n + '</h3><p class="muted">' + m + '</p><p class="can">Can: ' + c + '</p><p class="cannot">Cannot: ' + no + '</p></article>'));
panels(document.getElementById('tooth-pipe'), toothPipe.map(([n, org, phase, m, s, v]) =>
  '<article class="panel"><p class="meta">' + org + ' \u00b7 ' + phase + '</p><h3>' + n + '</h3><p class="muted">' + m + '</p><p class="muted">' + s + '</p><p class="faint">' + v + '</p></article>'));
panels(document.getElementById('tooth-org'), toothAnatomy.map(([n, f]) =>
  '<article class="panel"><h3>' + n + '</h3><p class="muted">' + f + '</p></article>'));
panels(document.getElementById('tooth-trauma'), trauma.map(([q, a]) =>
  '<article class="panel"><h3>' + q + '</h3><p class="muted">' + a + '</p></article>'));

function makeTabs(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = items.map(([key, label], i) =>
    '<button type="button" data-key="' + key + '" class="' + (i === 0 ? 'on' : '') + '">' + label + '</button>'
  ).join('');
  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    el.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    const root = el.parentElement;
    root.querySelectorAll('[data-panel]').forEach((p) => p.classList.toggle('hidden', p.dataset.panel !== b.dataset.key));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
makeTabs('hair-tabs', [['home', 'Atlas'], ['stack', 'Stack'], ['pipeline', 'Pipeline'], ['biology', 'Biology'], ['lab', 'Lab'], ['myths', 'Myths']]);
makeTabs('tooth-tabs', [['home', 'Atlas'], ['methods', 'Methods'], ['stack', 'Stack'], ['pipeline', 'Pipeline'], ['organ', 'Organ'], ['trauma', 'Trauma']]);

const hair = document.getElementById('hair');
const tooth = document.getElementById('tooth');
document.getElementById('org-hair').onclick = () => {
  document.getElementById('org-hair').classList.add('on');
  document.getElementById('org-tooth').classList.remove('on');
  hair.classList.remove('hidden');
  tooth.classList.add('hidden');
  location.hash = 'hair';
};
document.getElementById('org-tooth').onclick = () => {
  document.getElementById('org-tooth').classList.add('on');
  document.getElementById('org-hair').classList.remove('on');
  tooth.classList.remove('hidden');
  hair.classList.add('hidden');
  location.hash = 'tooth';
};
if (location.hash.indexOf('tooth') !== -1) document.getElementById('org-tooth').click();

function renderLab() {
  const i = Number(document.getElementById('nw').value) - 1;
  const n = norwood[i];
  document.getElementById('nw-label').textContent = n.label + ' \u00b7 ' + n.title;
  document.getElementById('bar-vis').style.width = (n.visible * 100) + '%';
  document.getElementById('bar-dorm').style.width = (n.dormant * 100) + '%';
  document.getElementById('lab-copy').textContent =
    'Stage ' + n.label + ': about ' + Math.round(n.visible * 100) + '% of a young terminal field still looks present in this sketch, and about ' +
    Math.round(n.dormant * 100) + '% may still be a miniaturized organ rather than empty skin. Scarring alopecias are not this picture.';
}
document.getElementById('nw').addEventListener('input', renderLab);
renderLab();
document.getElementById('dock-top').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
