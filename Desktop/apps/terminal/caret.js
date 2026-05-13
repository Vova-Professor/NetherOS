const input = document.getElementById("command-field");
const caret = document.querySelector('.caret');

const charWidth = 14;


function getCharWidth(text, font) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    return ctx.measureText(text).width;
}


function updateCaret() {
    const pos = input.selectionStart;
    const textBef = input.value.substring(0, pos);

    const font = window.getComputedStyle(input).font;
    const textWidth = getCharWidth(textBef, font);

    const inputOffset = input.offsetLeft;
    
    caret.style.left = `${inputOffset + textWidth}px`;
}

input.focus();

input.addEventListener("input", updateCaret);
input.addEventListener("keyup", updateCaret);
input.addEventListener("click", updateCaret);

updateCaret();