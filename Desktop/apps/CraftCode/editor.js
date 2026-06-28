const textarea = document.querySelector('.code');
const highlight_layer = document.querySelector('.highlight-layer');
const line_numbers = document.querySelector('.line-numbers');
const download_btn = document.querySelector('.save-btn');

const keywords = [
    "if", "else", "while", "for", "return", "import", "from", "in",
    "match", "use", "mod", "pub", "struct", "enum", "impl", "trait",
    "where", "as", "async", "await", "move", "ref", "mut", "const",
    "static", "type", "self", "Self", "super", "crate", "break",
    "continue", "loop", "unsafe", "extern", "dyn", "box", "yield",
    "typeof", "instanceof", "new", "delete", "this", "class", "extends",
    "var", "let", "const", "of", "switch", "case", "default", "throw",
    "try", "catch", "finally", "with", "debugger", "pass", "lambda",
    "and", "or", "not", "is", "elif", "global", "nonlocal", "raise",
    "yield", "assert", "del", "except", "finally", "with", "as", "using", "std"
];

const constants = [
    "true", "false", "True", "False", "None", "Some", "Ok", "Err",
    "null", "undefined", "NaN", "Infinity"
];

const types = [
    'u8', 'void', 'u16', 'u32', 'u64', 'u128', 'i8', 'i16', 'i32',
    'i64', 'i128', 'bool', 'String', 'str', 'char', 'usize', 'isize',
    'Vec', 'Option', 'Result', 'int', 'float', 'double', 'long',
    'short', 'byte', 'number', 'string', 'boolean', 'any', 'never',
    'object', 'symbol', 'bigint', 'Array', 'Map', 'Set', 'Promise'
];

const func = ['fn', 'class', 'function', 'def', 'struct', 'impl'];

const special = ['<', '>']

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function highlightStrings(line) {
    let result = '';
    let i = 0;

    while (i < line.length) {
        if (line[i] === '<') {
            while (i < line.length && line[i] !== '>') result += line[i++];
            result += line[i++];
            continue;
        }

        if (line[i] === '"' || line[i] === "'") {
            const quote = line[i];
            let end = i + 1;
            while (end < line.length && line[end] !== quote && line[end] !== '<') end++;
            const str = line.slice(i, end + 1);
            result += `<span class="string">${str}</span>`;
            i = end + 1;
        } else {
            result += line[i++];
        }
    }
    return result;
}

function highlight(code) {
    const lines = code.split("\n");
    const result = [];

    for (let line of lines) {
        const escaped = escapeHtml(line);

        if (line.trimStart().startsWith('//')) {
            result.push(`<span class="comment">${escaped}</span>`);
            continue;
        }

        if (line.trimStart().startsWith('#')) {
            result.push(`<span class="keyword">${escaped}</span>`);
            continue;
        }

        const words = escaped.split(' ');
        const highlightedWords = [];

        for (let word of words) {
            const bare = word.replace(/[^a-zA-Z0-9_]/g, '');

            if (types.includes(bare)) {
                highlightedWords.push(word.replace(bare, `<span class="type">${bare}</span>`));
            }
            else if (constants.includes(bare)) {
                highlightedWords.push(word.replace(bare, `<span class="constant">${bare}</span>`));
            }
            else if (func.includes(bare)) {
                highlightedWords.push(word.replace(bare, `<span class="function">${bare}</span>`));
            }
            else if (keywords.includes(bare)) {
                highlightedWords.push(word.replace(bare, `<span class="keyword">${bare}</span>`));
            }
            else if (special.includes(bare)) {
                highlightedWords.push(word.replace(bare, `<span class="special">${bare}</span>`));
            }
            else if (word.replace(/\)+$/, '').includes('(')) {
                const name = word.split('(')[0];
                const rest = word.slice(name.length);
                highlightedWords.push(`<span class="function">${name}</span>${rest}`);
            }
            else {
                highlightedWords.push(word);
            }
        }

        let highlightLine = highlightedWords.join(' ');
        highlightLine = highlightStrings(highlightLine);

        highlightLine = highlightLine.replace(
            /(&lt;\/?)([a-zA-Z][\w-]*)(.*?)(\/?&gt;)/g,
            '<span class="special">$1</span><span class="function">$2</span>$3<span class="special">$4</span>'
        );
        result.push(highlightLine);
    }
    return result.join('\n');
}

textarea.addEventListener('input', () => {
    const ext = fileNameInput.value.trim().match(/\.[^.]+$/)?.[0];
    if (textarea.value.trim() !== '' && fileNameInput.value.trim() !== '' && ext) {
        download_btn.style.display = 'block';
    }
    else {
        download_btn.style.display = 'none';
    }
    highlight_layer.innerHTML = highlight(textarea.value);
    updateLineNumbers();
});

textarea.addEventListener('keydown', function(e) {
    const pairs = { '{': '{}', '(': '()', '"': '""', "'": "''", '[': '[]' };

    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
        highlight_layer.innerHTML = highlight(this.value);
        return;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        const start = this.selectionStart;
        const lineStart = this.value.lastIndexOf('\n', start - 1) + 1;
        const line = this.value.slice(lineStart, start);
        const indent = line.match(/^\s*/)[0];

        this.value = this.value.substring(0, start) + '\n' + indent + this.value.substring(start);
        this.selectionStart = this.selectionEnd = start + 1 + indent.length;
        highlight_layer.innerHTML = highlight(this.value);
        updateLineNumbers();

    }

    if (pairs[e.key]) {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + pairs[e.key] + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
        highlight_layer.innerHTML = highlight(this.value);
    }
});

textarea.addEventListener('scroll', () => {
    highlight_layer.scrollTop = textarea.scrollTop;
    highlight_layer.scrollLeft = textarea.scrollLeft;

    line_numbers.scrollTop = textarea.scrollTop;
});

function updateLineNumbers() {
    const lines = textarea.value.split('\n').length;
    line_numbers.innerHTML = Array.from({length: lines}, (_, i) => `<span>${i + 1}</span>`).join('\n');
}

textarea.addEventListener('input', () => {
    localStorage.setItem('editor-code', textarea.value);
});

window.addEventListener('load', () => {
    textarea.value = localStorage.getItem('editor-code') || '';
    highlight_layer.innerHTML = highlight(textarea.value);

    fileNameInput.value = localStorage.getItem('editor-filename') || '';
    updateLanguageIcon();
    updateLineNumbers();
});

fileNameInput.addEventListener('input', () => {
    localStorage.setItem('editor-filename', fileNameInput.value);
    updateLanguageIcon();
});

function downloadFile() {
    const fileName = fileNameInput.value.trim();
    const code = textarea.value;

    const blob = new Blob([code], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

download_btn.addEventListener('click', () => {
    downloadFile();
})


document.addEventListener('keydown', (e) => {
    if (e.key == 'F9') {
        e.preventDefault();
        runCode();
    }

    if (!e.ctrlKey) return;

    const root = document.documentElement;
    const font_size = parseFloat(getComputedStyle(root).getPropertyValue('--font_size'));

    if ((e.key === '=' || e.key === '+') && font_size <= 39) {
        e.preventDefault();
        root.style.setProperty('--font_size', (font_size+1) + 'px');
    }
    else if ((e.key === '-' || e.key === '_') && font_size >= 2) {
        e.preventDefault();
        root.style.setProperty('--font_size', (font_size-1) + 'px');
    }
    else if (e.key === '0') {
        e.preventDefault();
        root.style.setProperty('--font_size', '14px');
    }
})


updateLineNumbers();