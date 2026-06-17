const output = document.createElement('div');


output.classList.add('output');
document.body.appendChild(output);

let i = 1;
let j = 0;
const steps = ["Configuring the font", "Checking for common bugs", "Installing pseudo-drivers"]
const statusLine = document.createElement('h2');
output.appendChild(statusLine);

let interval = setInterval(() => {
    statusLine.textContent = `Initializing${'.'.repeat(i)}`;
    i++;

    if (i > 3) {
        j++;
        i = 1;
    }

    if (j > 2) {
        clearInterval(interval);
        let line = document.createElement("div");
        output.appendChild(line);
        statusLine.textContent = "Configuring your system...";
        i = 0;
        j = 1;
        interval = setInterval(() => {
            if (i > steps.length - 1) {
                clearInterval(interval);
                line = document.createElement("div");
                output.appendChild(line);
                line.innerHTML = "Starting your system...";
                interval = setTimeout(() => {
                    sessionStorage.setItem("booted", "true");
                    window.location.href = "../index.html";
                }, 2000);
                return;
            }
            line.textContent = `> ${steps[i]} [${'.' .repeat(j)}]`;
            j++;
            if (j > 3) {
                j = 1;
                line.innerHTML = `> ${steps[i]} [<span class="ok">OK</span>]`;
                switch (i) {
                    case 0:
                        document.body.style.fontFamily = 'Minecraft';

                }
                i++;
                if (i < steps.length) {
                    line = document.createElement("div");
                    output.appendChild(line);
                }

            }
        }, 2000);
    
    }
}, 1000)