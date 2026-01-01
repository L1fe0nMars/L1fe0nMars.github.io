'use strict';

const GENERATOR_BTN = document.getElementById('generate');
const NAMES_LIST = document.getElementById('names');
const NUM_NAMES = document.getElementById('num-names');
const FIRST_LETTER = document.getElementById('first-letter');
const LAST_LETTER = document.getElementById('last-letter');
const SAVED_NAMES = document.getElementById('saved-names');
const SAVED_NAMES_LIST = document.getElementById('saved-names-list');

const MAX_NAMES = Number(NUM_NAMES.max);
const MIN_NAMES = Number(NUM_NAMES.min);

/**
 * Saves name to the browser's local storage
 * 
 * @param {string} name The name to save
 */
function saveName(name) {
    if (localStorage['savedNames']) {
        let savedNames = JSON.parse(localStorage['savedNames']);

        if (!savedNames.includes(name)) {
            savedNames.push(name);
            localStorage['savedNames'] = JSON.stringify(savedNames);
        }
    }
    else {
        localStorage['savedNames'] = JSON.stringify([name]);
    }

    loadNames();
}

/**
 * Load all saved names
 */
function loadNames() {
    const storedNames = JSON.parse(localStorage['savedNames']);
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
        const listElement = document.createElement('li');
        const name = document.createElement('h2');
        const copyIcon = document.createElement('span');
        const storedNames = localStorage['savedNames'];
        const firstLetter = FIRST_LETTER.value[0];
        const lastLetter = LAST_LETTER.value[0];

        name.innerHTML = nameList === NAMES_LIST ? generateName(firstLetter, lastLetter) : JSON.parse(storedNames)[i];
        
        copyIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy" title="Copy name">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        copyIcon.style.color = 'var(--off-white)';
        copyIcon.onclick = () => {
            navigator.clipboard.writeText(name.innerHTML);
            copyIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `;

            setTimeout(() => {
                copyIcon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy" title="Copy name">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                `;
            }, 2000);
        };

        if (nameList === NAMES_LIST) {
            const nameDiv = document.createElement('div');
            const starIcon = document.createElement('span');

            starIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star" title="Save name">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
            `;
            starIcon.onclick = () => {
                saveName(name.innerHTML);
                starIcon.style.color = 'var(--space-color)';
            };

            nameDiv.appendChild(name);
            nameDiv.appendChild(copyIcon);
            nameDiv.appendChild(starIcon);
            listElement.appendChild(nameDiv);
        }
        else {
            const deleteButton = document.createElement('span');

            deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--off-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle" title="Remove name">
                    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15">
                    </line><line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            `;
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
    let storedNames = JSON.parse(localStorage['savedNames']);

    for (let i = 0; i < storedNames.length; i++) {
        if (name === storedNames[i]) {
            storedNames.splice(i, 1);
            localStorage['savedNames'] = JSON.stringify(storedNames);
            break;
        }
    }

    loadNames();
}

GENERATOR_BTN.addEventListener('click', () => {
    let numNames = Math.ceil(Number(NUM_NAMES.value));
    
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
            NAMES_LIST.style.display = 'flex';
        }
        else {
            NAMES_LIST.style.display = 'grid';
        }
    }

    NUM_NAMES.value = numNames;
    createNameList(NAMES_LIST, numNames);
    NAMES_LIST.scrollTop = 0;
});

SAVED_NAMES.addEventListener('click', () => {
    if (localStorage['savedNames']) {
        loadNames();
    }
});