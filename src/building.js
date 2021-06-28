
// Loading building count
var koffingCount = localStorage.getItem("koffingCount") || 0;
var ekansCount = localStorage.getItem("ekansCount") || 0;

// Setting gas per second
gasPerSecondMeter = document.getElementById("gas-per-second-meter");
var GPS = calculateGasPerSecond();
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
    createSprite("koffings");
}

for (let i = 0; i < ekansCount; i++) {
    createSprite("ekans");
}

// Gas over time ticker
var interval1 = setInterval(gasPerSecond, 1000);

function createSprite(spriteName) {
    const sprite = document.createElement('img');
    sprite.src = `./images/`+spriteName+`.png`;
    sprite.alt = spriteName;
    document.getElementsByClassName(spriteName + " sprite")[0].appendChild(sprite);
}

// Updates gas count after buying a koffing and initiates the sprite creation
function incrementKoffings() {
    var koffingsCost = 10 * Math.pow(2, koffingCount);
    if (gasCount > koffingsCost) {
        updateGasCount(-koffingsCost);
        koffingCount++;
        createSprite("koffings");
        koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + (10 * Math.pow(2, koffingCount) ) + " Gas";
        localStorage.setItem("koffingCount", koffingCount);
        calculateGasPerSecond();
    }
}

function incrementEkans() {
    var ekansCost = 25 * Math.pow(2, ekansCount);
    if (gasCount > ekansCost) {
        updateGasCount(-ekansCost);
        ekansCount++;
        createSprite("ekans");
        ekansButton.innerText = "Ekans: " + ekansCount + "\nCost: " + (25 * Math.pow(2, ekansCount)) + " Gas";
        localStorage.setItem("ekansCount", ekansCount);
        calculateGasPerSecond();
    }
}

// Adds the passed gas per second to the gas count
function gasPerSecond() {
    GPS = calculateGasPerSecond();
    gasCount += GPS;
    gasCount = Math.round(gasCount*10)/10;
    clicks.innerText = gasCount + " Gas";
    localStorage.setItem("gasCount", gasCount);
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
}

// Calculates the current gas per second, stores it in GPS, and returns GPS
function calculateGasPerSecond() {
    GPS = (koffingCount * 0.1 * koffingsModifier()) + (ekansCount * 0.5 * ekansModifier());
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
    return GPS;
}

function updateGasCount(value) {
    gasCount += value;
    gasCount = Math.round(gasCount*10)/10;
    clicks.innerText = gasCount + " Gas";
}

function koffingsModifier() {
    return 1;
}

function ekansModifier() {
    return 1;
}