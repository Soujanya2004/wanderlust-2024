document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.darkModeToggle'); // Select all toggle buttons
    const toggleIcons = document.querySelectorAll('.toggleIcon'); // Select all toggle icons
    const body = document.body;
  
    // Check localStorage for theme preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
    // Set the default mode based on localStorage
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        toggleIcons.forEach(icon => {
            icon.classList.add('bxs-sun');
            icon.classList.remove('bxs-moon');
        });
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggleIcons.forEach(icon => {
            icon.classList.add('bxs-moon');
            icon.classList.remove('bxs-sun');
        });
    }
  
    // Toggle dark mode on button click for all toggle buttons
    toggleButtons.forEach((toggleButton) => {
        toggleButton.addEventListener('click', () => {
            const isDarkModeNow = body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode', !isDarkModeNow); // Ensure one mode is active at a time
        
            // Save the current mode to localStorage
            localStorage.setItem('darkMode', isDarkModeNow);
        
            // Update the icons based on the current mode
            toggleIcons.forEach(icon => {
                if (isDarkModeNow) {
                    icon.classList.add('bxs-sun');
                    icon.classList.remove('bxs-moon');
                } else {
                    icon.classList.add('bxs-moon');
                    icon.classList.remove('bxs-sun');
                }
            });
        });
    });
});

