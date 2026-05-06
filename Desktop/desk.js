let processes = [];
const powerFind = document.querySelector('.power-find');
const powerFindWrap = document.querySelector('.power-find-wrap');
const powerFindSearch = document.getElementById('search-power');
const showArea = document.querySelector('.show');

let isPowerPowered = false;


const builtinApps = [
        { title: 'Solid Browser', aliases: ['browser', 'solid', 'web', 'internet'], icon: './imgs/APPS/AppIcons/Solid.png', path: './apps/solid_browser/SolidBrowser/index.html' },
        { title: 'CraftCode', aliases: ['browser', 'solid', 'web', 'internet'], icon: './imgs/APPS/AppIcons/cr.png', path: './apps/CraftCode/index.html' },
        { title: 'Settings', aliases: ['browser', 'solid', 'web', 'internet'], icon: './imgs/APPS/AppIcons/cb.png', path: './apps/settings/index.html' },
        { title: 'Sandbox Enviroment', aliases: ['sandbox', 'virtual', 'machine', 'isolated'], icon: './imgs/Boot/pd.png', path: '../index.html' },
        { title: 'Palm Clicker', aliases: ['palm', 'clicker', 'mouse', 'beach'], icon: 'https://raw.githubusercontent.com/Vova-Professor/Palm-Clicker/refs/heads/main/imgs/palm01.png', path: 'https://vova-professor.github.io/Palm-Clicker/' },
        { title: 'App Injector', aliases: ['inject', 'app', 'new', 'game'], icon: './apps/settings/imgs/beacon.png', path: './apps/custom_app/index.html' }
];

function getApps() {
    const custom = JSON.parse(localStorage.getItem('custom-apps') || '[]');
    return [...builtinApps, ...custom.map(a => ({
        title: a.title,
        aliases: [a.title.toLowerCase()],
        icon: a.icon,
        path: a.link
    }))]
}

document.addEventListener('DOMContentLoaded', () => {
    let boot = document.querySelector(".boot");
    const MAX = 11;
    const MIN = 5;
    const TIMEOUT = (Math.floor(Math.random() * (MAX - MIN)) + MIN) * 1000;
    boot.classList.add("active");

    setTimeout(() => {
        let opacity = 1;
        const fade = setInterval(() => {
        opacity -= 0.05;
        boot.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fade);
            boot.classList.remove("active");
            document.querySelector(".taskbar-group").classList.add('ready');
            pushMessage("Welcome!", "You will soon meet your AI assistant.", "./imgs/system/ender_pearl.png", "System", "./imgs/system/ender_pearl.png")
        }
    }, 30);
    }, TIMEOUT);

    
})

function pushMessage(title, msg, img, app, app_icon) {
    const messageWrap = document.createElement('article');
    messageWrap.classList.add('message-box');

    messageWrap.innerHTML = `
        <section class="title-bar">
            <img src="${app_icon}" class="app-icon">
            <h3>${app}</h3>
        </section>
        <section class="content">
            <section class="img-sect">
                <img src="${img}" alt="">
            </section>

            <section class="text-sect">
                <div class="title-area">
                    <h2>${title}</h2>
                </div>
                <div class="text-area">
                    <p>${msg}</p>
                </div>
                
            </section>
        </section>
    `

    document.querySelector('.working-area').appendChild(messageWrap);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            messageWrap.classList.add('sent');
        });
    });

    setTimeout(() => {
        messageWrap.classList.remove('sent');
        setTimeout(() => messageWrap.remove(), 300);
    }, 4000);


}

showArea.addEventListener('mouseenter', () => {
    document.querySelector('.taskbar-group').classList.remove('hidden');
});

document.querySelector('.taskbar-group').addEventListener('mouseleave', () => {
    const anyMaximized = document.querySelector('.window.maximized');
    if (anyMaximized) {
        document.querySelector('.taskbar-group').classList.add('hidden');
    }
});


function openApp(path, title, iconPath, appEl) {
    if (processes.some(p => p.title === title)) return;
    const win = document.createElement('div');
    win.classList.add('window');
    win.classList.add('opening');
    document.querySelector('.working-area').appendChild(win);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            win.classList.remove('opening');
        })
    })

    if (appEl) appEl.classList.add("active");

    win.innerHTML = `
    <div class="windows-titlebar">
        <div class="info">
            <img src="${iconPath}" class="window-icon ${title}">
            <span>${title}</span>
        </div>
        
        <div class="btns">
            <button onclick="minimizeApp(this)" style="background-color: green"></button>
            <button onclick="maximizeApp(this)" style="background-color: orange"></button>
            <button onclick="closeApp(this, '${title}')" style="background-color: red"></button>
        </div>
    </div>
    <iframe src="${path}" frameborder="0"></iframe>
    `
    processes.push({ title, appEl, win, minimized: false });
    dragRight(win);
}

