// Imports all modules, runs DOMContentLoaded setup
import { createCardElement, createCard } from './card.js';
// Expose createCardElement globally for use in create-card-modal.js
window.createCardElement = createCardElement;
import { populateInitialCards, updateDynamicStats, patchCardRowMutation } from './board-state.js';
import { setupControls, updateControlButtons } from './controls.js';
import { setupExportButton } from './export.js';

// Make cardPool globally available for modules
window.cardPool = window.cardPool || [];
window.createCard = createCard;

document.addEventListener('DOMContentLoaded', function() {
    populateInitialCards(window.cardPool, createCardElement);
    setupControls(createCard, updateControlButtons);
    updateDynamicStats();
    setupExportButton();

    // Reset button clears all cards from board and hand
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Remove all cards from all card rows
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

patchCardRowMutation('enemy-board-row');
patchCardRowMutation('player-board-row');
