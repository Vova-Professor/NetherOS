const engine = document.querySelector('.search-engine');
const dropdown = document.querySelector('.dropdown');
const logo = document.getElementById('engine-logo');
const search = document.getElementById('search');

let currentEngine = 'duckduckgo';

engine.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => {
    const newLogo = option.getAttribute('data-logo');
    logo.src = newLogo;

    currentEngine = option.getAttribute('data-name').toLowerCase();

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
    }
    else if (currentEngine === "google") {
      url = `https://google.com/?q=${encodeURIComponent(query)}`;
    }
    else if (currentEngine === "yandex") {
      url = `https://yandex.ru/?q=${encodeURIComponent(query)}`;
    }

    window.location.href = url;
  }
})
