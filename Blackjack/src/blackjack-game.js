/**
 * @author Jamal Kamareddine
 * 
 * The main blackjack game loop
 */
class BlackjackGame {
    #player;
    #dealer;
    #deck;

    /**
     * Constructor for creating the necessary elements of the game
     */
    constructor() {
        this.#player = new Player();
        this.#dealer = new Dealer();
        this.#deck = new Deck(BLACKJACK_RULES.NUM_MAX_DECKS);
    }

    /**
     * The main game loop
     */
    playBlackjack() {
        
    }

    /**
     * Places the user's bet before each hand is dealt
     * 
     * @param {number} betAmount The amount of money the player bets
     */
    placeBet(betAmount) {
        
    }

    /**
     * Deals 2 cards at the start of each game
     * 
     * @param {Hand} hand The hand the cards are added to
     * @param {boolean} isDealer Determines if the hand belongs to the dealer so that the 2nd card dealt becomes hidden
     */
    dealInitialCards(hand, isDealer) {
        for (let i = 0; i < 2; i++) {
            const card = deck.dealCard();
            hand.addCard(card);

            if (isDealer && i == 1) {
                card.hidden = true;
            }
        }
    }

    /**
     * Lets the user play the game during their turn
     */
    playerTurn() {
        
    }

    /**
     * Simulates the dealer
     */
    dealerTurn() {

    }

    /**
     * Determines whether the dealer hits or stands
     * 
     * @return {number} The dealer's selection
     */
    dealerLogic() {

    }

    /**
     * Updates the user's money based on the game result
     */
    determinePayout() {
        
    }
}