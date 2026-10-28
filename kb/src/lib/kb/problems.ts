// The problems inside a merged ticket: one per cause (causes.ts), each with its report count.
import { causeOf, uniqueById, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = 'parser' | 'hint' | 'unplaced';

// A report's problem is its cause: its tenant and its channel (causes.ts). How the desk read a body
// (desk-notes.json `oneDayMove`) is a reading, not a cause: those reports stay with their cause.
export function problemOf(r: Report, t: Tenant | undefined): Problem {
  return causeOf(r, t) ?? 'unplaced';
}

export type ProblemRow = { problem: Problem; reports: number; readAsOneDayMove: number; tenants: number; firstSeen: string; lastSeen: string };

export function problemsIn(
  all: Report[],
  ticket: number,
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): { total: number; rows: ProblemRow[] } {
  const merged = uniqueById(all).filter((r) => r.mergedInto === ticket);
  const by = new Map<Problem, Report[]>();
  for (const r of merged) {
    const p = problemOf(r, tenantOf(r));
    by.set(p, [...(by.get(p) ?? []), r]);
  }
  const rows = [...by.entries()]
    .map(([problem, rs]) => {
      const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
      return { problem, reports: rs.length, readAsOneDayMove: rs.filter((r) => oneDayMove.includes(r.id)).length, tenants: new Set(rs.map((r) => r.tenant)).size, firstSeen: days[0], lastSeen: days[days.length - 1] };
    })
    .sort((a, b) => b.reports - a.reports);
  return { total: merged.length, rows };
}
