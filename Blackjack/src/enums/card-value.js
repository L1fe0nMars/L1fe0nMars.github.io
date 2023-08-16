/**
 * @author Jamal Kamareddine
 * 
 * Constants and functions for the values of each card
 */
const CARD_VALUES = Object.freeze({
    ACE: {
        rank: "A",
        value: [1, 11],
    },
    TWO: {
        rank: "2",
        value: [2],
    },
    THREE: {
        rank: "3",
        value: [3],
    },
    FOUR: {
        rank: "4",
        value: [4],
    },
    FIVE: {
        rank: "5",
        value: [5],
    },
    SIX: {
        rank: "6",
        value: [6],
    },
    SEVEN: {
        rank: "7",
        value: [7],
    },
    EIGHT: {
        rank: "8",
        value: [8],
    },
    NINE: {
        rank: "9",
        value: [9],
    },
    TEN: {
        rank: "10",
        value: [10],
    },
    JACK: {
        rank: "J",
        value: [10],
    },
    QUEEN: {
        rank: "Q",
        value: [10],
    },
    KING: {
        rank: "K",
        value: [10],
    },
});

/**
 * Gets the value of a card and checks whether the high value should be used in the case for aces
 * 
 * @param {boolean} useHighValue Boolean that determines which card value to use if there are multiple
 * 
 * @return {number} The value of the card
 */
function getCardValue(card, useHighValue) {
    return useHighValue && card.value.length > 1 ? card.value[1]: card.value[0];
}