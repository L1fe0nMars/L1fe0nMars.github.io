/**
 * @author Jamal Kamareddine
 * 
 * This program generates random planet names
 */

const VOWELS = ['a','e','i','o','u'];

const CONSONANTS = {
    single: [
        'b','c','d','f','g','h','j','k','l','m','n',
        'p','q','r','s','t','v','w','x','y','z'
    ],
    startCluster: [
        'Bl','Br','By',
        'Ch','Chl','Chr','Cl','Cr','Cry','Cth','Cy',
        'Dr',
        'Fl','Fr','Fy',
        'Gh','Gl','Gr','Gy',
        'Hy',
        'Jh',
        'Kh','Kl','Kr','Kry','Ky',
        'Ly',
        'My',
        'Ny',
        'Ph','Phl','Phr','Phy','Pl','Pr','Ps','Py',
        'Rh','Ry',
        'Sc','Scl','Scr','Scy','Sh','Shr','Sk','Skl','Skr','Sl','Sn','Sp','Sph','Spl','St','Str','Sv','Sy',
        'Th','Thr','Thy','Tr','Ty',
        'Vl','Vr','Vy',
        'Xh','Xy',
        'Yh',
        'Zh','Zy',
    ],
    middleCluster: [
        'bb','bd','bh','bj','bl','br','bs','bth','by','bz',
        'cd','ch','chn','cl','cm','cn','cr','ct','ctr','cy',
        'dd','dh','dl','dm','dn','dr','dv',
        'fg','fr',
        'gb','gd','gl','gm','gn','gr','gs','gt','gth','gv',
        'hl','hs','ht','hw',
        'kb','kd','kh','kl','km','kn','kr','kt','kth','ktr','kv','ky',
        'lb','lc','lcr','lcy','ld','ldr','lg','lgr','lh','lj','lk','ll','lm','ln','lp','lph','lr','ls','lt','lth','lv','lw','ly','lz','lyps','lypt',
        'mb','mbd','mbr','mp','mph','mpt','mr',
        'nb','nc','nd','ndr','ndv','nf','nfr','ng','ngk','ngl','ngr','ngt','ngw','nj','nk','nkl','nl','nm','nn','nph','ns','nsh','nt','nth','nthr','ntr','nv','ny','nym','nz',
        'ph','phd','phl','phn','phr','pl','pr','ps','pt',
        'rb','rc','rct','rd','rf','rg','rgl','rj','rk','rl','rm','rn','rp','rph','rr','rs','rt','rth','rthr','rtr','rv','rx','ry','rz',
        'sb','sc','scl','scr','sg','sh','sk','skr','sl','sm','sn','sp','sph','ss','st','str',
        'th','thl','thr','tl','tm','tn','tr','ts','tsw','tt','tv','ty',
        'vk','vl','vn','vr','vy',   
        'xl','xp','xph','xt','xtr','xv','xvl',
        'zb','zd','zg','zgr','zl','zr','zt','zv',
    ],
};

const ENDINGS = [
    'b','c','d','f','g','h','hl','j','k','l','lb','lg','lk','lm','m','mph','n','ng','nth','nx','p','ph','ps','q',
    'r','rb','rc','rk','rn','rp','rs','rth','rv','s','sh','sk','ss','t','th','v','x','z'
];

/**
 * Gets a vowel or vowel pair
 * 
 * @param {string} vowel Optional chosen vowel
 * @param {boolean} isPrefix Boolean check if the chosen vowel will be a prefix
 * 
 * @return {string} The chosen vowel or vowel pair
 */
function getVowel(vowel = '', isPrefix = true) {
    if (vowel) {
        if (Math.random() < 0.9) {
            return vowel;
        }

        if (isPrefix) {
            return vowel + getRandomFromArray(VOWELS);
        }
        else {
            return getRandomFromArray(VOWELS) + vowel;
        }
    }
    else {
        if (Math.random() < 0.9) {
            return getRandomFromArray(VOWELS);
        }
        return getRandomFromArray(VOWELS) + getRandomFromArray(VOWELS);
    }
}

/**
 * Gets a consonant or cluster
 * 
 * @return {string} The chosen consonant or cluster
 */
function getConsonant() {
    if (Math.random() < 0.75) {
        return getRandomFromArray(CONSONANTS.single);
    }
    return getRandomFromArray(CONSONANTS.middleCluster);
}

/**
 * Gets the name's prefix string
 * 
 * @param {string} firstLetter Optional letter that the prefix must start with
 * 
 * @return {string} The prefix string
 */
function getPrefix(firstLetter = '') {
    const roll = Math.random();
    let prefix;

    firstLetter = isLetter(firstLetter) ? firstLetter.toLowerCase() : '';

    if (roll < 0.1 || (firstLetter && isVowel(firstLetter))) {
        prefix = getVowel(firstLetter);
    }
    else if (roll < 0.8) {
        let pool = CONSONANTS.single;
        
        if (firstLetter) {
            pool = pool.filter(c => c === firstLetter);
        }
        
        prefix = getRandomFromArray(pool);
    }
    else {
        let pool = CONSONANTS.startCluster;

        if (firstLetter) {
            pool = pool.filter(c => c.startsWith(firstLetter));
        }

        if (pool.length === 0) {
            pool = CONSONANTS.single.filter(c => c === firstLetter);
        }

        prefix = getRandomFromArray(pool);
    }
    
    // Capitalize first letter
    prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);

    return prefix;
}

/**
 * Gets the name's suffix string
 * 
 * @param {string} lastLetter Optional letter that the suffix must end with
 * 
 * @return {string} The suffix string
 */
function getSuffix(lastLetter = '') {
    let suffix;
    
    if (lastLetter) {
        if (isVowel(lastLetter)) {
            suffix = getVowel(lastLetter, false);
        }
        else {
            let endings = ENDINGS.filter(e => e.endsWith(lastLetter));

            if (endings.length === 0 || Math.random() < 0.8) {
                endings = [lastLetter];
            }

            suffix = getVowel() + getRandomFromArray(endings);
        }
    }
    else {
        suffix = getVowel();

        if (Math.random() < 0.5) {
            suffix += getRandomFromArray(ENDINGS);
        }
    }

    return suffix;
}

/**
 * Checks if a char is a vowel
 * 
 * @param {string} char The char to check
 * 
 * @return {boolean} Whether the char is a vowel or not
 */
function isVowel(char) {
    return VOWELS.includes(char.toLowerCase());
}

/**
 * Generates a random name by combining string parts together
 * 
 * @param {string} firstLetter Optional letter that the name should start with
 * @param {string} lastLetter Optional letter that the name should end with
 * 
 * @return {string} The generated name
 */
function generateName(firstLetter = '', lastLetter = '') {
    const weights = {
        2: 0.55,
        3: 0.3,
        4: 0.1,
        1: 0.05,
    };
    const nameLength = weightedOutcome(weights);
    let name = '';
    
    firstLetter = isLetter(firstLetter) ? firstLetter.toUpperCase() : '';
    lastLetter = isLetter(lastLetter) ? lastLetter.toLowerCase() : '';

    name += getPrefix(firstLetter);

    for (let i = 0; i < nameLength - 1; i++) {
        if (i !== 0 || (i === 0 && !isVowel(name[0]))) {
            name += getVowel();
        }

        name += getConsonant();
    }

    name += getSuffix(lastLetter);
    
    return name;
}