Module Split Plan:

- card.js: Card creation, rendering, tap/reload logic
- board-state.js: Board population, dynamic stat updates, mutation observer
- controls.js: Plus/minus controls, button state logic
- export.js: Export PNG logic
- main.js: Imports all modules, runs DOMContentLoaded setup

Update HTML to use <script type="module" src="main.js"></script> and remove board.js from your HTML. All logic is now in modules.
