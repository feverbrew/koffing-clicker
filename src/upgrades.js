
// Load upgrades
const boughtUpgrades = localStorage.getItem("boughtUpgrades") || [];


// TODO: add upgrade descriptions
class upgrade {
    constructor(name, cost, icon, bought) {
        this.name = name;
        this.cost = cost;
        this.icon = icon;
        this.bought = bought;
    }
    buy() {
        console.log("You bought " + this.name)
        if (gasCount >= this.cost){
            this.bought = true;
            boughtUpgrades.push(this);
            updateGasCount(-this.cost);
        }
    }
    get status() {
        return this.bought;
    }
}


// Should probably eventually make an API or something to fetch upgrades, rather than do what I'm about to do.
var upgradesAll = [
    new upgrade("Evolutions", 200, "./images/evolutions_upgrade.png", false),
    new upgrade("Lumpier Koffing", 100, "./images/lumps.png", false),
];

var upgradesAvailable = upgradesAll.filter(u => !(boughtUpgrades.includes(u)));

upgradesAvailable.forEach(element => {
    const u = document.createElement('input');
    u.type = "image";
    u.className = "upgrade";
    u.id = element.name;
    u.src = element.icon;
    document.getElementsByClassName("upgrades")[0].appendChild(u);
    u.addEventListener('click', function() {element.buy()}); // Buy needs to return result of buy (either true or false) and if true then remove the listener and element from the doc
});
