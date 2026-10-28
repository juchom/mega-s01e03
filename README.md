# mega-s01e03 · ticket #4471, split

The support desk merged 412 date reports into one ticket, #4471, and marked it known. They are
three problems, not one. Each one has its own ticket in this repo:

| ticket | problem | reports |
|---|---|---|
| [#1](../../issues/1) | `parser`: the shared parser reads day-first dates month first | 374 |
| [#2](../../issues/2) | `hint`: the booking-v3 form tells people to type month first | 33 |
| [#3](../../issues/3) | `shift`: the date moves by one day, the month stays | 5 |

## What's here

- `kb/` — the desk's kb export, with the new page added:
  - `kb/src/routes/kb/incidents/4471/problems/+page.svx` — the page (signed)
  - `kb/src/lib/kb/problems.ts`, `ProblemTable.svelte`, `ProblemCount.svelte` — the logic behind its numbers
- `rendered/` — the kb built as the desk sees it. The page: `rendered/kb/incidents/4471/problems.html`

## Build it yourself

`kb/package.json` and `kb/svelte.config.js` are the build I used (SvelteKit + mdsvex). Copy
`build-shim/app.html` to `src/app.html` and `build-shim/layout.js` to `src/routes/+layout.js`,
then `npm install && npm run build`.

The counts come from `reports-4471.json` at render time: 427 rows, 412 unique ids.
