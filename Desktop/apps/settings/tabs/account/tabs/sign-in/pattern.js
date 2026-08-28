

function initPattern() {
    const dots = document.querySelectorAll('.dot');
    const svg = document.querySelector('.lines');

    let pattern = [];

    function getDotPosition(dot) {
        const rect = dot.getBoundingClientRect();
        const parent = svg.getBoundingClientRect();

        return {
            x: rect.left - parent.left + rect.width / 2,
            y: rect.top - parent.top + rect.height / 2
        }
    }

    function drawLine(dot1, dot2) {
        const p1 = getDotPosition(dot1);
        const p2 = getDotPosition(dot2);

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        line.setAttribute("x1", p1.x);
        line.setAttribute("y1", p1.y);
        line.setAttribute("x2", p2.x);
        line.setAttribute("y2", p2.y);

        line.setAttribute("stroke", "#7f77dd");
        line.setAttribute("stroke-width", "5");
        line.setAttribute("stroke-linecap", "round");

        svg.appendChild(line);

    }


    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            if (pattern.includes([...dots].indexOf(dot))) return;
            if (pattern.length > 0) {
                let previous = dots[pattern[pattern.length - 1]];
                drawLine(previous, dot);
            }
            pattern.push([...dots].indexOf(dot));
            dot.style.background = "#7f77dd";

        })
    })
}


