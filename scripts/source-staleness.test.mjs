import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { buildStalenessReport, loadTrialRecords } from "./source-staleness.mjs";

const root = process.cwd();

test("canonical trial records have an auditable fresh review and supported statuses", () => {
  const records = loadTrialRecords();
  assert.equal(records.length, 1);
  const report = buildStalenessReport(records, new Date("2026-10-03T00:00:00Z"));
  assert.deepEqual(report.results.map(({ state }) => state), ["FRESH"]);
  assert.match(report.markdown, /does not certify that an external URL remains live/);

  const record = records[0];
  const schema = JSON.parse(readFileSync(join(root, "docs/data/trial-record.schema.json"), "utf8"));
  assert.deepEqual(schema.properties.status.enum, [
    "planned", "authorized", "recruiting", "completed", "results-reported", "approved",
  ]);
  assert.ok(record.registryIds.every((trial) => /^NCT\d{8}$/.test(trial.id)));
  assert.ok(record.review.sources.every((source) => source.url.startsWith("https://")));
});

test("review age reports become stale after the review window expires", () => {
  const report = buildStalenessReport(loadTrialRecords(), new Date("2027-01-02T00:00:00Z"));
  assert.deepEqual(report.results.map(({ state }) => state), ["STALE"]);
  assert.match(report.markdown, /STALE/);
});
