document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const body = document.body;
  
    // Set the default mode based on the body's class
    if (body.classList.contains('dark-mode')) {
      toggleIcon.classList.add('fa-sun');
      toggleIcon.classList.remove('fa-moon');
    } else {
      toggleIcon.classList.add('fa-moon');
      toggleIcon.classList.remove('fa-sun');
      body.classList.add('light-mode');
    }
  
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
     body.classList.toggle('light-mode');
    });
  });
  