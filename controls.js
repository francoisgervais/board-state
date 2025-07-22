// Plus/minus controls, button state logic
export function updateControlButtons(controlDiv, cardRow) {
    const minus = controlDiv.querySelector('.minus');
    const plus = controlDiv.querySelector('.plus');
    const count = cardRow.children.length;
    minus.disabled = count <= 0;
    plus.disabled = count >= 5;

    // If this is the player-hand-control, update the my-cards-input value
    if (controlDiv.classList.contains('player-hand-control')) {
        const myCardsInput = document.querySelector('.my-cards-input');
        if (myCardsInput) {
            myCardsInput.value = count;
        }
    }
}

export function setupControls(createCard, updateControlButtons) {
    document.querySelectorAll('.control-div').forEach(controlDiv => {
        const targetClass = controlDiv.getAttribute('data-target');
        const stateDiv = controlDiv.parentElement.querySelector('.' + targetClass);
        const cardRow = stateDiv.querySelector('.card-row');
        const minus = controlDiv.querySelector('.minus');
        const plus = controlDiv.querySelector('.plus');

        // Determine which pool to use for this control
        let poolType = 'board';
        if (controlDiv.classList.contains('player-hand-control')) poolType = 'hand';

        // Set initial button state
        updateControlButtons(controlDiv, cardRow);

        // Add card on plus click (max 5)
        plus.addEventListener('click', () => {
            if (cardRow.children.length < 5) {
                cardRow.appendChild(createCard(poolType, window.cardPool));
                updateControlButtons(controlDiv, cardRow);
            }
        });

        // Remove card on minus click (min 0)
        minus.addEventListener('click', () => {
            if (cardRow.children.length > 0) {
                cardRow.removeChild(cardRow.lastElementChild);
                updateControlButtons(controlDiv, cardRow);
            }
        });

        // Update button state on mouse enter/leave (in case of DOM changes)
        controlDiv.addEventListener('mouseenter', () => updateControlButtons(controlDiv, cardRow));
        controlDiv.addEventListener('mouseleave', () => updateControlButtons(controlDiv, cardRow));
    });
}
