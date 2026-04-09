async function runCode() {
    const fileName = document.querySelector('.file-name').value.trim();
    const code = document.querySelector('.code').value.trim();
    const outputText = document.getElementById('output');
    if (!code) return;

    if (fileName.endsWith('.rs')) {
        const response = await fetch('https://play.rust-lang.org/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                channel: 'stable',
                mode: 'debug',
                edition: '2021',
                crateType: 'bin',
                tests: false,
                code: code,
                backtrace: false
            })
        });

        const data = await response.json();

        if (data.success) {
            outputText.style.color = '#fff';
            outputText.textContent = data.stdout;
        }
        else {
            outputText.style.color = 'red';
            outputText.textContent = data.stderr;
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
                    executeParameters: { args: [], stdin: '' },
                    compilerOptions: { executorRequest: true },
                    filters: { execute: true }
                }
            })
        });
        const data = await response.json();
        console.log(data);

        if (data.didExecute && data.code === 0) {
            outputText.style.color = '#fff';
            outputText.textContent = data.stdout.map(l => l.text).join('\n');
        }
        else {
            outputText.style.color = 'red';
            outputText.textContent = data.buildResult.stderr.map(l => l.text).join('\n');
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
                    executeParameters: { args: [], stdin: '' },
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
            outputText.style.color = 'red';
            outputText.textContent = data.buildResult.stderr.map(l => l.text).join('\n');
        }
    }
    else {
        alert("Only .rs, .c, .cpp files are supported yet...");
    }
}

document.querySelector('.run-btn').addEventListener('click', runCode);