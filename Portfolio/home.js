"use strict";

const PROJECT_NAME = document.getElementById("project-name");
const FEATURES_LIST = document.getElementById("features-list");
const PROJECT_DESCRIPTION = document.getElementById("description-text");
const PROJECT_LINK = document.getElementById("link");
const SWIPER_LOGO = document.getElementById("swiperjs");
const SOURCE_CODE_LINK = document.getElementById("source-code");

const projects = [
    {
        title: "Coming Soon",
        features: [
            "",
        ],
        description: `21 classics
        was`,
        link: "",
        swiperLogoDisplay: "none",
        sourceCode: "",
    },
    {
        title: "Planet Name Generator",
        features: [
            "",
        ],
        link: "/PlanetNameGenerator/index.html",
        swiperLogoDisplay: "none",
        sourceCode: "",
    },
    {
        title: "21 Classics",
        features: [
            "Responsive Design",
            "Light/Dark Mode Toggle",
            "Swipeable Images Using SwiperJS API",
        ],
        link: "https://21classics.com/",
        swiperLogoDisplay: "block",
        sourceCode: "https://github.com/L1fe0nMars/21Classics",
    },
    {
        title: "Blackjack",
        features: [
            "",
        ],
        link: "/Blackjack/index.html",
        swiperLogoDisplay: "none",
        sourceCode: "",
    },
    {
        title: "Coming Soon",
        features: [
            "",
        ],
        link: "",
        swiperLogoDisplay: "none",
        sourceCode: "",
    },
];

let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2.5,
    initialSlide: 2,
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

function clearChildElements(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function updateProjectInfo(slide) {
    clearChildElements(FEATURES_LIST);

    PROJECT_NAME.innerHTML = projects[slide].title;
    /*PROJECT_DESCRIPTION.innerHTML = projects[slide].description;*/
    PROJECT_LINK.href = projects[slide].link;
    SWIPER_LOGO.style.display = projects[slide].swiperLogoDisplay;
    SOURCE_CODE_LINK.href = projects[slide].sourceCode;

    for (let i = 0; i < projects[slide].features.length; i++) {
        let listElement = document.createElement("li");
        let boldFeature = document.createElement("p");
        let feature = document.createElement("p");

        boldFeature.classList.toggle("bold-feature");
        console.log(boldFeature.classList);
        boldFeature.innerHTML = projects[slide].features[i];
        
        listElement.appendChild(boldFeature);
        FEATURES_LIST.appendChild(listElement);
    }
}

swiper.on("transitionEnd", () => {
    updateProjectInfo(swiper.realIndex);
});