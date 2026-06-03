const body = document.body;
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
    body.style.backgroundImage = `url('/NetherOS/imgs/_BGS/${random.image}')`;
})