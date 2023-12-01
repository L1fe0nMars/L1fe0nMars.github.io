"use strict";

const GENERATOR_BTN = document.getElementById("generate");
const NAMES_LIST = document.getElementById("names");
const NUM_NAMES = document.getElementById("num-names");
const FIRST_LETTER = document.getElementById("first-letter");
const SAVED_NAMES = document.getElementById("saved-names");
const SAVED_NAMES_LIST = document.getElementById("saved-names-list");

const MAX_NAMES = Number(NUM_NAMES.max);
const MIN_NAMES = Number(NUM_NAMES.min);

const generator = new Generator();

/**
 * Saves name the browser's local storage
 * 
 * @param {string} name The name to save
 */
function saveName(name) {
    if (localStorage["savedNames"]) {
        let savedNames = JSON.parse(localStorage["savedNames"]);

        if (!savedNames.includes(name)) {
            savedNames.push(name);
            localStorage["savedNames"] = JSON.stringify(savedNames);
        }
    }
    else {
        localStorage["savedNames"] = JSON.stringify([name]);
    }

    loadNames();
}

/**
 * Load all saved names
 */
function loadNames() {
    const storedNames = JSON.parse(localStorage["savedNames"]);

    clearNames(SAVED_NAMES_LIST);
    createNameList(SAVED_NAMES_LIST, storedNames.length);
}

/**
 * Creates the elements for the list of names that get displayed
 * 
 * @param {object} nameList The name list element to add names to
 * @param {number} numNames The number of names to list
 */
function createNameList(nameList, numNames) {
    for (let i = 0; i < numNames; i++) {
        const listElement = document.createElement("li");
        const name = document.createElement("h2");
        const copyIcon = document.createElement("h3");
        const storedNames = localStorage["savedNames"];

        nameList === NAMES_LIST
            ? name.innerHTML = generator.generateName(FIRST_LETTER.value[0])
            : name.innerHTML = JSON.parse(storedNames)[i];
        
        copyIcon.innerHTML = '<i class="fa-regular fa-copy" title="Copy name"></i>';
        copyIcon.style.color = "var(--off-white)";
        copyIcon.onclick = () => {
            navigator.clipboard.writeText(name.innerHTML);
            copyIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            copyIcon.style.color = "green";

            setTimeout(() => {
                copyIcon.innerHTML = '<i class="fa-regular fa-copy" title="Copy name"></i>';
                copyIcon.style.color = "var(--off-white)";
            }, 2000);
        };

        if (nameList === NAMES_LIST) {
            const nameDiv = document.createElement("div");
            const starIcon = document.createElement("h3");

            starIcon.innerHTML = '<i class="fa-regular fa-star" title="Save name"></i>';
            starIcon.onclick = () => {
                saveName(name.innerHTML);
                starIcon.style.color = "var(--space-color)";
            };

            nameDiv.appendChild(name);
            nameDiv.appendChild(copyIcon);
            nameDiv.appendChild(starIcon);
            listElement.appendChild(nameDiv);
        }
        else {
            const deleteButton = document.createElement("h3");

            deleteButton.innerHTML = '<i class="fa-regular fa-circle-xmark" title="Remove name"></i>';
            deleteButton.onclick = () => {
                deleteSavedName(name.innerHTML);
            };

            listElement.appendChild(name);
            listElement.appendChild(copyIcon);
            listElement.appendChild(deleteButton);
        }

        nameList.appendChild(listElement);
    }
}

/**
 * Clears all names from the passed name list
 * 
 * @param {object} nameList The list element to clear
 */
function clearNames(nameList) {
    while (nameList.firstChild) {
        nameList.removeChild(nameList.lastChild);
    }
}

/**
 * Deletes a name from the browser's local storage
 * 
 * @param {string} name The name to delete
 */
function deleteSavedName(name) {
    let storedNames = JSON.parse(localStorage["savedNames"]);

    for (let i = 0; i < storedNames.length; i++) {
        if (name === storedNames[i]) {
            storedNames.splice(i, 1);
            localStorage["savedNames"] = JSON.stringify(storedNames);
            break;
        }
    }

    loadNames();
}

GENERATOR_BTN.addEventListener("click", () => {
    let numNames = Number(NUM_NAMES.value);
    
    clearNames(NAMES_LIST);
    
    if (numNames > MAX_NAMES) {
        numNames = MAX_NAMES;
        NUM_NAMES.value = NUM_NAMES.max;
    }
    else if (numNames < MIN_NAMES) {
        numNames = MIN_NAMES;
        NUM_NAMES.value = NUM_NAMES.min;
    }

    if (window.innerWidth > 480) {
        if ((numNames < 5 && window.innerWidth >= 1600)
            || (numNames < 4 && window.innerWidth >= 1300)
            || (numNames < 3 && window.innerWidth >= 1025)
            || (numNames < 2 && window.innerWidth >= 600)
        ) {
            NAMES_LIST.style.display = "flex";
        }
        else {
            NAMES_LIST.style.display = "grid";
        }
    }

    createNameList(NAMES_LIST, numNames);
});

SAVED_NAMES.addEventListener("click", () => {
    if (localStorage["savedNames"]) {
        loadNames();
    }
});