let appearances = {"light-white": ['#ffffff68', '#f0efef'], "dark-black": ['#2f2e3368', '#1b1b1b'], "light-pink": ['#ff8afd68', '#ae3488'], "peaceful-green": ['#8cff8a68', '#8cff8a'], "normal-tomato": ['#ff8a8a68', '#ff8a8a']};
let colorName;
let bgImage;


function saveStyle() {
    localStorage.setItem('Appearance', JSON.stringify({
        styleName: colorName,
        background: bgImage
    }))
}

function loadStyle() {
    const saved = JSON.parse(localStorage.getItem('Appearance'));

    if (!saved) return;
    changeAppearance(saved.styleName);
    changeBG(saved.background);

}

loadStyle();

function changeAppearance(colorName) {
    document.querySelector(".taskbar").style.backgroundColor = appearances[colorName][0];
    document.querySelector(".time-wrap").style.backgroundColor = appearances[colorName][0];

    document.querySelector(".action").style.backgroundColor = appearances[colorName][0];

    const apps = document.querySelectorAll(".taskbar .app");
    
    apps.forEach(app => {
        app.style.backgroundColor = appearances[colorName][1];
    });
}

function changeBG(image) {
    document.body.style.backgroundImage = `url(${image})`;
}

window.addEventListener("message", (event) => {
    if (event.data.type === "SET_WALLPAPER") {
        bgImage = event.data.path;
        changeBG(bgImage);
        saveStyle();
    }
    else if (event.data.type === "SET_STYLE") {
        colorName = event.data.style;
        changeAppearance(colorName);
        saveStyle();
    }
})