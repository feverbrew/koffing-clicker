
// Loading building count
var koffingCount = parseInt(localStorage.getItem("KoffingsCount")) || 0;
var ekansCount = parseInt(localStorage.getItem("EkansCount")) || 0;
var meowthCount = parseInt(localStorage.getItem("MeowthCount")) || 0;
var wobbuffetCount = parseInt(localStorage.getItem("WobbuffetCount")) || 0;
var weezingCount = parseInt(localStorage.getItem("WeezingCount")) || 0;
var arbokCount = parseInt(localStorage.getItem("ArbokCount")) || 0;

// Building class
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
            if (element.cat == this.name+"mod"){
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
            updateGasCount(-this.calcCost());
            this.count += 1;
            //localStorage.setItem(this.name + "Count",this.count);
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
    new Building("Koffings", koffingCount, "koffings", 0.5, 10),
    new Building("Ekans", ekansCount, "ekans", 1.0, 25),
    new Building("Meowth", meowthCount, "meowth", 3, 50),
    new Building("Wobbuffet", wobbuffetCount, "wobbuffet", 10, 150),
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
    const gpsHover = document.createElement('gpshover');
    gpsHover.className = "gps-hover";
    buyButton.addEventListener("mouseenter", function(e) {
        x = e.clientX;
        y = e.clientY;
        document.body.append(gpsHover);
        gpsHover.border = `solid black 3px`;
        let gpsRatio = Math.round(100*building.output/calculateGasPerSecond())
        gpsHover.innerText = "You have " + building.count + " " + building.name + " making " + building.output + " gas per second!\n This accounts for " + 
        (gpsRatio ? gpsRatio : 0) + "% of your total GPS";
        gpsHover.style.position = "absolute";
        // Eventually would like to get this styling, but need to do more research:
        //gpsHover.style.left = x+'px';
        //gpsHover.style.top = y+'px';
    })
    buyButton.addEventListener("mouseleave", function() {
        document.body.removeChild(gpsHover);
    })
})

// Setting gas per second
gasPerSecondMeter = document.getElementById("gas-per-second-meter");
var GPS = calculateGasPerSecond();
gasPerSecondMeter.innerText = "GPS: " + GPS;

// Gas over time ticker
var interval1 = setInterval(gasPerSecond, 1000);

// Adds the passed gas per second to the gas count
function gasPerSecond() {
    var GPS = calculateGasPerSecond();
    gasCount += GPS;
    gasCount = Math.round(gasCount*100)/100;
    gas.innerText = gasCount + " Gas";
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
}

// Calculates the current gas per second, stores it in GPS, and returns GPS
function calculateGasPerSecond() {
    var GPS = 0
    buildings.forEach( building => {
        GPS += building.output;
    })
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = "GPS: " + GPS;
    return GPS;
}

function updateGasCount(value) {
    gasCount += value;
    gasCount = Math.round(gasCount*100)/100;
    gas.innerText = gasCount + " Gas";
}
