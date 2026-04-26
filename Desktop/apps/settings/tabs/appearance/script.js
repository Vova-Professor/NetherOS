let wallpaper_settings = document.querySelector('.preview-screen');
let selectedColorElement;
let selectedImageElement;

let appearances = {"light-white": ['#ffffff68', '#f0efef'], "dark-black": ['#2f2e3368', '#1b1b1b'], "light-pink": ['#ff8afd68', '#ae3488'], "peaceful-green": ['#8cff8a68', '#8cff8a'], "normal-tomato": ['#ff8a8a68', '#ff8a8a']};

const customContainer = document.getElementById('custom-bg-container');
const customInput = document.getElementById('custom-bg-input');
const customPreview = document.getElementById('custom-bg-preview');

function saveStyle() {
    localStorage.setItem('Settings-Appearance', JSON.stringify({
        selected_wallpaper: selectedImageElement?.src,
        selected_color: selectedColorElement?.dataset.stylecolor,
        custom_bg_active: selectedImageElement === customPreview
    }));
}

function loadStyle() {
    const saved = JSON.parse(localStorage.getItem('Settings-Appearance'));
    if (!saved) return;

    if (saved.custom_bg_active) {
        const savedCustomBg = localStorage.getItem('customBg');
        if (savedCustomBg) {
            customPreview.style.backgroundImage = `url(${savedCustomBg})`;
            customPreview.style.backgroundSize = 'cover';
            customPreview.style.backgroundPosition = 'center';
            document.getElementById('custom-placeholder').style.display = 'none';
            selectedImageElement = customPreview;
            setWallpaper(savedCustomBg, customPreview);
        }
    }

    else if (saved.selected_wallpaper) {
        const imgEl = [...document.querySelectorAll('.bg-container img:not(#custom-placeholder)')]
            .find(img => img.src === saved.selected_wallpaper);
        if (imgEl) {
            selectedImageElement = imgEl;
            setWallpaper(saved.selected_wallpaper, imgEl);
        }
    }

    if (saved.selected_color) {
        const colorEl = document.querySelector(`.color[data-stylecolor="${saved.selected_color}"]`);
        if (colorEl) {
            selectedColorElement = colorEl;
            setAppearance(saved.selected_color, colorEl);
        }
    }
}

loadStyle()

function setWallpaper(path, img) {
    let selected_wallpaper = document.querySelector('.bg-container .selected');
    if (selected_wallpaper) {
        selected_wallpaper.classList.remove('selected');
    }
    wallpaper_settings.style.backgroundImage = `url(${path})`;
    img.classList.add('selected');

    window.top.postMessage({
        type: "SET_WALLPAPER",
        path: path
    }, "*");

    localStorage.setItem("wallpaper", path);
}

function setAppearance(colorName, element) {
    let taskbar = wallpaper_settings.querySelector(".taskbar-group .taskbar");
    let timeWrap = wallpaper_settings.querySelector(".taskbar-group .time-wrap");
    let apps = wallpaper_settings.querySelectorAll(".app");

    document.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');

    

    taskbar.style.backgroundColor = appearances[colorName][0];
    timeWrap.style.backgroundColor = appearances[colorName][0];

    apps.forEach(app => {
        app.style.backgroundColor = appearances[colorName][1];
    });

    localStorage.setItem('accentStyle', colorName);

    window.top.postMessage({
        type: "SET_STYLE",
        style: colorName
    }, "*");
}


document.querySelectorAll('.bg-container img:not(#custom-placeholder)').forEach(img => {
    img.addEventListener('click', () => {
        selectedImageElement = img;
        setWallpaper(img.src, img);
        saveStyle()
    })
})

document.querySelectorAll('.color').forEach(el => {
    el.addEventListener('click', () => {
        styleName = el.dataset.stylecolor;
        selectedColorElement = el;

        const colorName = styleName;
        setAppearance(colorName, el);
        saveStyle();
    });
    
});

customContainer.addEventListener('click', () => {
    customInput.click();
});

customInput.addEventListener('change', () => {
    const file = customInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;

        customPreview.style.backgroundImage = `url(${dataUrl})`;
        customPreview.style.backgroundSize = 'cover';
        customPreview.style.backgroundPosition = 'center';

        document.getElementById('custom-placeholder').style.display = 'none';

        selectedImageElement = customPreview;
        setWallpaper(dataUrl, customPreview);
        wallpaper_settings.style.backgroundImage = `url(${dataUrl})`;

        localStorage.setItem('customBg', dataUrl);
        saveStyle();
    }
    reader.readAsDataURL(file);
})

const savedCustomBg = localStorage.getItem('customBg');
if (savedCustomBg) {
    customPreview.style.backgroundImage = `url(${savedCustomBg})`;
    customPreview.style.backgroundSize = 'cover';
    customPreview.style.backgroundPosition = 'center';
    document.getElementById('custom-placeholder').style.display = 'none';
}

const saved = localStorage.getItem("accentStyle");
if (saved) document.documentElement.style.setProperty('--accent', saved);