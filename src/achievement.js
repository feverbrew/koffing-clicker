import { clickCount, gasCount } from './koffing';
import { buildings } from "./building";

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

// Initialize the achievements
const achievements = [
    new Achievement("100 Clicks", "You clicked Koffing 100 times!", 
        function() {
            return clickCount >= 100;
        }),
    new Achievement("1000 Gas", "You made 1000 gas!",
        function() {
            return gasCount >= 1000;
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
        }),
    new Achievement("10th Building", "You bought your 10th building!",
        function() {
            let c = 0;
            buildings.forEach( b => {
                c += b.count;
            });
            return c >= 10;
        }),
    new Achievement("10,000 Gas", "You made 10,000 Gas!",
        function() {
            return gasCount > 10000;
        }),
    new Achievement("One of Each", "Gotta catch 'em all",
        function(){
            return buildings.every( b => {
                return b.count > 0;
            });
        })
];

// Check achievements at a half second interval
function checkAchievements() {
    achievements.forEach( ach => {
        if (ach.achieve()) {
            localStorage.setItem(ach.name, 1);
        }
    })
}
const achievementTimer = setInterval(checkAchievements, 500);

// Activates the achievement marquee with the achievement info
// Marquee is removed once the animation finishes
function achievementPopup(name,text) {
    const popup = document.createElement('span');
    popup.className = "achievement marquee" + name;
    popup.innerText = "Achievement Unlocked: " + text;
    let marqueeLine = document.getElementsByClassName("achievements")[0];
    marqueeLine.appendChild(popup);
    setTimeout(function(){marqueeLine.removeChild(popup)} , 15000)
}
