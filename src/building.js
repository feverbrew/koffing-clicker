
var koffingCount = localStorage.getItem("koffingCount") || 0;

koffingButton = document.getElementsByClassName("koffings building")[0];

koffingButton.addEventListener('click',incrementKoffings);

for (let i = 0; i < koffingCount; i++) {
    createKoffingSprite()
}

//nextKoffingCost = 10 * Math.pow(2, koffingCount);

function createKoffingSprite() {
    koffingButton.innerText = "Koffings: " + koffingCount + "\nCost: " + (10 * Math.pow(2, koffingCount) ) + " Gas";
    localStorage.setItem("koffingCount", koffingCount);
    const koffingSprite = document.createElement('img');
    koffingSprite.src = `./images/koffing.png`;
    koffingSprite.alt = `Koffing`;
    document.getElementsByClassName("koffings sprite")[0].appendChild(koffingSprite);
}

function incrementKoffings() {
    if (gasCount > (10 * Math.pow(2, koffingCount) ) ) {
        gasCount = gasCount - 10 * Math.pow(2, koffingCount);
        clicks.innerText = "Gas: " + gasCount;
        koffingCount++;
        createKoffingSprite();
    }
}