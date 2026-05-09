const timescreen = document.getElementById("time-screen");
let startY = 0;
let currentY = 0;
let isDragging = false;
const threshold = 150;
const res = 0.4;

timescreen.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startY = e.clientY;
    timescreen.style.transition = "none";
});

document.addEventListener("keydown", (e) => {
    
    if (e.code == "Space") {
        e.preventDefault();
        timescreen.style.transition = "transform 0.35s cubic-bezier(0.22, 0.8, 0.35, 1)";
        timescreen.style.transform = `translate3d(0, -100%, 0)`;

        loginPage.classList.add('active');
    }
})


document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    currentY = e.clientY;
    const delta = (currentY - startY) * res;

    if (delta < 0) {
        timescreen.style.transform = `translate3d(0, ${delta}px, 0)`;
    }
})

document.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;

    const rdelta = currentY - startY;
    const perMoved = Math.abs(rdelta) / window.innerHeight;

    timescreen.style.transition = "transform 0.35s cubic-bezier(0.22, 0.8, 0.35, 1)";

    if (rdelta < 0 && perMoved > 0.35) {
        timescreen.style.transform = `translate3d(0, -100%, 0)`;
        loginPage.classList.add("active");
    } else {
        timescreen.style.transform = `translate3d(0, 0, 0)`;
    }
})