/**
 * @author Jamal Kamareddine
 * 
 * Contains general data and methods for the dealer
 */
class Dealer {
    #hand;

    /**
     * Constructor for creating the dealer
     */
    constructor() {
        this.#hand = new Hand();
    }

    /**
     * @return {Hand} The dealer's hand
     */
    get hand() {
        return this.#hand;
    }

    /**
     * @return {Card} The card that's hidden
     */
    get hiddenCard() {
        for (const card of this.#hand.cards) {
            if (card.isHidden()) {
                return card;
            }
        }
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
        return this.#hand.score == BLACKJACK_RULES.BLACKJACK_VALUE;
    }

    /**
     * Adds a card to the player's hand when they hit
     * 
     * @param {Deck} deck The deck object to pull a card from
     * 
     * @return {Card} The card that was pulled from the deck
     */
    hit(deck) {
        let card = deck.dealCard();

        this.#hand.addCard(card);

        return card;
    }
}