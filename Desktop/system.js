let colorName;
let bgImage;
const account = JSON.parse(localStorage.getItem("current-user-account"));

if (!account) {
    window.location.href = "../index.html";
    throw new Error("No account");
}


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
    const src = image === "custom-wallpaper"
        ? localStorage.getItem("custom-wallpaper")
        : image;
    document.body.style.backgroundImage = `url(${src})`;
}

function addCustomApp(title, icon, link) {
    const custom = JSON.parse(localStorage.getItem('custom-apps') || '[]');
    if (custom.find(a => a.title === title)) return;
    custom.push({title, icon, link});
    localStorage.setItem('custom-apps', JSON.stringify(custom));
}

window.addEventListener("message", (event) => {
    if (event.data.type === "SET_WALLPAPER") {
        const path = event.data.path;
        
        if (path.startsWith("data:")) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX = 1280;
                const scale = Math.min(1, MAX / Math.max(img.width, img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressed = canvas.toDataURL('image/jpeg', 0.7);
                localStorage.setItem("custom-wallpaper", compressed);
                bgImage = "custom-wallpaper";
                changeBG(bgImage);
                saveStyle();
            };
            img.src = path;
        } else {
            bgImage = path;
            changeBG(bgImage);
            saveStyle();
        }
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