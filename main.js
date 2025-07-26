
/**
 * @file main.js
 * Main entry point for the board-state app. Handles global setup, event listeners, and module imports.
 */

import { createCardElement, createCard } from './card.js';
import { populateInitialCards, updateDynamicStats, patchCardRowMutation } from './board-state.js';
import { setupControls, updateControlButtons } from './controls.js';
import { setupExportButton } from './export.js';

// Expose createCardElement globally for use in create-card-modal.js
window.createCardElement = createCardElement;

// Make cardPool globally available for modules
window.cardPool = window.cardPool || [];
window.createCard = createCard;

/**
 * Initializes the board state and sets up all controls and event listeners on DOMContentLoaded.
 * Also attaches a reset handler to clear all cards from the board and hand.
 */
document.addEventListener('DOMContentLoaded', function() {
    populateInitialCards(window.cardPool, createCardElement);
    setupControls(createCard, updateControlButtons);
    updateDynamicStats();
    setupExportButton();

    /**
     * Clears all cards from the board and hand when the Reset button is pressed.
     */
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            ['enemy-board-row', 'player-board-row', 'player-hand-row'].forEach(rowId => {
                const row = document.getElementById(rowId);
                if (row) {
                    while (row.firstChild) {
                        row.removeChild(row.firstChild);
                    }
                }
            });
        });
    }
});

// Attach mutation observers to update stats dynamically when cards change
patchCardRowMutation('enemy-board-row');
patchCardRowMutation('player-board-row');
