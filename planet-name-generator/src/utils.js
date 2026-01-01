/**
 * Randomly gets a key from an object of different weights
 * 
 * @param {object} weightedObj The object with weights
 * 
 * @return {number} The chosen key from the weighted object
 */
function weightedOutcome(weightedObj) {
    const sortedWeights = Object.entries(weightedObj).sort((a, b) => a[1] - b[1]);
    const randNum = Math.random();
    let probability = 0;
    
    for (const [outcome, weight] of sortedWeights) {
        probability += weight;
        
        if (randNum < probability) {
            return outcome;
        }
    }
}

/**
 * Gets a random element from an array
 * 
 * @param {array} arr The passed array
 * 
 * @return {*} The chosen element from the array
 */
function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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