const outputText = document.getElementById('output');
const languageIcon = document.getElementById("lang-icon");
const fileNameInput = document.querySelector('.file-name');


function updateLanguageIcon() {
    const ext = fileNameInput.value.trim().match(/\.[^.]+$/)?.[0];
    const icons = {".rs": './imgs/languages/rust.png', ".cpp": './imgs/languages/cpp.png', ".c": './imgs/languages/c.png', ".py": './imgs/languages/python.png'};

    if (icons[ext]) {
        languageIcon.src = icons[ext];
        languageIcon.style.opacity = 1;
    } else {
        languageIcon.style.opacity = 0;
    }
}


async function runCode() {
    const fileName = document.querySelector('.file-name').value.trim();
    const code = document.querySelector('.code').value.trim();
    const stdin = document.getElementById("stdin");
    if (!code) return;

    if (fileName.endsWith('.rs')) {
        const response = await fetch('https://play.rust-lang.org/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                channel: 'stable', mode: 'debug', edition: '2021',
                crateType: 'bin', tests: false, code: code,
                backtrace: false, stdin: stdin.value
            })
        });
        const data = await response.json();
        if (data.success) {
            outputText.style.color = '#fff';
            outputText.textContent = data.stdout;
        } 
        else {
            beutifyRender(data.stderr);
        }
    }
    else if (fileName.endsWith('.c')) {
        const response = await fetch('https://godbolt.org/api/compiler/cg132/compile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                source: code,
                options: {
                    userArguments: '',
                    executeParameters: { args: [], stdin: stdin.value },
                    compilerOptions: { executorRequest: true },
                    filters: { execute: true }
                }
            })
        });
        const data = await response.json();
        if (data.didExecute && data.code === 0) {
            outputText.style.color = '#fff';
            outputText.textContent = data.stdout.map(l => l.text).join('\n');
        } else {
            beutifyRender(data.buildResult.stderr.map(l => l.text).join('\n'));
        }
    }

    else if (fileName.endsWith('.cpp')) {
        const response = await fetch('https://godbolt.org/api/compiler/g132/compile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                source: code,
                options: {
                    userArguments: '',
                    executeParameters: { args: [], stdin: stdin.value },
                    compilerOptions: { executorRequest: true },
                    filters: { execute: true }
                }
            })
        });
        const data = await response.json();
        if (data.didExecute && data.code === 0) {
            outputText.style.color = '#fff';
            outputText.textContent = data.stdout.map(l => l.text).join('\n');
        } else {
            beutifyRender(data.buildResult.stderr.map(l => l.text).join('\n'));
        }
    }
    else if (fileName.endsWith('.py')) {
        const response = await fetch('https://godbolt.org/api/compiler/python310/compile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                source: code,
                options: {
                    userArguments: '',
                    executeParameters: { args: [], stdin: stdin.value },
                    compilerOptions: { executorRequest: true },
                    filters: { execute: true }
                }
            })
        });
        const data = await response.json();
        if (data.didExecute && data.code === 0) {
            outputText.style.color = '#fff';
            outputText.textContent = data.stdout.map(l => l.text).join('\n');
        } else {
            beutifyRender(data.buildResult.stderr.map(l => l.text).join('\n'));
        }
    }
    else {
        outputText.style.color = "#c71e1e";
        outputText.textContent = "Only C, C++, Rust, Python files supported!"
    }
}



function beutifyRender(text) {
    text = text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').replace(/\[[\d;]*[a-zA-Z]/g, '');
    outputText.innerHTML = text.split('\n').map(line => {
        return `<span style="color: #d22121;font-weight:bold">${line}</span>`;
    }).join("<br>")
}


document.querySelector('.run-btn').addEventListener('click', runCode);

fileNameInput.addEventListener('input', updateLanguageIcon);