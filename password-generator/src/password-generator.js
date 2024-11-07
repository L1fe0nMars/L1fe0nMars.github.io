'use strict';

const PASSWORD_CONTAINER = document.getElementById('password-container');
const PASSWORD = document.getElementById('password');
const ICON_CONTAINER = document.getElementById('icon-container');
const PASSWORD_BTN = document.getElementById('password-btn');
const SLIDER_OUTPUT = document.getElementById('length-output');
const LENGTH_SLIDER = document.getElementById('password-length');
const UPPERCASE_CHECKBOX = document.getElementById('uppercase');
const LOWERCASE_CHECKBOX = document.getElementById('lowercase');
const NUMBERS_CHECKBOX = document.getElementById('numbers');
const SYMBOLS_CHECKBOX = document.getElementById('symbols');
const EXCLUDED_CHARACTERS = document.getElementById('exclude');

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = `~!@#$%^&*()-_=+[]{}\|;:'",.<>/?`;

/**
 * Checks if at least one checkbox is checked
 * 
 * @return {boolean} Whether any box is checked or not
 */
function anyBoxIsChecked() {
    return UPPERCASE_CHECKBOX.checked 
        || LOWERCASE_CHECKBOX.checked
        || NUMBERS_CHECKBOX.checked
        || SYMBOLS_CHECKBOX.checked;
}

/**
 * Checks if the password contains at least 1 character from each checked option
 * 
 * @param {number} password The password to check
 * 
 * @return {boolean} If the password meets the conditions
 */
function isPasswordValid(password) {
    let isValid = true;

    if (LOWERCASE_CHECKBOX.checked) {
        isValid = isValid && /[a-z]/.test(password);
    }
    if (UPPERCASE_CHECKBOX.checked) {
        isValid = isValid && /[A-Z]/.test(password);
    }
    if (NUMBERS_CHECKBOX.checked) {
        isValid = isValid && /[0-9]/.test(password);
    }
    if (SYMBOLS_CHECKBOX.checked) {
        const escapedSymbols = SYMBOLS.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const symbolsRegex = new RegExp(`[${escapedSymbols}]`);

        isValid = isValid && symbolsRegex.test(password);
    }

    return isValid;
}

/**
 * Generates a random password
 * 
 * @param {number} length The length of the password
 * 
 * @return {string} The generated password
 */
function generatePassword(length) {
    const excludedCharacters = new Set(EXCLUDED_CHARACTERS.value.split(''));
    let password;

    do {
        const arr = new Uint32Array(length);
        let chars = '';
        window.crypto.getRandomValues(arr);
        password = '';
        
        if (!anyBoxIsChecked() || LOWERCASE_CHECKBOX.checked) {
            chars += LOWERCASE;
            LOWERCASE_CHECKBOX.checked = true;
        }
        if (UPPERCASE_CHECKBOX.checked) {
            chars += UPPERCASE;
        }
        if (NUMBERS_CHECKBOX.checked) {
            chars += NUMBERS;
        }
        if (SYMBOLS_CHECKBOX.checked) {
            chars += SYMBOLS;
        }

        // Filter out excluded characters
        chars = chars.split('').filter(char => !excludedCharacters.has(char)).join('');
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(arr[i] % chars.length);
        }
    } while (!isPasswordValid(password));
    
    return password;
}

EXCLUDED_CHARACTERS.value = localStorage['excludedCharacters'] || '';

PASSWORD_CONTAINER.addEventListener('click', () => {
    navigator.clipboard.writeText(PASSWORD.innerText);

    ICON_CONTAINER.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
    `;
    
    setTimeout(() => {
        ICON_CONTAINER.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--btn)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
    }, 2000);
});

LENGTH_SLIDER.addEventListener('input', () => {
    const percent = (LENGTH_SLIDER.value - LENGTH_SLIDER.min) / (LENGTH_SLIDER.max - LENGTH_SLIDER.min) * 100;

    SLIDER_OUTPUT.innerHTML = LENGTH_SLIDER.value;
    LENGTH_SLIDER.style.background = `linear-gradient(to right, var(--btn-dark) 0%, var(--btn-dark) ${percent}%, var(--box-bg) ${percent}%, var(--box-bg) 100%)`;
});

PASSWORD_BTN.addEventListener('click', () => {
    const length = Number(LENGTH_SLIDER.value);

    PASSWORD.innerText = generatePassword(length);
});

EXCLUDED_CHARACTERS.addEventListener('input', () => { localStorage['excludedCharacters'] = EXCLUDED_CHARACTERS.value });