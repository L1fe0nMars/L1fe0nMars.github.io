'use strict';

const BODY = document.querySelector('body');
const PLAYER_HAND = document.getElementById('player-hand');
const DEALER_HAND = document.getElementById('dealer-hand');
const DISPLAY_INFO = document.getElementById('display-info');
const DEALER_SCORE = document.getElementById('dealer-score');
const PLAYER_SCORE = document.getElementById('player-score');
const HIT_BTN = document.getElementById('hit-btn');
const STAND_BTN = document.getElementById('stand-btn');
const NEW_GAME_BTN = document.getElementById('new-game-btn');
const BET_AMOUNT = document.getElementById('bet-amount');
const BET_BTN = document.getElementById('bet-btn');
const ERROR_TEXT = document.getElementById('error-text');
const CURRENT_BET_TEXT = document.getElementById('current-bet-text');
const CURRENT_BET = document.getElementById('current-bet');
const PLAYER_MONEY = document.getElementById('player-money-amount');

const player = new Player();
const dealer = new Dealer();
const deck = new Deck(BLACKJACK_RULES.NUM_MAX_DECKS);

resetGame();

/**
 * Toggles buttons that should or shouldn't be clickable during the game
 * 
 * @param {object} button The button to toggle
 * @param {boolean} disable Disables the button when true
 */
function toggleButton(button, disable) {
    if (disable) {
        button.style.opacity = '0.33';
        button.style.pointerEvents = 'none';
    }
    else {
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
    }
}

/**
 * Resets elements of the game
 */
function resetGame() {
    player.hand.clearHand();
    dealer.hand.clearHand();
    resetHands();

    player.money = 100;
    player.resetBetAmount();
    DISPLAY_INFO.innerHTML = '';
    PLAYER_SCORE.innerHTML = '';
    DEALER_SCORE.innerHTML = '';
    CURRENT_BET_TEXT.style.display = 'none';
    CURRENT_BET.innerHTML = '';
    PLAYER_MONEY.innerHTML = 100;
}

/**
 * Resets the displayed hand elements
 */
function resetHands() {
    while (PLAYER_HAND.firstChild) {
        PLAYER_HAND.removeChild(PLAYER_HAND.lastChild);
    }

    while (DEALER_HAND.firstChild) {
        DEALER_HAND.removeChild(DEALER_HAND.lastChild);
    }
}

/**
 * Places the user's bet
 * 
 * @param {number} betAmount The amount of money that the user bets
 */
function placeBet(betAmount) {
    const playerHand = player.hand;
    const dealerHand = dealer.hand;

    playerHand.clearHand();
    dealerHand.clearHand();
    resetHands();

    player.betAmount = betAmount;
    CURRENT_BET.innerHTML = betAmount;
    CURRENT_BET_TEXT.style.display = 'block';
    PLAYER_MONEY.innerHTML = player.money - betAmount;

    dealInitialCards(playerHand, false);
    dealInitialCards(dealerHand, true);

    if (player.hasBlackjack()) {
        endUserTurn();
    }
}

/**
 * Deals 2 cards to the player and dealer at the start of each game
 * 
 * @param {object} hand The hand element
 * @param {boolean} isDealer Whether or not the hand belongs to the dealer
 */
function dealInitialCards(hand, isDealer) {
    for (let i = 0; i < 2; i++) {
        const card = deck.dealCard();
        hand.addCard(card);

        if (isDealer && i === 1) {
            card.hidden = true;
        }

        !isDealer ? updateHand(PLAYER_HAND, card) : updateHand(DEALER_HAND, card);
    }
}

/**
 * Updates the hand element cards
 * 
 * @param {object} handElement The hand element to update
 * @param {Card} card The card to add or update in the hand
 * @param {object} cardElement Optional parameter if the card element already exists but needs to be updated, only used for the dealer's hidden card
 */
