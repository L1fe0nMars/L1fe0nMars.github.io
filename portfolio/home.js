'use strict';

const projectName = document.getElementById('project-name');
const featuresList = document.getElementById('features-list');
const projectDescription = document.getElementById('description-text');
const projectLink = document.getElementById('link');
const techList = document.getElementById('tech-list')
const extraProjectLinks = document.getElementById('extra-links');

const projects = [
    {
        title: 'Password Generator',
        features: `
            <li>Generate Cryptographically Secure Passwords</li>
            <li>Customize Password Length and Characters</li>
            <li>Simple and Intuitive UI</li>
        `,
        description: `Security is a crucial aspect of the internet. Without it, everyone's sensitive information would be compromised. Having a strong password to your 
            accounts is just one way to bolster that security, which is why I wanted to make my own secure password generator. By combining random letters, numbers, and 
            symbols, it creates passwords that would be extremely difficult for any hacker to crack.<br><br>
            
            Originally I was just going to use Math.random to randomly select string characters, but researching on the topic lead me to discover that Math.random
            wouldn't be ideal because it's not secure at all. Instead, I found that the window.crypto object can be used in its place to generate secure random numbers. It 
            has a function that essentially seeds the selection of the random characters based on the user's window. This ensures that each generated password is unique 
            to the user that generates them, making it cryptographically secure.`,
        link: '/password-generator/',
        linkText: 'Visit Project',
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
            <li>Play the Classic Casino Game</li>
            <li>Place Bets, Hit, Stand, and Play Against the Dealer</li>
            <li>Persistent Stats</li>
        `,
        description: `Blackjack is one of the most popular casino card games ever. It's an extremely simple game, but also one that's entirely based on chance. I'm no gambler, 
            but I do enjoy a good card game. I thought it would be the perfect project to test myself at how well I can implement various game systems and elements. There 
            were a lot of moving parts to consider.<br><br>
            
            Object-oriented programming was a must to complete this project. The cards, deck, hands, player, and dealer are all objects. This approach makes the most sense 
            when dealing with game elements that need to interact with one another. The game has your typical actions that the player can choose. They must first place a 
            bet using imaginary money, and then decide whether they want to hit or stand. In addition to the game itself, I thought it would be a cool idea to keep track 
            of different stats, such as wins, losses, draws, biggest payout, and more. These stats are saved to the browser's local storage and can be accessed anytime. 
            All of these features and a simple UI make for an engaging web project to play.`,
        link: '/blackjack/',
        linkText: 'Visit Project',
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
            <li>Easily Track Your Income and Expenses</li>
            <li>Sort By Transaction Type and Month</li>
            <li>Search Functionality</li>
        `,
        description: `Being able to manage your money is an essential skill. When I started selling on eBay, I wanted a way to keep track of how much I was making. 
            Rather than using an existing app to do it I thought "Why not make my own income tracker?" That's when CashFolio was born.<br><br>
            
            I wanted to add an assortment of useful features. First was the ability to add transactions, of course. Then came sorting options to get a breakdown by
            the month or focusing on only one type of transaction. The totals for profit, income, and expenses are always shown at the top and update accordingly when
            sorting transactions. Deleting a transaction can be easily done by clicking an entry to bring up the delete button or if a user wants to delete all data at 
            once, there's a button for that under the list of transactions as well. The final feature that was implemented was the ability to search transactions. A robust 
            set of features makes CashFolio an extremely useful tool for anyone.`,
        link: 'https://tourmaline-frangollo-d19e23.netlify.app/',
        linkText: 'Visit Project',
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
            <li>Play a Unique Weather Guessing Game</li>
            <li>Gathers Weather Data Using <a href='https://openweathermap.org/' target='_blank' rel='noopener noreferrer' class='text-link'>OpenWeatherMap API</a></li>
            <li>Settings to Customize the Game to Your Preferences</li>
        `,
        description: `Everyone and their mothers has already built a weather app before, so I wanted to put my own twist to it. Introducing WeatherGuesser, a weather 
            guessing game that puts your geography and weather knowledge to the test. The game is simple, it gives you a random city form anywhere in the world, some
            weather info such as the humidity, and you have to guess what the current temperature is in that city.<br><br>
            
            Using React made it easy to handle various aspects of WeatherGuesser. Organization is a big part of the way I code, and being able to split everything into
            components keeps the project neat and maintainable. It also allows me to easily expand on the game if I choose to do so. Another big aspect of why I went with React
            is how effortless it is to handle save data. WeatherGuesser features settings to adjust the game to your liking and React makes it seamless to handle the states of 
            the saved data. All these aspects come together harmoniously to give a fun and interactive game.`,
        link: 'https://weatherguesser.app/',
        linkText: 'Visit Project',
        logos: ['react'],
        extraLinks: `
            <a class="button" href="https://master--keen-torte-d6dd9d.netlify.app/" target="_blank" rel="noopener">
                WeatherGuesser V1
            </a>
        `
    },
    {
        title: '21 Classics',
        features: `
            <li>Responsive Design</li>
            <li>Light/Dark Mode Toggle</li>
            <li>Swipeable Image Galleries Using <a href='https://swiperjs.com/' target='_blank' rel='noopener noreferrer' class='text-link'>SwiperJS</a> Library</li>
        `,
        description: `21 Classics is a website dedicated to collector cars. Originally created with a website builder in 2020, the 
            website underwent a complete overhaul in 2023. It was remade entirely from scratch using pure HTML, CSS, and JavaScript. The goal was to make the 
            design simple but elegant, while making sure the cars stand out.<br><br>
            
            UI/UX were key in my design choices. The website's responsive design allows the content to adapt to any screen size, while features such as the light/dark mode toggle 
            and swipeable image galleries let the user have an interactive experience when viewing the content. Buttons and certain elements were specifically chosen to be 
            colorful to give a more vibrant feel to the website, and the simple header makes it easy for the user to navigate through the site. 21 Classics is a perfect example 
            of how there's beauty in simplicity.`,
        link: 'https://21classics.com/',
        linkText: 'Visit Website',
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
            <li>Generate Trillions of Unique Names</li>
            <li>Save and Unsave Names</li>
            <li>Copy Any Name to Your Clipboard With One Click</li>
        `,
        description: `You may notice already that I have quite an interest in astronomy. My love for space is the reason why I wanted to create my very own 
            planet name generator. Each name is a combination of hand-selected string parts to make them sound like they would be straight out of a sci-fi movie. 
            This generator has undergone several iterations, and this version is the most advanced, capable of generating <i>trillions</i> of unique names.<br><br>
            
            The possibility of so many different names is what lead me to implement the ability to save your favorite names, that way you'll never lose them. 
            You can also generate up to 100 names at a time, specify the first and last letter of generated names, and copy any name with one click of a button. With all of 
            my projects, I strive to implement features that I believe would greatly benefit the user experience, and this project was no exception.`,
        link: '/planet-name-generator/',
        linkText: 'Visit Project',
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
    const { title, features, description, link, linkText, logos, extraLinks } = projects[slide];

    projectName.innerHTML = title;
    featuresList.innerHTML = features;
    projectDescription.innerHTML = description;
    projectLink.href = link;
    projectLink.innerHTML = linkText;
    extraProjectLinks.innerHTML = extraLinks;

    for (const li of techList.getElementsByTagName('li')) {
        li.style.display = logos.includes(li.id) ? '' : 'none';
    }
}

updateProjectInfo(swiper.realIndex);

swiper.on('transitionEnd', () => {
    updateProjectInfo(swiper.realIndex);
});