const titleInput = document.getElementById("appTitle");
const imageInput = document.getElementById("imgURL");
const appInput = document.getElementById("appURL");

const iconPreview = document.querySelector('.icon');
const phantom = document.querySelector('.icon img');

const createBtn = document.querySelector('.create-btn');


imageInput.addEventListener('input', () => {
    iconPreview.src = imageInput.value || '';
});

createBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const icon = imageInput.value.trim() || '';
    const link = appInput.value.trim();

    if (!title || !link) {
        alert("Title and link are required!");
        return;
    }

    const apps = JSON.parse(localStorage.getItem('custom-apps') || '[]');
    apps.push({ title, icon, link });
    localStorage.setItem('custom-apps', JSON.stringify(apps));

    apps.push({title, icon, link});

    window.top.postMessage({
        type: 'ADD_APP',
        app: {title, icon, link}
    }, '*');

    titleInput.value = '';
    imageInput.value = '';
    appInput.value = '';
    iconPreview.value = '';
})