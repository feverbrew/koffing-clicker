
var EVOLUTIONS = localStorage.getItem("evolutions") || 0;
// Load upgrades
var boughtUpgrades = localStorage.getItem("boughtUpgrades") || [];

if (boughtUpgrades.length > 0) {
    boughtUpgrades = boughtUpgrades.split(",")
}

// Upgrade class
class Upgrade {
    constructor(name, cost, icon, description, category, bought) {
        this.name = name;
        this.cost = cost;
        this.icon = icon;
        this.description = description;
        this.category = category;
        this.bought = bought;
    }
    buy() {
        if (gasCount >= this.cost){
            this.bought = true;
            boughtUpgrades.push(this.name);
            localStorage.setItem("boughtUpgrades", boughtUpgrades);
            updateGasCount(-this.cost);
            calculateGasPerSecond();
            animateGPSMeter();
            if (this.cat == "evolve1"){activateEvolutions();}
            return true
        }
        else {
            return false
        }
    }
    get status() {
        return this.bought;
    }
    get cat() {
        return this.category;
    }
}


// Define the available upgrades:
var upgradesAll = [
    new Upgrade("Evolutions", 200, "./images/evolutions_upgrade.png", "Allows your Pokemon to evolve!", "evolve1", false),
    new Upgrade("Lumpier Koffing", 100, "./images/lumps.png", "Gives Koffing twice as many lumps to make gas with.", "clickmod", false),
    new Upgrade("Longer Tails", 100, "./images/long_tail.png", "Ekans get longer tails to... fan the gas with?", "Ekansmod", false),
    new Upgrade("Bigger Koffings", 50, "./images/big_koffing.png", "Makes your little Koffings a little bit bigger.","Koffingsmod", false),
];

// Determine which upgrades are available. Could probably do optimization with the bought attribute.
var upgradesAvailable = upgradesAll.filter(u => !(boughtUpgrades.includes(u.name)));

// Draws the upgrades on the screen and sets the function to delete them when bought
// Also creates the upgrade tooltip hover
upgradesAvailable.forEach(element => {
    // The containing div
    const d = document.createElement('div');
    d.className = "upgrade-zone";
    d.id = element.name + "upgradezone";
    document.getElementsByClassName("upgrades")[0].appendChild(d);

    // The image button for the upgrade
    const u = document.createElement('input');
    u.type = "image";
    u.className = "upgrade";
    u.id = element.name;
    u.src = element.icon;
    d.appendChild(u);

    // The tooltip on hover
    const tipContainer = document.createElement('span');
    tipContainer.className = "upgrade-info";
    const tip = document.createElement('h4');
    tip.id = element.name + " tooltip";
    tip.innerText = element.name + ": \n" + "Cost: " + element.cost + "\n" + element.description;
    tip.backgroundColor = "green";
    d.appendChild(tipContainer);
    tipContainer.appendChild(tip);

    // This could be an event handler on the div (d), HOWEVER, this does technically allow for weird interactions if a hover is forced where you can push the tooltip off the screen.
    // As currently coded, you can only move the tooltip while your mouse is on the upgrade image.
    u.onmousemove = function(e) {
        tipContainer.style.left = e.clientX + 20 + 'px';
        tipContainer.style.top = e.clientY + 20 + 'px';
    }

    // Triggers on clicking the upgrade button (attempts to buy)
    u.onclick = function() {
        if (element.buy()){
            tip.remove();
            tipContainer.remove();
            u.remove();
        }
    };
});

function activateEvolutions() {
    if (koffingCount>=35){
        weezingCount += koffingCount/35;
        koffingCount = koffingCount%35;
    }
    if (ekansCount>=22){
        arbokCount += ekansCount/35;
        ekansCount = ekansCount%35;
    }
    EVOLUTIONS = 1;
}
