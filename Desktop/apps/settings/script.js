const tabs = {"wifi": "./tabs/wifi/index.html", "appearance": "./tabs/appearance/index.html"};
const settingsSection = document.querySelector(".sett-sect");
const account = JSON.parse(localStorage.getItem('current-user-account'));
const username = document.getElementById('account-username');
const pfp = document.getElementById('account-pfp');

const pfpSrc = account.pfp === "custom-pfp"
    ? localStorage.getItem("custom-pfp")
    : '../../../imgs/_USR_PFP/phantom.png';

pfp.src = pfpSrc || "../../imgs/_USR_PFP/pfp.jpg";

username.innerText = account.username;

function changeTab(kind, tabBtn) {
    settingsSection.src = tabs[kind];
    document.querySelectorAll('.settings-menu .tab').forEach(c => c.classList.remove('selected'));
    tabBtn.classList.add("selected");
}