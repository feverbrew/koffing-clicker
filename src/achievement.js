
// Achievement class
class Achievement {
    constructor(name, text, checkfunction, special = null, isAchieved = 0) {
        this.name = name;
        this.text = text;
        this.checkfunction = checkfunction;
        this.special = special;
        this.isAchieved = parseInt(localStorage.getItem(this.name));
    }
    achieve() {
        if (!this.isAchieved && this.checkfunction()){
            this.isAchieved = true;
            achievementPopup(this.name,this.text);
            if (this.special){
                this.special()
            }
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
    new Achievement("1st Building", "You bought a building!",
        function() {
            return buildings.some( b => {
                return b.count > 0;
            });
        }),
    new Achievement("1st Upgrade", "You bought an upgrade!",
        function() {
            return boughtUpgrades.length > 0
        })
];

function checkAchievements() {
    achievements.forEach( ach => {
        if (ach.achieve()) {
            localStorage.setItem(ach.name, 1);
        }
        //console.log(ach.isAchieved);
    })
}

const achievementTimer = setInterval(checkAchievements, 500);


function achievementPopup(name,text) {
    popup = document.createElement('span');
    popup.className = "achievement marquee" + name;
    popup.innerText = "Achievement Unlocked: " + text;
    document.getElementsByClassName("achievements")[0].appendChild(popup);
    setTimeout(function(){document.getElementsByClassName("achievements")[0].removeChild(popup)} , 15000)
}
