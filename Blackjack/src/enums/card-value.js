/**
 * @author Jamal Kamareddine
 * 
 * Constants and functions for the values of each card
 */
const CARD_VALUES = Object.freeze({
    ACE: {
        rank: "A",
        suit: "",
        value: [1, 11],
    },
    TWO: {
        rank: "2",
        suit: "",
        value: [2],
    },
    THREE: {
        rank: "3",
        suit: "",
        value: [3],
    },
    FOUR: {
        rank: "4",
        suit: "",
        value: [4],
    },
    FIVE: {
        rank: "5",
        suit: "",
        value: [5],
    },
    SIX: {
        rank: "6",
        suit: "",
        value: [6],
    },
    SEVEN: {
        rank: "7",
        suit: "",
        value: [7],
    },
    EIGHT: {
        rank: "8",
        suit: "",
        value: [8],
    },
    NINE: {
        rank: "9",
        suit: "",
        value: [9],
    },
    TEN: {
        rank: "10",
        suit: "",
        value: [10],
    },
    JACK: {
        rank: "J",
        suit: "",
        value: [10],
    },
    QUEEN: {
        rank: "Q",
        suit: "",
        value: [10],
    },
    KING: {
        rank: "K",
        suit: "",
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