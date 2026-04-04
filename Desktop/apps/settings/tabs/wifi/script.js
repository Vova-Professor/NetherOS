const toggles = document.querySelectorAll('.toggle input');
const wifi_toggle = toggles[0];

const wifi_lbl = document.querySelectorAll('.toggle')[0];

const airplane_toggle = toggles[1];
const conn_state = document.getElementById("conn-state");

const tableDNS = document.getElementById('table-dns-ip');
const tableNetwork = document.getElementById('curr-network-table');

const select = document.querySelector('.dns-wrap select');
const customInput = document.getElementById("custom-dns");



function saveSettings() {
    localStorage.setItem('wifi-settings', JSON.stringify({
        wifi: wifi_toggle.checked,
        airplane: airplane_toggle.checked,
        dns: select.value
    }));
}

function loadSettings() {
    const saved = JSON.parse(localStorage.getItem('wifi-settings'));
    if (!saved) return;

    setAirplane(saved.airplane);
    if (!saved.airplane) setWifi(saved.wifi);
    select.value = saved.dns;
    tableDNS.textContent = saved.dns;

    if (saved.dns === 'Custom') {
        customInput.style.display = 'block';
        tableDNS.classList.add('not-recommended');
    }
}

loadSettings();

function setWifi(on) {
    wifi_toggle.checked = on;

    if (on) {
        tableNetwork.textContent = "Home-Wi-Fi";
        conn_state.textContent = "Connected to Home-Wi-Fi";
    } else {
        tableNetwork.textContent = "No network...";
        conn_state.textContent = "";
    }
}

function setAirplane(on) {
    airplane_toggle.checked = on;

    if (on) {
        setWifi(false);
        wifi_toggle.disabled = true;
        wifi_lbl.classList.add('disabled');
        tableNetwork.textContent = "Airplane Mode :P";
    }
    else {
        wifi_toggle.disabled = false;
        wifi_lbl.classList.remove('disabled');
        setWifi(true);
    }
}


wifi_toggle.addEventListener('change', () => {
    setWifi(wifi_toggle.checked);
    saveSettings();
});

airplane_toggle.addEventListener('change', () => {
    setAirplane(airplane_toggle.checked)
    saveSettings();
})





select.addEventListener('change', () => {
    tableDNS.textContent = select.value;
    if (select.value === 'Custom') {
        tableDNS.classList.add('not-recommended');
        customInput.style.display = 'block';
    }
    else {
        tableDNS.classList.remove('not-recommended');
        customInput.style.display = 'none';
    }
    saveSettings();
});


