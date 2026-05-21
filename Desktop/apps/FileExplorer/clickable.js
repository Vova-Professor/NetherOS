const params = new URLSearchParams(location.search);
const path = params.get('path') || '/';
const items = getFolder(path);
const container = document.getElementById('contents');

const icons = {
    folder: '../../imgs/Folder.png',
    music_folder: '../../imgs/notes.png',
    desktop: '../../imgs/Desktop.png',
    file: '../../imgs/Text.png'
}

if (items.length === 0) {
    container.innerHTML = `<p style="padding: 24px;">This folder is Empty :|</p>`;
}
else {
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'folder';
        div.innerHTML = `
        <div class="name">
            <img src="${item.img || icons[item.icon] || icons.folder}" alt="">
            <span>${item.name}</span>
        </div>
        <span class="size">—</span>
        <span class="date">${item.date}</span>
        `;
        if (item.type === 'folder') {
            div.addEventListener('click', () => {
                const next = path === '/' ? '/' + item.name : path + '/' + item.name;
                window.parent.postMessage({ type: 'navigate', path: next }, '*');
            })
        }
        container.appendChild(div);
    })
}