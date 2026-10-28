<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { problemsIn, type Problem } from '#lib/kb/problems';

  // One number for a sentence: the reports of one problem in a ticket, or all of them.
  let { ticket, problem }: { ticket: number; problem?: Problem } = $props();

  const n = $derived.by(() => {
    const r = problemsIn(reports as Report[], ticket, tenantOf, notes.oneDayMove);
    return problem ? (r.rows.find((x) => x.problem === problem)?.reports ?? 0) : r.total;
  });
</script>

<strong>{n}</strong>
