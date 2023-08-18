"use strict";

const PLAY_BTN = document.getElementById("play-btn");
const PLAYER_HAND = document.getElementById("player-hand");
const DEALER_HAND = document.getElementById("dealer-hand");
const DEALER_SCORE = document.getElementById("dealer-score");
const PLAYER_SCORE = document.getElementById("player-score");
const HIT_BTN = document.getElementById("hit-btn");
const STAND_BTN = document.getElementById("stand-btn");
const BET_AMOUNT = document.getElementById("bet-amount");
const BET_BTN = document.getElementById("bet-btn");
const ERROR_TEXT = document.getElementById("error-text");
const CURRENT_BET = document.getElementById("current-bet");
const PLAYER_MONEY = document.getElementById("player-money-amount");
const RULES_LIST = document.getElementById("rules-list");

let player = new Player();
let dealer = new Dealer();
let deck = new Deck(BLACKJACK_RULES.NUM_MAX_DECKS);

for (let i = 0; i < BLACKJACK_RULES.RULES.length; i++) {
    let listElement = document.createElement("li");
    listElement.innerHTML = BLACKJACK_RULES.RULES[i];
    RULES_LIST.appendChild(listElement);
}

function resetHands() {
    while (PLAYER_HAND.firstChild) {
        PLAYER_HAND.removeChild(PLAYER_HAND.lastChild);
    }

    while (DEALER_HAND.firstChild) {
        DEALER_HAND.removeChild(DEALER_HAND.lastChild);
    }
}

function placeBet(betAmount) {
    const playerHand = player.hand;
    const dealerHand = dealer.hand;

    playerHand.clearHand();
    dealerHand.clearHand();
    resetHands();

    player.betAmount = betAmount;
    CURRENT_BET.innerHTML = betAmount;
    PLAYER_MONEY.innerHTML = player.money - betAmount;

    dealInitialCards(playerHand, false);
    dealInitialCards(dealerHand, true);
}

function dealInitialCards(hand, isDealer) {
    for (let i = 0; i < 2; i++) {
        const card = deck.dealCard();
        hand.addCard(card);

        if (isDealer && i == 1) {
            card.hidden = true;
        }

        if (!isDealer) {
            updateHand(hand, card, PLAYER_HAND);
        } else {
            updateHand(hand, card, DEALER_HAND);
        }
    }
}

function updateHand(hand, card, handElement) {
    let cardElement = document.createElement("div");
    let cardRankTop = document.createElement("p");
    let cardRankBottom = document.createElement("p");
    let cardSuitTop = document.createElement("p");
    let cardSuitBottom = document.createElement("p");

    cardElement.classList.toggle("card");
    cardRankTop.className = "card-top";
    cardSuitTop.className = "card-top";
    cardRankBottom.className = "card-bottom";
    cardSuitBottom.className = "card-bottom";
    
    if (card.isHidden()) {
        cardElement.classList.toggle("hidden-card");
    } else {
        cardRankTop.innerHTML = card.rank;
        cardRankBottom.innerHTML = card.rank;
        cardSuitTop.innerHTML = card.suit;
        cardSuitBottom.innerHTML = card.suit;
        
        if (card.suit == CONSTANTS.DIAMONDS || card.suit == CONSTANTS.HEARTS) {
            cardElement.style.color = "red";
        }

        cardElement.appendChild(cardRankTop);
        cardElement.appendChild(cardSuitTop);
        cardElement.appendChild(cardSuitBottom);
        cardElement.appendChild(cardRankBottom);
    }
    
    handElement.appendChild(cardElement);

    PLAYER_SCORE.innerHTML = player.hand.score;
    DEALER_SCORE.innerHTML = dealer.hand.score;
}

PLAY_BTN.addEventListener("click", () => {
    
});

HIT_BTN.addEventListener("click", () => {
    let newCard = player.hit(deck);
    updateHand(player.hand, newCard, PLAYER_HAND);
});

STAND_BTN.addEventListener("click", () => {
    
});

BET_BTN.addEventListener("click", () => {
    let betAmount = Number(BET_AMOUNT.value);

    if (betAmount < BLACKJACK_RULES.MIN_BET_AMOUNT) {
        ERROR_TEXT.innerHTML = "Minimum bet is $1.";
    } else if (betAmount > player.money) {
        ERROR_TEXT.innerHTML = "You cannot bet more money than you have.";
    } else if (!Number.isInteger(betAmount)) {
        ERROR_TEXT.innerHTML = "You can only bet using whole numbers.";
    } else {
        ERROR_TEXT.innerHTML = "";
        placeBet(betAmount);
    }
});