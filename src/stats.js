import { playTime, clickCount, totalGas } from './koffing.js';

const timeElement = document.getElementsByClassName("time-spent")[0];
timeElement.innerHTML = "Time spent playing: " + parsePlayTime(playTime);

const clickElement = document.getElementsByClassName("total-clicks")[0];
clickElement.innerHTML = "Total clicks: " + clickCount;

const gasElement = document.getElementsByClassName("total-gas")[0];
gasElement.innerHTML = "Total gas: " + totalGas;


function parsePlayTime( pt ) {
    // importing playTime in ms

    // days:
    let ptToParse = pt % 86400000;
    var days = pt / 86400000;
    if (days > 0) {
        days = days + " days ";
    }

    // hours:
    ptToParse = pt % 3600000;
    var hours = pt / 3600000;
    if (hours > 0) {
        hours = hours + " hours ";
    }

    // minutes:
    ptToParse = pt % 60000;
    var minutes = pt / 60000;
    if (minutes > 0) {
        minutes = minutes + " minutes and ";
    }

    //seconds:
    var seconds = pt / 1000 + " seconds";

    return days + hours + minutes + seconds;
}