const engine = document.querySelector('.search-engine');
const dropdown = document.querySelector('.dropdown');
const logo = document.getElementById('engine-logo');
const search = document.getElementById('search');

const engineInfo = {
    duckduckgo: '🟢 Secure & Private',
    google: '🟡 Secure, but Trackable',
    yandex: '🟠 Not recommended. But here is an useful tool.',
    startpage: '🟢 Secure & Private'
};

let currentEngine = 'duckduckgo';

engine.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => {
    const newLogo = option.getAttribute('data-logo');
    logo.src = newLogo;

    currentEngine = option.getAttribute('data-name').toLowerCase();
    logo.title = engineInfo[currentEngine];
    dropdown.style.display = 'none';
  });
});

document.addEventListener('click', (e) => {
  if (!engine.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});


search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = search.value.trim();
    if (!query) return;

    let url;

    if (currentEngine === "duckduckgo") {
      url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      engine.style.border = "#00ff44 2px solid";
    }
    else if (currentEngine === "google") {
      url = `https://google.com/search?q=${encodeURIComponent(query)}`;
      engine.style.border = "#ffe600 2px solid";
    }
    else if (currentEngine === "yandex") {
      url = `https://yandex.ru/?q=${encodeURIComponent(query)}`;
      engine.style.border = "#ffa600 2px solid";
    }
    else if (currentEngine === "startpage") {
      url = `https://www.startpage.com/sp/search?query=${encodeURIComponent(query)}`;
      engine.style.border = "#00ff44 2px solid";
    }

    window.open(url, '_blank');
  }
})