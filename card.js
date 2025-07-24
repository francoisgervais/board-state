// Card creation, rendering, tap/reload logic
export function createCardElement(cardData, poolType = 'board') {
    if (!cardData) {
        // Return a placeholder card if no data
        const card = document.createElement('div');
        card.className = 'card bg-light border position-relative untapped mx-5';
        card.innerHTML = `<div class="card-header"><span class="text-danger">No card data</span></div>`;
        return card;
    }
    if (!cardData) {
        // Do not create a card if no data
        return null;
    }
    const card = document.createElement('div');
    card.className = 'card bg-light border position-relative untapped mx-5';
    // Build dropdown for card-title, grouped and ordered by type/category
    const cardPool = window.cardPool || [];
    // Group cards by type, exclude Instants unless in hand
    const typeMap = {};
    cardPool.forEach(card => {
        if (card.type === 'Instant' && poolType !== 'hand') return;
        if (!typeMap[card.type]) typeMap[card.type] = [];
        typeMap[card.type].push(card.title);
    });
    // Enforce order: Creature, Instant, Artifact, Enchantment
    const typeOrder = poolType === 'hand'
        ? ['Creature', 'Instant', 'Artifact', 'Enchantment']
        : ['Creature', 'Artifact', 'Enchantment'];
    let dropdownItems = '';
    typeOrder.forEach(type => {
        if (!typeMap[type]) return;
        dropdownItems += `<li><h6 class="dropdown-header fw-bold">${type}</h6></li>`;
        const titles = [...new Set(typeMap[type])].sort();
        titles.forEach(title => {
            dropdownItems += `<li><a class="dropdown-item" href="#">${title}</a></li>`;
        });
        dropdownItems += '<li><hr class="dropdown-divider"></li>';
    });
    // Remove last divider
    dropdownItems = dropdownItems.replace(/<li><hr class=\"dropdown-divider\"><\/li>$/,'');
    card.innerHTML = `
        <div class="card-header">
            <div class="btn-group">
                <button type="button" class="btn btn-secondary btn-sm dropdown-toggle card-title-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    ${cardData.title}
                </button>
                <ul class="dropdown-menu">
                    ${dropdownItems}
                </ul>
            </div>
            <div class="card-cost form-control form-control-sm">${cardData.cost}</div>
        </div>
        <div class="card-type form-control form-control-sm">${cardData.type}</div>
        <div class="card-rules form-control form-control-sm">${cardData.rules}</div>
        <div class="card-footer">
            <button class="reload-btn btn btn-card btn-light p-0">
                <i class="fa-solid fa-recycle"></i>
            </button>
            <button class="tap-btn btn btn-card btn-light p-0">
                <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <div class="card-stats form-control form-control-sm">${cardData.stats}</div>
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
    // Dropdown logic for card-title
    const dropdown = card.querySelector('.card-title-dropdown');
    const menuItems = card.querySelectorAll('.dropdown-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedTitle = this.textContent;
            // Find card data by title
            const newCardData = (window.cardPool || []).find(card => card.title === selectedTitle);
            if (newCardData) {
                const parent = card.parentElement;
                if (parent) {
                    const newCard = createCardElement(newCardData, poolType);
                    parent.replaceChild(newCard, card);
                }
            }
        });
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
        return null;
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
        return null;
    }
    // Pick a random card from the pool
    const cardData = pool[Math.floor(Math.random() * pool.length)];
    return createCardElement(cardData, poolType);
}
