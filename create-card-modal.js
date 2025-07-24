// Show modal on Create card button click
// This file is imported as a module in index.html

document.addEventListener('DOMContentLoaded', function() {
  var createBtn = document.getElementById('create-card-btn');
  if (createBtn) {
    createBtn.addEventListener('click', function() {
      var modal = new bootstrap.Modal(document.getElementById('createCardModal'));
      modal.show();
    });
  }

  // Reset modal fields
  function resetModalFields() {
    document.getElementById('card-title-input').value = '';
    document.getElementById('card-cost-input').value = '';
    document.getElementById('card-type-input').value = 'Creature';
    document.getElementById('card-rules-input').value = '';
    document.getElementById('card-stats-input').value = '';
  }

  // Cancel button resets fields
  var cancelBtns = document.querySelectorAll('#createCardModal .btn-secondary[data-bs-dismiss="modal"]');
  cancelBtns.forEach(function(btn) {
    btn.addEventListener('click', resetModalFields);
  });

  // Add card button logic
  var addBtn = document.getElementById('add-card-modal-btn');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      // Get values
      var title = document.getElementById('card-title-input').value.trim();
      var cost = document.getElementById('card-cost-input').value.trim();
      var type = document.getElementById('card-type-input').value;
      var rules = document.getElementById('card-rules-input').value.trim();
      var stats = document.getElementById('card-stats-input').value.trim();
      if (!title || !cost || !type) return;
      // Add to global card pool
      if (window.cardPool && Array.isArray(window.cardPool)) {
        window.cardPool.push({ title, cost, type, rules, stats });
      }

      // Update all dropdowns in the DOM
      function updateDropdowns() {
        // Helper: build dropdown HTML for a given poolType
        function buildDropdownItems(poolType) {
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
            // Sort titles case-insensitively and alphabetically
            const titles = [...new Set(typeMap[type])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
            titles.forEach(title => {
              dropdownItems += `<li><a class="dropdown-item" href="#">${title}</a></li>`;
            });
            dropdownItems += '<li><hr class="dropdown-divider"></li>';
          });
          // Remove last divider (use plain string replace, not regex with invalid flags)
          if (dropdownItems.endsWith('<li><hr class="dropdown-divider"></li>')) {
            dropdownItems = dropdownItems.slice(0, -'<li><hr class="dropdown-divider"></li>'.length);
          }
          return dropdownItems;
        }

        // Update all dropdowns
        document.querySelectorAll('.card').forEach(cardEl => {
          // Determine poolType by zone
          let poolType = 'board';
          const parent = cardEl.closest('.player-hand-state, .player-hand-container');
          if (parent) poolType = 'hand';
          // Update dropdown
          const dropdownMenu = cardEl.querySelector('.dropdown-menu');
          if (dropdownMenu) {
            dropdownMenu.innerHTML = buildDropdownItems(poolType);
            // Re-attach click listeners for new items
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
              item.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedTitle = this.textContent;
                const cardElem = this.closest('.card');
                let zoneType = 'board';
                const parentZone = cardElem.closest('.player-hand-state, .player-hand-container');
                if (parentZone) zoneType = 'hand';
                const newCardData = (window.cardPool || []).find(card => card.title === selectedTitle);
                if (newCardData && cardElem && cardElem.parentElement && window.createCardElement) {
                  const newCard = window.createCardElement(newCardData, zoneType);
                  cardElem.parentElement.replaceChild(newCard, cardElem);
                }
                // Close dropdown after selection
                const dropdownWrap = this.closest('.dropdown');
                if (dropdownWrap) {
                  const btn = dropdownWrap.querySelector('.dropdown-toggle');
                  if (btn) btn.click();
                }
              });
            });
          }
        });
      }
      // Close modal before updating dropdowns to avoid focus/aria-hidden issues
      var modalEl = document.getElementById('createCardModal');
      var modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
      // Reset fields
      resetModalFields();
      updateDropdowns();
    });
  }
});
