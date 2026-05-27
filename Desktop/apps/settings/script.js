const tabs = {"wifi": "./tabs/wifi/index.html", "appearance": "./tabs/appearance/index.html"};
const settingsSection = document.querySelector(".sett-sect");

const username = document.getElementById('account-username');
const pfp = document.getElementById('account-pfp');

const account = JSON.parse(localStorage.getItem('current-user-account'));

username.innerText = account.username;
pfp.src = account.pfp;

function changeTab(kind, tabBtn) {
    settingsSection.src = tabs[kind];
    document.querySelectorAll('.settings-menu .tab').forEach(c => c.classList.remove('selected'));
    tabBtn.classList.add("selected");
}