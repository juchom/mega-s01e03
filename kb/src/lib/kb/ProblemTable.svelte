<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { problemsIn, type Problem } from '#lib/kb/problems';

  // `issues`: where each problem is tracked now, problem → { label, href }.
  let { ticket, issues = {} }: { ticket: number; issues?: Partial<Record<Problem, { label: string; href: string }>> } = $props();

  const result = $derived(problemsIn(reports as Report[], ticket, tenantOf, notes.oneDayMove));
</script>

<p class="sum">
  <strong>{result.total}</strong> reports merged into #{ticket} ·
  <strong>{result.rows.length}</strong> {result.rows.length === 1 ? 'problem' : 'problems'}
</p>

<table>
  <thead><tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>tracked in</th></tr></thead>
  <tbody>
    {#each result.rows as row (row.problem)}
      <tr>
        <td><code>{row.problem}</code></td>
        <td>{row.reports}</td>
        <td>{row.tenants}</td>
        <td>{row.firstSeen} → {row.lastSeen}</td>
        <td>{#if issues[row.problem]}<a href={issues[row.problem]?.href}>{issues[row.problem]?.label}</a>{:else}no ticket yet{/if}</td>
      </tr>
    {/each}
  </tbody>
  <tbody>
  {#each result.rows.filter((r) => r.readAsOneDayMove) as row (row.problem)}
    <tr class="note"><td colspan="5">{row.readAsOneDayMove} of the <code>{row.problem}</code> reports read as a one-day move (desk notes); counted with <code>{row.problem}</code> by tenant and channel.</td></tr>
  {/each}
  </tbody>
  <tfoot><tr><td>total</td><td>{result.rows.reduce((n, r) => n + r.reports, 0)}</td><td colspan="3"></td></tr></tfoot>
</table>

<style>
  .sum { font-size: 1.1rem; }
  tfoot td { font-weight: 600; }
  .note td { color: var(--muted); font-size: 0.85em; }
</style>
