import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const html = readFileSync(join(root, "docs/index.html"), "utf8");
const js = readFileSync(join(root, "docs/atlas.js"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");

const scopeStart = js.indexOf("const baldScope = [");
const scope = js.slice(scopeStart, js.indexOf("];", scopeStart));

test("bald section wires into index.html", () => {
  assert.ok(html.includes('data-panel="bald"'));
  assert.ok(html.includes('id="hair-bald"'));
  assert.ok(html.includes("The zero-hair question"));
  assert.ok(html.includes("Completely bald."));
  assert.ok(html.includes("immune totalis, advanced pattern loss, scarring"));
  assert.ok(html.includes("Only one has an approved drug route back today"));
  assert.ok(html.includes("bald-scalp lens reviewed 2026-11-12"));
});

test("bald scope registers in atlas.js", () => {
  assert.ok(scopeStart !== -1);
  assert.ok(/document\.getElementById\(['"]hair-bald['"]\)/.test(js));
  assert.ok(/\[['"]bald['"], ['"]Bald scalps['"]\]/.test(js));
  assert.ok(js.indexOf("Bald scalps") > js.indexOf("hair-tabs"));
});

test("every bald card carries an opened-source stamp", () => {
  const stamps = scope.match(/Reviewed on 2026-11-12 · Sources: <a href=/g) || [];
  assert.equal((scope.match(/review:/g) || []).length, 7);
  assert.equal(stamps.length, 7);
});

test("all twenty opened sources are cited", () => {
  [
    "https://jci.org/articles/view/44478",
    "https://www.frontiersin.org/articles/10.3389/fmed.2021.790597/full",
    "https://pubmed.ncbi.nlm.nih.gov/8496421/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC6371726/",
    "https://jcasonline.com/hair-transplant-practice-guidelines/",
    "https://web.archive.org/web/20220614051142/https://www.fda.gov/news-events/press-announcements/fda-approves-first-systemic-treatment-alopecia-areata",
    "https://www.nejm.org/doi/full/10.1056/nejmoa2110343",
    "https://www.jaad.org/article/S0190-9622(24)02550-7/fulltext",
    "https://www.fda.gov/drugs/development-approval-process-drugs/drug-trials-snapshots/litfulo",
    "https://doi.org/10.1093/bjd/ljae365",
    "https://www.fda.gov/drugs/drug-trials-snapshots/drug-trials-snapshots-leqselvi",
    "https://jamanetwork.com/journals/jamadermatology/fullarticle/2822460",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC3855115/",
    "https://doi.org/10.1097/dss.0000000000004707",
    "https://pubmed.ncbi.nlm.nih.gov/17507982/",
    "https://www.nature.com/articles/s41586-020-2352-3",
    "https://pelagepharma.com/press-releases/pp405-awaken-trial-first-patient-dosed/",
    "https://clinicaltrials.gov/study/NCT07819435",
    "https://hairclone.me/newlook/hairclone-begins-clinical-testing/",
    "https://folliclethought.com/updates/stemson-therapeutics-shuts-down/",
  ].forEach((url) => assert.ok(scope.includes(url), url));
});

test("immune-route numbers match the opened trials", () => {
  [
    "20.1% (8 mg) to 29.5% (12 mg)",
    "59.6%",
    "36.1%",
    "SALT ≤20",
    "80% by week 152",
    "boxed warning",
  ].forEach((fragment) => assert.ok(scope.includes(fragment), fragment));
});

test("pattern and transplant numbers match the opened studies", () => {
  [
    "25% below controls",
    "86%",
    "4,000-6,500 grafts",
    "82.7% in the first year, decaying to 39.6%",
  ].forEach((fragment) => assert.ok(scope.includes(fragment), fragment));
});

test("honest framing stays pinned", () => {
  [
    "no clinical-stage program has demonstrated regrowth on a follicle-absent pattern-bald scalp",
    "absence of evidence, not proof of impossibility",
    "2030s",
  ].forEach((fragment) => assert.ok(scope.includes(fragment), fragment));
  assert.ok(html.includes("Reviewed 2026-11-12 with sources opened this session"));
});

test("existing fixtures are untouched", () => {
  assert.ok(readme.includes("Bald scalps"));
  assert.ok(js.includes('["Bald means the follicles are gone."'));
  assert.ok(js.includes('fetch(new URL("./data/vdphl01.json", import.meta.url))'));
  assert.ok(js.includes("const hairCompareTrials"));
  assert.ok(js.includes("no linked source is attached to this record."));
});