function updateHand(handElement, card, cardElement) {
    if (!cardElement) {
        cardElement = document.createElement('div');
        cardElement.classList.toggle('card');
        handElement.appendChild(cardElement);
    }
    
    const cardRankTop = document.createElement('p');
    const cardRankBottom = document.createElement('p');
    const cardSuitTop = document.createElement('p');
    const cardSuitBottom = document.createElement('p');

    cardRankTop.className = 'card-top';
    cardSuitTop.className = 'card-top';
    cardRankBottom.className = 'card-bottom';
    cardSuitBottom.className = 'card-bottom';
    
    if (card.isHidden()) {
        cardElement.classList.toggle('hidden-card');
    }
    else {
        cardRankTop.innerHTML = card.rank;
        cardRankBottom.innerHTML = card.rank;
        cardSuitTop.innerHTML = card.suit;
        cardSuitBottom.innerHTML = card.suit;
        
        if (card.suit === CARD_SUIT.DIAMONDS || card.suit === CARD_SUIT.HEARTS) {
            cardElement.style.color = 'red';
        }

        cardElement.appendChild(cardRankTop);
        cardElement.appendChild(cardSuitTop);
        cardElement.appendChild(cardSuitBottom);
        cardElement.appendChild(cardRankBottom);
    }

    PLAYER_SCORE.innerHTML = player.hand.score;
    DEALER_SCORE.innerHTML = dealer.hand.score;
}

/**
 * Ends the user's turn
 */
function endUserTurn() {
    toggleButton(HIT_BTN, true);
    toggleButton(STAND_BTN, true);
    dealerTurn();
}

/**
 * Simulates the dealer's actions
 */
function dealerTurn() {
    setTimeout(() => {
        const hiddenCard = dealer.hiddenCard;
        const hiddenCardElement = document.querySelector('.hidden-card');

        hiddenCard.hidden = false;
        hiddenCardElement.classList.toggle('hidden-card');

        updateHand(DEALER_HAND, hiddenCard, hiddenCardElement);
    }, 1000);

    setTimeout(() => {
        let interval = setInterval(() => {
            if (dealer.bust()) {
                clearInterval(interval);
                endGameResult();
            }
            else  {
                if (dealer.hasBlackjack()) {
                    clearInterval(interval);
                    endGameResult();
                }
                else {
                    let dealerSelection = dealerLogic();
            
                    switch (dealerSelection) {
                        case 0:
                            let newCard = dealer.hit(deck);
                            updateHand(DEALER_HAND, newCard);
                            DISPLAY_INFO.innerHTML = 'The dealer hits.';
                            break;
                        case 1:
                            DISPLAY_INFO.innerHTML = 'The dealer stands.';
                            clearInterval(interval);

                            setTimeout(() => {
                                endGameResult();
                            }, 2000);
                            break;
                        default:
                            DISPLAY_INFO.innerHTML = 'This should never display.';
                    }
                }
            }
        }, 2000);
    }, 1000);
}

/**
 * The dealer AI to determine what choice to make
 */
function dealerLogic() {
    const playerScore = player.hand.score;
    const dealerScore = dealer.hand.score;
    let dealerSelection = DEALER_ACTION.STAND;
    
    if ((player.hasBlackjack() && dealerScore < BLACKJACK_RULES.BLACKJACK_VALUE)
        || (dealerScore < BLACKJACK_RULES.DEALER_MIN_SCORE && dealerScore <= playerScore)
    ) {
        dealerSelection = DEALER_ACTION.HIT;
    }

    return dealerSelection;
}

/**
 * Pays out the player at the end of the game
 */
