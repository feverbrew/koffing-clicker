let count = 0;

let clicks = document.getElementById('click-counter');
let koffingClick = document.getElementById('the-koffing'); // Some jerk on the internet told me to put a . before the-koffing. They lied.

function incrementCounter() {
    count++
    clicks.innerText = "Gas: " + count;
}