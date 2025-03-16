async function fetchCharacters(filters = {}) {
    let url = 'https://genshin.jmp.blue/characters/all';
    const params = new URLSearchParams(filters);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  
    try {
      const response = await fetch(url);
      const characters = await response.json();
      displayCharacters(characters);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  }
  
  function displayCharacters(characters) {
    const container = document.getElementById('characterCardsContainer');
    container.innerHTML = '';
  
    characters.forEach(character => {
      const card = document.createElement('div');
      card.className = 'character-card';
      const characterId = character.id.toLowerCase().replace(/\s+/g, '-');
      card.innerHTML = `
        <img src="https://genshin.jmp.blue/characters/${characterId}/card" alt="${character.name}">
        <p>${character.name}</p>
      `;
      container.appendChild(card);
    });
  }
  
  function applyFilters() {
    const vision = document.getElementById('visionFilter').value;
    const weapon = document.getElementById('weaponFilter').value;
    const rarity = document.getElementById('rarityFilter').value;
  
    const filters = {};
    if (vision) filters.vision = vision;
    if (weapon) filters.weapon = weapon;
    if (rarity) filters.rarity = rarity;
  
    fetchCharacters(filters);
  }
  
  function sortCharacters(criteria) {
    const container = document.getElementById('characterCardsContainer');
    const cards = Array.from(container.getElementsByClassName('character-card'));
  
    cards.sort((a, b) => {
      const nameA = a.querySelector('p').textContent;
      const nameB = b.querySelector('p').textContent;
  
      if (criteria === 'name-asc') {
        return nameA.localeCompare(nameB);
      } else if (criteria === 'name-desc') {
        return nameB.localeCompare(nameA);
      } else if (criteria === 'rarity') {
        const rarityA = parseInt(a.dataset.rarity);
        const rarityB = parseInt(b.dataset.rarity);
        return rarityB - rarityA;
      }
    });
  
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));
  }
  
  document.getElementById('searchPoints').addEventListener('change', (event) => {
    const criteria = event.target.value;
    sortCharacters(criteria);
  });
  
  document.getElementById('visionFilter').addEventListener('change', applyFilters);
  document.getElementById('weaponFilter').addEventListener('change', applyFilters);
  document.getElementById('rarityFilter').addEventListener('change', applyFilters);
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
  });