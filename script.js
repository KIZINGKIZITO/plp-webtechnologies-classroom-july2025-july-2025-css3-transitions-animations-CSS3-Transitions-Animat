// DOM Elements
const cards = document.querySelectorAll('.card');
const pulseBtn = document.getElementById('pulse-btn');
const shakeBtn = document.getElementById('shake-btn');
const resetBtn = document.getElementById('reset-btn');
const modalBtn = document.getElementById('modal-btn');
const modal = document.getElementById('info-modal');
const closeBtn = document.querySelector('.close-btn');

// Global variable to track animation state
let isAnimating = false;

/**
 * Applies animation class to elements with specified duration
 * @param {NodeList} elements - DOM elements to animate
 * @param {string} animationClass - CSS class for animation
 * @param {number} duration - Animation duration in ms
 * @returns {boolean} Success status
 */
function applyAnimation(elements, animationClass, duration = 500) {
    // Check if already animating to prevent overlap
    if (isAnimating) {
        return false;
    }
    
    isAnimating = true;
    
    // Apply animation to all elements in the NodeList
    elements.forEach(element => {
        element.classList.add(animationClass);
        
        // Remove animation class after duration
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    });
    
    // Reset animation state after all animations complete
    setTimeout(() => {
        isAnimating = false;
    }, duration);
    
    return true; // Return success status
}

/**
 * Resets all animations on elements
 * @param {NodeList} elements - DOM elements to reset
 * @returns {string} Status message
 */
function resetAnimations(elements) {
    elements.forEach(element => {
        element.classList.remove('pulse', 'shake');
    });
    return "Animations reset successfully";
}

/**
 * Toggles modal visibility
 * @param {boolean} show - Whether to show or hide the modal
 * @returns {string} Status message
 */
function toggleModal(show) {
    if (show) {
        modal.style.display = 'flex';
        return "Modal opened";
    } else {
        modal.style.display = 'none';
        return "Modal closed";
    }
}

/**
 * Calculates animation duration based on number of elements
 * @param {number} count - Number of elements
 * @param {number} baseDuration - Base duration in ms
 * @returns {number} Calculated duration
 */
function calculateDuration(count, baseDuration = 500) {
    return baseDuration + (count * 100); // Add 100ms per element
}

// Event Listeners
pulseBtn.addEventListener('click', () => {
    const duration = calculateDuration(cards.length);
    const success = applyAnimation(cards, 'pulse', duration);
    
    if (!success) {
        console.log("Animation already in progress. Please wait.");
    }
});

shakeBtn.addEventListener('click', () => {
    const duration = calculateDuration(cards.length, 600);
    const success = applyAnimation(cards, 'shake', duration);
    
    if (!success) {
        console.log("Animation already in progress. Please wait.");
    }
});

resetBtn.addEventListener('click', () => {
    const message = resetAnimations(cards);
    console.log(message);
});

modalBtn.addEventListener('click', () => {
    const message = toggleModal(true);
    console.log(message);
});

closeBtn.addEventListener('click', () => {
    const message = toggleModal(false);
    console.log(message);
});

// Close modal when clicking outside content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        const message = toggleModal(false);
        console.log(message);
    }
});

// Initialize with a subtle animation on load
window.addEventListener('load', () => {
    setTimeout(() => {
        applyAnimation(cards, 'pulse', 1000);
    }, 1000);
});