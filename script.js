document.addEventListener('DOMContentLoaded', () => {
    
    // --- Calls to setup all three required features ---
    setupNavigationToggle(); 
    // Note: startCarousel only runs on index.html, but the function is harmless here.
    startCarousel();
    setupFormValidation(); 

});

// ============================================
// FEATURE 1: Interactive Menu/Dropdown (Toggle)
// Runs on ALL pages
// ============================================
function setupNavigationToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            // Toggles the 'active' class which controls visibility via CSS
            navLinks.classList.toggle('active'); 
        });
    }
}

// ============================================
// FEATURE 2: Slide-show/Image Carousel
// Runs on index.html only
// ============================================
function startCarousel() {
    const slides = document.querySelectorAll('.carousel-image');
    if (slides.length === 0) return; // Exit if not on index.html

    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Logic to loop back to the first slide
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Show the current slide by adding the 'active' class
        slides[currentSlide].classList.add('active');
    }

    // Initialize the first slide to be visible
    showSlide(currentSlide);

    // Auto-advance every 5 seconds (5000ms)
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); 
}

// ============================================
// FEATURE 3: Form Validation and Alert/Confirmation
// Runs on contact.html only
// ============================================
function setupFormValidation() {
    const inquiryForm = document.getElementById('inquiry-form');
    if (!inquiryForm) return; // Exit if not on contact.html

    // Helper functions for showing/clearing visual errors
    const displayError = (input, message) => {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('input-error'); 
        }
    };
    const clearError = (input) => {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('input-error');
        }
    };
    
    inquiryForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // 1. Clear previous errors
        [nameInput, emailInput, messageInput].forEach(clearError);

        // 2. Perform Validation Checks
        if (nameInput.value.trim() === '') {
            displayError(nameInput, 'Full name is required.');
            isValid = false;
        }

        if (emailInput.value.trim() === '' || !emailInput.value.includes('@') || emailInput.value.trim().length < 5) {
            displayError(emailInput, 'A valid email address is required.');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            displayError(messageInput, 'Please include a detailed message (min 10 characters).');
            isValid = false;
        }

        // 3. Submission Logic
        if (isValid) {
            // JS Alert/Confirmation (required feature)
            alert('Success! Your travel inquiry has been sent to Brickly Travel. We will contact you shortly.');
            
            // Reset the form fields
            this.reset();
        }
    });
}