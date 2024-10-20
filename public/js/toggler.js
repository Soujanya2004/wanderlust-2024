document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('darkModeToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  const body = document.body;

  // Check localStorage for theme preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Set the default mode based on localStorage
  if (isDarkMode) {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      toggleIcon.classList.add('fa-sun');
      toggleIcon.classList.remove('fa-moon');
  } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      toggleIcon.classList.add('fa-moon');
      toggleIcon.classList.remove('fa-sun');
  }

  // Toggle dark mode on button click
  toggleButton.addEventListener('click', () => {
      const isDarkModeNow = body.classList.toggle('dark-mode');
      body.classList.toggle('light-mode', !isDarkModeNow); // Ensure one mode is active at a time

      // Save the current mode to localStorage
      localStorage.setItem('darkMode', isDarkModeNow);

      // Update the icon based on the current mode
      if (isDarkModeNow) {
          toggleIcon.classList.add('fa-sun');
          toggleIcon.classList.remove('fa-moon');
      } else {
          toggleIcon.classList.add('fa-moon');
          toggleIcon.classList.remove('fa-sun');
      }
  });
});
``
