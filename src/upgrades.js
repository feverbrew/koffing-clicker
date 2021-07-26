
// Loading building count
var koffingCount = parseInt(localStorage.getItem("KoffingsCount")) || 0;
var ekansCount = parseInt(localStorage.getItem("EkansCount")) || 0;
var meowthCount = parseInt(localStorage.getItem("MeowthCount")) || 0;
var wobbuffetCount = parseInt(localStorage.getItem("WobbuffetCount")) || 0;
var weezingCount = parseInt(localStorage.getItem("weezingCount")) || 0;
var arbokCount = parseInt(localStorage.getItem("arbokCount")) || 0;

var EVOLUTIONS = localStorage.getItem("evolutions") || 0;
// Load upgrades
var boughtUpgrades = localStorage.getItem("boughtUpgrades") || [];

if (boughtUpgrades.length > 0) {
    boughtUpgrades = boughtUpgrades.split(",")
}

// Upgrade class
class Upgrade {
    constructor(name, cost, icon, effect, description, category, bought, unlockFunc, drawn = false) {
        this.name = name;
        this.cost = cost;
        this.icon = icon;
        this.effect = effect;
        this.description = description;
        this.category = category;
        this.bought = bought;
        this.unlockFunc = unlockFunc;
        this.drawn = drawn;
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
    unlock() {
        if (!this.bought && !this.drawn && this.unlockFunc()) {
            return true;
        } else {
            return false;
        }
    }
    // Draws the upgrades on the screen and sets the function to delete them when bought
    // Also creates the upgrade tooltip hover
    draw() {
        this.drawn = true;

        // The containing div
        const d = document.createElement('div');
        d.className = "upgrade-zone";
        d.id = this.name + "upgradezone";
        document.getElementsByClassName("upgrades")[0].appendChild(d);

        // The image button for the upgrade
        const u = document.createElement('input');
        u.type = "image";
        u.className = "upgrade";
        u.id = this.name;
        u.src = this.icon;
        d.appendChild(u);

        // The tooltip on hover
        const tipContainer = document.createElement('span');
        tipContainer.className = "upgrade-info";
        const tip = document.createElement('h4');
        tip.id = this.name + " tooltip";
        tip.innerHTML = `<div class='description'><p>`+this.name+`<br>Cost: `+this.cost+ ` Gas<br><br>`+this.effect+`<br><br>`+this.description+`</p></div>`;
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
            if (this.buy()){
                tip.remove();
                tipContainer.remove();
                u.remove();
            }
        }.bind(this);
    }
}


// Define the available upgrades:
const upgradesAll = [
    new Upgrade("Evolutions", 200, "./images/evolutions_upgrade.png", "Allows Koffings and Ekans to evolve.", "<i>These guys needed some extra encouragement.</i>", "evolve1", false,
                function(){return (koffingCount >= 10 && ekansCount >= 10)}
                ),
    new Upgrade("Lumpier Koffing", 100, "./images/lumps.png", "Clicking Koffing is <span class='description-emph'>twice</span> as effective.", "<i>Gives Koffing twice as many lumps to pump out gas with.</i>", "clickmod", false,
                function(){return (clickCount >= 100)}
                ),
    new Upgrade("Longer Tails", 100, "./images/long_tail.png", "Ekans produce <span class='description-emph'>twice</span> as much gas.", "<i>Ekans get longer tails to... fan the gas with?</i>", "Ekansmod", false,
                function(){return (ekansCount >= 10)}
                ),
    new Upgrade("Bigger Koffings", 50, "./images/big_koffing.png", "Koffings produce <span class='description-emph'>twice</span> as much gas.", "<i>Makes your little Koffings a little bit bigger.</i>","Koffingsmod", false,
                function(){return (koffingCount >= 10)}
                ),
    new Upgrade("More Teeth", 500, "./images/koffing_teeth.png", "Koffings produce <span class='description-emph'>twice</span> as much gas.", "<i>More teeth means faster eating; which means more gas.</i>","Koffingsmod", false,
                function(){return (koffingCount >= 25)}
                ),
    new Upgrade("Longer Bodies", 1000, "./images/long_body.png", "Ekans produce <span class='description-emph'>twice</span> as much gas.", "<i>Definitely not the same as longer tails.</i>","Ekansmod", false,
                function(){return (ekansCount >= 25)}
                ),
    new Upgrade("Fresher Clicks", 1500, "./images/cursor.png", "Clicking Koffing is <span class='description-emph'>twice</span> as effective.", "<i>Research suggests that the fresher the clicks, the more gas Koffing will produce.</i>","clickmod", false,
                function(){return (clickCount >= 500)}
                ),
    new Upgrade("Shinier Coin", 2000, "./images/coin.png", "Meowths produce <span class='description-emph'>twice</span> as much gas.", "<i>Meowths are usually only motivated by greed, but a coin touch up might work.</i>","Meowthmod", false,
                function(){return (meowthCount >= 10)}
                ),
    new Upgrade("Salute", 5000, "./images/salute.png", "Wobbuffets produce <span class='description-emph'>twice</span> as much gas.", "<i>A simple salute improved morale twofold.</i>","Wobbuffetmod", false,
                function(){return (wobbuffetCount >= 10)}
                ),
];

// Remember which upgrades have been bought, unlock the rest
upgradesAll.forEach(u => {
    if (boughtUpgrades.includes(u.name)) {
        u.bought = true;
    } else {
        if (u.unlock()) {
            u.draw();
        }
    }
});

// Checks if upgrades should be unlocked
const upgradeChecker = setInterval(upgradeUnlockCheck, 1000);

function upgradeUnlockCheck() {
    upgradesAll.forEach(u => {
        if (!u.bought && u.unlock()){
            u.draw();
        }
    });
}

// Special function to allow evolving when the evolution upgrade is bought
function activateEvolutions() {
    EVOLUTIONS = 1;
    buildings.forEach( b => {
        if (b.evolvesInto && b.count >= b.evolvesAt){
            b.evolve()
        }
    })
}
