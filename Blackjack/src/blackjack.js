"use strict";

const RULES_LIST = document.getElementById("rules-list")

for (let i = 0; i < BLACKJACK_RULES.RULES.length; i++) {
    let listElement = document.createElement("li");
    listElement.innerHTML = BLACKJACK_RULES.RULES[i];
    RULES_LIST.appendChild(listElement);
}

