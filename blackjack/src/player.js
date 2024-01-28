/**
 * @author Jamal Kamareddine
 * 
 * Contains general data and methods for the player
 */
class Player {
    #hand;
    #money = 100;
    #betAmount = 0;

    /**
     * Constructor for creating the player
     */
    constructor() {
        this.#hand = new Hand();
    }

    /**
     * @return {number} The amount of money
     */
    get money() {
        return this.#money;
    }

    /**
     * Sets the player's money
     * 
     * @param {number} amount The amount of money to add
     */
    set money(money) {
        this.#money = money;
    }

    /**
     * Adds to the player's money
     * 
     * @param {number} amount The amount of money to add
     */
    payout(amount) {
        this.#money += amount;

        if (this.#money < 0) {
            this.#money = 0;
        }
    }

    /**
     * @return {number} The amount of money the player bets
     */
    get betAmount() {
        return this.#betAmount;
    }

    /**
     * Sets the bet amount
     * 
     * @param {number} amount The amount of money the player bets
     */
    set betAmount(amount) {
        this.#betAmount = amount;
    }

    /**
     * Resets the bet amount
     */
    resetBetAmount() {
        this.#betAmount = 0;
    }

    /**
     * @return {Hand} The player's hand
     */
    get hand() {
        return this.#hand;
    }

    /**
     * @return {boolean} Check whether the player busts or not
     */
    bust() {
        return this.#hand.score > BLACKJACK_RULES.BLACKJACK_VALUE;
    }

    /**
     * @return {boolean} Check if the hand is equal to the blackjack value
     */
    hasBlackjack() {
        return this.#hand.score === BLACKJACK_RULES.BLACKJACK_VALUE;
    }

    /**
     * Adds a card to the player's hand when they hit
     * 
     * @param {Deck} deck The deck object to pull a card from
     * 
     * @return {Card} The card that was pulled from the deck
     */
    hit(deck) {
        const card = deck.dealCard();

        this.#hand.addCard(card);

        return card;
    }
}