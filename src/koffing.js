
// Initialize the gas count from local storage; or if unable to find, with 0
var gasCount = parseInt(localStorage.getItem("gasCount")) || 0;
var clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
var totalGas = parseInt(localStorage.getItem("totalGas")) || 0;
var playTime = parseInt(localStorage.getItem("playTime")) || 0;

// Loading building count
var koffingCount = parseInt(localStorage.getItem("KoffingsCount")) || 0;
var ekansCount = parseInt(localStorage.getItem("EkansCount")) || 0;
var meowthCount = parseInt(localStorage.getItem("MeowthCount")) || 0;
var wobbuffetCount = parseInt(localStorage.getItem("WobbuffetCount")) || 0;
var weezingCount = parseInt(localStorage.getItem("weezingCount")) || 0;
var arbokCount = parseInt(localStorage.getItem("arbokCount")) || 0;

// Initialize dynamic elements
let gas = document.getElementById('gas-counter');
let koffingClick = document.getElementById('the-koffing'); // Some jerk on the internet told me to put a . before the-koffing. They lied.
koffingClick.onclick = incrementCounter;

// Set gas count
gas.innerText = gasCount;

// New player message
if (totalGas == 0) {
    alert("Welcome to Koffing Clicker! Click on Koffing to begin collecting gas.");
}

// Particle animation driver on click
if (document.body.animate) {
    koffingClick.addEventListener('click', poof);
}

// Following code courtesy of martpie on stackoverflow!
let startDate = new Date();

const focus = function() {
    startDate = new Date();
};

const blur = function() {
    const endDate = new Date();
    const spentTime = endDate.getTime() - startDate.getTime();
    playTime += spentTime;
};

const beforeunload = function() {
    const endDate = new Date();
    const spentTime = endDate.getTime() - startDate.getTime();
    playTime += spentTime;

    // playtime contains the time spent on page in milliseconds
};

window.addEventListener('focus', focus);
window.addEventListener('blur', blur);
window.addEventListener('beforeunload', beforeunload);

// End martpie code

// Gas count incrementer (called from the HTML input)
function incrementCounter() {
    gasCount += clickMod();
    totalGas += clickMod();
    clickCount++;
    gas.innerText = gasCount;
}

// Calculates any click modifiers from bought upgrades
function clickMod() {
    var n = 0;
    upgradesAll.forEach(element => {
        if (element.status && element.cat == "clickmod"){
            n++;
        }
    });
    return Math.pow( 2 , n);
}

// Generates particles for the animation at the client's mouse click position
function poof(e) {
    for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY)
    }
}

// Create a single particle at x, y
function createParticle(x, y) {
    // Creating the particle specified in CSS
    const particle = document.createElement('particle');
    document.body.appendChild(particle);

    // Making each particle a random size between 5px and 25px
    const size = Math.floor(Math.random() * 20 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Color is yellow!
    particle.style.background = `yellow`;

    // Generate random destination within 75px of the click
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;

    const animation = particle.animate([
        {
            // Set origin position
            transform: `translate(${x - (size / 2)}px, ${y - (size / 2)}px)`,
            opacity: 1
        },
        {
            // Final coords
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0
        }
    ], {
        // Set a random duration
        duration: 500 + Math.random() * 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        // Delay for each particle
        delay: Math.random() * 200
    });

    // When the animation is finished, remove the element from the DOM
    animation.onfinish = () => {
        particle.remove();
    };
}

export { playTime, clickCount, totalGas };