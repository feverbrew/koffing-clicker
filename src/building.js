
// Loading building count
var koffingCount = localStorage.getItem("koffingCount") || 0;

// Setting gas per second
var GPS = koffingCount * 0.1;
gasPerSecondMeter = document.getElementById("gas-per-second-meter");
gasPerSecondMeter.innerText = "GPS: " + GPS;

// Setting the buy koffings button
koffingButton = document.getElementsByClassName("koffings building")[0];
koffingButton.addEventListener('click',incrementKoffings);
koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + (10 * Math.pow(2, koffingCount) ) + " Gas";

// Reloading koffing sprites
for (let i = 0; i < koffingCount; i++) {
    createKoffingSprite();
}

// Gas over time ticker
var interval1 = setInterval(gasPerSecond, 1000, GPS);

// Create koffing sprite and update the buy button
function createKoffingSprite() {
    koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + (10 * Math.pow(2, koffingCount) ) + " Gas";
    localStorage.setItem("koffingCount", koffingCount);
    const koffingSprite = document.createElement('img');
    koffingSprite.src = `./images/koffing.png`;
    koffingSprite.alt = `Koffing`;
    document.getElementsByClassName("koffings sprite")[0].appendChild(koffingSprite);
}

// Updates gas count after buying a koffing and initiates the sprite creation
function incrementKoffings() {
    if (gasCount > (10 * Math.pow(2, koffingCount) ) ) {
        gasCount = gasCount - 10 * Math.pow(2, koffingCount);
        gasCount = Math.round(gasCount*10)/10;
        clicks.innerText = "Gas: " + gasCount;
        koffingCount++;
        createKoffingSprite();
        GPS = Math.round(GPS*100)/100;
        gasPerSecondMeter.innerText = "GPS: " + GPS;
    }
}

// Adds the passed gas per second to the gas count
function gasPerSecond() {
    GPS = koffingCount * 0.1;
    gasCount += GPS;
    gasCount = Math.round(gasCount*10)/10;
    clicks.innerText = "Gas: " + gasCount;
    localStorage.setItem("gasCount", gasCount);
}