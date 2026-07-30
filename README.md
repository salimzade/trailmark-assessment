# Trailmark Assessment

A technical take-home assessment for JavaScript and React skills. Build features for a hiking trail catalog and trip-log application.

## Setup

1. Clone or download this folder.
2. Navigate into the folder:
   ```bash
   cd trailmark-assessment
   ```
3. Initialize a fresh git repository and make your first commit:
   ```bash
   git init
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   git add .
   git commit -m "Initial commit: starter code"
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

Run the test suite to see which tests pass and which fail. This runs once and exits, printing a summary:
```bash
npm test
```

To re-run automatically as you edit files:
```bash
npm run test:watch
```
(Press `q` to exit watch mode.)

To view test results in a UI:
```bash
npm run test:ui
```

## Your Tasks

This assessment has **two independent parts** with five core tasks total:

1. **Legacy Console (Vanilla JavaScript)**, in `legacy-console/`
   - Fix an event delegation bug and a debounce timer bug in plain JavaScript
   - Run tests: `npm test` (includes legacy-console tests)

2. **Trip Planner (React + TypeScript)**, in `trip-planner/`
   - Fix a stale closure bug, an async race condition bug, and an array mutation bug in React
   - This part has its own `package.json` and dev server

See `test-task.md` for the complete assignment and detailed task descriptions for both parts.

Work through the tasks incrementally. After each fix or feature addition, commit your changes with a clear message:
```bash
git add .
git commit -m "Fix event delegation in trail delete button"
```

## When You Are Done

1. Fill in `NOTES.md` with your approach, trade-offs, and reflection.
2. Review your commit history to ensure it tells a clear story of your work.
3. Verify all tests pass:
   ```bash
   npm test
   ```
4. Push your repository to a private location, or prepare a git bundle for submission.

## Tips

- Start by running `npm test` to see all failing tests from both parts.
- For vanilla JS: check `legacy-console/app.test.js` for test expectations.
- For React: check `trip-planner/src/**/*.test.ts` for test expectations.
- Make small, focused commits as you work. This helps track your problem-solving process.
- Read error messages carefully; they often point directly to the issue.

## Project Structure

```
.
├── legacy-console/       # Vanilla JavaScript (legacy-style) part
│   ├── app.js           # Main application code to fix
│   ├── app.test.js      # Tests for vanilla JS features
│   ├── seed-data.js     # Sample data for the app
│   └── index.html       # HTML structure for legacy app
├── trip-planner/         # React + TypeScript part
│   ├── src/
│   │   ├── components/  # React components with bugs to fix
│   │   ├── hooks/       # Custom React hooks
│   │   └── types.ts     # Type definitions
│   ├── package.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   └── tsconfig.json
├── package.json          # Root configuration (unified test runner)
├── vitest.config.ts      # Root vitest config
├── test-task.md          # Task descriptions and requirements
└── NOTES.md              # Template: fill this in with your reflection
```

## Time Budget

This assessment is designed to take roughly 3 hours 30 minutes of focused effort, matching the timebox and per-task budgets in `test-task.md`. Pace yourself accordingly.

## Notes

- Do not modify this README or any pre-written test files unless explicitly instructed in `test-task.md`.
- Use only Node.js, npm, and the dependencies in `package.json`. No additional external APIs, services, or libraries.
- All work should be reproducible offline.
