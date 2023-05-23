// Get all elements with the "fade" class
const fadeElements = document.querySelectorAll('.fade');

window.addEventListener('scroll', fadeIn);

function fadeIn() {
    for (let i = 0; i < fadeElements.length; i++) {
        const element = fadeElements[i];

        // Determine the position of the element
        const positionFromTop = element.getBoundingClientRect().top;

        // Check if the element is in the viewport
        if (positionFromTop - window.innerHeight <= 0) {
            element.classList.add('show');
        }
    }
}
