let pin = document.getElementById("pin");
let err_txt = document.getElementById("err-txt");
const username = document.getElementById("username");
const userPfp = document.getElementById("user-pfp");
const account = JSON.parse(localStorage.getItem("current-user-account"));

if (!account) {
    window.location.href = "../index.html";
    throw new Error("No account");
}

const superSecret = account.pin;

username.innerText = account.username;
const pfpSrc = account.pfp === "custom-pfp"
    ? localStorage.getItem("custom-pfp")
    : account.pfp;
    
userPfp.src = pfpSrc || "../../imgs/_USR_PFP/pfp.jpg";

function forg() {
    err_txt.style.color = '#fff';
    err_txt.textContent = "You should clear site localStorage..."
}

pin.addEventListener("input", () => {
    const value = pin.value;

    err_txt.textContent = "";

    if (value.length === superSecret.length) {
        if (value === superSecret) {
            window.location.href = "../Desktop/index.html";
        }
        else {
            err_txt.textContent = "Wrong PIN!";
            pin.value = "";
        }
    }
})