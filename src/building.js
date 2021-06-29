
// Loading building count
var koffingCount = localStorage.getItem("koffingCount") || 0;
var ekansCount = localStorage.getItem("ekansCount") || 0;
var weezingCount = localStorage.getItem("weezingCount") || 0;
var arbokCount = localStorage.getItem("arbokCount") || 0;

// Setting gas per second
gasPerSecondMeter = document.getElementById("gas-per-second-meter");
var GPS = calculateGasPerSecond();
gasPerSecondMeter.innerText = "GPS: " + GPS;

// Setting the buy koffings button
koffingButton = document.getElementsByClassName("koffings building")[0];
koffingButton.addEventListener('click', incrementKoffings);
koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + Math.round(10 * Math.pow(1.1, koffingCount) ) + " Gas";

// Setting the buy ekans button
ekansButton = document.getElementsByClassName("ekans building")[0];
ekansButton.addEventListener('click', incrementEkans);
ekansButton.innerText = "Ekans: " + ekansCount + "\nCost: " + Math.round(25 * Math.pow(1.1,ekansCount) ) + " Gas";


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
    sprite.className = spriteName + " sprite";
    document.getElementsByClassName(spriteName + " sprites")[0].appendChild(sprite);
}

function deleteSprite(spriteName) {
    child = document.getElementsByClassName(spriteName + " sprite")[0];
    document.getElementsByClassName(spriteName + " sprites")[0].removeChild(child);
}

// TODO: use the e event object to consolidate into an incrementBuilding function
// Updates gas count after buying a koffing and initiates the sprite creation
function incrementKoffings() {
    var koffingsCost = Math.round(10 * Math.pow(1.1, koffingCount));
    if (gasCount > koffingsCost) {
        updateGasCount(-koffingsCost);
        if (koffingCount >= 34 && boughtUpgrades.some(e => e.name === "Evolutions")){
            createSprite("weezing");
            weezingCount++;
            for (let i = 0; i < 34; i++){
                deleteSprite("koffings");
                koffingCount--;
            }
            koffingButton.innerText = "Weezings: " + weezingCount + " Koffings: " + koffingCount + "\nCost: " + Math.round(10 * Math.pow(1.1, koffingCount) ) + " Gas";
            localStorage.setItem("koffingCount", koffingCount);
            localStorage.setItem("weezingCount", weezingCount);
            calculateGasPerSecond();
        }
        else{
            koffingCount++;
            createSprite("koffings");
            koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + Math.round(10 * Math.pow(1.1, koffingCount) ) + " Gas";
            localStorage.setItem("koffingCount", koffingCount);
            calculateGasPerSecond();
        }
    }
}

function incrementEkans() {
    var ekansCost = Math.round(25 * Math.pow(1.1, ekansCount));
    if (gasCount > ekansCost) {
        updateGasCount(-ekansCost);
        ekansCount++;
        createSprite("ekans");
        ekansButton.innerText = "Ekans: " + ekansCount + "\nCost: " + Math.round(25 * Math.pow(1.1, ekansCount)) + " Gas";
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
    GPS = (koffingCount * 0.1 * koffingsModifier()) + (ekansCount * 0.5 * ekansModifier() + (weezingCount * 7 * weezingModifier()) );
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
    return GPS;
}

function updateGasCount(value) {
    gasCount += value;
    gasCount = Math.round(gasCount*10)/10;
    clicks.innerText = gasCount + " Gas";
}

// Can probably turn this into generic modifier function (definitely can once I implement a building class TODO TODO TODO)

function koffingsModifier() {
    var n = 0;
    // Might want to have this be a static number only calculated when a clickmod upgrade is bought, if this ever gets slow because of too many upgrades, its really bad
    boughtUpgrades.forEach(element => {
        if (element.cat == "koffingsmod"){
            n++;
        }
    });
    return Math.pow( 2 , n);
}

function ekansModifier() {
    var n = 0;
    // Might want to have this be a static number only calculated when a clickmod upgrade is bought, if this ever gets slow because of too many upgrades, its really bad
    boughtUpgrades.forEach(element => {
        if (element.cat == "ekansmod"){
            n++;
        }
    });
    return Math.pow( 2 , n);
}

function weezingModifier() {
    var n = 0;
    // Might want to have this be a static number only calculated when a clickmod upgrade is bought, if this ever gets slow because of too many upgrades, its really bad
    boughtUpgrades.forEach(element => {
        if (element.cat == "weezingmod"){
            n++;
        }
    });
    return Math.pow( 2 , n);
}