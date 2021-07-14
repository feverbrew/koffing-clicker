
// Grab the settings menu
const menu = document.getElementsByClassName('settings menu')[0]

// Create the settings list
const settingsList = document.createElement('ul');
settingsList.className = "settings-list";

// Create the save game setting
const save = document.createElement('button');
save.className = "setting";
save.innerHTML = 'Save Game';
save.onclick = saveData;

// Auto save feature and setting (on by default) EVERY 5 MINUTES
var autosave = setInterval(saveData, 800000);
const autosaveToggle = document.createElement('button');
autosaveToggle.className = "setting";
autosaveToggle.innerHTML = "Turn off autosave"
autosaveToggle.onclick = toggleAutosave;

// Create the delete save data setting
const wipeStorage = document.createElement('button');
wipeStorage.className = "setting important";
wipeStorage.innerHTML = 'DELETE SAVE DATA';
wipeStorage.onclick = clearLocalStorage;

// Add settings options to the settings list
settingsList.appendChild(save);
settingsList.appendChild(autosaveToggle);
settingsList.appendChild(wipeStorage);

// Make the settings button toggle the settings menu
document.getElementById('open-settings').onclick = function() {
    if (menu.childElementCount > 1){
        menu.removeChild(settingsList);
    } else {
        menu.appendChild(settingsList);
    }
}

function saveData() {
    localStorage.setItem("gasCount", gasCount);
    localStorage.setItem("clickCount", clickCount);
    buildings.forEach( b => {
        localStorage.setItem(b.name+"Count",b.count);
    });
    var savepopup = document.getElementById("snackbar");
    savepopup.className = "show";
    setTimeout(function(){ savepopup.className = savepopup.className.replace("show", "");}, 3000);
}

function clearLocalStorage() {
    if (confirm("Are you sure you want to delete your save data?")){
        localStorage.clear();
        location.reload();
    }
}

function toggleAutosave() {
    if (autosave){
        autosave = clearInterval(autosave);
        autosaveToggle.innerHTML = "Turn on autosave";
    } else {
        autosave = setInterval(saveData, 800000);
        autosaveToggle.innerHTML = "Turn off autosave";
    }
}