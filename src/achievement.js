
achievements = [];
initClickHandling();

class Achievement {
    constructor(name, text, checkfunction) {
        this.name = name;
        this.text = text;
        this.checkfunction = checkfunction;
    }
}

function initClickHandling() {
    var numClicks = 0;
    achievements.push(new Achievement(
        "100 Clicks",
        "You clicked 100 times!",
        function() {
            return numClicks > 10
        })
    );

    window.onclick = function() {
        numClicks++;
    }
}

var achievementTimer = setInterval(
    achievements.forEach(function(achievement) {
        if (achievement.checkfunction()) {
            console.log(achievement.name);
        }
    }), 
    1000
);
