let pin = document.getElementById("pin");
let err_txt = document.getElementById("err-txt");
let superSecret = "0657";


function forg() {
    err_txt.style.color = '#fff';
    err_txt.textContent = "Use your web skills. Maybe you can find it in login.js?"
}

pin.addEventListener("input", () => {
    const value = pin.value;

    err_txt.textContent = "";

    if (value.length === superSecret.length) {
        if (value === superSecret) {
            window.location.href = "./Desktop/index.html";
        }
        else {
            err_txt.textContent = "Wrong PIN!";
            pin.value = "";
        }
    }
})