'use strict';

const projectName = document.getElementById('project-name');
const featuresList = document.getElementById('features-list');
const projectLinkContainer = document.getElementById('link-container');
const techList = document.getElementById('tech-list')
const extraProjectLinks = document.getElementById('extra-links');

const projects = [
    {
        title: 'Password Generator',
        features: `
            <li>Generate cryptographically secure passwords</li>
            <li>Customize password length and characters</li>
            <li>Simple and intuitive UI</li>
        `,
        link: '<a class="button" href="/password-generator/" target="_blank" rel="noopener">Visit Project</a>',
        logos: ['html', 'css', 'javascript'],
        extraLinks: `
            <a class="button" href="https://github.com/L1fe0nMars/L1fe0nMars.github.io/tree/main/password-generator" target="_blank" rel="noopener">
                View Source Code
            </a>
        `
    },
    {
        title: 'Blackjack',
        features: `
            <li>Play the classic casino game</li>
            <li>Place bets, hit, stand, and play against the dealer</li>
            <li>Persistent stats</li>
        `,
        link: '<a class="button" href="/blackjack/" target="_blank" rel="noopener">Visit Project</a>',
        logos: ['html', 'css', 'javascript'],
        extraLinks: `
            <a class="button" href="https://github.com/L1fe0nMars/ProjectPortfolio/tree/main/blackjack" target="_blank" rel="noopener">
                View Source Code
            </a>
            <a class="button" href="https://github.com/L1fe0nMars/blackjack" target="_blank" rel="noopener">
                Java Version
            </a>
        `
    },
    {
        title: 'CashFolio',
        features: `
            <li>Easily track your income and expenses</li>
            <li>Sort by transaction type, month, and year</li>
            <li>Search functionality</li>
        `,
        link: '<a class="button" href="https://cashfolio.netlify.app/" target="_blank" rel="noopener">Visit Project</a>',
        logos: ['react'],
        extraLinks: `
            <a class="button" href="https://github.com/L1fe0nMars/cashfolio" target="_blank" rel="noopener">
                View Source Code
            </a>
        `
    },
    {
        title: 'WeatherGuesser',
        features: `
            <li>Play a unique weather guessing game</li>
            <li>Gathers weather data using <a href='https://openweathermap.org/' target='_blank' rel='noopener noreferrer' class='text-link'>OpenWeatherMap API</a></li>
            <li>Settings to customize the game to your preferences</li>
        `,
        link: '<a class="button" href="https://weatherguesser.app/" target="_blank" rel="noopener">Visit Project</a>',
        logos: ['react'],
        extraLinks: `
            <a class="button" href="https://master--keen-torte-d6dd9d.netlify.app/" target="_blank" rel="noopener">
                WeatherGuesser V1
            </a>
        `
    },
    {
        title: 'Link Seeker',
        features: `
            <li>Free browser extension for searching through links on any web page</li>
            <li>Many options for sorting, filtering, and copying</li>
            <li>Batch actions for extracting and opening multiple links</li>
        `,
        link: `
            <a class="button" href="https://chromewebstore.google.com/detail/link-seeker/knaipgpgejlmehnomikiglidffhpjmnb" target="_blank" rel="noopener">
                <img src="/portfolio/images/chrome.svg" alt="Google Chrome logo">
                <span>Chrome Web Store</span>
            </a>
            <a class="button" href="https://microsoftedge.microsoft.com/addons/detail/link-seeker/bkhmimkpgebbbfhhillnabaojnmlcblh" target="_blank" rel="noopener">
                <img src="/portfolio/images/microsoft-edge.svg" alt="Microsoft logo">
                <span>Microsoft Edge Add-Ons</span>
            </a>
        `,
        logos: ['html', 'css', 'javascript']
    },
    {
        title: '21 Classics',
        features: `
            <li>Responsive design</li>
            <li>Light/Dark mode toggle</li>
            <li>Swipeable image galleries using <a href='https://swiperjs.com/' target='_blank' rel='noopener noreferrer' class='text-link'>SwiperJS</a></li>
        `,
        link: '<a class="button" href="https://21classics.com/" target="_blank" rel="noopener">Visit Website</a>',
        logos: ['html', 'css', 'javascript', 'swiperjs'],
        extraLinks: `
            <a class="button" href="https://github.com/L1fe0nMars/21Classics" target="_blank" rel="noopener">
                View Source Code
            </a>
        `
    },
    {
        title: 'Planet Name Generator',
        features: `
            <li>Generate trillions of unique names</li>
            <li>Save your favorite names</li>
            <li>Copy any name to your clipboard with one click</li>
        `,
        link: '<a class="button" href="/planet-name-generator/" target="_blank" rel="noopener">Visit Project</a>',
        logos: ['html', 'css', 'javascript'],
        extraLinks: `
            <a class="button" href="https://github.com/L1fe0nMars/ProjectPortfolio/tree/main/planet-name-generator" target="_blank" rel="noopener">
                View Source Code
            </a>
            <a class="button" href="https://github.com/L1fe0nMars/PlanetNameGenerator" target="_blank" rel="noopener">
                Java Version
            </a>
        `
    },
];

const swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 2.5,
    initialSlide: 3,
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
        1200: {
            slidesPerView: 2.5,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/**
 * Updates the displayed project info elements
 * 
 * @param {number} slide The project slide index
 */
function updateProjectInfo(slide) {
    const { title, features, link, logos, extraLinks } = projects[slide];

    projectName.innerHTML = title;
    featuresList.innerHTML = features;
    projectLinkContainer.innerHTML = link;

    if (extraLinks) {
        extraProjectLinks.innerHTML = extraLinks;
        extraProjectLinks.style.display = 'flex';
    }
    else {
        extraProjectLinks.innerHTML = '';
        extraProjectLinks.style.display = 'none';
    }

    for (const li of techList.getElementsByTagName('li')) {
        li.style.display = logos.includes(li.id) ? '' : 'none';
    }
}

updateProjectInfo(swiper.realIndex);

swiper.on('transitionEnd', () => {
    updateProjectInfo(swiper.realIndex);
});