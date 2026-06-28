let processes = [];
const powerFind = document.querySelector('.power-find');
const powerFindWrap = document.querySelector('.power-find-wrap');
const powerFindSearch = document.getElementById('search-power');
const showArea = document.querySelector('.show');

let isPowerPowered = false;
let zCount = 10;
let selectedIndex = -1;


const builtinApps = [
        { title: 'Solid Browser', aliases: ['browser', 'solid', 'web', 'internet'], icon: './imgs/APPS/AppIcons/Solid.png', path: './apps/solid_browser/SolidBrowser/index.html' },
        { title: 'CraftCode', aliases: ['browser', 'solid', 'web', 'internet'], icon: './imgs/APPS/AppIcons/cr.png', path: './apps/CraftCode/index.html' },
        { title: 'Settings', aliases: ['browser', 'solid', 'web', 'internet'], icon: './imgs/APPS/AppIcons/cb.png', path: './apps/settings/index.html' },
        { title: 'Sandbox Environment', aliases: ['sandbox', 'virtual', 'machine', 'isolated'], icon: './imgs/Boot/pd.png', path: '../index.html' },
        { title: 'Palm Clicker', aliases: ['palm', 'clicker', 'mouse', 'beach'], icon: 'https://raw.githubusercontent.com/Vova-Professor/Palm-Clicker/refs/heads/main/imgs/palm01.png', path: 'https://vova-professor.github.io/Palm-Clicker/' },
        { title: 'App Injector', aliases: ['inject', 'app', 'new', 'game'], icon: './apps/settings/imgs/beacon.png', path: './apps/custom_app/index.html' },
        { title: 'CraftShell', aliases: ['console', 'craftshell', 'shell', 'terminal'], icon: './apps/terminal/imgs/console.jpg', path: './apps/terminal/index.html' },
        { title: 'File Explorer', aliases: ['files', 'explorer', 'folders', 'chest'], icon: './apps/FileExplorer/imgs/Folder.png', path: './apps/FileExplorer/index.html' }
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
    boot.classList.add("active");
    const ran = Math.floor(Math.random() * 5) + 1;;
    const pickaxe = document.getElementById('boot-pickaxe');

    pickaxe.style.setProperty('--pickaxe-rot-times', ran);

    pickaxe.addEventListener('animationend', () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                pickaxe.classList.add('unblock');
            });
        });
        pickaxe.addEventListener('click', () => {
            pickaxe.classList.remove('unblock');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    pickaxe.classList.add('clicked');
                });
            });
            if (localStorage.getItem('sounds-enabled') !== 'false') {
                new Audio('./audio/boot.wav').play().catch(() => {});
            }

            const TIMEOUT = 1000;

            setTimeout(() => {
                let opacity = 1;
                const fade = setInterval(() => {
                    opacity -= 0.05;
                    boot.style.opacity = opacity;
                    if (opacity <= 0) {
                        clearInterval(fade);
                        boot.classList.remove("active");
                        document.querySelector(".taskbar-group").classList.add('ready');
                        pushMessage("Welcome!", "Look around! You can code here, set your custom wallpaper!", "./imgs/system/ender_pearl.png", "System", "./imgs/system/ender_pearl.png");
                    }
                }, 30);
            }, TIMEOUT);

        }, { once: true });
    }, { once: true });
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
    <div class="tl"></div>
    <div class="tr"></div>
    <div class="bl"></div>
    <div class="br"></div>
    `
    if (localStorage.getItem('sounds-enabled') !== 'false') {
        new Audio('./audio/open_sound.wav').play().catch(() => {});
    }
    win.addEventListener('mousedown', () => {
        win.style.zIndex = zCount++;
    })
    processes.push({ title, appEl, win, minimized: false });
    dragRight(win);
    enableResize(win);
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
    if (e.shiftKey && e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        openApp('./apps/terminal/index.html', 'CraftShell', "./apps/terminal/imgs/console.jpg", null);
    } 
})

function enableResize(win) {
    const MAX_WIDTH = 900;
    const MAX_HEIGHT = 600;
    const handles = {
        tl: win.querySelector('.tl'),
        tr: win.querySelector('.tr'),
        bl: win.querySelector('.bl'),
        br: win.querySelector('.br'),
    }
    Object.entries(handles).forEach(([dir, handle]) => {
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = win.offsetWidth;
            const startHeight = win.offsetHeight;
            const startLeft = win.offsetLeft;
            const startTop = win.offsetTop;

            function onMove(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                if (dir.includes('r')) {
                    win.style.width = Math.max(MAX_WIDTH, startWidth + dx) + 'px';
                }
                if (dir.includes('b')) {
                    win.style.height = Math.max(MAX_HEIGHT, startHeight + dy) + 'px';
                }
                if (dir.includes('l')) {
                    win.style.width = Math.max(MAX_WIDTH, startWidth - dx) + 'px';
                    win.style.left = startLeft + dx + 'px';
                }
                if (dir.includes('t')) {
                    win.style.height =  Math.max(MAX_HEIGHT, startHeight - dy) + 'px';
                    win.style.top = startTop + (startHeight - Math.max(MAX_HEIGHT, startHeight - dy)) + 'px';
                }
            }
            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        })
    })
}

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
    if (localStorage.getItem('sounds-enabled') !== 'false') {
        new Audio('./audio/open_sound.wav').play().catch(() => {});
    }
    
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
        if (e.target.closest('.tl, .tr, .bl, .br')) return;
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


powerFindSearch.addEventListener('keydown', (e) => {
        const results = document.querySelectorAll('.find-result');

        if (e.key === 'ArrowDown') {
            selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
        }
        else if (e.key === 'ArrowUp') {
            selectedIndex = Math.max(selectedIndex - 1, 0);
        }
        else if (e.key === 'Enter' && results[selectedIndex]) {
            results[selectedIndex].click();
            powerFindWrap.classList.remove('powered');
            isPowerPowered = false;
            selectedIndex = -1;
        }
        else if (e.key === 'Escape') {
            powerFindWrap.classList.remove('powered');
            isPowerPowered = false;
            selectedIndex = -1;
        }

        results.forEach((r, i) => {
            r.style.outline = i === selectedIndex ? '2px solid white' : 'none';
        })
    })
