
// Load upgrades
const boughtUpgrades = localStorage.getItem("boughtUpgrades") || [];


// TODO: add upgrade descriptions
class upgrade {
    constructor(name, cost, icon, category, bought) {
        this.name = name;
        this.cost = cost;
        this.icon = icon;
        this.category = category;
        this.bought = bought;
    }
    buy() {
        if (gasCount >= this.cost){
            this.bought = true;
            boughtUpgrades.push(this);
            localStorage.setItem("boughtUpgrades", boughtUpgrades);
            updateGasCount(-this.cost);
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
    new upgrade("Evolutions", 200, "./images/evolutions_upgrade.png", "mechanic", false),
    new upgrade("Lumpier Koffing", 100, "./images/lumps.png", "clickmod", false),
    new upgrade("Longer Tails", 100, "./images/long_tail.png", "ekansmod", false),
    new upgrade("Bigger Koffings", 50, "./images/big_koffing.png", "koffingsmod", false),
];

// Determine which upgrades are available. Could probably do optimization with the bought attribute.
var upgradesAvailable = upgradesAll.filter(u => !(boughtUpgrades.includes(u)));

upgradesAvailable.forEach(element => {
    const u = document.createElement('input');
    u.type = "image";
    u.className = "upgrade";
    u.id = element.name;
    u.src = element.icon;
    document.getElementsByClassName("upgrades")[0].appendChild(u);
    u.onclick = function() {
        if (element.buy()){
            u.remove()
        }
    };
});
