import { appendFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const dataDir = join(root, "docs", "data");
const allowedStatuses = new Set([
  "planned", "authorized", "recruiting", "completed", "results-reported", "approved",
]);
const maxAgeDays = 90;

export function buildStalenessReport(records, today = new Date()) {
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const results = records.map((record) => {
    const reviewDate = record.review?.date;
    const reviewTime = reviewDate ? Date.parse(`${reviewDate}T00:00:00Z`) : NaN;
    const sourceCount = (record.review?.sources ?? []).filter((source) => {
      try {
        return source.label && new URL(source.url).protocol === "https:" && source.sourceDate;
      } catch {
        return false;
      }
    }).length;
    const statusValid = allowedStatuses.has(record.status)
      && (record.milestones ?? []).every((item) => allowedStatuses.has(item.status));
    const daysOld = Number.isFinite(reviewTime)
      ? Math.floor((todayUtc - reviewTime) / 86_400_000)
      : null;
    const state = !statusValid || sourceCount === 0 || daysOld === null
      ? "UNVERIFIED"
      : daysOld > maxAgeDays
        ? "STALE"
        : "FRESH";
    return { id: record.id, state, reviewDate: reviewDate ?? "missing", daysOld, sourceCount };
  });
  const lines = [
    `# Trial source review-age report (${today.toISOString().slice(0, 10)})`,
    "",
    `Review dates older than ${maxAgeDays} days are marked stale. This report checks record metadata and review age; it does not certify that an external URL remains live or that a source supports a claim.`,
    "",
    ...results.map((item) => `- **${item.state}** \`${item.id}\` · reviewed ${item.reviewDate}${item.daysOld === null ? "" : ` · ${item.daysOld} days old`} · ${item.sourceCount} linked sources`),
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
