
// Loading building count
var koffingCount = localStorage.getItem("koffingCount") || 0;
var ekansCount = localStorage.getItem("ekansCount") || 0;

// Setting gas per second
// TODO: make a function to calculate this, too much work to write everywhere
var GPS = koffingCount * 0.1 + ekansCount * 0.5;
gasPerSecondMeter = document.getElementById("gas-per-second-meter");
gasPerSecondMeter.innerText = "GPS: " + GPS;

// Setting the buy koffings button
koffingButton = document.getElementsByClassName("koffings building")[0];
koffingButton.addEventListener('click', incrementKoffings);
koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + (10 * Math.pow(2, koffingCount) ) + " Gas";

// Setting the buy ekans button
ekansButton = document.getElementsByClassName("ekans building")[0];
ekansButton.addEventListener('click', incrementEkans);
ekansButton.innerText = "Ekans: " + ekansCount + "\nCost: " + (25 * Math.pow(2,ekansCount) ) + " Gas";


// Reloading koffing sprites
for (let i = 0; i < koffingCount; i++) {
    createKoffingSprite();
}

// Gas over time ticker
// TODO: make gasPerSecond return GPS so that we actually have something calculating it
var interval1 = setInterval(gasPerSecond, 1000, GPS);

// Create koffing sprite and update the buy button
/*
function createKoffingSprite() {
    const koffingSprite = document.createElement('img');
    koffingSprite.src = `./images/koffings.png`;
    koffingSprite.alt = `Koffing`;
    document.getElementsByClassName("koffings sprite")[0].appendChild(koffingSprite);
}
*/

function createSprite(spriteName) {
    const sprite = document.createElement('img');
    sprite.src = `./images/`+spriteName+`.png`;
    sprite.alt = spriteName;
    document.getElementsByClassName(spriteName + " sprite")[0].appendChild(sprite);
}

// Updates gas count after buying a koffing and initiates the sprite creation
function incrementKoffings() {
    if (gasCount > (10 * Math.pow(2, koffingCount) ) ) {
        gasCount = gasCount - 10 * Math.pow(2, koffingCount);
        gasCount = Math.round(gasCount*10)/10;
        clicks.innerText = gasCount + " Gas";
        koffingCount++;
        createSprite("koffings");
        koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + (10 * Math.pow(2, koffingCount) ) + " Gas";
        localStorage.setItem("koffingCount", koffingCount);
    }
}

function incrementEkans() {
    if (gasCount > (25 * Math.pow(2, ekansCount) ) ) {
        gasCount = gasCount - 25 * Math.pow(2, ekansCount);
        gasCount = Math.round(gasCount*10)/10;
        clicks.innerText = "Gas: " + gasCount;
        ekansCount++;
        createSprite("ekans");
        ekansButton.innerText = "Ekans: " + ekansCount + "\nCost: " + (25 * Math.pow(2, ekansCount) ) + " Gas";
        localStorage.setItem("ekansCount", ekansCount);
    }
}

// Adds the passed gas per second to the gas count
function gasPerSecond() {
    GPS = (koffingCount * 0.1 * koffingsModifier()) + (ekansCount * 0.5 * ekansModifier());
    gasCount += GPS;
    gasCount = Math.round(gasCount*10)/10;
    clicks.innerText = gasCount + " Gas";
    localStorage.setItem("gasCount", gasCount);
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
}

function koffingsModifier() {
    return 1
}

function ekansModifier() {
    return 1
}