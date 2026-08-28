const tabs = {"wifi": "./tabs/wifi/index.html", "appearance": "./tabs/appearance/index.html", "account": "./tabs/account/index.html"};
const settingsSection = document.querySelector(".sett-sect");
const account = JSON.parse(localStorage.getItem('current-user-account'));
const username = document.getElementById('account-username');
const pfp = document.getElementById('account-pfp');

const pfpSrc = account.pfp === "custom-pfp"
    ? localStorage.getItem("custom-pfp")
    : '../../../imgs/_USR_PFP/phantom.png';

pfp.src = pfpSrc || "../../imgs/_USR_PFP/pfp.jpg";

username.innerText = account.username;

function changeTab(kind, element) {
    settingsSection.src = tabs[kind];
    document.querySelectorAll('.settings-menu .menu-item').forEach(c => c.classList.remove('selected'));
    element.classList.add("selected");
}