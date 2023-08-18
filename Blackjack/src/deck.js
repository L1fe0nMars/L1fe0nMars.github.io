/**
 * @author Jamal Kamareddine
 * 
 * Contains general data and methods for a deck of cards
 */
class Deck {
    #cardDeck;

    /**
     * Constructor for creating the deck
     * 
     * @param {number} numDecks The number of decks to use for the game
     */
    constructor(numDecks) {
        this.#cardDeck = [];
        this.createDeck(numDecks);
    }

    /**
     * Creates the deck by adding cards to it and shuffling the deck
     * 
     * @param {number} numDecks The number of decks to use for the game
     */
    createDeck(numDecks) {
        for (let i = 0; i < numDecks; i++) {
            for (const [key, cardVal] of Object.entries(CARD_VALUES)) {
                for (let j = 0; j < 4; j++) {
                    const suit = CONSTANTS[Object.keys(CONSTANTS)[j]];
                    const card = new Card(cardVal.rank, suit, getCardValue(CARD_VALUES[key], true));
                    this.#cardDeck.push(card);
                }
            }
        }
        
        this.shuffleDeck();
    }

    /**
     * Shuffles the deck of cards
     */
    shuffleDeck() {
        for (let i = this.#cardDeck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.#cardDeck[i], this.#cardDeck[j]] = [this.#cardDeck[j], this.#cardDeck[i]];
        }
    }

    /**
     * @return {array} A list of the cards in the deck
     */
    get cards() {
        return this.#cardDeck;
    }

    /**
     * Deals a card from the deck. Creates a new deck of it's empty
     * 
     * @return The top card from the deck
     */
    dealCard() {
        if (this.#cardDeck.length == 0) {
            this.createDeck(BLACKJACK_RULES.NUM_MAX_DECKS);
        }

        return this.#cardDeck.pop();
    }
}