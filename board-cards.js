// Card definitions for board-state
const cardPool = [
    // Creatures
    { title: 'Goblin', cost: '1', type: 'Creature', rules: '', stats: '1 / 1' },
    { title: 'Hero', cost: '1', type: 'Creature', rules: '', stats: '1 / 1' },
    { title: 'Unicorn', cost: '3', type: 'Creature', rules: '', stats: '2 / 2' },
    { title: 'Angel', cost: '5', type: 'Creature', rules: 'Flying, Vigilence', stats: '4 / 4' },
    { title: 'Lion', cost: '1', type: 'Creature', rules: '', stats: '2 / 1' },
    { title: 'Knight', cost: '2', type: 'Creature', rules: 'First Strike', stats: '2 / 2' },
    { title: 'Elemental', cost: '5', type: 'Creature', rules: '', stats: '4 / 4' },
    { title: 'Phantasm', cost: '4', type: 'Creature', rules: 'Flying', stats: '4 / 1' },
    { title: 'Wall', cost: '4', type: 'Creature', rules: 'Cannot attack', stats: '0 / 8' },
    { title: 'Specter', cost: '3', type: 'Creature', rules: 'Flying', stats: '2 / 2' },
    { title: 'Wall of Wind', cost: '3', type: 'Creature', rules: 'Flying, Cannot attack', stats: '1 / 5' },
    { title: 'Assassin', cost: '1', type: 'Creature', rules: 'Deathtouch', stats: '1 / 1' },
    { title: 'Master', cost: '2', type: 'Creature', rules: "Master has a power and toughness equal to one plus the number of creatures in play, including Master.", stats: '1+X / 1+X' },
    { title: 'Artificer', cost: '2', type: 'Creature', rules: "Artificer has a power and toughness equal to the number of artifacts in play.", stats: 'X / X' },
    { title: 'Minotaur', cost: '3', type: 'Creature', rules: '', stats: '2 / 3' },
    { title: 'Dragon', cost: '6', type: 'Creature', rules: 'Flying', stats: '5 / 5' },
    { title: 'Elf', cost: '2', type: 'Creature', rules: 'First Strike', stats: '2 / 1' },
    { title: 'Force', cost: '7', type: 'Creature', rules: '', stats: '7 / 7' },
    { title: 'Elephant', cost: '4', type: 'Creature', rules: 'Trample', stats: '3 / 3' },
    { title: 'Golem', cost: '5', type: 'Creature', rules: '', stats: '4 / 6' },
    { title: 'Vampire', cost: '4', type: 'Creature', rules: 'Flying', stats: '3 / 4' },
    { title: 'Djinn', cost: '6', type: 'Creature', rules: 'Flying', stats: '5 / 6' },
    { title: 'Land Wurm', cost: '7', type: 'Creature', rules: 'Trample', stats: '5 / 5' },
    { title: 'Wall of Blades', cost: '4', type: 'Creature', rules: 'Flying', stats: '3 / 5' },
    { title: 'Bear', cost: '2', type: 'Creature', rules: '', stats: '2 / 2' },
    { title: 'Serpent', cost: '6', type: 'Creature', rules: '', stats: '5 / 6' },
    { title: 'Hawk', cost: '2', type: 'Creature', rules: 'Flying', stats: '1 / 1' },
    { title: 'Troll', cost: '4', type: 'Creature', rules: 'Regenerate', stats: '3 / 3' },
    { title: 'Wolf', cost: '3', type: 'Creature', rules: '', stats: '3 / 2' },
    { title: 'Giant', cost: '5', type: 'Creature', rules: '', stats: '5 / 4' },
    { title: 'Pixie', cost: '1', type: 'Creature', rules: 'Flying', stats: '1 / 1' },
    { title: 'Zombie', cost: '2', type: 'Creature', rules: '', stats: '2 / 2' },
    { title: 'Crab', cost: '3', type: 'Creature', rules: '', stats: '1 / 5' },
    { title: 'Wall of Roots', cost: '2', type: 'Creature', rules: 'Cannot attack', stats: '0 / 5' },
    { title: 'Mammoth', cost: '5', type: 'Creature', rules: 'Trample', stats: '4 / 4' },
    { title: 'Imp', cost: '2', type: 'Creature', rules: 'Flying', stats: '1 / 2' },
    { title: 'Basilisk', cost: '4', type: 'Creature', rules: 'Deathtouch', stats: '2 / 4' },
    { title: 'Raptor', cost: '3', type: 'Creature', rules: 'Flying', stats: '2 / 2' },
    { title: 'Centaur', cost: '4', type: 'Creature', rules: '', stats: '3 / 3' },
    { title: 'Witch', cost: '3', type: 'Creature', rules: '', stats: '2 / 2' },
    { title: 'Ogre', cost: '4', type: 'Creature', rules: '', stats: '4 / 2' },
    { title: 'Sprite', cost: '1', type: 'Creature', rules: 'Flying', stats: '1 / 1' },
    { title: 'Rhino', cost: '4', type: 'Creature', rules: 'Trample', stats: '3 / 4' },
    { title: 'Wurm', cost: '6', type: 'Creature', rules: '', stats: '6 / 4' },
    { title: 'Drake', cost: '4', type: 'Creature', rules: 'Flying', stats: '3 / 2' },
    { title: 'Shade', cost: '3', type: 'Creature', rules: '', stats: '2 / 2' },
    { title: 'Myr', cost: '2', type: 'Creature', rules: '', stats: '1 / 1' },
    { title: 'Sphinx', cost: '5', type: 'Creature', rules: 'Flying', stats: '4 / 4' },
    { title: 'Horror', cost: '5', type: 'Creature', rules: '', stats: '5 / 3' },
    { title: 'Lizard', cost: '2', type: 'Creature', rules: '', stats: '2 / 1' },
    { title: 'Wall of Mist', cost: '3', type: 'Creature', rules: 'Cannot attack', stats: '0 / 6' },
    { title: 'Soldier', cost: '2', type: 'Creature', rules: '', stats: '2 / 2' },
    { title: 'Witch Doctor', cost: '3', type: 'Creature', rules: '', stats: '2 / 3' },
    { title: 'Beetle', cost: '1', type: 'Creature', rules: '', stats: '1 / 2' },
    { title: 'Wall of Thorns', cost: '4', type: 'Creature', rules: 'Cannot attack', stats: '0 / 7' },
    // Instants
    { title: 'Unravel', cost: '2', type: 'Instant', rules: 'Destroy target enchantment or artifact', stats: '' },
    { title: 'Aid', cost: '1', type: 'Instant', rules: 'Prevent 3 damage dealt to a creature or player', stats: '' },
    { title: 'Spell Denial', cost: '2', type: 'Instant', rules: 'Counter a spell as it\'s being cast', stats: '' },
    { title: 'Leap', cost: '1', type: 'Instant', rules: 'Target creature gains flying', stats: '' },
    { title: 'Blast', cost: '3', type: 'Instant', rules: 'Deals 4 damage to any target, but also 2 damage to the player casting this spell', stats: '' },
    { title: 'Blow up', cost: 'X1', type: 'Instant', rules: 'Deals X damage to any one target', stats: '' },
    { title: 'Rumble', cost: 'X1', type: 'Instant', rules: 'Deals X damage to all players and every creature without flying', stats: '' },
    { title: 'Bolt', cost: '1', type: 'Instant', rules: 'Deals 3 damage to any one target', stats: '' },
    { title: 'Growth', cost: '1', type: 'Instant', rules: 'Target creature gains +3/+3 this turn', stats: '' },
    { title: 'Storm', cost: 'X1', type: 'Instant', rules: 'Deals X damage to all players and every creature with flying', stats: '' },
    { title: 'Fog Bank', cost: '1', type: 'Instant', rules: 'Prevents all combat damage this turn', stats: '' },
    // More Instants
    { title: 'Swift Response', cost: '2', type: 'Instant', rules: 'Destroy target tapped creature', stats: '' },
    { title: 'Energy Burst', cost: '1', type: 'Instant', rules: 'Add 2 mana', stats: '' },
    { title: 'Shielding Light', cost: '1', type: 'Instant', rules: 'Target creature gains indestructible this turn', stats: '' },
    { title: 'Memory Drain', cost: '2', type: 'Instant', rules: 'Target player discards a card', stats: '' },
    { title: 'Sudden Growth', cost: '2', type: 'Instant', rules: 'Target creature gets +4/+4 until end of turn', stats: '' },
    { title: 'Denial', cost: '2', type: 'Instant', rules: 'Counter target spell', stats: '' },
    { title: 'Jolt', cost: '1', type: 'Instant', rules: 'Deal 2 damage to any target', stats: '' },
    { title: 'Healing Pulse', cost: '1', type: 'Instant', rules: 'Gain 5 life', stats: '' },
    { title: 'Frost Snap', cost: '1', type: 'Instant', rules: 'Tap up to two target creatures', stats: '' },
    { title: 'Vanish', cost: '2', type: 'Instant', rules: 'Exile target creature', stats: '' },
    { title: 'Redirect', cost: '1', type: 'Instant', rules: 'Change the target of a spell', stats: '' },
    { title: 'Reckless Charge', cost: '1', type: 'Instant', rules: 'Target creature gets +3/+0 and haste', stats: '' },
    { title: 'Nature\'s Aid', cost: '1', type: 'Instant', rules: 'Regenerate target creature', stats: '' },
    { title: 'Unmake', cost: '3', type: 'Instant', rules: 'Destroy target creature', stats: '' },
    { title: 'Moment of Heroics', cost: '1', type: 'Instant', rules: 'Target creature gets +2/+2 and lifelink', stats: '' },
    { title: 'Scatter', cost: '2', type: 'Instant', rules: 'Counter target creature spell', stats: '' },
    { title: 'Flash of Insight', cost: '1', type: 'Instant', rules: 'Scry 2, then draw a card', stats: '' },
    { title: 'Pyroclasmic Wave', cost: '2', type: 'Instant', rules: 'Deal 2 damage to each creature', stats: '' },
    { title: 'Mighty Leap', cost: '1', type: 'Instant', rules: 'Target creature gains flying and +2/+2', stats: '' },
    // Enchantments
    { title: 'Inspiration', cost: '2', type: 'Enchantment', rules: 'All the creatures of the player who controls this enchantment gain +1/+1', stats: '' },
    { title: 'Plague', cost: '4', type: 'Enchantment', rules: 'You may pay 1 mana to deal one damage to every creature and player', stats: '' },
    { title: 'Aura of Might', cost: '2', type: 'Enchantment', rules: 'Creatures you control get +1/+1', stats: '' },
    { title: 'Curse of Weakness', cost: '3', type: 'Enchantment', rules: 'Creatures your opponents control get -1/-1', stats: '' },
    { title: 'Field of Blossoms', cost: '2', type: 'Enchantment', rules: 'At the start of your turn, gain 1 life', stats: '' },
    { title: 'Seal of Fire', cost: '1', type: 'Enchantment', rules: 'Sacrifice: Deal 2 damage to any target', stats: '' },
    { title: 'Rage of the Wilds', cost: '3', type: 'Enchantment', rules: 'Creatures you control have trample', stats: '' },
    { title: 'Frozen Ground', cost: '2', type: 'Enchantment', rules: 'Creatures your opponents control enter the battlefield tapped', stats: '' },
    { title: 'Dark Bargain', cost: '2', type: 'Enchantment', rules: 'At the start of your turn, lose 1 life and draw a card', stats: '' },
    { title: 'Sunlit Path', cost: '2', type: 'Enchantment', rules: 'Creatures you control have vigilance', stats: '' },
    { title: 'Arcane Study', cost: '2', type: 'Enchantment', rules: 'Whenever you cast a spell, draw a card', stats: '' },
    { title: 'Fountain of Youth', cost: '1', type: 'Enchantment', rules: 'At the start of your turn, gain 2 life', stats: '' },
    { title: 'Nightmare Veil', cost: '3', type: 'Enchantment', rules: 'Creatures your opponents control have -2/-0', stats: '' },
    { title: 'Righteous Charge', cost: '2', type: 'Enchantment', rules: 'Creatures you control get +2/+0', stats: '' },
    // Artifacts
    { title: 'Manipulator', cost: '4', type: 'Artifact', rules: '1 mana: tap this card and any one other', stats: '' },
    { title: 'Medallion', cost: '1', type: 'Artifact', rules: 'Tap this card to add 1 mana to your pool', stats: '' },
    { title: 'Net', cost: '1', type: 'Artifact', rules: 'Every time a creature owned by any player dies, the controller of this artifact gains one life', stats: '' },
    { title: 'Amulet of Growth', cost: '2', type: 'Artifact', rules: 'At the start of your turn, gain 1 life', stats: '' },
    { title: 'Chalice of Hope', cost: '2', type: 'Artifact', rules: 'Tap: Gain 1 life', stats: '' },
    { title: 'Relic of Renewal', cost: '2', type: 'Artifact', rules: 'Gain 2 life when this enters the battlefield', stats: '' },
    { title: 'Tablet of Wisdom', cost: '2', type: 'Artifact', rules: 'Tap: Draw a card, then discard a card', stats: '' },
    { title: 'Totem of Beasts', cost: '3', type: 'Artifact', rules: 'Creatures you control get +0/+1', stats: '' },
    { title: 'Monolith', cost: '3', type: 'Artifact', rules: 'Add 3 mana, does not untap during untap step', stats: '' },
    { title: 'Orb of Dreams', cost: '3', type: 'Artifact', rules: 'Creatures enter the battlefield tapped', stats: '' },
    { title: 'Tome of Knowledge', cost: '4', type: 'Artifact', rules: 'Draw an extra card each turn', stats: '' },
];

// Make cardPool globally available for all modules
window.cardPool = cardPool;
