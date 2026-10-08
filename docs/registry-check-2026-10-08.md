# Registry check: VDPHL01 and clascoterone rows (2026-10-08)

Personal hobby and learning project, developed with substantial AI assistance. This note was
produced by an AI coding assistant running the citation-check script
(`refcheck.py`, ClinicalTrials.gov API v2) on 2026-10-08. A person has not reviewed it.

It compares what the registry shows today with what this repository stores. **No row was
changed.** The registry and sponsor press releases answer different questions, and neither is a
peer-reviewed result.

## Clascoterone (SCALP-1 and SCALP-2)

| Registry | Registry status | Phase | Enrollment | Stored in `src/lib/data.ts` |
|---|---|---|---|---|
| [NCT05910450](https://clinicaltrials.gov/study/NCT05910450) | COMPLETED | Phase 3 | 703 | SCALP-1 listed as completed |
| [NCT05914805](https://clinicaltrials.gov/study/NCT05914805) | COMPLETED | Phase 3 | 762 | SCALP-2 listed as completed |

703 + 762 = 1,465, which matches the stored "1,465 men". The row's own review date
(2026-09-28) is unchanged; the sponsor-reported figures in the row were not re-read today.

## VDPHL01 (`docs/data/vdphl01.json`, header date 2026-10-03)

| Study | Registry ID | Registry status | Registry phase | Registry enrollment | Registry last update |
|---|---|---|---|---|---|
| 302 | [NCT06724614](https://clinicaltrials.gov/study/NCT06724614) | ACTIVE_NOT_RECRUITING | Phase 2/Phase 3 | 480 (estimated) | 2025-11-06 |
| 304 | [NCT06972264](https://clinicaltrials.gov/study/NCT06972264) | ACTIVE_NOT_RECRUITING | Phase 3 | 480 (estimated) | 2026-02-12 |

Things to read side by side, not errors:

- The record stores **519** participants for Study 302 (171 + 175 + 173, sponsor-reported).
  The registry still shows an **estimated** 480, last updated 2025-11-06, with no posted results.
  The registry has not caught up with the sponsor's report, or the numbers describe different
  populations. This check cannot tell which.
- The record lists Study 302 as `results-reported` from a sponsor source and says so in
  `sourceStatus` ("sponsor-reported topline; no peer-reviewed report is linked"). The registry
  shows no results, so that wording is still right and should stay.
- Study 304 is listed as planned in the record; the registry shows it active and not recruiting
  at 480 estimated. Consistent with "readout anticipated", not with any result.
- This check did not open the three sponsor URLs in the record.

## What would settle it

A person opening the sponsor documents against the registry entries, and re-checking the
registry after its next update. Until then the rows keep their current labels.
