// Initialize the gas count from local storage; or if unable to find, with 0
let gasCount = localStorage.getItem("gasCount") || 0;

// Initialize dynamic elements
let clicks = document.getElementById('click-counter');
let koffingClick = document.getElementById('the-koffing'); // Some jerk on the internet told me to put a . before the-koffing. They lied.

// Set gas count
clicks.innerText = "Gas: " + gasCount;

if (gasCount == 0) {
    alert("Welcome to Koffing Clicker! Click on Koffing to begin collecting gas.");
}

// Particle animation driver on click
if (document.body.animate) {
    koffingClick.addEventListener('click', poof);
}

// Gas count incrementer (called from the HTML input)
function incrementCounter() {
    gasCount++
    clicks.innerText = "Gas: " + gasCount;
    localStorage.setItem("gasCount", gasCount);
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