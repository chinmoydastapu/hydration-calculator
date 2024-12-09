// Slider----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
let currentSlide = 1;
const totalSlides = 4;

// Function to show the slide based on the slide number
function showSlide(slideNumber) {
    const slides = document.querySelectorAll(".slide");

    // Hide all slides initially
    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    // Show the current slide
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.style.display = "block";
    }

    // Update the dots after showing the slide
    updateDots(slideNumber);

    // Show or hide the "Next" or "Previous" buttons depending on the slide
    document.getElementById('prev-btn').style.visibility = (slideNumber === 1) ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = (slideNumber === totalSlides-1) ? 'See Results' : 'Next';
    document.getElementById('next-btn').style.visibility = (slideNumber === totalSlides) ? 'hidden' : 'visible';
}

// Function to update the active dot
function updateDots(slideNumber) {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        if (index + 1 === slideNumber) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// Function to go to the next slide
window.nextSlide = function () {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

// Function to go to the previous slide
window.prevSlide = function () {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Function to go to a specific slide based on dot click
function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
}

// Attach click event listeners to dots
const dots = document.querySelectorAll(".dot");
dots.forEach(dot => {
    dot.addEventListener("click", function () {
        const slideNumber = parseInt(this.getAttribute("data-slide"));
        goToSlide(slideNumber);
    });
});

// Initialize the first slide
showSlide(currentSlide);