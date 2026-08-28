const pfp_html = `
    <section>
        <h3>Set your new Profile Picture:</h3>
        <div class="img-wrap" id="pfp-picker">
            <input type="file" id="custom-pfp-input" accept="image/*" style="display:none;">
        </div>
    </section>

    <div class="btn-wrap">
        <input type="button" value="Confirm" class="next-btn" onclick="set_btn(0)">
        <input type="button" value="Next" class="next-btn" onclick="next_btn(1)">
    </div>
`;

const name_html = `
    <section>
        <div class="el">
            <label for="username">Username</label>
            <div class="input-wrap">
                <input type="text" name="username" placeholder="minecraftPro" id="username" class="text-input">
            </div>
        </div>
    </section>

    <div class="btn-wrap">
        <input type="button" value="Back" class="next-btn" onclick="next_btn(-1)">
        <input type="button" value="Confirm" class="next-btn" onclick="set_btn(1)">
        <input type="button" value="Next" class="next-btn" onclick="next_btn(2)">
    </div>
`;

const pin_html = `
    <section>
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
    </section>

    <div class="btn-wrap">
        <input type="button" value="Back" class="next-btn" onclick="next_btn(-1)">
        <input type="button" value="Confirm" class="next-btn" onclick="set_btn(2)">
    </div>
`

const actions = [pfp_html, name_html, pin_html];
const progressBar = document.getElementById("progress-bar");

const main = document.getElementById("main");
let currentPage = 0;
main.innerHTML = actions[currentPage];


const pfpPicker = document.getElementById("pfp-picker");
const pfpInput = document.getElementById("custom-pfp-input");

let dataUrl;



pfpPicker.addEventListener('click', () => pfpInput.click());

pfpInput.addEventListener('change', () => {
    const file = pfpInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        dataUrl = e.target.result;

        pfpPicker.style.backgroundImage = `url(${dataUrl})`;
    };

    reader.readAsDataURL(file);
});

function next_btn(direction) {
    currentPage += direction;

    currentPage = Math.max(0, Math.min(currentPage, actions.length - 1));
    main.innerHTML = actions[currentPage];
    
    progressBar.style.width = `${(currentPage / (actions.length - 1)) * 100}%`;
}

function set_btn(action) {
    if (action === 0) {
        try {
            localStorage.setItem("custom-pfp", dataUrl);
            console.log("Saved successfully");
        } catch (err) {
            console.error("Storage failed:", err);
        }
    }
}