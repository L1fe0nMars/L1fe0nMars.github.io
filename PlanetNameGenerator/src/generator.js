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
     * @param {string} letter Optional letter that the name should start with
     * 
     * @return {string} The generated name
     */
    generateName(letter = "") {
        let nameStrings = [];
        let prefix = this.prefix.getPrefix();
        let middlePart1 = "";
        let middlePart2 = "";
        let middlePart3 = "";
        let suffix = "";
        let name = "";
        
        this.isLetter(letter) ? letter = letter.toUpperCase() : letter = "";

        letter !== ""
            ? nameStrings.push(this.prefix.getPrefixWithFirstLetter(letter))
            : nameStrings.push(prefix);
        
        if (Math.random() < 0.5) {
            do {
                middlePart1 = this.middlePart.getMiddlePart();
            } while(this.compareNameParts(prefix, middlePart1));

            nameStrings.push(middlePart1);
        }

        if (Math.random() < 0.5) {
            do {
                middlePart2 = this.middlePart.getMiddlePart();
            } while(this.compareNameParts(prefix, middlePart1, middlePart2));

            nameStrings.push(middlePart2);
        }

        do {
            suffix = this.suffix.getSuffix();
        } while(this.compareNameParts(prefix, middlePart1, middlePart2, suffix));

        nameStrings.push(suffix);
        
        if (nameStrings.length === 4 && Math.random() < 0.1) {
            let index = Math.floor(Math.random() * 3) + 1;

            do {
                middlePart3 = this.middlePart.getMiddlePartTwoLetters();
            } while (middlePart3.localeCompare(nameStrings[index]) === 0 || middlePart3.localeCompare(nameStrings[index - 1]) === 0);
            
            nameStrings.splice(index, 0, middlePart3);
        }

        for (let i = 0; i < nameStrings.length; i++) {
            name += nameStrings[i];
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
     * Checks if two consecutive string parts are the same
     * 
     * @param {strings} strings Each string part of the name
     * 
     * @return {boolean} Whether the strings are equal or not
     */
    compareNameParts(...strings) {
        const nameParts = strings;
        const lastString = nameParts[nameParts.length - 1];
        let previousString = "";

        for (let i = nameParts.length - 2; i >= 0; i--) {
            if (nameParts[i] !== "") {
                previousString = nameParts[i];

                return lastString.localeCompare(previousString) === 0;
            }
        }

        return false;
    }
}