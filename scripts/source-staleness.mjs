import { appendFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const dataDir = join(root, "docs", "data");
const allowedStatuses = new Set([
  "planned", "authorized", "recruiting", "completed", "results-reported", "approved",
]);
const maxAgeDays = 90;

function parseDate(value, allowMonth = false) {
  if (typeof value !== "string") return NaN;
  const day = allowMonth && /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return NaN;
  const time = Date.parse(`${day}T00:00:00Z`);
  // Date.parse normalizes impossible dates such as February 30.
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === day ? time : NaN;
}

export function buildStalenessReport(records, today = new Date()) {
  if (!(today instanceof Date) || !Number.isFinite(today.getTime())) {
    throw new TypeError("Review-age report requires a valid as-of date");
  }
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const results = records.map((record) => {
    const reviewDate = record.review?.date;
    const reviewTime = parseDate(reviewDate);
    const reasons = [];
    if (!Number.isFinite(reviewTime)) reasons.push("review_date_missing_or_invalid");
    else if (reviewTime > todayUtc) reasons.push("review_date_in_future");
    const sources = record.review?.sources;
    const sourceList = Array.isArray(sources) ? sources : [];
    if (!sourceList.length) reasons.push("linked_sources_missing");
    const sourceCount = sourceList.filter((source) => {
      try {
        const sourceTime = parseDate(source.sourceDate, true);
        const valid = typeof source.label === "string" && source.label.trim()
          && new URL(source.url).protocol === "https:" && Number.isFinite(sourceTime)
          && sourceTime <= todayUtc && sourceTime <= reviewTime;
        if (!valid) reasons.push("source_metadata_invalid_or_after_review");
        return valid;
      } catch {
        reasons.push("source_metadata_invalid_or_after_review");
        return false;
      }
    }).length;
    const milestones = record.milestones;
    const statusValid = allowedStatuses.has(record.status)
      && Array.isArray(milestones) && milestones.length > 0
      && milestones.every((item) => item && allowedStatuses.has(item.status)
        && Number.isFinite(parseDate(item.sourceDate)) && parseDate(item.sourceDate) <= reviewTime);
    if (!statusValid) reasons.push("status_or_milestone_metadata_invalid");
    const daysOld = Number.isFinite(reviewTime)
      ? Math.floor((todayUtc - reviewTime) / 86_400_000)
      : null;
    const state = reasons.length || sourceCount === 0
      ? "UNVERIFIED"
      : daysOld > maxAgeDays
        ? "STALE"
        : "FRESH";
    return { id: record.id, state, reviewDate: reviewDate ?? "missing", daysOld, sourceCount,
      reasons: [...new Set(reasons)] };
  });
  const lines = [
    `# Trial source review-age report (${today.toISOString().slice(0, 10)})`,
    "",
    `Review dates older than ${maxAgeDays} days are marked stale. This report checks record metadata and review age; it does not certify that an external URL remains live or that a source supports a claim.`,
    "",
    ...results.map((item) => `- **${item.state}** \`${item.id}\` · reviewed ${item.reviewDate}${item.daysOld === null ? "" : ` · ${item.daysOld} days old`} · ${item.sourceCount} linked sources${item.reasons.length ? ` · ${item.reasons.join(", ")}` : ""}`),
  ];
  return { results, markdown: `${lines.join("\n")}\n` };
}

export function loadTrialRecords() {
  return readdirSync(dataDir)
    .filter((name) => name.endsWith(".json") && name !== "trial-record.schema.json")
    .sort()
    .map((name) => JSON.parse(readFileSync(join(dataDir, name), "utf8")));
}

function main() {
  const today = process.env.SOURCE_STALENESS_AS_OF
    ? new Date(`${process.env.SOURCE_STALENESS_AS_OF}T00:00:00Z`)
    : new Date();
  const report = buildStalenessReport(loadTrialRecords(), today);
  process.stdout.write(report.markdown);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, report.markdown, "utf8");
  }
  if (report.results.some((item) => item.state !== "FRESH")) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
