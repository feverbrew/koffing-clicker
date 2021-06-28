
// Load upgrades
const upgrades = localStorage.getItem("upgrades") || [];

const availableUpgrades = ["evolutions"];

evolutionsUpgrade = document.getElementById("evolutions");
evolutionsUpgrade.addEventListener('click', activateEvolutions());

function activateEvolutions() {
    if (gasCount > 200 && evolutionsUpgrade) {
        evolutionsUpgrade.removeEventListener('click', activateEvolutions());
        document.removeChild(evolutionsUpgrade);
        evolutionsUpgrade = null;
        // Figure out how to add events? Otherwise just set a flag here that will allow buildings to upgrade, buildings.js will check this flag on levelth buy
    }
    // TODO: else: popup? Something saying not enough gas. Should also add for buildings.
}