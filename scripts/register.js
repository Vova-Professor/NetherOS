const form = document.querySelector("form");
const pfpInput = document.getElementById("custom-pfp-input");
const pfpPicker = document.getElementById("pfp-picker");
const phantomImage = document.getElementById("phantom");


pfpPicker.addEventListener('click', () => pfpInput.click());

if (localStorage.getItem("system-account")) {
    window.location.href = './LockScreen/index.html'
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

        phantomImage.style.display = "none";
        pfpPicker.style.backgroundImage = `url(${dataUrl})`;
    };

    reader.readAsDataURL(file);
})


form.addEventListener('submit', (e) => {
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

    const account = {
        username,
        pin,
        pfp: localStorage.getItem("custom-pfp") ? "custom-pfp" : null,
        createdAt: new Date().toISOString()
    }

    localStorage.setItem("system-account", JSON.stringify(account));
    localStorage.setItem("current-user-account", JSON.stringify(account));

    window.location.href = "./LockScreen/index.html";

})