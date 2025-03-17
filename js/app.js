document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".custom-dropdown");

    dropdowns.forEach(dropdown => {
        const wrapper = dropdown.closest(".select-wrapper"); // Get the parent wrapper
        const selected = dropdown.querySelector(".dropdown-selected");
        const options = dropdown.querySelector(".dropdown-options");

        // Toggle dropdown when clicking on the wrapper instead of just the selected area
        wrapper.addEventListener("click", function () {
            dropdown.classList.toggle("active");
        });

        // Handle option selection
        options.querySelectorAll("div").forEach(option => {
            option.addEventListener("click", function () {
                selected.textContent = this.textContent;
                selected.setAttribute("data-value", this.getAttribute("data-value"));
                dropdown.classList.remove("active");

                applyFilters(); // Call the function whenever an option is selected
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.closest(".select-wrapper").contains(event.target)) {
                dropdown.classList.remove("active");
            }
        });
    });
});

async function fetchInfo() {
    const userInput = document.getElementById("characterName").value.toLowerCase().replace(/\s+/g, '-');
    console.log("User input:", userInput);

    try {
        const response = await fetch('https://genshin.jmp.blue/characters/all');
        if (!response.ok) {
            throw new Error('Failed to fetch character list');
        }
        const data = await response.json();
        console.log("Fetched character data:", data);

        // Find the character based on the user input
        const character = data.find(char => char.name.toLowerCase().replace(/\s+/g, '-') === userInput);
        if (!character) {
            throw new Error('Character not found');
        }
        console.log("Found character:", character);

        const characterId = character.id; // Use the character ID directly
        const firstLetter = characterId.charAt(0).toUpperCase(); // Use uppercase for folder names
        console.log("Character ID:", characterId);
        console.log("First letter:", firstLetter);

        // Navigate to the appropriate HTML page
        window.location.href = `charPages/${firstLetter}/${characterId}.html`;
    } catch (error) {
        console.error('Error fetching character info:', error);
        const noSearchResult = document.getElementById("noSearchResult");
        noSearchResult.style.display = "block";
    }
}

function search(event) {
    let value = event.which;
    if (value === 13) {
        // use this to prevent form submit
        event.preventDefault();

        // call your function or anything else
        fetchInfo();
    }
}

// Event listener for DOM content loaded to fetch character list and initialize autocomplete
document.addEventListener("DOMContentLoaded", async function () {
    let characterList = [];
    try {
        const response = await fetch('https://genshin.jmp.blue/characters/all');
        if (!response.ok) {
            throw new Error('Failed to fetch character list');
        }
        const data = await response.json();
        console.log("Fetched character list:", data);

        // Use the array of strings directly and replace hyphens with spaces
        if (Array.isArray(data)) {
            characterList = data.map(character => character.name.toLowerCase().replace(/-/g, ' '));
        } else {
            console.error('Unexpected data structure:', data);
        }
    } catch (error) {
        console.error('Error fetching character list:', error);
    }
    console.log("Character list for autocomplete:", characterList);
    autocomplete(document.getElementById("characterName"), characterList);
});

function autocomplete(inp, arr) {
    /* the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values: */
    var currentFocus;
    /* execute a function when someone writes in the text field: */
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        console.log("Autocomplete input:", val);
        /* close any already open lists of autocompleted values */
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /* create a DIV element that will contain the items (values): */
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /* append the DIV element as a child of the autocomplete container: */
        this.parentNode.appendChild(a);
        /* for each item in the array... */
        for (i = 0; i < arr.length; i++) {
            /* check if the item starts with the same letters as the text field value: */
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /* create a DIV element for each matching element: */
                b = document.createElement("DIV");
                /* make the matching letters bold: */
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /* insert a input field that will hold the current array item's value: */
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /* execute a function when someone clicks on the item value (DIV element): */
                b.addEventListener("click", function (e) {
                    /* insert the value for the autocomplete text field: */
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /* close the list of autocompleted values,
                    (or any other open lists of autocompleted values: */
                    closeAllLists();
                    /* trigger the search function */
                    fetchInfo();
                });
                a.appendChild(b);
            }
        }
    });
    /* execute a function presses a key on the keyboard: */
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /* If the arrow DOWN key is pressed,
            increase the currentFocus variable: */
            currentFocus++;
            /* and and make the current item more visible: */
            addActive(x);
        } else if (e.keyCode == 38) { // up
            /* If the arrow UP key is pressed,
            decrease the currentFocus variable: */
            currentFocus--;
            /* and and make the current item more visible: */
            addActive(x);
        } else if (e.keyCode == 13) {
            /* If the ENTER key is pressed, prevent the form from being submitted, */
            e.preventDefault();
            if (currentFocus > -1) {
                /* and simulate a click on the "active" item: */
                if (x) x[currentFocus].click();
            } else {
                /* close the list of autocompleted values */
                closeAllLists();
                /* trigger the search function */
                fetchInfo();
            }
        } else if (e.keyCode == 9) { // tab
            /* If the TAB key is pressed, prevent the default action */
            e.preventDefault();
            if (x && x.length > 0) {
                /* insert the value for the autocomplete text field: */
                inp.value = x[0].getElementsByTagName("input")[0].value;
                /* close the list of autocompleted values */
                closeAllLists();
                /* trigger the search function */
                fetchInfo();
            }
        }
    });
    function addActive(x) {
        /* a function to classify an item as "active": */
        if (!x) return false;
        /* start by removing the "active" class on all items: */
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /* add class "autocomplete-active": */
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /* a function to remove the "active" class from all autocomplete items: */
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /* close all autocomplete lists in the document,
        except the one passed as an argument: */
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /* execute a function when someone clicks in the document: */
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}