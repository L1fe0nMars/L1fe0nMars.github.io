/**
 * @author Jamal Kamareddine
 * 
 * Contains general data about a card
 */
class Card {
    #rank;
    #value;
    #hidden = false;

    /**
     * Constructor to set each parameter
     * 
     * @param {string} rank The rank of the card
     * @param {number} value The value of the card
     */
    constructor(rank, value) {
        this.#rank = rank;
        this.#value = value;
    }

    /**
     * @return {string} The rank of the card
     */
    get rank() {
        return this.#rank;
    }

    /**
     * @return {number} The value of the card
     */
    get value() {
        return this.#value;
    }

    /**
     * Sets the card value
     */
    set value(value) {
        this.#value = value;
    }

    /**
     * Sets the hidden state of the card
     * 
     * @param {boolean} hideCard Boolean to hide or unhide the card
     */
    set hidden(hideCard) {
        this.#hidden = hideCard;
    }

    /**
     * Checks if the card is hidden
     * 
     * @return {boolean} Boolean of whether the card is hidden or not
     */
    isHidden() {
        return this.#hidden;
    }

    /**
     * @return {string} The card information
     */
    toString() {
        const str = `Card Rank: ${this.#rank} Card Value: ${this.#value}`;
        
        return str;
    }
}