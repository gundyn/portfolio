'use strict';

// When the content of the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Define the scroll button
    const scrollButton = document.getElementById('scroll');

    // Add a scroll event listener to the window
    window.addEventListener('scroll', function() {
        // If the user has scrolled more than 100px from the top of the page
        if (window.pageYOffset > 100) {
            // Show the scroll button
            scrollButton.style.display = 'block';
        } else {
            // Hide the scroll button
            scrollButton.style.display = 'none';
        }
    });

    // Add a click event listener to the scroll button
    scrollButton.addEventListener('click', function(event) {
        // Prevent the default click event (which might cause the page to jump to the top instantly)
        event.preventDefault();

        // Scroll smoothly to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
