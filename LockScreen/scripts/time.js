let timeTitle = document.getElementById("hms");
let dateTitle = document.getElementById("date");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function updateTime() {
    let time = new Date();
    timeTitle.textContent = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    dateTitle.textContent = `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}`;
}

updateTime();
setInterval(updateTime, 1000);