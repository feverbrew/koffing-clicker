let count = 0;
//let document = "./index.html"

var clicks = document.getElementById('.click-counter');
var cookieClick = document.getElementById('.the-cookie');

cookieClick.addEventListener("click",()=>{
    count++;
    clicks.innerHTML = "Cookie Clicks: "+count;
});