var playTime = parseInt(localStorage.getItem('playTime'));
var totalGas = localStorage.getItem('totalGas');
var clickCount = localStorage.getItem('clickCount');

const timeElement = document.getElementsByClassName("time-spent")[0];
timeElement.innerHTML = "Time spent playing: " + parsePlayTime(playTime);

const clickElement = document.getElementsByClassName("total-clicks")[0];
clickElement.innerHTML = "Total clicks: " + clickCount;

const gasElement = document.getElementsByClassName("total-gas")[0];
gasElement.innerHTML = "Total gas: " + totalGas;


function parsePlayTime( pt ) {
    // importing playTime in ms

    pt = Math.round(pt);

    // days:
    let ptToParse = pt % 86400000;
    var days = Math.round(pt / 86400000);
    if (days == 1){
        days = days + " day ";
    } else if (days > 0) {
        days = days + " days ";
    }

    // hours:
    var hours = Math.round(ptToParse / 3600000);
    ptToParse = ptToParse % 3600000;
    if (hours == 1){
        hours = hours + " hour ";
    } else if (hours > 0) {
        hours = hours + " hours ";
    }

    // minutes:
    var minutes = Math.round(ptToParse / 60000);
    ptToParse = ptToParse % 60000;
    if (minutes == 1){
        minutes = minutes + " minute and ";
    } else if (minutes > 0) {
        minutes = minutes + " minutes and ";
    }

    //seconds:
    var seconds = Math.round(ptToParse / 1000) + " seconds";

    return days + hours + minutes + seconds;
}