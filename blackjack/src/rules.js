"use strict";

const GAME_AREA = document.getElementById("game-area");
const RULES_BTN = document.getElementById("rules-btn");
const RULES_MODAL = document.getElementById("rules-modal");
const RULES_LIST = document.getElementById("rules-list");
const CLOSE_BTN = document.getElementsByClassName("close");

for (let i = 0; i < BLACKJACK_RULES.RULES.length; i++) {
    const listElement = document.createElement("li");
    listElement.innerHTML = BLACKJACK_RULES.RULES[i];
    RULES_LIST.appendChild(listElement);
}

/**
 * Opens the rules modal
 */
function openRulesModal() {
    RULES_MODAL.style.display = "block";
    GAME_AREA.style.display = "none";
}

/**
 * Closes the rules modal
 */
function closeRulesModal() {
    RULES_MODAL.style.display = "none";
    GAME_AREA.style.display = "block";
}

/**
 * Checks if the rules modal is open
 * 
 * @return {boolean} Whether the modal is open or not
 */
function isRulesModalOpen() {
    return RULES_MODAL.style.display === "block";
}

RULES_BTN.addEventListener("click", openRulesModal);
CLOSE_BTN[0].addEventListener("click", closeRulesModal);

document.addEventListener("keydown", (event) => {
    if (isRulesModalOpen() && event.key === "Escape") {
        closeRulesModal();
    }
});