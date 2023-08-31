"use strict";

const GENERATOR_BTN = document.getElementById("generate");
const NAMES_LIST = document.getElementById("names");
const NUM_NAMES = document.getElementById("num-names");
const FIRST_LETTER = document.getElementById("first-letter");
const SAVED_NAMES = document.getElementById("saved-names");
const SAVED_NAMES_LIST = document.getElementById("saved-names-list");
const MAX_NAMES = Number(NUM_NAMES.max);
const MIN_NAMES = Number(NUM_NAMES.min);

let generator = new Generator();

/**
 * Clears all names from the names list element
 */
function clearNames() {
    while (NAMES_LIST.firstChild) {
        NAMES_LIST.removeChild(NAMES_LIST.lastChild);
    }
}

/**
 * Saves name the browser's local storage
 * 
 * @param {string} name The name to save
 */
function saveName(name) {
    if (localStorage["savedNames"] != null) {
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
    let storedNames = JSON.parse(localStorage["savedNames"]);

    while (SAVED_NAMES_LIST.firstChild) {
        SAVED_NAMES_LIST.removeChild(SAVED_NAMES_LIST.lastChild);
    }
    
    for (let i = 0; i < storedNames.length; i++) {
        let listElement = document.createElement("li");
        let savedName = document.createElement("h2");
        let copyIcon = document.createElement("h3");
        let deleteButton = document.createElement("h3");

        savedName.innerHTML = storedNames[i];
        savedName.onclick = () => {
            navigator.clipboard.writeText(savedName.innerHTML);
        };

        copyIcon.innerHTML = '<i class="fa-regular fa-copy"></i>';
        copyIcon.style.color = "var(--off-white)";
        copyIcon.onclick = () => {
            navigator.clipboard.writeText(savedName.innerHTML);
            copyIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            copyIcon.style.color = "green";
            setTimeout(() => {
                copyIcon.innerHTML = '<i class="fa-regular fa-copy"></i>';
                copyIcon.style.color = "var(--off-white)";
            }, 2000);
        };

        deleteButton.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        deleteButton.onclick = () => {
            deleteSavedName(savedName.innerHTML);
        };

        listElement.appendChild(savedName);
        listElement.appendChild(copyIcon);
        listElement.appendChild(deleteButton);
        SAVED_NAMES_LIST.appendChild(listElement);
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
        if (name == storedNames[i]) {
            storedNames.splice(i, 1);
            localStorage["savedNames"] = JSON.stringify(storedNames);
            break;
        }
    }

    loadNames();
}

/**
 * Checks if a char is a letter
 * 
 * @param {string} char The char to check
 * 
 * @return {boolean} Whether the char is a letter or not
 */
function isLetter(char) {
    return /[a-z]/i.test(char);
}

GENERATOR_BTN.addEventListener("click", () => {
    let numNames = Number(NUM_NAMES.value);
    let firstLetter = FIRST_LETTER.value[0];

    if (firstLetter && isLetter(firstLetter)) {
        firstLetter = FIRST_LETTER.value[0].toUpperCase();
    }
    else {
        firstLetter = "";
    }
    
    clearNames();
    
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
    
    for (let i = 0; i < numNames; i++) {
        let listElement = document.createElement("li");
        let nameDiv = document.createElement("div");
        let name = document.createElement("h2");
        let copyIcon = document.createElement("h3");
        let starIcon = document.createElement("h3");

        name.innerHTML = generator.generateName(firstLetter);
        
        copyIcon.innerHTML = '<i class="fa-regular fa-copy"></i>';
        copyIcon.onclick = () => {
            navigator.clipboard.writeText(name.innerHTML);
            copyIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            copyIcon.style.color = "green";
            setTimeout(() => {
                copyIcon.innerHTML = '<i class="fa-regular fa-copy"></i>';
                copyIcon.style.color = "var(--off-white)";
            }, 2000);
        };

        starIcon.innerHTML = '<i class="fa-regular fa-star"></i>';
        starIcon.onclick = () => {
            saveName(name.innerHTML);
            starIcon.style.color = "var(--space-color)";
        };

        nameDiv.appendChild(name);
        nameDiv.appendChild(copyIcon);
        nameDiv.appendChild(starIcon);
        listElement.appendChild(nameDiv);
        NAMES_LIST.appendChild(listElement);
    }
});

SAVED_NAMES.addEventListener("click", () => {
    if (localStorage.getItem("savedNames") != null) {
        loadNames();
    }
});