'use strict';

const BLACKJACK_RULES = {
    BLACKJACK_VALUE: 21,
    DEALER_MIN_SCORE: 17,
    NUM_MAX_DECKS: 6,
    NUM_CARDS_IN_DECK: 52,
    MIN_BET_AMOUNT: 1,
    RULES: [
        'The goal of Blackjack is to have your cards total to a value of, or as close as possible, to 21 without going over.',
        'You must first place a bet and then you and the dealer are each dealt 2 cards.',
        `Your cards are face up but the dealer has 1 card face up and 1 card face down until it's their turn.`,
        'Each card with a number counts as that number, while Jacks, Queens, and Kings count as 10. An Ace counts as either 1 or 11.',
        'You can either "hit" or "stand."',
        'To "hit" means to take another card. You can continue hitting until you either "stand," meaning you want to stop taking cards, or bust, meaning you go over 21.',
        'You automatically lose if you bust.',
        `You also lose if your total is less than the dealer's total, if the dealer didn't bust.`,
        'You win by having a higher total less than or equal to 21 or if the dealer busts.',
        'Payouts are 2:1 for normal wins and 3:1 if you win with 21.',
        `For example: If you bet $5, then you'll get those $5 back plus another $5 for winning, plus an additional $5 if you win with a total of 21.`,
        `If there's a tie, the money you bet is returned to you.`
    ],
};

const CARD_SUIT = {
    CLUBS: '&clubs;',
    DIAMONDS: '&diams;',
    HEARTS: '&hearts;',
    SPADES: '&spades;',
};

const DEALER_ACTION = {
    HIT: 0,
    STAND: 1,
};