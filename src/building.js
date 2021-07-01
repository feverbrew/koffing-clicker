
// Loading building count
var koffingCount = localStorage.getItem("KoffingsCount") || 0;
var ekansCount = localStorage.getItem("EkansCount") || 0;
var weezingCount = localStorage.getItem("WeezingCount") || 0;
var arbokCount = localStorage.getItem("ArbokCount") || 0;

// Need to decide if I want to calculate GPS per building type in the building class or not. Leaning towards yes, but will decide after more thought.
// Actually almost certain it will make things easier to integrate the GPS calc into the class, since building count is no longer a global variable.
class Building {
    constructor(name, count, spriteName, efficiency, baseCost) {
        this.name = name;
        this.count = count;
        this.spriteName = spriteName;
        this.efficiency = efficiency;
        this.baseCost = baseCost;
    }
    get cost() {
        return this.calcCost();
    }
    modifiers() {
        let n = 0;
        boughtUpgrades.forEach(element => {
            if (element.category == this.name+"mod"){
                n++;
            }
        });
        return Math.pow( 2 , n);
    }
    get output() {
        return this.count * this.efficiency * this.modifiers();
    }
    calcCost() {
        return Math.round(this.baseCost * Math.pow(1.2, this.count) );
    }
    buy() {
        if (gasCount >= this.calcCost()){
            this.count += 1;
            updateGasCount(-this.calcCost());
            localStorage.setItem(this.name + "Count",this.count);
            return true;
        }
        else {
            return false;
        }
    }
    createSprite() {
        const sprite = document.createElement('img');
        sprite.src = `./images/`+this.spriteName+`.png`;
        sprite.alt = this.spriteName;
        sprite.className = this.spriteName + " sprite";
        document.getElementsByClassName(this.spriteName + " sprites")[0].appendChild(sprite);
    }
    deleteSprite() {
        child = document.getElementsByClassName(this.spriteName + " sprite")[0];
        document.getElementsByClassName(this.spriteName + " sprites")[0].removeChild(child);
    }
}

// Evolutions class needed here. Is there extend in JS?

const buildings = [
    new Building("Koffings", koffingCount, "koffings", 0.1, 10),
    new Building("Ekans", ekansCount, "ekans", 0.5, 25),
];

buildings.forEach(building => {
    const buyButton = document.createElement('button');
    buyButton.className = building.name + " building";
    buyButton.innerText = building.name + ": " + building.count + "\nCost: " + building.cost + " Gas";
    document.getElementsByClassName("buildings")[0].appendChild(buyButton);
    for (let i = 0; i < building.count; i++) {
        building.createSprite();
    }
    buyButton.onclick = function() {
        if (building.buy()){
            building.createSprite();
            buyButton.innerText = building.name + ": " + building.count + "\nCost: " + building.cost + " Gas";
            calculateGasPerSecond();
        }
    }
})

// Setting gas per second
gasPerSecondMeter = document.getElementById("gas-per-second-meter");
var GPS = calculateGasPerSecond();
gasPerSecondMeter.innerText = "GPS: " + GPS;

// Gas over time ticker
var interval1 = setInterval(gasPerSecond, 1000);

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
    GPS = 0
    buildings.forEach( building => {
        GPS += building.output;
    })
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
    return GPS;
}

function updateGasCount(value) {
    gasCount += value;
    gasCount = Math.round(gasCount*10)/10;
    clicks.innerText = gasCount + " Gas";
}
