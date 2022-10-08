const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const STORAGE_KEY = 'themeKey';

const checkBox = document.querySelector('.theme-switch__toggle');
const body = document.querySelector('body');

checkBox.addEventListener('change', onChange);
isTheme();

function onChange(e) {
  if (e.target.checked) {
    body.classList.remove('ligth-theme');
    body.classList.add('dark-theme');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Theme.DARK));
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('ligth-theme');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Theme.LIGHT));
  }
}

function isTheme() {
  const saveTheme = localStorage.getItem(STORAGE_KEY);
  if (!saveTheme) {
    body.classList.add('ligth-theme');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Theme.LIGHT));
  } else {
    const parseTheme = JSON.parse(saveTheme);
    if (parseTheme === 'dark-theme') {
      body.classList.add('dark-theme');
      checkBox.checked = true;
    }
  }
}
