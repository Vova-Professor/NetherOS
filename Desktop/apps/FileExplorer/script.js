const tabs = document.querySelectorAll('.tab-sect');
const iframe = document.querySelector('iframe');

const tabPaths = {
    'Home': '/',
    'Vova-Professor': '/Vova-Professor',
    'Desktop': '/Desktop',
    'Trash': '/Trash',
    'Disk A': '/DiskA'
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector('.tab-sect.selected')?.classList.remove('selected');
        tab.classList.add('selected');
        const name = tab.querySelector('span').textContent.trim();
        const path = tabPaths[name];
        if (path) iframe.src = `./stuff/home/index.html?path=${encodeURIComponent(path)}`;
    });
});

window.addEventListener('message', (e) => {
    if (e.data?.type === 'navigate') {
        iframe.src = `./stuff/home/index.html?path=${encodeURIComponent(e.data.path)}`;
    }
})