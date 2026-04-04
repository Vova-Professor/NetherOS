const tabs = {"wifi": "./tabs/wifi/index.html", "appearance": "./tabs/appearance/index.html"};
const settingsSection = document.querySelector(".sett-sect");


function changeTab(kind, tabBtn) {
    settingsSection.src = tabs[kind];
    document.querySelectorAll('.settings-menu .tab').forEach(c => c.classList.remove('selected'));
    tabBtn.classList.add("selected");
}