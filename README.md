# Board State Card Game

A web-based card game board simulator that lets you setup custom board states for LLM model training using generic cards for a game that looks suspiciously like Magic: the Gathering.

## Features
- **Dynamic Card Board:** Enemy board, player board, and player hand zones
- **Card Pool:** 100+ sample cards (creatures, instants, enchantments, artifacts) defined in `board-cards.js`
- **Card Interactions:** Tap/untap cards, reload (replace) cards, reset board, export board as PNG
- **Stat Updates:** Dynamic stat calculation for special cards (e.g., Master, Artificer)
- **Modular Codebase:** All logic split into modules (`card.js`, `board-state.js`, `controls.js`, `export.js`, `main.js`)

## Getting Started
1. Clone or download the repository
2. Open `board.html` in your browser
3. All scripts are loaded via `<script src="board-cards.js"></script>` and `<script type="module" src="main.js"></script>`

## File Overview
- `board.html` — Main UI and layout
- `board.css` — Custom styles
- `board-cards.js` — Card pool definitions (exposed as `window.cardPool`)
- `card.js` — Card creation, rendering, tap/reload logic
- `board-state.js` — Board population, stat updates, mutation observer
- `controls.js` — Plus/minus controls, button state logic
- `export.js` — Export board as PNG
- `main.js` — Entry point, initializes everything

## How It Works
- Cards are randomly assigned to each zone on load
- You can add/remove cards, tap/untap, reload, reset, and export the board
- Special cards update their stats dynamically based on board state

## Customization
- Add or edit cards in `board-cards.js`
- Extend logic in modules for new features

## License
MIT

---
Created by Francois Gervais
