'use strict';

const STATS_BTN = document.getElementById('stats-btn');
const STATS_MODAL = document.getElementById('stats-modal');
const STATS_TABLE = document.getElementById('stats');
const RESET_STATS = document.getElementById('reset-stats');

let stats = {
    wins: {
        value: 0,
        element: 'wins',
    },
    losses: {
        value: 0,
        element: 'losses'
    },
    draws: {
        value: 0,
        element: 'draws',
    },
    highestBet: {
        value: 0,
        element: 'highest-bet',
    },
    biggestPayout: {
        value: 0,
        element: 'biggest-payout',
    },
    highestTotalMoney: {
        value: 100,
        element: 'highest-total-money',
    },
    lifetimeEarnings: {
        value: 0,
        element: 'lifetime-earnings',
    },
    lifetimeMoneyLost: {
        value: 0,
        element: 'lifetime-money-lost',
    },
    lostItAll: {
        value: 0,
        element: 'lost-it-all',
    },
}

loadStats();

/**
 * Saves the game stats
 */
function saveStats() {
    localStorage['stats'] = JSON.stringify(stats);

    for (const [key, val] of Object.entries(stats)) {
        document.getElementById(stats[key].element).innerHTML = stats[key].value;
    }
}

/**
 * Loads the game stats
 */
function loadStats() {
    if (localStorage['stats']) {
        stats = JSON.parse(localStorage['stats']);

        for (const [key, val] of Object.entries(stats)) {
            document.getElementById(stats[key].element).innerHTML = stats[key].value;
        }
    }
    else {
        saveStats();
    }
}

/**
 * Resets game stats back to their default values
 */
function resetStats() {
    for (const [key, val] of Object.entries(stats)) {
        key === 'highestTotalMoney' ? updateStat(key, 100) : updateStat(key, 0);
    }
}

/**
 * Updates one of the saved stats
 * 
 * @param {string} stat The stat key to update
 * @param {number} newValue The new value of the stat
 */
function updateStat(stat, newValue) {
    stats[stat].value = newValue;
    document.getElementById(stats[stat].element).innerHTML = newValue;
    saveStats();
}

/**
 * Opens the stats modal
 */
function openStatsModal() {
    STATS_MODAL.style.display = 'block';
    GAME_AREA.style.display = 'none';
}

/**
 * Closes the stats modal
 */
function closeStatsModal() {
    STATS_MODAL.style.display = 'none';
    GAME_AREA.style.display = 'block';
}

/**
 * Checks if the stats modal is open
 * 
 * @return {boolean} Whether the modal is open or not
 */
function isStatsModalOpen() {
    return STATS_MODAL.style.display === 'block';
}

STATS_BTN.addEventListener('click', openStatsModal);
CLOSE_BTN[1].addEventListener('click', closeStatsModal);
RESET_STATS.addEventListener('click', resetStats);

document.addEventListener('keydown', (event) => {
    if (isStatsModalOpen() && event.key === 'Escape') {
        closeStatsModal();
    }
});