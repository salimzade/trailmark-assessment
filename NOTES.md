# Assessment Reflection

Fill in this template as you complete the assessment. Your reflection is an important part of the submission.

## Approach and Strategy

Describe the overall approach you took to solve the problems. What was your mental model? Did you start by reading all the tests, or dive into the code first?

Ran `npm test` to identify failures, analyzed assertion errors, and fixed root causes sequentially. Verified each fix with tests before committing.

## Key Decisions and Trade-offs

What key decisions did you make while working through the tasks? Were there any trade-offs between different approaches? Why did you choose one path over another?

- **Refactoring Legacy Event Handlers:** Deprecated/removed `attachListItemHandlers` in favor of single-point event delegation on the parent container. Attaching individual handlers per list item broke for dynamically added elements and risked memory leaks.
- **Debounce:** Cleared pending timers via `clearTimeout` to avoid race conditions without introducing extra dependencies.
- **Immutability:** Created a shallow array copy (`[...trails]`) in `TrailList` prior to sorting to prevent prop mutation.
- **Effect Dependencies:** Updated `useEffect` dependency array in `TrailFilters` to eliminate stale closures.

## Condition Panel Transition Decision (Required)

This section is required. It covers Task 2.2, the condition panel task, which has no single correct fix. Answer all four prompts in your own words:

1. How did you reproduce the behavior described in Task 2.2? Which trail names did you use, and roughly how many attempts did it take before you saw it happen?
2. What did the panel actually show on screen when it occurred?
3. What transition behavior did you choose for the loading window, and what alternatives did you consider before choosing it?
4. What does your chosen approach cost, and why did you accept that cost over the alternatives?

1. Rapidly switched between "Mount Ridge Trail" and "Alpine Loop" 2–3 times.
2. The panel briefly showed stale data from the previous selection or rendered out-of-order responses.
3. Reset stale state immediately on selection and displayed an explicit loading state while ignoring outdated async calls.
4. Minor UI flicker during fast switching, accepted to ensure total data accuracy.

## Edge Cases and Edge-Case Handling

What edge cases did you identify and handle? Give specific examples of problems you discovered while implementing or testing.

- **Dynamic DOM Elements:** Individual bindings via `attachListItemHandlers` failed for newly rendered items; solved by delegating events on the parent element using `.closest()`.
- **In-place Array Mutation:** Handled by copying array before `.sort()`.
- **Stale Closures:** Handled by adding state variables to `useEffect` dependencies.
- **Timer Overlaps:** Handled by resetting `debounceTimer` with `clearTimeout`.

## What I Would Do Next

If you had more time, what would you improve or add to the codebase? What features, refactorings, or optimizations would you tackle?

1. Implement `AbortController` to cancel ongoing fetches during quick switches.
2. Add ARIA accessibility attributes to interactive elements.
3. Virtualize the trail list for performance with large datasets.

## Testing and Validation

Did you write any additional tests beyond the provided ones? How did you validate that your fixes work correctly?

Validated using the provided Vitest test suite (`npm test`) along with manual UI verification.

## Challenges and Debugging

What was the hardest part of this assessment? How did you debug issues you encountered?

Refactoring the legacy console logic — specifically replacing per-item bindings (`attachListItemHandlers`) with proper delegation while ensuring child node clicks (`<span>`, `<i>`) resolved correctly via `.closest()`.

## Use of AI Tools and External Resources

Did you use any AI tools (ChatGPT, Copilot, Claude, etc.) or other external resources while completing this assessment?

If yes, describe what tools you used, how you used them (e.g., code generation, debugging help, research), and whether you modified the output or integrated it into the final solution.

AI was used solely to clarify task requirements and format the final `Notes.md` file. All code analysis, debugging, and fixes were performed manually.

## Final Thoughts

Any other comments about the assessment experience or your solution?

Clear and practical tasks covering common frontend and legacy JS edge cases.

---

**Time spent:** (approximately) ~30 min