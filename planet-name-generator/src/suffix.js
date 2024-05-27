/**
 * @author Jamal Kamareddine
 * 
 * All possible planet name suffixes
 */
class Suffix {
    #suffixes = [
        'a',
        'aan',
        'aar',
        'ab',
        'ac',
        'ach',
        'ad',
        'aeus',
        'ag',
        'ah',
        'ahl',
        'ahn',
        'ai',
        'aia',
        'air',
        'ak',
        'al',
        'alb',
        'alg',
        'alk',
        'aly',
        'am',
        'an',
        'ang',
        'ant',
        'anth',
        'ao',
        'aos',
        'ap',
        'aph',
        'aq',
        'ar',
        'are',
        'ark',
        'ars',
        'arse',
        'arth',
        'arv',
        'as',
        'ash',
        'at',
        'ath',
        'au',
        'ax',
        'ayde',
        'az',
        'ea',
        'eas',
        'eb',
        'ebe',
        'ed',
        'ede',
        'een',
        'eer',
        'ek',
        'elm',
        'elp',
        'elph',
        'en',
        'ens',
        'enth',
        'eo',
        'eol',
        'eom',
        'eon',
        'eone',
        'eph',
        'er',
        'erg',
        'erth',
        'es',
        'esp',
        'et',
        'eum',
        'eus',
        'euse',
        'ev',
        'ex',
        'ez',
        'i',
        'ia',
        'iac',
        'iak',
        'ial',
        'ian',
        'ias',
        'iax',
        'ic',
        'id',
        'iem',
        'ies',
        'iex',
        'ii',
        'ij',
        'ik',
        'il',
        'im',
        'imph',
        'in',
        'inth',
        'inx',
        'io',
        'ion',
        'ior',
        'ios',
        'ioth',
        'iox',
        'ip',
        'iph',
        'ir',
        'is',
        'isk',
        'ist',
        'ite',
        'ith',
        'iu',
        'ium',
        'ius',
        'iv',
        'ix',
        'iz',
        'o',
        'oa',
        'ob',
        'obe',
        'od',
        'ode',
        'of',
        'og',
        'oh',
        'oj',
        'ok',
        'ol',
        'om',
        'ome',
        'on',
        'one',
        'ons',
        'op',
        'ope',
        'ops',
        'oph',
        'or',
        'orb',
        'org',
        'orm',
        'orn',
        'os',
        'osh',
        'oss',
        'ot',
        'oth',
        'ou',
        'ov',
        'ox',
        'oz',
        'u',
        'ua',
        'uar',
        'ub',
        'ug',
        'ui',
        'uin',
        'uk',
        'um',
        'un',
        'und',
        'une',
        'ur',
        'urk',
        'urn',
        'ury',
        'us',
        'usk',
        'ut',
        'uth',
        'uul',
        'ux',
        'uz',
        'yr',
        'ys',
        'yx'
    ];

    /**
     * Gets a random suffix from the above array
     * 
     * @param {string} excludedStr A string to exclude to prevent the same string occurring consecutively
     * 
     * @return {string} The suffix
     */
    getSuffix(excludedStr = '') {
        const filtered = this.#suffixes.filter(str => str !== excludedStr);
        const suffix = filtered[Math.floor(Math.random() * filtered.length)];

        return suffix;
    }

    /**
     * Gets a random suffix that ends with a specific letter
     * 
     * @param {string} letter The letter the suffix ends with
     * @param {string} excludedStr A string to exclude to prevent the same string occurring consecutively
     * 
     * @return {string} The suffix
     */
    getSuffixWithLastLetter(letter = '', excludedStr = '') {
        const filtered = this.#suffixes.filter(str => str.charAt(str.length - 1) === letter && str !== excludedStr);
        const suffix = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : this.getSuffix(excludedStr);
        
        return suffix;
    }

    /**
     * Gets the amount of total suffixes
     * 
     * @return {number} The total number of possible suffixes
     */
    getNumSuffixes() {
        return this.#suffixes.length;
    }
}