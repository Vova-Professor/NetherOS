let processes = [];

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
        }
    }, 30);
    }, TIMEOUT);
})




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

    appEl.classList.add("active");

    win.innerHTML = `
    <div class="windows-titlebar">
        <div class="info">
            <img src="${iconPath}" class="window-icon ${title}">
            <span>${title}</span>
        </div>
        
        <div class="btns">
            <button onclick="minimizeApp(this)" style="background-color: green"></button>
            <button style="background-color: orange"></button>
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
        openApp('https://vova-professor.github.io/NetherOS/', 'Sandbox Enviroment', './imgs/Boot/pd.png', document.querySelector('.app'));
    }
})

function minimizeApp(btn) {
    const win = btn.closest('.window');
    const process = processes.find(p => p.win === win);
    if (!process) return;

    win.classList.add('opening');

    setTimeout(() => {
        win.style.display = 'none';
        process.minimized = true;
        process.appEl.classList.add('minimized');
    }, 300);
}


function closeApp(btn, title) {
    const win = btn.closest('.window');
    win.classList.add('opening');
    setTimeout(() => {
        win.remove();
        let process = processes.find(p => p.title === title);
        if (process) process.appEl.classList.remove('active');
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
    process.appEl.classList.remove('minimized');
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