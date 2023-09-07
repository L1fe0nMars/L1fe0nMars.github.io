"use strict";

const PROJECT_NAME = document.getElementById("project-name");
const FEATURES_LIST = document.getElementById("features-list");
const PROJECT_DESCRIPTION = document.getElementById("description-text");
const PROJECT_LINK = document.getElementById("link");
const PROJECT_LINK_BTN = document.getElementById("link-btn");
const SOURCE_CODE_DIV = document.getElementById("source-code-div");
const SOURCE_CODE_LINK = document.getElementById("source-code");
const JAVA_BTN = document.getElementById("java-btn");
const JAVA_LINK = document.getElementById("java-link");

const projects = [
    {
        title: "Planet Name Generator",
        features: [
            "Generate Billions of Unique Names",
            "Save and Unsave Names",
            "Copy Any Name to Your Clipboard With One Click",
        ],
        description: `You may notice already that I have quite an interest in astronomy. My love for space is the reason why I wanted to create my very own 
            planet name generator. Each name is a combination of hand-selected string parts to make them sound like they would be straight out of a sci-fi movie. 
            This generator has undergone several iterations, and this version is the most advanced, capable of generating <i>billions</i> of unique names.<br><br>
            
            The possibility of so many different names is what lead me to implement the ability to save your favorite names, that way you'll never lose them. 
            It's also incredibly easy to copy names to your clipboard, it just takes one click of a button. With all of my projects, I strive to implement features 
            that I believe would greatly benefit the user experience, and this project was no exception.`,
        link: "/PlanetNameGenerator/index.html",
        linkText: "Visit Project",
        logos: {
            "html": "block",
            "css": "block",
            "javascript": "block",
            "swiperjs": "none",
        },
        sourceCode: "https://github.com/L1fe0nMars/ProjectPortfolio/tree/main/PlanetNameGenerator",
        javaBtnDisplay: "block",
        javaSourceLink: "https://github.com/L1fe0nMars/PlanetNameGenerator",
    },
    {
        title: "21 Classics",
        features: [
            "Responsive Design",
            "Light/Dark Mode Toggle",
            "Swipeable Images Using SwiperJS API",
        ],
        description: `21 Classics is a website dedicated to my dad's collector car business. Originally created by myself with a website builder in 2020, 
            the website underwent a complete overhaul in July 2023 as I began my journey into front-end development. It was remade entirely from scratch using pure HTML, 
            CSS, and JavaScript. The goal was to make the design simple but elegant, while making sure the cars stand out.<br><br>
            
            UI/UX were key in my design choices. The website's responsive design allows the content to adapt to any screen size, while features such as the light/dark mode toggle 
            and swipeable images let the user have an interactive experience when viewing the content. Buttons were specifically chosen to be colorful to make them stand out, and 
            the simple header makes it easy for the user to navigate through the site. The 21 Classics website is a perfect example of how there's beauty in simplicity.`,
        link: "https://21classics.com/",
        linkText: "Visit Website",
        logos: {
            "html": "block",
            "css": "block",
            "javascript": "block",
            "swiperjs": "block",
        },
        sourceCode: "https://github.com/L1fe0nMars/21Classics",
        javaBtnDisplay: "none",
        javaSourceLink: "",
    },
    {
        title: "Blackjack",
        features: [
            "Play the Classic Casino Game",
            "Place Bets, Hit, Stand, and Play Against the Dealer",
            "Persistent Stats",
        ],
        description: `Blackjack is one of the most popular casino card games ever. It's an extremely simple game, but also one that's entirely based on chance. I'm no gambler, 
            but I do enjoy a good card game. I thought it would be the perfect project to test myself at how well I can implement various game systems and elements. There 
            were a lot of moving parts to consider.<br><br>
            
            Object-oriented programming was a must to complete this project. The cards, deck, hands, player, and dealer are all objects. This approach makes the most sense 
            when dealing with game elements that need to interact with one another. The game has your typical actions that the player can choose. They must first place a 
            bet using imaginary money, and then decide whether they want to hit or stand. In addition to the game itself, I thought it would be a cool idea to keep track 
            of different stats, such as wins, losses, draws, biggest payout, and more. These stats are saved to the browser's local storage and can be accessed anytime. 
            All of these features and a simple UI make for an engaging web application to play.`,
        link: "/Blackjack/index.html",
        linkText: "Visit Project",
        logos: {
            "html": "block",
            "css": "block",
            "javascript": "block",
            "swiperjs": "none",
        },
        sourceCode: "https://github.com/L1fe0nMars/ProjectPortfolio/tree/main/Blackjack",
        javaBtnDisplay: "block",
        javaSourceLink: "https://github.com/L1fe0nMars/Blackjack",
    },
];

let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2.5,
    initialSlide: 1,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
    },
    keyboard: {
        enabled: true,
    },
    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 1.5,
        },
        950: {
            slidesPerView: 2.5,
        },
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

updateProjectInfo(swiper.realIndex);

/**
 * Clears all child elements from the passed element
 * 
 * @param {object} element The element to clear children from
 */
function clearChildElements(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

/**
 * Updates the displayed project info elements
 * 
 * @param {number} slide The project slide index
 */
function updateProjectInfo(slide) {
    clearChildElements(FEATURES_LIST);

    PROJECT_NAME.innerHTML = projects[slide].title;
    PROJECT_DESCRIPTION.innerHTML = projects[slide].description;
    PROJECT_LINK.href = projects[slide].link;
    PROJECT_LINK_BTN.innerHTML = projects[slide].linkText;
    SOURCE_CODE_LINK.href = projects[slide].sourceCode;
    JAVA_BTN.style.display = projects[slide].javaBtnDisplay;
    JAVA_LINK.href = projects[slide].javaSourceLink;

    for (const feature of projects[slide].features) {
        let listElement = document.createElement("li");
        let boldFeature = document.createElement("p");

        boldFeature.classList.toggle("bold-feature");
        boldFeature.innerHTML = feature;
        
        listElement.appendChild(boldFeature);
        FEATURES_LIST.appendChild(listElement);
    }

    for (const logo in projects[slide].logos) {
        document.getElementById(logo).style.display = projects[slide].logos[logo];
    }

    if (projects[slide].javaBtnDisplay == "none") {
        SOURCE_CODE_DIV.style.gap = "0";
    }
    else {
        SOURCE_CODE_DIV.style.gap = "2em";
    }
}

swiper.on("transitionEnd", () => {
    updateProjectInfo(swiper.realIndex);
});