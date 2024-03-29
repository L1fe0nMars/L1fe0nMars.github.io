'use strict';

const COPY_ICON = document.getElementById('copy-icon');
const PASSWORD_CONTAINER = document.getElementById('password-container');
const PASSWORD = document.getElementById('password')
const PASSWORD_BTN = document.getElementById('password-btn');
const SLIDER_OUTPUT = document.getElementById('length-output');
const LENGTH_SLIDER = document.getElementById('password-length');
const UPPERCASE_CHECKBOX = document.getElementById('uppercase');
const LOWERCASE_CHECKBOX = document.getElementById('lowercase');
const NUMBERS_CHECKBOX = document.getElementById('numbers');
const SYMBOLS_CHECKBOX = document.getElementById('symbols');

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
    let password;
    let chars = '';
    
    do {
        const arr = new Uint32Array(length);
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
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(arr[i] % chars.length);
        }
    } while (!isPasswordValid(password));
    
    return password;
}

PASSWORD_CONTAINER.addEventListener('click', () => {
    navigator.clipboard.writeText(PASSWORD.innerText);

    COPY_ICON.classList.toggle('fa-copy');
    COPY_ICON.classList.toggle('fa-circle-check');
    COPY_ICON.style.color = 'green';

    setTimeout(() => {
        COPY_ICON.classList.toggle('fa-copy');
        COPY_ICON.classList.toggle('fa-circle-check');
        COPY_ICON.style.color = 'var(--btn)';
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