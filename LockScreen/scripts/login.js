let pin = document.getElementById("pin");
let err_txt = document.getElementById("err-txt");
const username = document.getElementById("username");
const userPfp = document.getElementById("user-pfp");
const account = JSON.parse(localStorage.getItem("current-user-account"));

if (!account) {
    window.location.href = "../index.html";
    throw new Error("No account");
}

if (!sessionStorage.getItem("booted")) {
    window.location.href = "../boot/index.html";
}

const superSecret = account.pin;

username.innerText = account.username;
const pfpSrc = account.pfp === "custom-pfp"
    ? localStorage.getItem("custom-pfp")
    : '../imgs/_USR_PFP/phantom.png';
    
userPfp.src = pfpSrc || "../../imgs/_USR_PFP/pfp.jpg";

function forg() {
    err_txt.style.color = '#fff';
    err_txt.textContent = "You should clear site localStorage..."
}

pin.addEventListener("input", async () => {
    const value = pin.value;

    const hValue = await hashPin(value);

    err_txt.textContent = "";

    if (value.length === 4) {
        if (hValue === superSecret) {
            window.location.href = "../Desktop/index.html";
        }
        else {
            err_txt.textContent = "Wrong PIN!";
            pin.value = "";
        }
    }
})


async function hashPin(pin) {
    const enc = new TextEncoder();
    const data = enc.encode(pin);
    const hashBuff = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuff));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
