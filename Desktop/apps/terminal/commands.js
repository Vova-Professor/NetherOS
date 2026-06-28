const terminal = document.getElementById("terminal");

const commands = {
    "/help": "Available commands:\n/help - show list of available commands and explain them.\n/whoami - get current user name.\n/clear - clear console.\n/time - shows current time h:m:s.\n/change-bg - change your background with index.\n/change-style - change appearance with theme name.\n/hard-reset - resets your system and logs out.",
    "/whoami": "Vova-Professor",
    "/time": "Current time: " + new Date().toLocaleTimeString(),
    "/change-bg": (args) => {
        const index = parseInt(args[0]);
        const wallpapers = [
            "../../../../../imgs/_BGS/_WP_SNST.jpeg",
            "../../../../../imgs/_BGS/_WP_SKRA.jpg",
            "../../../../../imgs/_BGS/_WP_ISLND.jpg",
            "../../../../../imgs/_BGS/_WP_END.jpg",
            "../../../../../imgs/_BGS/_WP_FRST.png"
        ];
        


        if (isNaN(index) || index < 0 || index >= wallpapers.length) {
            return `Usage: /change-bg 0-${wallpapers.length - 1}`;
        }

        window.top.postMessage({
            type: "SET_WALLPAPER",
            path: wallpapers[index]
        }, "*")
        const existing = JSON.parse(localStorage.getItem('Settings-Appearance')) || {};

        localStorage.setItem("wallpaper", wallpapers[index]);
                localStorage.setItem('Settings-Appearance', JSON.stringify({
            ...existing,
            selected_wallpaper: wallpapers[index],
            custom_bg_active: false
        }));
        return `wallpaper changed to ${index}`;
    },
    "/change-style": (args) => {
        const name = args[0].trim();
        const styles = [
            "light-white",
            "light-pink",
            "peaceful-green",
            "normal-tomato"
        ];

        if (!styles.includes(name)) {
            return `Usage: /change-style style-name`;
        }

        window.top.postMessage({
            type: "SET_STYLE",
            style: name
        }, "*");

        localStorage.setItem("accentStyle", name);
        const existing = JSON.parse(localStorage.getItem('Settings-Appearance')) || {};
        localStorage.setItem('Settings-Appearance', JSON.stringify({
            ...existing,
            selected_color: name
        }));
        return `The accentColor has been changed to ${name}`;
    },
    "/hard-reset": (args, print) => {
        
        print("Clearing process started, please wait...");
        setTimeout(() => {
            localStorage.clear();
            print("Done! Redirecting to login...");
            setTimeout(() => {
                window.top.postMessage({
                    type: "LOGOUT",
                }, "*")
            }, 1000)
        }, 800)

        return "Hard reset initiated. Please wait...";

    }
}

input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const print = (text) => {
        const outLine = document.createElement("div");
        outLine.classList.add("output");
        outLine.textContent = text;
        terminal.appendChild(outLine);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const cmd = input.value.trim();

    if (cmd === "/clear") {
        terminal.innerHTML = "";
        input.value = "";
        updateCaret();
        return;
    }

    const cmdLine = document.createElement("div");
    cmdLine.classList.add('line');
    cmdLine.innerHTML = `<h2>~/ :?:  </h2> ${cmd}`;
    terminal.appendChild(cmdLine);

    const parts = cmd.split(" ");
    const cmdName = parts[0];
    const args = parts.slice(1);

    const output = typeof commands[cmdName] === "function"
    ? commands[cmdName](args, print)
    : commands[cmdName];

    if (output !== undefined) {
        const outLine = document.createElement("div");
        outLine.classList.add("output");
        outLine.textContent = output;
        terminal.appendChild(outLine);
    } 
    else if (cmd !== "") {
        const errLine  = document.createElement("div");
        errLine.classList.add("output", "error");
        errLine.textContent = `${cmd} is not recognized as an internal or external command, operable program or batch file.`;
        terminal.appendChild(errLine);
    }

    input.value = "";
    updateCaret();
    window.scrollTo(0, document.body.scrollHeight);


})

