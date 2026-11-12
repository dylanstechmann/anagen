import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const html = readFileSync(join(root, "docs/index.html"), "utf8");
const js = readFileSync(join(root, "docs/atlas.js"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");

const regenStart = js.indexOf("const regenScope = [");
const regen = js.slice(regenStart, js.indexOf("];", regenStart));
const baldStart = js.indexOf("const baldScope = [");
const bald = js.slice(baldStart, js.indexOf("];", baldStart));

test("regen section wires into index.html", () => {
  assert.ok(html.includes('data-panel="regen"'));
  assert.ok(html.includes('id="hair-regen"'));
  assert.ok(html.includes("The real goal"));
  assert.ok(html.includes("Regenerate."));
  assert.ok(html.includes("throughput × take × patterning × maturation × cycling"));
  assert.ok(html.includes("Reviewed 2026-11-12 with sources opened this session through the regen-workbench research desk"));
});

test("regen scope registers in atlas.js", () => {
  assert.ok(regenStart !== -1);
  assert.ok(/document\.getElementById\(['"]hair-regen['"]\)/.test(js));
  assert.ok(/\[['"]regen['"], ['"]Regenerate['"]\]/.test(js));
  assert.ok(js.indexOf("'Regenerate'") > js.indexOf("hair-tabs"));
});

test("every regen card carries an opened-source stamp", () => {
  const stamps = regen.match(/Reviewed on 2026-11-12 · Sources: <a href=/g) || [];
  assert.equal((regen.match(/review:/g) || []).length, 10);
  assert.equal(stamps.length, 10);
});

test("all thirty-one opened sources are cited", () => {
  [
    "https://doi.org/10.1097/dss.0000000000004707",
    "https://jcasonline.com/hair-transplant-practice-guidelines/",
    "https://www.thno.org/v15p2933.htm",
    "https://pubmed.ncbi.nlm.nih.gov/40083946/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12021125/",
    "https://pubmed.ncbi.nlm.nih.gov/40042061/",
    "https://pubmed.ncbi.nlm.nih.gov/41762869/",
    "https://www.organ-tech.jp/en/business/hair_regeneration.html",
    "https://pubmed.ncbi.nlm.nih.gov/41664452/",
    "https://pubmed.ncbi.nlm.nih.gov/42501773/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC11725629/",
    "https://hairclone.me/newlook/hairclone-begins-clinical-testing/",
    "https://clinicaltrials.gov/study/NCT01286649",
    "https://www.accessnewswire.com/newsroom/en/biotechnology/replicel-terminates-license-agreement-with-shiseido-678894",
    "https://www.stockwatch.com/News/Item/Z-C!RP-3652041/C/RP",
    "https://www.dnovobio.com/",
    "https://clinicaltrials.gov/study/NCT03491267",
    "https://pubmed.ncbi.nlm.nih.gov/39970235/",
    "https://clinmedjournals.org/articles/ijdrt/journal-of-dermatology-research-and-therapy-ijdrt-11-131.php",
    "https://pubmed.ncbi.nlm.nih.gov/42698274/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC11709086/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12266755/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12960685/",
    "https://pubmed.ncbi.nlm.nih.gov/37118377/",
    "https://www.mdpi.com/1420-3049/29/4/798",
    "https://pubmed.ncbi.nlm.nih.gov/40570815/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC6925069/",
    "https://pubmed.ncbi.nlm.nih.gov/41001936/",
    "https://pubmed.ncbi.nlm.nih.gov/42969371/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12913381/",
    "https://pubmed.ncbi.nlm.nih.gov/42903992/",
  ].forEach((url) => assert.ok(regen.includes(url), url));
  assert.equal((regen.match(/<a href="/g) || []).length, 31);
});

test("regeneration numbers match the opened studies", () => {
  [
    "171.3±33.5",
    "1,450 spheres",
    "one-thirteenth",
    "5% GelMA",
    "92.95%",
    "100–150 spheroids",
    "2.6±5.89",
    "67.0%",
    "41.78%",
    "75.16%",
    "57,181",
  ].forEach((fragment) => assert.ok(regen.includes(fragment), fragment));
});

test("honest framing stays pinned", () => {
  [
    "maturation into fully developed hair follicles remains to be achieved",
    "no confirmed first-in-human date",
    "limited and fragmented",
  ].forEach((fragment) => assert.ok(regen.includes(fragment), fragment));
  assert.ok(html.includes("Reviewed 2026-11-12 with sources opened this session through the regen-workbench research desk"));
});

test("pipeline and transplant corrections land", () => {
  assert.ok(js.includes("Preclinical; preparing for clinical research"));
  assert.ok(!js.includes("First-in-human aimed late 2026"));
  assert.ok(js.includes("OrganTech pipeline page"));
  assert.ok(bald.includes("relocation is not restoration"));
});

test("existing fixtures are untouched", () => {
  assert.ok(readme.includes("Regenerate tab"));
  assert.ok(readme.includes("Bald scalps"));
  assert.ok(js.includes('["Bald means the follicles are gone."'));
  assert.ok(js.includes('fetch(new URL("./data/vdphl01.json", import.meta.url))'));
  assert.ok(js.includes("const hairCompareTrials"));
  assert.ok(js.includes("no linked source is attached to this record."));
  assert.ok(js.includes("4,000-6,500 grafts"));
  assert.ok(js.includes("82.7% in the first year, decaying to 39.6%"));
});
