// Imports all modules, runs DOMContentLoaded setup
import { createCardElement, createCard } from './card.js';
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
});

patchCardRowMutation('enemy-board-row');
patchCardRowMutation('player-board-row');
