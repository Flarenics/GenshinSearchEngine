// Fetch character list as soon as the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters();
});

// Current sort option
let sortType = 'name-asc';

// Retrieve character data from the API and display the results
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
  // Container for character cards
  const container = document.getElementById('characterCardsContainer');
  container.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'row box w-100 d-flex justify-content-center';

  // Build a card for each character returned
  characters.forEach(character => {
    console.log("Character:", character);
    if (typeof character.name !== 'string') {
      console.error("Invalid character name:", character);
      return;
    }
    const card = document.createElement('div');
    card.className = 'col-lg-2 col-md-4 col-sm-6 mb-4 card-container';
    const characterId = character.name.toLocaleLowerCase().replace(/\s+/g, '-');
    const characterInitial = character.name.charAt(0).toLowerCase();
    const characterImageName = character.name.replace(/\s+/g, '_') + '_Card.png';

    card.innerHTML = `
      <div class="card text-center">
        <img src="images/cards/${characterImageName}" class="card-img-top" alt="${character.name}">
        <div class="card-info">
          <p class="card-text">${character.name}</p>
        </div>
      </div>
    `;

    // Navigate to the dedicated page on click
    card.addEventListener('click', () => {
      window.location.href = `pages/${characterInitial}/${characterId}.html`;
    });

    row.appendChild(card);
  });

  container.appendChild(row);
}

// Apply all dropdown filter selections
function applyFilters() {
  // Helper to read the selected value from a custom dropdown
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
    if (value) {
      const mappedKey = key.replace("Filter", "");
      filters[mappedKey] = value;
    }
  });

  console.log("Filters applied:", filters);

  fetchCharacters(filters);
}

// Change sort option when the user picks from dropdown
document.querySelectorAll("#searchPoints .dropdown-options div").forEach(option => {
  option.addEventListener("click", function () {
    const selectedElement = document.querySelector("#searchPoints .dropdown-selected");
    selectedElement.textContent = this.textContent;
    selectedElement.setAttribute("data-value", this.getAttribute("data-value"));

    const criteria = this.getAttribute("data-value");
    sortType = criteria;
    sortCharacters(criteria);
  });
});

// Sort the cards currently displayed
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
    return 0;
  });

  container.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'row box w-100 d-flex justify-content-center';

  container.appendChild(row);
  cards.forEach(card => row.appendChild(card));
}