function payoutPlayer() {
    const playerScore = player.hand.score;
    const dealerScore = dealer.hand.score;
    const betAmount = player.betAmount;
    
    if (player.hasBlackjack() && (dealerScore < playerScore || dealer.bust())) {
        const payoutAmount = 2 * betAmount;
        
        player.payout(payoutAmount);
        updateStat('lifetimeEarnings', stats.lifetimeEarnings.value + payoutAmount);

        if (payoutAmount > stats.biggestPayout.value) {
            updateStat('biggestPayout', payoutAmount);
        }
    }
    else if (playerScore < BLACKJACK_RULES.BLACKJACK_VALUE && (dealerScore < playerScore || dealer.bust())) {
        player.payout(betAmount);
        updateStat('lifetimeEarnings', stats.lifetimeEarnings.value + betAmount);

        if (betAmount > stats.biggestPayout.value) {
            updateStat('biggestPayout', betAmount);
        }
    }
    else if (playerScore !== dealerScore) {
        player.payout(-betAmount);
        updateStat('lifetimeMoneyLost', stats.lifetimeMoneyLost.value + betAmount);
    }

    if (player.money > stats.highestTotalMoney.value) {
        updateStat('highestTotalMoney', player.money);
    }
}

/**
 * Displays the game result
 */
function endGameResult() {
    const playerScore = player.hand.score;
    const dealerScore = dealer.hand.score;

    if (dealer.bust()) {
        DISPLAY_INFO.innerHTML = 'The dealer busts! You win!';
        updateStat('wins', ++stats.wins.value);
    }
    else if (player.bust()) {
        DISPLAY_INFO.innerHTML = 'Bust! You lose.';
        updateStat('losses', ++stats.losses.value);
    }
    else if (dealerScore < playerScore) {
        DISPLAY_INFO.innerHTML = 'You win!';
        updateStat('wins', ++stats.wins.value);
    }
    else if (dealerScore > playerScore) {
        DISPLAY_INFO.innerHTML = 'You lose.';
        updateStat('losses', ++stats.losses.value);
    }
    else {
        DISPLAY_INFO.innerHTML = `It's a draw.`;
        updateStat('draws', ++stats.draws.value);
    }

    payoutPlayer();
    CURRENT_BET.innerHTML = '';
    CURRENT_BET_TEXT.style.display = 'none';
    PLAYER_MONEY.innerHTML = player.money;
    toggleButton(BET_BTN);

    if (player.money === 0) {
        toggleButton(BET_BTN, true);
        NEW_GAME_BTN.style.display = 'inline';
        updateStat('lostItAll', ++stats.lostItAll.value);
    }
}

HIT_BTN.addEventListener('click', () => {
    const newCard = player.hit(deck);
    updateHand(PLAYER_HAND, newCard);

    if (player.bust()) {
        toggleButton(HIT_BTN, true);
        toggleButton(STAND_BTN, true);
        toggleButton(BET_BTN);
        endGameResult();
    }
    else if (player.hasBlackjack()) {
        endUserTurn();
    }
});

STAND_BTN.addEventListener('click', () => {
    DISPLAY_INFO.innerHTML = 'You stand.';
    endUserTurn();
});

BET_BTN.addEventListener('click', () => {
    const betAmount = Number(BET_AMOUNT.value);

    if (betAmount < BLACKJACK_RULES.MIN_BET_AMOUNT) {
        ERROR_TEXT.innerHTML = 'Minimum bet is $1.';
    }
    else if (betAmount > player.money) {
        ERROR_TEXT.innerHTML = 'You cannot bet more money than you have.';
    }
    else if (!Number.isInteger(betAmount)) {
        ERROR_TEXT.innerHTML = 'You can only bet using whole numbers.';
    }
    else {
        if (betAmount > stats.highestBet.value) {
            updateStat('highestBet', betAmount);
        }

        ERROR_TEXT.innerHTML = '';
        DISPLAY_INFO.innerHTML = '';
        toggleButton(BET_BTN, true);
        toggleButton(HIT_BTN);
        toggleButton(STAND_BTN);
        placeBet(betAmount);
    }
});

NEW_GAME_BTN.addEventListener('click', () => {
    resetGame();
    NEW_GAME_BTN.style.display = 'none';
    toggleButton(BET_BTN);
});