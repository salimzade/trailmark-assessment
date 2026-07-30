# Trailmark Take-Home Assessment

## About Trailmark

Trailmark is a small hiking trail catalog and trip planning product. It has two parts: an internal admin console that staff use to manage trail records, and a trip planner widget that hikers use to filter trails and check current conditions before heading out. Both parts already exist in the codebase you are about to work in, and both currently have bugs.

## What you are doing

You will fix a set of defects across two independent codebases (one plain JavaScript, one React with TypeScript), then add one automated test of your own. Each task below states exactly what the code must do once you are finished. It does not explain the internal cause of the bug or suggest an implementation approach; diagnosing the cause and choosing the fix is part of the assessment.

One task, called out explicitly where it appears, also asks you to make and justify a design decision rather than apply a single fix. More than one answer is defensible there; you are graded on the quality of your decision and your reasoning, not on matching one expected diff.

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- A terminal, a code editor, and a browser

Nothing else is required. No account, API key, or external service is needed, and the project runs fully offline once dependencies are installed.

## Setup

From the root of this folder, run:

```bash
npm install
npm test
```

The install step pulls in dependencies for both parts of the project; the vanilla JavaScript console and the React trip planner share a single install through npm workspaces. The test command runs the full automated test suite for both parts and will show a mix of passing and failing tests before you make any changes. That is expected.

To run the React part's dev server:

```bash
npm run dev
```

To open the vanilla JavaScript console, open `legacy-console/index.html` directly in a browser.

## Step one: see the bugs before you touch anything (roughly 20 minutes)

Before you fix anything, get both halves of the app running and confirm you can personally observe each broken behavior described below. Open `legacy-console/index.html` in a browser and try adding a trail, editing one, and searching. Then run `npm run dev` and open the React trip planner in a browser, and try filtering, sorting, and selecting different trails.

Do this first. Fixing a bug you have not seen for yourself is a common source of wasted time, and several tasks below only make full sense once you have watched the current behavior happen in front of you.

## Timebox

This assessment is scoped for roughly three hours and thirty minutes of focused work, treated as a hard stop rather than a target to push past. If you reach the end of your available time with tasks unfinished, stop working and instead write up, in `NOTES.md`, what remains, what you tried, and what you would do next. A clear account of unfinished work is worth more than a rushed, undertested fix.

Approximate time budgets are given per task below so you can pace yourself. Treat them as a guide, not a contract.

## Visual polish is not graded

Do not spend time on layout, spacing, colors, or general visual polish. The existing styling is intentionally plain. Your time is better spent on the behavior described in each task's definition of done.

## Part 1: Trail Records Admin (vanilla JavaScript)

Location: `legacy-console/`. Tests: `legacy-console/app.test.js`. App code: `legacy-console/app.js`.

### Task 1.1: Buttons stop responding after the list re-renders (30 minutes)

Currently: the edit and delete buttons on a trail record work the first time the list renders. After the list re-renders (for example, after adding or editing a trail), clicking edit or delete on any row does nothing.

Must do: edit and delete buttons remain clickable no matter how many times the list has re-rendered, including for rows added after the page first loaded.

### Task 1.2: Search does not behave correctly (35 minutes)

Currently: typing in the search box filters the trail list, but rapid typing does not debounce correctly. Each keystroke schedules its own delayed search independently of any earlier one, so typing several characters quickly can run more than one search pass instead of just one.

Must do:
- Typing in the search box filters the visible trails by name, case insensitive, without searching on every single keystroke.
- Clearing the search box shows every trail again.
- Searching for a term that matches nothing shows an explicit empty state message instead of an empty list with no explanation.

Part 1 subtotal: roughly 65 minutes (30 min Task 1.1 + 35 min Task 1.2).

## Part 2: Trip Planner (React and TypeScript)

Location: `trip-planner/`. Tests: `trip-planner/src/__tests__/`. App code: `trip-planner/src/components/` and `trip-planner/src/hooks/`.

