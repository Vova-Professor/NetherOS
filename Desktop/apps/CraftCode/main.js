const code = document.querySelector('.code');

code.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.slice(0, start) + '    ' + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 4;
    }

    if (e.key === '{') {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.slice(0, start) + "{}" + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    if (e.key === '(') {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.slice(0, start) + "()" + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    if (e.key === '"') {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.slice(0, start) + '""' + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    if (e.key === "'") {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.slice(0, start) + "''" + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    if (e.key === "[") {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.slice(0, start) + "[]" + this.value.slice(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 1;
    }
})


async function runCode() {
    const fileName = document.querySelector('.file-name').value.trim();

    if (!fileName.endsWith('.rs')) {
        alert("Only .rs files can compile yet...");
        return;
    }
    const code = document.querySelector('.code').value.trim();

    if (!code) return;

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
    const outputText = document.getElementById('output');

    if (data.success) {
        outputText.style.color = '#fff';
        outputText.textContent = data.stdout;
    }
    else {
        outputText.style.color = 'red';
        outputText.textContent = data.stderr;
    }
}

document.querySelector('.run-btn').addEventListener('click', runCode);