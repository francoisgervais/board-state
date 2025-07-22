// Card creation, rendering, tap/reload logic
export function createCardElement(cardData, poolType = 'board') {
    if (!cardData) {
        // Return a placeholder card if no data
        const card = document.createElement('div');
        card.className = 'card bg-light border position-relative untapped mx-5';
        card.innerHTML = `<div class="card-header"><span class="text-danger">No card data</span></div>`;
        return card;
    }
    const card = document.createElement('div');
    card.className = 'card bg-light border position-relative untapped mx-5';
    card.innerHTML = `
        <div class="card-header">
            <input class="card-title form-control form-control-sm" value="${cardData.title}" />
            <input class="card-cost form-control form-control-sm" value="${cardData.cost}" />
        </div>
        <input class="card-type form-control form-control-sm" value="${cardData.type}" />
        <textarea class="card-rules form-control form-control-sm" wrap="soft">${cardData.rules}</textarea>
        <div class="card-footer">
            <button class="reload-btn btn btn-card btn-light p-0">
                <i class="fa-solid fa-recycle"></i>
            </button>
            <button class="tap-btn btn btn-card btn-light p-0">
                <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <input class="card-stats form-control form-control-sm" value="${cardData.stats}" />
        </div>
    `;
    card.querySelector('.reload-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const parent = card.parentElement;
        if (parent) {
            // cardPool must be globally available or passed in
            const newCard = createCard(poolType, window.cardPool);
            parent.replaceChild(newCard, card);
        }
    });
    card.querySelector('.tap-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (card.classList.contains('tapped')) {
            card.classList.remove('tapped');
            card.classList.remove('tapped-wide');
            card.classList.add('untapped');
        } else {
            card.classList.remove('untapped');
            card.classList.add('tapped');
            card.classList.add('tapped-wide');
        }
    });
    return card;
}

export function createCard(poolType = 'board', cardPool) {
    let pool;
    if (!cardPool || !Array.isArray(cardPool) || cardPool.length === 0) {
        return createCardElement(undefined, poolType);
    }
    if (poolType === 'hand') {
        // Favor instants 2:1 over other types in hand
        const instants = cardPool.filter(card => card.type === 'Instant');
        const others = cardPool.filter(card => card.type !== 'Instant');
        pool = instants.concat(instants, others);
    } else {
        // Board: only creatures, enchantments, artifacts
        pool = cardPool.filter(card => card.type === 'Creature' || card.type === 'Enchantment' || card.type === 'Artifact');
    }
    if (!pool || pool.length === 0) {
        return createCardElement(undefined, poolType);
    }
    // Pick a random card from the pool
    const cardData = pool[Math.floor(Math.random() * pool.length)];
    return createCardElement(cardData, poolType);
}
