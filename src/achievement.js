
// Achievement class
class Achievement {
    constructor(name, text, checkfunction, isAchieved = false) {
        this.name = name;
        this.text = text;
        this.checkfunction = checkfunction;
        this.isAchieved = localStorage.getItem(this.name);
    }
    achieve() {
        if (this.isAchieved === false && this.checkfunction()){
            this.isAchieved = true;
            achievementPopup(this.name,this.text);
            return true;
        }
    }
}

const achievements = [
    new Achievement("100 Clicks", "You clicked 100 times!", 
        function() {
            return clickCount > 100;
        }),
    new Achievement("1000 Gas", "You've made 1000 gas!",
        function() {
            return gasCount > 1000;
        }),
    new Achievement("1st Koffing", "You bought a Koffing!",
        function() {
            return localStorage.getItem("KoffingsCount") > 0;
        }),
    new Achievement("1st Upgrade", "You bought an upgrade!",
        function() {
            return boughtUpgrades.length > 0
        })
];

function checkAchievements() {
    achievements.forEach( ach => {
        if (ach.achieve()) {
            localStorage.setItem(ach.name, true);
        }
    })
}

const achievementTimer = window.setInterval(checkAchievements, 500);


function achievementPopup(name,text) {
    popup = document.createElement('span');
    popup.className = "achievement marquee" + name;
    popup.innerText = "Achievement Unlocked: " + text;
    document.getElementsByClassName("achievements")[0].appendChild(popup);
    setTimeout(function(){document.getElementsByClassName("achievements")[0].removeChild(popup)} , 15000)
}
