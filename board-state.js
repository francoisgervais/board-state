// Board population, dynamic stat updates, mutation observer
export function populateInitialCards(cardPool, createCardElement) {
    function createCardOfType(type) {
        let pool = cardPool.filter(card => card.type === type);
        if (pool.length === 0) return null;
        const cardData = pool[Math.floor(Math.random() * pool.length)];
        return createCardElement(cardData, 'board');
    }

    // Enemy board
    const enemyRow = document.getElementById('enemy-board-row');
    if (enemyRow) {
        const count = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
        const types = ['Enchantment', 'Artifact'];
        let specialType = null;
        if (Math.random() < 0.5) {
            specialType = types[Math.floor(Math.random() * types.length)];
        }
        let addedSpecial = false;
        for (let i = 0; i < count; i++) {
            if (specialType && !addedSpecial) {
                const card = createCardOfType(specialType);
                if (card) {
                    enemyRow.appendChild(card);
                    addedSpecial = true;
                    continue;
                }
            }
            // Only creatures for the rest
            const creaturePool = cardPool.filter(card => card.type === 'Creature');
            if (creaturePool.length === 0) continue;
            const cardData = creaturePool[Math.floor(Math.random() * creaturePool.length)];
            const cardEl = createCardElement(cardData, 'board');
            if (cardEl) {
                if (Math.random() < 1/3) {
                    cardEl.classList.remove('untapped');
                    cardEl.classList.add('tapped');
                    cardEl.classList.add('tapped-wide');
                }
                enemyRow.appendChild(cardEl);
            }
        }
    }
    // Player board
    const playerRow = document.getElementById('player-board-row');
    if (playerRow) {
        const count = Math.floor(Math.random() * 3) + 2;
        const types = ['Enchantment', 'Artifact'];
        let specialType = null;
        if (Math.random() < 0.5) {
            specialType = types[Math.floor(Math.random() * types.length)];
        }
        let addedSpecial = false;
        for (let i = 0; i < count; i++) {
            if (specialType && !addedSpecial) {
                const card = createCardOfType(specialType);
                if (card) {
                    playerRow.appendChild(card);
                    addedSpecial = true;
                    continue;
                }
            }
            // Only creatures for the rest
            const creaturePool = cardPool.filter(card => card.type === 'Creature');
            if (creaturePool.length === 0) continue;
            const cardData = creaturePool[Math.floor(Math.random() * creaturePool.length)];
            const cardEl = createCardElement(cardData, 'board');
            if (cardEl) {
                if (Math.random() < 1/3) {
                    cardEl.classList.remove('untapped');
                    cardEl.classList.add('tapped');
                    cardEl.classList.add('tapped-wide');
                }
                playerRow.appendChild(cardEl);
            }
        }
    }
    // Player hand
    const handRow = document.getElementById('player-hand-row');
    if (handRow) {
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) {
            const card = window.createCard('hand', cardPool);
            if (card) handRow.appendChild(card);
        }
    }
}

export function updateDynamicStats() {
    function countCreatures(rowId) {
        const row = document.getElementById(rowId);
        if (!row) return 0;
        let count = 0;
        row.querySelectorAll('.card').forEach(card => {
            const typeInput = card.querySelector('.card-type');
            if (typeInput && typeInput.value === 'Creature') {
                const titleInput = card.querySelector('.card-title');
                if (titleInput && titleInput.value === 'Master') {
                    return;
                }
                count++;
            }
        });
        return count;
    }
    function countArtifacts(rowId) {
        const row = document.getElementById(rowId);
        if (!row) return 0;
        let count = 0;
        row.querySelectorAll('.card').forEach(card => {
            const typeInput = card.querySelector('.card-type');
            if (typeInput && typeInput.value === 'Artifact') {
                count++;
            }
        });
        return count;
    }
    const enemyRow = document.getElementById('enemy-board-row');
    const playerRow = document.getElementById('player-board-row');
    const allRows = [enemyRow, playerRow];
    let x = 0;
    x += countCreatures('enemy-board-row');
    x += countCreatures('player-board-row');
    let masterCount = 0;
    allRows.forEach(row => {
        if (!row) return;
        row.querySelectorAll('.card').forEach(card => {
            const typeInput = card.querySelector('.card-type');
            const titleInput = card.querySelector('.card-title');
            if (typeInput && titleInput && typeInput.value === 'Creature' && titleInput.value === 'Master') {
                masterCount++;
            }
        });
    });
    x += masterCount;
    let artifactCount = 0;
    artifactCount += countArtifacts('enemy-board-row');
    artifactCount += countArtifacts('player-board-row');
    allRows.forEach(row => {
        if (!row) return;
        row.querySelectorAll('.card').forEach(card => {
            const typeInput = card.querySelector('.card-type');
            const titleInput = card.querySelector('.card-title');
            const statsInput = card.querySelector('.card-stats');
            if (typeInput && titleInput && statsInput) {
                if (typeInput.value === 'Creature' && titleInput.value === 'Master') {
                    statsInput.value = x + ' / ' + x;
                }
                if (typeInput.value === 'Creature' && titleInput.value === 'Artificer') {
                    const val = 1 + artifactCount;
                    statsInput.value = val + ' / ' + val;
                }
            }
        });
    });
}

export function patchCardRowMutation(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const observer = new MutationObserver(() => {
        updateDynamicStats();
    });
    observer.observe(row, { childList: true, subtree: false });
}
