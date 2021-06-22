let gasCount = localStorage.getItem("gasCount") || 0;

let clicks = document.getElementById('click-counter');
let koffingClick = document.getElementById('the-koffing'); // Some jerk on the internet told me to put a . before the-koffing. They lied.

clicks.innerText = "Gas: " + gasCount;

function incrementCounter() {
    gasCount++
    clicks.innerText = "Gas: " + gasCount;
    localStorage.setItem("gasCount", gasCount);
}