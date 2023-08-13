"use strict";

const GENERATOR_BTN = document.getElementById("generate");
const NAMES_LIST = document.getElementById("names");
const NUM_NAMES = document.getElementById("numNames");
const SAVED_NAMES = document.getElementById("saved-names");
const SAVED_NAMES_LIST = document.getElementById("saved-names-list");
const MAX_NAMES = Number(NUM_NAMES.max);
const MIN_NAMES = Number(NUM_NAMES.min);

let generator = new Generator();

function clearNames() {
    while (NAMES_LIST.firstChild) {
        NAMES_LIST.removeChild(NAMES_LIST.lastChild);
    }
}

function saveName(name) {
    if (localStorage["savedNames"] != null) {
        let savedNames = JSON.parse(localStorage["savedNames"]);

        if (!savedNames.includes(name)) {
            savedNames.push(name);
            localStorage["savedNames"] = JSON.stringify(savedNames);
        }
    } else {
        localStorage["savedNames"] = JSON.stringify([name]);
    }

    loadNames();
}

function loadNames() {
    let storedNames = JSON.parse(localStorage["savedNames"]);

    while (SAVED_NAMES_LIST.firstChild) {
        SAVED_NAMES_LIST.removeChild(SAVED_NAMES_LIST.lastChild);
    }
    
    for (let i = 0; i < storedNames.length; i++) {
        let listElement = document.createElement("li");
        let savedName = document.createElement("h2");
        let deleteButton = document.createElement("h3");

        savedName.innerHTML = storedNames[i];
        savedName.onclick = function() {
            navigator.clipboard.writeText(savedName.innerHTML);
        };

        deleteButton.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        deleteButton.onclick = function() {
            deleteSavedName(savedName.innerHTML);
        };

        listElement.appendChild(savedName);
        listElement.appendChild(deleteButton);
        SAVED_NAMES_LIST.appendChild(listElement);
    }
}

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

GENERATOR_BTN.addEventListener("click", () => {
    let numNames = Number(NUM_NAMES.value);
    
    clearNames();
    
    if (numNames > MAX_NAMES) {
        numNames = MAX_NAMES;
        NUM_NAMES.value = NUM_NAMES.max;
    } else if (numNames < MIN_NAMES) {
        numNames = MIN_NAMES;
        NUM_NAMES.value = NUM_NAMES.min;
    }

    if (window.innerWidth > 480) {
        if ((numNames < 5 && window.innerWidth >= 1600)
            || (numNames < 4 && window.innerWidth >= 1300)
            || (numNames < 3 && window.innerWidth >= 1025)
            || (numNames < 2 && window.innerWidth >= 481)
        ) {
            NAMES_LIST.style.display = "flex";
        } else {
            NAMES_LIST.style.display = "grid";
        }
    }
    
    for (let i = 0; i < numNames; i++) {
        let listElement = document.createElement("li");
        let nameDiv = document.createElement("div");
        let name = document.createElement("h2");
        let starIcon = document.createElement("h3");
        let tooltip = document.createElement("span");

        name.innerHTML = generator.generateName();
        name.onclick = function() {
            navigator.clipboard.writeText(name.innerHTML);
        };

        starIcon.innerHTML = '<i class="fa-regular fa-star"></i>';
        starIcon.onclick = function() {
            saveName(name.innerHTML);
            starIcon.style.color = "var(--space-color)";
        };

        tooltip.innerHTML = "Copy to clipboard";
        tooltip.id = "tooltip";
        tooltip.className = "tooltip-text";
        
        name.appendChild(tooltip);
        nameDiv.appendChild(name);
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