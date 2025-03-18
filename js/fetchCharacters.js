document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters();
});

let sortType = 'name-asc'; //defaulted to ascending

async function fetchCharacters(filters = {}) {
  let url = 'https://genshin.jmp.blue/characters/all';
  const params = new URLSearchParams(filters);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    const response = await fetch(url);
    const characters = await response.json();
    console.log("Fetched characters:", characters);
    displayCharacters(characters);
  } catch (error) {
    console.error('Error fetching character data:', error);
  }

  sortCharacters(sortType);
}

function displayCharacters(characters) {
  const container = document.getElementById('characterCardsContainer');
  container.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'row box w-100 d-flex justify-content-center'; // bootstrap row class

  characters.forEach(character => {
    console.log("Character:", character);
    if (typeof character.name !== 'string') {
      console.error("Invalid character name:", character);
      return;
    }
    const card = document.createElement('div');
    card.className = 'col-lg-2 col-md-4 col-sm-6 mb-4 card-container'; // Responsive grid (6 per row on large screens)
    const characterId = character.name.toLocaleLowerCase().replace(/\s+/g, '-');
    const characterInitial = character.name.charAt(0).toUpperCase();
    const characterImageName = character.name.replace(/\s+/g, '_') + '_Card.png';

    card.innerHTML = `
      <div class="card text-center">
        <img src="images/cards/${characterImageName}" class="card-img-top" alt="${character.name}">
        <div class="card-info">
          <p class="card-text">${character.name}</p>
        </div>
      </div>
    `;

    // Add click event listener to navigate to character's HTML file
    card.addEventListener('click', () => {
      window.location.href = `charPages/${characterInitial}/${characterId}.html`;
    });

    row.appendChild(card);
  });

  container.appendChild(row); // Append the row to the container
}

function applyFilters() {
  function getFilterValue(filterId) {
    const selectedElement = document.querySelector(`#${filterId} .dropdown-selected`);
    if (!selectedElement) return "";

    const selectedText = selectedElement.textContent.trim();

    const matchingOption = [...document.querySelectorAll(`#${filterId} .dropdown-options div`)]
      .find(option => option.textContent.trim() === selectedText);

    return matchingOption ? matchingOption.getAttribute("data-value") : "";
  }

  const filterKeys = ["visionFilter", "weaponFilter", "rarityFilter"];
  const filters = {};

  filterKeys.forEach((key) => {
    const value = getFilterValue(key);
    if (value) {  // Only add non-empty values
      const mappedKey = key.replace("Filter", ""); // Map visionFilter -> vision, weaponFilter -> weapon
      filters[mappedKey] = value;
    }
  });

  console.log("Filters applied:", filters);

  fetchCharacters(filters);
}

document.querySelectorAll("#searchPoints .dropdown-options div").forEach(option => {
  option.addEventListener("click", function () {
    const selectedElement = document.querySelector("#searchPoints .dropdown-selected");
    selectedElement.textContent = this.textContent; // Update displayed value
    selectedElement.setAttribute("data-value", this.getAttribute("data-value")); // Store value

    const criteria = this.getAttribute("data-value"); // Get sorting criteria
    sortType = criteria;
    sortCharacters(criteria);
  });
});

function sortCharacters(criteria) {
  const container = document.getElementById('characterCardsContainer');
  const cards = Array.from(container.getElementsByClassName('card-container'));

  cards.sort((a, b) => {
    const nameA = a.querySelector('p').textContent.trim().toLocaleLowerCase();
    const nameB = b.querySelector('p').textContent.trim().toLocaleLowerCase();

    if (criteria === 'name-asc') {
      return nameA.localeCompare(nameB);
    } else if (criteria === 'name-desc') {
      return nameB.localeCompare(nameA);
    } 
    // else if (criteria === 'rarity') {
    //   const rarityA = parseInt(a.dataset.rarity);
    //   const rarityB = parseInt(b.dataset.rarity);

    //   console.log(rarityA);
    //   console.log(rarityB);
    //   return rarityB - rarityA; // Higher rarity first
    // }

    return 0; // No sorting change if invalid criteria
  });

  container.innerHTML = ''; // Clear container before re-adding sorted elements

  const row = document.createElement('div');
  row.className = 'row box w-100 d-flex justify-content-center'; // bootstrap row class

  container.appendChild(row);
  cards.forEach(card => row.appendChild(card));
}