import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import vm from "node:vm";

const root = process.cwd();
const html = readFileSync(join(root, "docs/index.html"), "utf8");
const js = readFileSync(join(root, "docs/atlas.js"), "utf8");
const data = readFileSync(join(root, "src/lib/data.ts"), "utf8");
const vdphl01 = JSON.parse(readFileSync(join(root, "docs/data/vdphl01.json"), "utf8"));
const trialSchema = JSON.parse(readFileSync(join(root, "docs/data/trial-record.schema.json"), "utf8"));

test("docs/index.html has dark and light theme variables and theme toggle button", () => {
  assert.ok(html.includes('[data-theme="light"]'), "Missing light mode theme rules");
  assert.ok(html.includes('color-scheme: dark'), "Missing dark mode color scheme");
  assert.ok(html.includes('id="theme-toggle"'), "Missing #theme-toggle button");
  assert.ok(html.includes('id="hair-compare"'), "Missing #hair-compare container");
  assert.ok(html.includes('id="tooth-compare"'), "Missing #tooth-compare container");
});

test("docs/atlas.js defines valid hair and tooth trial comparison records", () => {
  const context = vm.createContext({
    document: {
      getElementById: (id) => ({
        innerHTML: "",
        classList: { add() {}, remove() {}, toggle() {} },
        querySelectorAll: () => [],
        addEventListener() {}
      })
    },
    location: { hash: "" },
    window: { scrollTo() {} },
    localStorage: { getItem() { return null; }, setItem() {} }
  });

  // Extract array declarations and test contracts
  assert.ok(js.includes("hairCompareTrials"), "Missing hairCompareTrials array");
  assert.ok(js.includes("toothCompareTrials"), "Missing toothCompareTrials array");

  // Validate properties in js
  const requiredKeys = ["id", "name", "sponsor", "phase", "target", "horizon", "mechanism", "evidence", "limits", "timeline", "review"];
  for (const key of requiredKeys) {
    assert.ok(js.includes(`${key}:`), `Missing key '${key}' in comparison records`);
  }
});

test("docs/atlas.js wires compare tabs into both hair and tooth tablists", () => {
  assert.ok(js.includes("['compare', 'Compare']"), "Missing compare tab in makeTabs definitions");
  assert.ok(js.includes("setupComparison('hair-compare'"), "Missing setupComparison call for hair");
  assert.ok(js.includes("setupComparison('tooth-compare'"), "Missing setupComparison call for tooth");
});

test("VDPHL01 record is schema-backed and preserves endpoint hierarchy and source status", () => {
  const allowedStatuses = trialSchema.properties.status.enum;
  assert.ok(allowedStatuses.includes(vdphl01.status));
  assert.ok(allowedStatuses.includes("planned"));
  assert.ok(allowedStatuses.includes("authorized"));
  assert.ok(allowedStatuses.includes("recruiting"));
  assert.ok(allowedStatuses.includes("completed"));
  assert.ok(allowedStatuses.includes("results-reported"));
  assert.ok(allowedStatuses.includes("approved"));
  assert.equal(vdphl01.status, "results-reported");
  assert.equal(vdphl01.milestones.find((item) => item.study === "304").status, "planned");
  assert.equal(vdphl01.review.date, "2026-10-03");
  assert.match(vdphl01.sourceStatus, /sponsor-reported/);
  assert.equal(vdphl01.denominators.total, 519);
  assert.equal(vdphl01.denominators.onceDaily + vdphl01.denominators.twiceDaily + vdphl01.denominators.placebo, 519);
  assert.equal(vdphl01.registryIds.find((trial) => trial.study === "302").id, "NCT06724614");
  assert.equal(vdphl01.registryIds.find((trial) => trial.study === "304").id, "NCT06972264");
  for (const source of vdphl01.review.sources) {
    assert.ok(source.label);
    assert.equal(new URL(source.url).protocol, "https:");
    assert.ok(source.sourceDate);
  }

  assert.equal(vdphl01.outcomes.objectiveHairCount.type, "co-primary");
  assert.equal(vdphl01.outcomes.patientReportedImproved.type, "co-primary");
  assert.equal(vdphl01.outcomes.patientReportedAnyImprovement.type, "secondary");
  assert.match(vdphl01.outcomes.patientReportedAnyImprovement.interpretation, /not an objective/);
  assert.match(vdphl01.signal, /not hair density/);
});

test("React and Pages render the same canonical VDPHL01 record", () => {
  assert.ok(data.includes('import vdphl01Record from "../../docs/data/vdphl01.json"'));
  assert.ok(data.includes("...vdphl01Record"));
  assert.ok(js.includes('fetch(new URL("./data/vdphl01.json", import.meta.url))'));
  assert.ok(js.includes("vdphl01.signal"));
  assert.ok(js.includes("vdphl01.comparison.timeline"));
  assert.ok(!data.includes("79.3%/86.0%"), "React record must not duplicate canonical endpoint text");
  assert.ok(!js.includes("79.3%/86.0%"), "Pages record must not duplicate canonical endpoint text");
  assert.ok(html.includes("VDPHL01 reviewed 2026-10-03"));
});
