/**
 * @author Jamal Kamareddine
 * 
 * This program generates random planet names
 */
class Generator {
    prefix = new Prefix();
    middlePart = new MiddlePart();
    suffix = new Suffix();

    /**
     * Generates a random name by combining word parts together
     * 
     * @param {string} firstLetter Optional letter that the name should start with
     * @param {string} lastLetter Optional letter that the name should end with
     * 
     * @return {string} The generated name
     */
    generateName(firstLetter = '', lastLetter = '') {
        const nameStrings = [];
        const weights = {
            3: 0.5,
            2: 0.2,
            4: 0.2,
            5: 0.1,
        };
        const nameLength = this.weightedOutcome(weights);
        let prevStr = '';
        
        firstLetter = this.isLetter(firstLetter) ? firstLetter.toUpperCase() : '';
        lastLetter = this.isLetter(lastLetter) ? lastLetter.toLowerCase() : '';

        let name = firstLetter !== '' ? this.prefix.getPrefixWithFirstLetter(firstLetter) : this.prefix.getPrefix();

        nameStrings.push(name);
        
        for (let i = 1; i < nameLength; i++) {
            prevStr = nameStrings[i - 1].toLowerCase();

            if (i === nameLength - 1) {
                const suffix = lastLetter !== '' ? this.suffix.getSuffixWithLastLetter(lastLetter, prevStr) : this.suffix.getSuffix(prevStr);
                name += suffix;
                nameStrings.push(suffix);
            }
            else {
                const middlePart = this.middlePart.getMiddlePart(prevStr);
                name += middlePart;
                nameStrings.push(middlePart);
            }
        }
       
        return name;
    }

    /**
     * Checks if a char is a letter
     * 
     * @param {string} char The char to check
     * 
     * @return {boolean} Whether the char is a letter or not
     */
    isLetter(char) {
        return /[a-z]/i.test(char);
    }

    /**
     * Randomly gets a key from an object of different weights
     * 
     * @param {object} weightedObj The object with weights
     * 
     * @return {number} The chosen key from the weighted object
     */
    weightedOutcome(weightedObj) {
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
}