### Task 2.1: Filter values sent to the parent component do not update (30 minutes)

Location: `trip-planner/src/components/TrailFilters.tsx`.

Currently: the filters component periodically reports its current filter values to its parent. No matter what you set the difficulty, region, or max distance controls to, the parent always receives the original, empty values.

Must do: whenever the periodic report fires, the parent receives the filter values currently selected in the form, not the values that were present when the component first mounted.

### Task 2.2: Condition panel shows stale data during fetch (30 minutes)

Location: `trip-planner/src/hooks/useTrailConditions.ts` and/or `trip-planner/src/components/ConditionPanel.tsx`.

Currently: when you select a trail, the condition data takes 500-2500ms to load. If you click on one trail and then quickly click on a different trail while the first request is still in flight, the panel may briefly show the first trail's name with the second trail's condition data (or vice versa) because the requests can resolve out of order. The delay is randomized on every request, so try switching between a few different pairs of trails, more than once, before you decide whether you have reproduced it. The panel never guarantees that displayed condition data (status, weather, hazards) matches the trail name shown above it.

Must do: the condition panel must never display condition data whose trail ID does not match the currently selected trail, regardless of the order in which in-flight requests resolve. You may choose how the transition feels (clear-and-reload, keep-stale-until-new, or other approaches), but the invariant is non-negotiable: mismatched trail name and condition data must never be visible together, even momentarily.

Also required: this task has no single correct answer for how the loading transition should feel, so in `NOTES.md`, fill in the "Condition Panel Transition Decision" section. State what you personally observed while reproducing this behavior (which trails, roughly how many attempts it took), which transition option you chose, what alternatives you considered, and why you chose it over those alternatives.

### Task 2.3: Sorting mutates data it should not (30 minutes)

Location: `trip-planner/src/components/TrailList.tsx`.

Currently: clicking a sort control does reorder the displayed trail list, but doing so mutates the original array of trails that was passed into the component as a prop, instead of working on a copy of it.

Must do:
- Clicking a sort control continues to change the displayed order of trails.
- The original, unsorted trail data passed into the component is left unchanged no matter how many times sorting is applied.

Part 2 subtotal: roughly 90 minutes (30 min Task 2.1 + 30 min Task 2.2 + 30 min Task 2.3).

## Add a test of your own (roughly 15 minutes)

Somewhere in the process of fixing the tasks above, you will encounter at least one edge case that the existing tests do not cover. Add at least one new automated test for an edge case you found and fixed. Place it alongside the existing tests for whichever part it belongs to. A short comment on why the case matters is enough; it does not need to be extensive.

## Tests

Both parts of the project already have an automated test suite, and `npm test` from the root folder is expected to be run throughout your work, not just once at the end. Re-run it after each fix to confirm you have not broken something else.

```bash
npm test
```

For the React part only, you can also confirm there are no TypeScript errors:

```bash
cd trip-planner
npm run build
```

## Use of AI tools

You are allowed to use AI assistance (chat tools, code completion, or similar) while working on this assessment. If you do, disclose which tools you used and roughly how in `NOTES.md`. Whatever you submit, be prepared to walk through your reasoning for any part of it out loud, including any section where you used assistance.

## Wrap up and submit (roughly 20 minutes)

1. Fill in `NOTES.md`, including your approach, any trade offs you made, and anything left unfinished.
2. Confirm `npm test` passes for the tests you were expected to fix, and run the React build check above.
3. Commit your work incrementally as you go, with messages that describe what each commit changes, in a fresh git repository that you initialize yourself for this assessment.
4. Submit by pushing that repository to a private repository you grant us access to, or by producing a git bundle of your repository (`git bundle create trailmark-submission.bundle --all`) so your full commit history is preserved, and sending us that file.

---

Total estimated time: roughly 3 hours 30 minutes (20 min observe + 30 min Task 1.1 + 35 min Task 1.2 + 30 min Task 2.1 + 30 min Task 2.2 + 30 min Task 2.3 + 15 min own test + 20 min wrap-up).
