// Set random values on load
window.addEventListener('DOMContentLoaded', function() {
    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Enemy
    var lifeEnemy = document.querySelector('.life-enemy');
    if (lifeEnemy) lifeEnemy.value = randInt(7, 27);
    var manaEnemy = document.querySelector('.mana-enemy');
    if (manaEnemy) manaEnemy.value = randInt(0, 7);
    var handEnemy = document.querySelector('.hand-enemy');
    if (handEnemy) handEnemy.value = randInt(0, 7);
    // Player
    var lifePlayer = document.querySelector('.life-player');
    if (lifePlayer) lifePlayer.value = randInt(7, 27);
    var manaPlayer = document.querySelector('.mana-player');
    if (manaPlayer) manaPlayer.value = randInt(0, 7);

    // Reload button handler
    var reloadBtn = document.getElementById('reload-btn');
    if (reloadBtn) {
        reloadBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }

    // Reset button handler
    var resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Helper to get a random card name from boardCards
            function getRandomCardName() {
                if (typeof boardCards !== 'undefined') {
                    var keys = Object.keys(boardCards);
                    return keys[randInt(0, keys.length - 1)];
                }
                return 'Horror'; // fallback
            }
            // Remove all cards from each section
            var enemyRow = document.getElementById('enemy-board-row');
            var playerRow = document.getElementById('player-board-row');
            var handRow = document.getElementById('player-hand-row');
            if (enemyRow) enemyRow.innerHTML = '';
            if (playerRow) playerRow.innerHTML = '';
            if (handRow) handRow.innerHTML = '';
            // Add one random card to each
            if (typeof createCard === 'function') {
                if (enemyRow) enemyRow.appendChild(createCard(getRandomCardName(), 'enemy'));
                if (playerRow) playerRow.appendChild(createCard(getRandomCardName(), 'player'));
                if (handRow) handRow.appendChild(createCard(getRandomCardName(), 'hand'));
            }
        });
    }
});
