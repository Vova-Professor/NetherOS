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
    document.documentElement.setAttribute('data-theme', colorName);
}

function changeBG(image) {
    document.body.style.backgroundImage = `url(${image})`;
}

function addCustomApp(title, icon, link) {
    const custom = JSON.parse(localStorage.getItem('custom-apps') || '[]');
    if (custom.find(a => a.title === title)) return;
    custom.push({title, icon, link});
    localStorage.setItem('custom-apps', JSON.stringify(custom));
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
    else if (event.data.type === "ADD_APP") {
        const {title, icon, link} = event.data.app;
        addCustomApp(title, icon, link);
        setTimeout(() => location.reload(), 300);
    }
    else if (event.data.type === "LOGOUT") {
        location.href = "../index.html"
    }
})