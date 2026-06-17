const form = document.querySelector("form");
const pfpInput = document.getElementById("custom-pfp-input");
const pfpPicker = document.getElementById("pfp-picker");


pfpPicker.addEventListener('click', () => pfpInput.click());

if (localStorage.getItem("system-account")) {
    window.location.href = './LockScreen/index.html'
}

if (!sessionStorage.getItem("booted")) {
    window.location.href = "./Boot/index.html";
}

async function hashPin(pin) {
    const enc = new TextEncoder();
    const data = enc.encode(pin);
    const hashBuff = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuff));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}


pfpInput.addEventListener('change', () => {
    const file = pfpInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const dataUrl = e.target.result;

        console.log("Size:", dataUrl.length);

        try {
            localStorage.setItem("custom-pfp", dataUrl);
            console.log("Saved successfully");
        } catch (err) {
            console.error("Storage failed:", err);
        }

        pfpPicker.style.backgroundImage = `url(${dataUrl})`;
    };

    reader.readAsDataURL(file);
})


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const r_pin = document.getElementById("re-pin").value.trim();

    if (!username && !pin && !r_pin) {
        alert("Please fill all gaps!")
        return;
    }

    if (pin !== r_pin) {
        alert("Pins doesn't match");
        return;
    }

    const hPin = await hashPin(pin);

    const account = {
        username,
        pin: hPin,
        pfp: localStorage.getItem("custom-pfp") ? "custom-pfp" : null,
        createdAt: new Date().toISOString()
    }

    localStorage.setItem("system-account", JSON.stringify(account));
    localStorage.setItem("current-user-account", JSON.stringify(account));

    window.location.href = "./LockScreen/index.html";

})