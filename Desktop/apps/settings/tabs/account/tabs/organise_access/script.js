const MAX_USERNAME_CHARS = 25;


const users = document.querySelectorAll('.users .user');
const account_container = document.getElementById("account-container");


function user_element(pfpUrl, name) {
    return `
    <div class="account">
        <div class="usr-pfp">
            <img src="${pfpUrl}" class="account-pfp" alt="Profile Picture">
        </div>
        <div class="info">
            <h2 contenteditable="true" class="user-name">${name}</h2>
            <div class="roles">
                <p class="role re selected">Restricted</p>
                <p class="role usr">User</p>
                <p class="role a">Admin</p>
                <p class="role sa">Super Admin</p>
            </div>
        </div>
    </div>
    `
}



users.forEach(user => {
    user.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = user.dataset.name || "Unknown";
        const pfp = user.dataset.pfp || "../../../../../../../imgs/_USR_PFP/pfp.jpg";
        account_container.insertAdjacentHTML("beforeend", user_element(pfp, name));
    })
})

account_container.addEventListener("click", (e) => {
    const clickedRole = e.target.closest(".roles p");
    if (!clickedRole) return;

    const parentRoles = clickedRole.closest(".roles");
    parentRoles.querySelectorAll("p").forEach(p => p.classList.remove("selected"));
    
    clickedRole.classList.add("selected");
});

account_container.addEventListener("input", (e) => {
    if (!e.target.classList.contains("user-name")) return;

    const userNameEl = e.target;
    const text = userNameEl.innerText;

    if (text.length > MAX_USERNAME_CHARS) {
        userNameEl.innerText = text.substring(0, MAX_USERNAME_CHARS);
        placeCaretAtEnd(userNameEl);
    }
});

function placeCaretAtEnd(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}