
// Loading building count
var koffingCount = parseInt(localStorage.getItem("KoffingsCount")) || 0;
var ekansCount = parseInt(localStorage.getItem("EkansCount")) || 0;
var meowthCount = parseInt(localStorage.getItem("MeowthCount")) || 0;
var wobbuffetCount = parseInt(localStorage.getItem("WobbuffetCount")) || 0;
var weezingCount = parseInt(localStorage.getItem("weezingCount")) || 0;
var arbokCount = parseInt(localStorage.getItem("arbokCount")) || 0;

// Building class
class Building {
    constructor(name, count, spriteName, efficiency, baseCost, evolvesInto, evolvesAt, evoCount) {
        this.name = name;
        this.count = count;
        this.spriteName = spriteName;
        this.efficiency = efficiency;
        this.baseCost = baseCost;
        this.evolvesInto = evolvesInto;
        this.evolvesAt = evolvesAt;
        this.evoCount = evoCount;
    }
    get cost() {
        return this.calcCost();
    }
    modifiers() {
        let n = 0;
        if (boughtUpgrades.length>0){
            upgradesAll.forEach(element => {
                if (element.status && element.cat == this.name+"mod"){
                    n++;
                }
            });
        }
        return Math.pow( 2 , n);
    }
    get output() {
        return Math.round( (this.count * this.efficiency * this.modifiers() + this.evoCount * this.count * 0.4)*100 )/100;
    }
    calcCost() {
        return Math.round(this.baseCost * Math.pow(1.2, this.count) );
    }
    buy() {
        if (gasCount >= this.calcCost()){
            updateGasCount(-this.calcCost());
            this.createSprite();
            this.count += 1;
            if (EVOLUTIONS && this.evolvesInto && (this.count - this.evolvesAt*this.evoCount >= this.evolvesAt)){
                this.evolve();
            }
            return true;
        }
        else {
            return false;
        }
    }
    createSprite() {
        const sprite = document.createElement('img');
        sprite.src = `./images/${this.spriteName}.png`;
        sprite.alt = this.spriteName;
        sprite.className = this.spriteName + " sprite";
        document.getElementsByClassName(this.spriteName + " sprites")[0].appendChild(sprite);
    }
    deleteSprite() {
        let container = document.getElementsByClassName(this.spriteName + " sprites")[0];
        //let child = document.getElementsByClassName(this.spriteName + " sprite")[0];
        container.lastElementChild.remove();
    }
    evolve() {
            for (let i=0; i<this.evolvesAt; i++){
                this.deleteSprite();
            }
            const evoSprite = document.createElement('img');
            evoSprite.src = `./images/${this.evolvesInto}.png`;
            evoSprite.alt = this.evolvesInto;
            evoSprite.className = this.evolvesInto + " evoSprite sprite";
            let container = document.getElementsByClassName(this.spriteName + " sprites")[0];
            container.insertBefore(evoSprite,container.firstChild);
            this.evoCount += 1;
            localStorage.setItem(this.evolvesInto+"Count", this.evoCount);
    }
}

const buildings = [
    new Building("Koffings", koffingCount, "koffings", 0.5, 10, "weezing", 35, weezingCount),
    new Building("Ekans", ekansCount, "ekans", 1.0, 25, "arbok", 22, arbokCount),
    new Building("Meowth", meowthCount, "meowth", 3, 50, null, null, 0),
    new Building("Wobbuffet", wobbuffetCount, "wobbuffet", 10, 150, null, null, 0),
];


// Creates the building buttons
// Buttons display stats on hover and when clicked will attempt to buy one building (and create a sprite if successful)
buildings.forEach(building => {
    const buyButton = document.createElement('button');
    buyButton.className = building.name + " building";
    buyButton.innerText = building.name + ": " + building.count + "\nCost: " + building.cost + " Gas";
    document.getElementsByClassName("buildings")[0].appendChild(buyButton);
    for (let i = 0; i< building.evoCount; i++) {
        const evoSprite = document.createElement('img');
        evoSprite.src = `./images/${building.evolvesInto}.png`;
        evoSprite.alt = building.evolvesInto;
        evoSprite.className = building.evolvesInto + " evoSprite sprite";
        let container = document.getElementsByClassName(building.spriteName + " sprites")[0];
        container.insertBefore(evoSprite,container.firstChild);
    }
    for (let i = 0; i < building.count - building.evolvesAt*building.evoCount; i++) {
        building.createSprite();
    }
    buyButton.onclick = function() {
        if (building.buy()){
            buyButton.innerText = building.name + ": " + building.count + "\nCost: " + building.cost + " Gas";
            calculateGasPerSecond();
            animateGPSMeter();
        }
    }
    const gpsHover = document.createElement('gpshover');
    gpsHover.className = "gps-hover";
    // Could clean up this event listener, as it is only creating a hover effect right now.
    buyButton.addEventListener("mouseenter", function(e) {
        x = e.clientX;
        y = e.clientY;
        document.body.append(gpsHover);
        gpsHover.border = `solid black 3px`;
        let gpsRatio = Math.round(100*building.output/calculateGasPerSecond())
        gpsHover.innerText = "You have " + building.count + " " + building.name + " making " + building.output + " gas per second!\n This accounts for " + 
        (gpsRatio ? gpsRatio : 0) + "% of your total GPS";
        gpsHover.style.position = "absolute";
        // May or may not change this styling to the upgrade hover styling. Kinda like how it currently is, at least until the page gets busier
    })
    buyButton.addEventListener("mouseleave", function() {
        document.body.removeChild(gpsHover);
    })
})

// Setting gas per second
gasPerSecondMeter = document.getElementById("gas-per-second-meter");

// Load current background color
var bgColor = localStorage.getItem("bgColor") || '#00b7ff';
bgAnimation();

// Setting gas per second cont.
var GPS = calculateGasPerSecond();
gasPerSecondMeter.innerText = GPS;

// Gas over time ticker
var interval1 = setInterval(gasPerSecond, 1000);


// Dynamic background animation function
function bgAnimation() {
    if (document.body.animate){
        document.body.animate([
                { backgroundColor: bgColor },
                { backgroundColor: '#a59716' }
            ],  {
                duration: 10000000/calculateGasPerSecond(),
                fill: "both"
            }
        );
    }
}

// Adds the passed gas per second to the gas count
function gasPerSecond() {
    var GPS = calculateGasPerSecond();
    gasCount += GPS;
    gasCount = Math.round(gasCount*100)/100;
    gas.innerText = gasCount;
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = GPS;
    bgColor = window.getComputedStyle(document.body,null).getPropertyValue('background-color');
    if (bgColor != '#a59716') {bgAnimation();}
}

// Calculates the current gas per second, stores it in GPS, and returns GPS
function calculateGasPerSecond() {
    var GPS = 0
    buildings.forEach( building => {
        GPS += building.output;
    })
    GPS = Math.round(GPS*100)/100;
    gasPerSecondMeter.innerText = GPS;
    return GPS;
}

// This is called when something is bought to update the gas count.
function updateGasCount(value) {
    gasCount += value;
    gasCount = Math.round(gasCount*100)/100;
    gas.innerText = gasCount;
}

function animateGPSMeter() {
    gasPerSecondMeterLabel = document.getElementById("gas-per-second-meter-label");
    gasPerSecondMeterLabel.classList.add("wave-text-class");
    setTimeout(function() {gasPerSecondMeterLabel.classList.remove("wave-text-class")}, 4500);
}
