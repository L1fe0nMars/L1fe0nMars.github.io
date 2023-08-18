/**
 * @author Jamal Kamareddine
 * 
 * All possible planet name suffixes
 */
class Suffix {
    #suffixes = [
        "a",
        "ab",
        "ac",
        "ach",
        "adys",
        "aeus",
        "ag",
        "ah",
        "ahl",
        "ai",
        "aia",
        "air",
        "ak",
        "al",
        "alb",
        "alyx",
        "am",
        "amyr",
        "an",
        "ang",
        "ant",
        "anth",
        "ao",
        "aos",
        "aph",
        "aq",
        "ar",
        "are",
        "ark",
        "ars",
        "arse",
        "arv",
        "ath",
        "au",
        "ax",
        "az",
        "ea",
        "eb",
        "eed",
        "een",
        "eer",
        "ek",
        "elm",
        "elp",
        "elph",
        "en",
        "ens",
        "enth",
        "eo",
        "eol",
        "eom",
        "eon",
        "eone",
        "eph",
        "er", 
        "erg",
        "erth",
        "es",
        "esp",
        "et",
        "eum",
        "eus",
        "ev",
        "ex",
        "ez",
        "i",
        "ia",
        "iac",
        "iak",
        "ial",
        "ian",
        "ias",
        "iax",
        "ic",
        "id",
        "iem",
        "ies",
        "iex",
        "ii",
        "ik",
        "il",
        "im",
        "imph",
        "in",
        "inx",
        "io",
        "ion",
        "ior",
        "ios",
        "ioth",
        "iox",
        "ip",
        "iph",
        "ir",
        "is",
        "isk",
        "ist",
        "ite",
        "ith",
        "ium",
        "ius",
        "iv",
        "ix",
        "iz",
        "o",
        "oa",
        "ob",
        "obe",
        "od",
        "ode",
        "of",
        "og",
        "oh",
        "ok",
        "ol",
        "om",
        "ome",
        "on",
        "one",
        "ons",
        "op",
        "ope",
        "ops",
        "oph",
        "or",
        "orb",
        "org",
        "orm",
        "orn",
        "os",
        "osh",
        "oss",
        "ot",
        "oth",
        "ou",
        "ov",
        "ox",
        "oz",
        "u",
        "ua",
        "ub",
        "ui",
        "uin",
        "uk",
        "um",
        "un",
        "une",
        "urk",
        "urn",
        "ury",
        "us",
        "usk",
        "uth",
        "uul",
        "ux",
        "uz",
    ];

    /**
     * Gets a random suffix from the above array
     * 
     * @return {string} The suffix
     */
    getSuffix() {
        let suffix = this.#suffixes[Math.floor(Math.random() * this.#suffixes.length)];

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