document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        openApp('../index.html', 'Sandbox Enviroment', './imgs/Boot/pd.png', null);
    }
    if (e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        isPowerPowered = !isPowerPowered;

        if (isPowerPowered) {
            powerFindWrap.classList.add('powered');
            powerFindSearch?.focus();
        }
        else {
            powerFindWrap.classList.remove('powered');
        }
    }
})

function maximizeApp(btn) {
    const win = btn.closest('.window');
    const isMaximized = win.classList.contains('maximized');
    const taskbar = window.parent.document.querySelector('.taskbar-group');

    if (isMaximized) {
        win.classList.remove('maximized');
        taskbar.classList.remove('hidden');
    }
    else {
        win.classList.add('maximized');
        taskbar.classList.add('hidden');
    }
}

function minimizeApp(btn) {
    const win = btn.closest('.window');
    const process = processes.find(p => p.win === win);
    if (!process) return;

    win.classList.add('opening');

    setTimeout(() => {
        win.style.display = 'none';
        process.minimized = true;
        if (process.appEl) process.appEl.classList.add('minimized');
    }, 300);
}


function closeApp(btn, title) {
    const win = btn.closest('.window');
    win.classList.add('opening');
    setTimeout(() => {
        win.remove();
        let process = processes.find(p => p.title === title);
        if (process?.appEl) process.appEl.classList.remove('active');
        processes = processes.filter(p => p.title !== title);
    }, 300);
}


function restoreApp(title) {
    const process = processes.find(p => p.title === title);

    if (!process || !process.minimized) return;

    process.win.style.display = 'block';
    process.win.classList.add('opening');
    setTimeout(() => process.win.classList.remove('opening'), 300);

    process.minimized = false;
    if (process.appEl) process.appEl.classList.remove('minimized');
}


function dragRight(win) {
    const titlebar = win.querySelector('.windows-titlebar');
    let offsetX = 0, offsetY = 0, startX = 0, startY = 0;

    titlebar.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        offsetX = win.offsetLeft;
        offsetY = win.offsetTop;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        win.style.left = offsetX + dx + 'px';
        win.style.top = offsetY + dy + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

document.querySelectorAll('.app').forEach(app => {
    app.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.app').forEach(other => {
            const rect = other.getBoundingClientRect();
            const centery = rect.top + rect.height / 2;

            const distance = Math.abs(e.clientY - centery);
            const maxDist = 120;

            const scale = distance < maxDist ? 1 + (1 - distance / maxDist) * 0.8 : 1;

            const translateX = distance < maxDist ? (1 - distance / maxDist) * 18 : 0;
            const extraMargin = distance < maxDist ? (1 - distance / maxDist) * 15 : 0;

            other.style.transform = `translateX(${translateX}px) scale(${scale})`;
            other.style.marginTop = `${extraMargin}px`;
            other.style.marginBottom = `${extraMargin}px`;
        })
    })

    app.addEventListener('click', () => {
        const process = processes.find(p => p.appEl === app);
        if (!process) return;
    
        if (process.minimized) {
            process.win.style.display = 'block';
            process.minimized = false;
            app.classList.remove('minimized');
        }
    })
})

document.querySelector('.taskbar').addEventListener('mouseleave', () => {
    document.querySelectorAll('.app').forEach(app => {
        app.style.transform = 'translateX(0) scale(1)';
        app.style.marginTop = '0';
        app.style.marginBottom = '0';
    })
})


document.querySelectorAll('.app, .app-desktop').forEach(app => {
    const label = app.closest('[data-title]')?.dataset.title || app.closest('.app-wrap')?.querySelector('span')?.textContent;

    app.addEventListener('mouseenter', () => {
        document.querySelector('.action').classList.add('active');
        document.querySelector('.action h2').textContent = label;
    });

    app.addEventListener('mouseleave', () => {
        document.querySelector('.action').classList.remove('active');
        document.querySelector('.action h2').textContent = '';
    })
})

powerFindSearch.addEventListener('input', () => {
    const query = powerFindSearch.value.toLowerCase().trim();
    const list = document.querySelector('.power-find-wrap .list');

    const apps = getApps();

    if (!query) {
        list.innerHTML = '';
        return;
    }

    const results = apps.filter(app => 
        app.title.toLowerCase().includes(query) || app.aliases.some(a => a.includes(query))
    );


    list.innerHTML = results.map(app => `
        <div class="find-result" onclick="openApp('${app.path}', '${app.title}', '${app.icon}', document.querySelector('[data-title=\\'${app.title}\\']'))">
            <img src="${app.icon}" class="find-result-icon">
            <span>${app.title}</span>
        </div>
    `).join('');
});
