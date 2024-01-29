"use strict";

const COPY_ICON = document.getElementById('copy-icon');
const PASSWORD_CONTAINER = document.getElementById('password-container');
const PASSWORD = document.getElementById('password')
const PASSWORD_BTN = document.getElementById('password-btn');
const PASSWORD_LENGTH = document.getElementById('password-length');
const UPPERCASE_CHECKBOX = document.getElementById('uppercase');
const LOWERCASE_CHECKBOX = document.getElementById('lowercase');
const NUMBERS_CHECKBOX = document.getElementById('numbers');
const SYMBOLS_CHECKBOX = document.getElementById('symbols');

const MIN_CHARS = 8;
const MAX_CHARS = 24;

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = "`~!@#$%^&*()-_=+[]{}\|;:',.<>/?";

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
 * Generates a random password
 * 
 * @param {number} length The length of the password
 * 
 * @return {string} The generated password
 */
function generatePassword(length) {
    let chars = '';
    let password = '';
    const arr = new Uint32Array(length);
    window.crypto.getRandomValues(arr);
    
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
    
    return password;
}

PASSWORD_CONTAINER.addEventListener('click', () => {
    navigator.clipboard.writeText(PASSWORD.innerText);

    COPY_ICON.classList.toggle('fa-copy');
    COPY_ICON.classList.toggle('fa-circle-check');
    COPY_ICON.style.color = "green";

    setTimeout(() => {
        COPY_ICON.classList.toggle('fa-copy');
        COPY_ICON.classList.toggle('fa-circle-check');
        COPY_ICON.style.color = "var(--btn)";
    }, 2000);
});

PASSWORD_BTN.addEventListener('click', () => {
    let length = Number(PASSWORD_LENGTH.value);

    if (length < MIN_CHARS) {
        length = MIN_CHARS;
        PASSWORD_LENGTH.value = MIN_CHARS;
    } 
    else if (length > MAX_CHARS) {
        length = MAX_CHARS;
        PASSWORD_LENGTH.value = MAX_CHARS;
    }

    PASSWORD.innerText = generatePassword(length);
});