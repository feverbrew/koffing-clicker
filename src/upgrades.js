
// Load upgrades
const boughtUpgrades = localStorage.getItem("boughtUpgrades") || [];


// TODO: add upgrade descriptions
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
            boughtUpgrades.push(this);
            localStorage.setItem("boughtUpgrades", boughtUpgrades);
            updateGasCount(-this.cost);
            calculateGasPerSecond();
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


// Should probably eventually make an API or something to fetch upgrades, rather than do what I'm about to do.
var upgradesAll = [
    new Upgrade("Evolutions", 200, "./images/evolutions_upgrade.png", "Allows your Pokemon to evolve!", "mechanic", false),
    new Upgrade("Lumpier Koffing", 100, "./images/lumps.png", "Gives Koffing twice as many lumps to make gas with", "clickmod", false),
    new Upgrade("Longer Tails", 100, "./images/long_tail.png", "Ekans get longer tails to... fan the gas with?", "Ekansmod", false),
    new Upgrade("Bigger Koffings", 50, "./images/big_koffing.png", "Makes your little Koffings a little bit bigger","Koffingsmod", false),
];

// Determine which upgrades are available. Could probably do optimization with the bought attribute.
var upgradesAvailable = upgradesAll.filter(u => !(boughtUpgrades.includes(u)));

// Draws the upgrades on the screen and sets the function to delete them when bought
upgradesAvailable.forEach(element => {
    const d = document.createElement('div');
    d.className = "upgrade-zone"
    document.getElementsByClassName("upgrades")[0].appendChild(d);

    const u = document.createElement('input');
    u.type = "image";
    u.className = "upgrade";
    u.id = element.name;
    u.src = element.icon;
    d.appendChild(u);

    const tipContainer = document.createElement('span');
    tipContainer.className = "upgrade-info";

    const tip = document.createElement('h4');
    tip.id = element.name + " tooltip";
    tip.innerText = element.name + ": \n" + "Cost: " + element.cost + "\n" + element.description;
    tip.backgroundColor = "green";
    d.appendChild(tipContainer);
    tipContainer.appendChild(tip);

    window.onmousemove = function (e) {
        tipContainer.style.top = (e.clientY + 20) + 'px';
        tipContainer.style.left = (e.clientX + 20) + 'px';
    }
    u.onclick = function() {
        if (element.buy()){
            tip.remove();
            tipContainer.remove();
            u.remove();
        }
    };
});
