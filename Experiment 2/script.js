document.addEventListener('DOMContentLoaded', () => {

  const themeToggleButton = document.getElementById('theme-toggle');
  const dashboard = document.querySelector('.dashboard');

  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dashboard.dataset.theme = savedTheme;
    }
  };

  themeToggleButton.addEventListener('click', () => {
    const newTheme = dashboard.dataset.theme === 'light' ? 'dark' : 'light';
    
    dashboard.dataset.theme = newTheme;
    
    localStorage.setItem('theme', newTheme);
  });
  applySavedTheme();

});