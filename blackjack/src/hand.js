/**
 * @author Jamal Kamareddine
 * 
 * Contains general data and methods for a hand of cards
 */
class Hand {
    #cards;

    /**
     * Constructor for creating the hand
     */
    constructor() {
        this.#cards = [];
    }

    /**
     * @return {array} The cards in the hand
     */
    get cards() {
        return this.#cards;
    }

    /**
     * Adds a card to the hand
     * 
     * @param {Card} card The card to add
     */
    addCard(card) {
        this.#cards.push(card);
    }

    /**
     * Clears all cards from the hand
     */
    clearHand() {
        this.#cards.length = 0;
    }

    /**
     * Gets the score of the current hand
     * 
     * @return {number} The score
     */
    get score() {
        let aces = [];
        let score = 0;

        for (const card of this.#cards) {
            if (card.rank === CARD_VALUES.ACE.rank) {
                aces.push(card);
            }

            if (!card.isHidden()) {
                score += card.value;
            }
        }
        
        // Reduce the value of aces to 1 if the total score is over 21
        for (const ace of aces) {
            if (score > BLACKJACK_RULES.BLACKJACK_VALUE && ace.value === getCardValue(CARD_VALUES.ACE, true)) {
                ace.value = getCardValue(CARD_VALUES.ACE, false);
                score -= 10;
            }
        }

        return score;
    }

    /**
     * @return {string} The hand information
     */
    toString() {
        let str = '';

        for (const card of this.#cards) {
            str += card.isHidden() ? '(Hidden) ': card.rank + ' ';
        }

        str += 'Total: ' + this.score;
        
        return str;
    }
}