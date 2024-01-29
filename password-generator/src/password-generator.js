"use strict";

const PASSWORD_CONTAINER = document.getElementById('password-container');
const PASSWORD = document.getElementById('password')
const PASSWORD_BTN = document.getElementById('password-btn');
const PASSWORD_LENGTH = document.getElementById('password-length');
const UPPERCASE = document.getElementById('uppercase');
const LOWERCASE = document.getElementById('lowercase');
const NUMBERS = document.getElementById('numbers');
const SYMBOLS = document.getElementById('symbols');

const MIN_CHARS = 6;
const MAX_CHARS = 24;

/**
 * Generates a random password
 * 
 * @param {string} length The length of the password
 */
function generatePassword(length) {
    
}


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

    

    console.log(length);
    console.log(typeof(length));
});