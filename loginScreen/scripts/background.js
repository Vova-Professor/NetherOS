const orLink = document.getElementById("cprght");
const loginPage = document.getElementById("login-page");

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
    timescreen.style.backgroundImage = `url('./imgs/_BGS/${random.image}')`;
    loginPage.querySelector(".bg").style.backgroundImage = `url('./imgs/_BGS/${random.image}')`;
    orLink.href = random.link;

    setTimeout(() => {
        timescreen.classList.add("active");
    }, 200);

    
})