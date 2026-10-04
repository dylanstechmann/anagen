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

test("future, impossible and malformed review dates fail closed", () => {
  const today = new Date("2026-10-04T00:00:00Z");
  for (const date of ["2026-10-05", "2026-02-30", "2026-13-01", "2026-10", "bad", null]) {
    const record = structuredClone(loadTrialRecords()[0]);
    record.review.date = date;
    const result = buildStalenessReport([record], today).results[0];
    assert.equal(result.state, "UNVERIFIED", String(date));
    assert.ok(result.reasons.some((reason) => reason.startsWith("review_date_")));
  }
  assert.throws(() => buildStalenessReport([], new Date("bad")), /valid as-of date/);
});

test("one invalid linked source cannot be hidden by other valid sources", () => {
  for (const change of [
    { sourceDate: "2026-02-30" }, { sourceDate: "2026-10-04" },
    { sourceDate: "yesterday" }, { label: " " }, { url: "javascript:alert(1)" },
  ]) {
    const record = structuredClone(loadTrialRecords()[0]);
    Object.assign(record.review.sources[0], change);
    const result = buildStalenessReport([record], new Date("2026-10-04T00:00:00Z")).results[0];
    assert.equal(result.state, "UNVERIFIED", JSON.stringify(change));
    assert.ok(result.reasons.includes("source_metadata_invalid_or_after_review"));
  }
});

test("missing or invalid milestone metadata is unverified", () => {
  for (const milestones of [undefined, [], [null], [{ status: "approved", sourceDate: "2026-02-30" }],
    [{ status: "invented", sourceDate: "2026-01-01" }]]) {
    const record = structuredClone(loadTrialRecords()[0]);
    record.milestones = milestones;
    assert.equal(buildStalenessReport([record], new Date("2026-10-04T00:00:00Z")).results[0].state, "UNVERIFIED");
  }
});
