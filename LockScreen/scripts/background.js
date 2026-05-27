const orLink = document.getElementById("cprght");
const body = document.body;
window.timescreen = document.getElementById("time-screen");

const backgrounds = [
    {
        image: "_WP_FRST.png",
        link: "https://wall.alphacoders.com/big.php?i=1268150"
    },
    {
        image: "_WP_END.jpg",
        link: "https://wallpapercave.com/w/wp8368519"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    orLink.href = random.link;
    body.style.backgroundImage = `url('../../imgs/_BGS/${random.image}')`;

    timescreen.style.backgroundImage = `url('/imgs/_BGS/${random.image}')`;
    setTimeout(() => {
        timescreen.classList.add("active");
    }, 200);
});