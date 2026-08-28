const pin_code = `
<div class="el">
    <label for="pin">PIN</label>
    <div class="input-wrap">
        <input type="password" name="pin" placeholder="0657" id="pin" class="text-input" maxlength="4">
    </div>
</div>

<div class="el">
    <label for="repeat-pin">Repeat PIN</label>
    <div class="input-wrap">
        <input type="password" name="repeat-pin" placeholder="0657" id="re-pin" class="text-input" maxlength="4">
    </div>
</div>

<div class="btn-wrap">
    <input type="button" class="save-btn" value="Save">
</div>
`

const password_code = `
<div class="el">
    <label for="pin">Password</label>
    <div class="input-wrap">
        <input type="password" name="pin" placeholder="Pro000" id="pin" class="text-input" maxlength="30">
    </div>
</div>

<div class="el">
    <label for="repeat-pin">Repeat Password</label>
    <div class="input-wrap">
        <input type="password" name="repeat-pin" placeholder="Pro000" id="re-pin" class="text-input" maxlength="30">
    </div>
</div>

<div class="btn-wrap">
    <input type="button" class="save-btn" value="Save">
</div>
`

const secret_question = `
<div class="el">
    <label for="pin">Question</label>
    <div class="input-wrap">
        <input type="text" name="question" placeholder="What is the best WebOS?" id="pin" class="text-input" maxlength="60">
    </div>
</div>

<div class="el">
    <label for="repeat-pin">Answer</label>
    <div class="input-wrap">
        <input type="password" name="secret-word" placeholder="NetherOS ofc" id="re-pin" class="text-input" maxlength="30">
    </div>
</div>

<div class="btn-wrap">
    <input type="button" class="save-btn" value="Save">
</div>
`

const pattern_lock = `
<div class="pattern-box">
    <svg class="lines"></svg>

    <div class="dots-wrap">
        <div class="dot" data-id="1"></div>
        <div class="dot" data-id="2"></div>
        <div class="dot" data-id="3"></div>
        <div class="dot" data-id="4"></div>
        <div class="dot" data-id="5"></div>
        <div class="dot" data-id="6"></div>
        <div class="dot" data-id="7"></div>
        <div class="dot" data-id="8"></div>
        <div class="dot" data-id="9"></div>
    </div>
</div>
<div class="btn-wrap">
    <input type="button" class="save-btn" value="Save">
</div>
`


const select = document.getElementById("curr-passw");
const password_wrap = document.querySelector('.password');

const password_aliases = {"pin": pin_code, "password": password_code, "question": secret_question, "pattern": pattern_lock, "no": "Nothing is here :P"}


select.addEventListener('change', () => {
    password_wrap.innerHTML = password_aliases[select.value];

    if (select.value === "pattern") {
        initPattern();
    }
});
