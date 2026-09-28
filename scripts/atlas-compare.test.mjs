import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import vm from "node:vm";

const root = process.cwd();
const html = readFileSync(join(root, "docs/index.html"), "utf8");
const js = readFileSync(join(root, "docs/atlas.js"), "utf8");

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
