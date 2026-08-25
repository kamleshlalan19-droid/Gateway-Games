const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// 1. Check saved theme preference or system preference on load
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
  setTheme('light');
} else {
  setTheme('dark');
}

// 2. Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// 3. Theme update function
function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.setAttribute('data-lucide', 'sun');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.setAttribute('data-lucide', 'moon');
    localStorage.setItem('theme', 'dark');
  }

  // Re-render Lucide icons so the new sun/moon icon renders properly
  lucide.createIcons();
}
