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
    document.getElementById('next-btn').innerText = (slideNumber === totalSlides - 1) ? 'See Results' : 'Next';
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

// =========================== ALL VARIABLES FOR FINAL CALCULATIONS ====================================
let selectedGender = 'male';
let selectedAge = 25;
let selectedWeight = 80;
let selectedHeight = 170;
let selectedActivity = 'weekly';
let selectedCountry = 'UK';
let selectedWater = 0;
let selectedSoda = 0;
let selectedDietSoda = 0;
let selectedFruitJuice = 0;
let selectedCoffeeSugar = 0;
let selectedCoffee = 0;
let selectedWine = 0;
let selectedBeer = 0;
let selectedSport = 0;
let selectedEnergy = 0;

// Gender selection------------------------------------------------------------------------
const maleImg = document.querySelector('.gender-input-field img[alt="Male"]');
const femaleImg = document.querySelector('.gender-input-field img[alt="Female"]');
const genderField = document.querySelector('.gender-input-field');

const maleUnselected = './img/gender-male-icon.svg';
const maleSelected = './img/gender-male-icon-colored.svg';
const femaleUnselected = './img/gender-female-icon.svg';
const femaleSelected = './img/gender-female-icon-colored.svg';

maleImg.src = maleSelected;
genderField.classList.add('hide-arrow');

// Function to create dropdown for female
function createFemaleDropdown() {
    const dropdown = document.createElement('select');
    dropdown.innerHTML = `
        <option value="female">&mdash;</option>
        <option value="pregnant">Pregnant</option>
        <option value="breastfeeding">Breastfeeding</option>
    `;
    dropdown.classList.add('female-options');
    dropdown.addEventListener('change', () => {
        selectedGender = dropdown.value;
        updateResultFields();
    });
    return dropdown;
}

maleImg.addEventListener('click', () => {
    // Reset to default view when male is selected
    maleImg.src = maleSelected;
    femaleImg.src = femaleUnselected;
    const dropdown = document.querySelector('.female-options');
    if (dropdown) {
        dropdown.classList.remove('show');
        setTimeout(() => dropdown.remove(), 200);
    }
    genderField.classList.add('hide-arrow');
    selectedGender = 'male'; // Update the gender selection
    updateResultFields();
});

femaleImg.addEventListener('click', () => {
    femaleImg.src = femaleSelected;
    maleImg.src = maleUnselected;

    if (!document.querySelector('.female-options')) {
        const dropdown = createFemaleDropdown();
        genderField.appendChild(dropdown);
        setTimeout(() => dropdown.classList.add('show'), 10);
        genderField.classList.remove('hide-arrow');
    }
    selectedGender = 'female'; // Update the gender selection
    updateResultFields();
});

// Age selection-----------------------------------------------------------------
const ageInput = document.getElementById('age');
const ageRange = document.getElementById('age-range');

ageInput.value = selectedAge;

// Update the age and range on number input change
ageInput.addEventListener('input', (e) => {
    if (e.target.value === '') {
        ageRange.value = ageRange.min;
        selectedAge = 18;
        updateResultFields();
    } else {
        selectedAge = e.target.value;
        ageRange.value = selectedAge;
        updateResultFields();
    }

    selectedAge = selectedAge < 18 ? 18 : selectedAge;
    updateResultFields();
});

// Update the number input when the range slider is moved
ageRange.addEventListener('input', (e) => {
    selectedAge = e.target.value;
    ageInput.value = selectedAge;
    updateResultFields();
});

// Weight selection-------------------------------------------------------------
let isKg = true;
const kgToLbFactor = 2.20462;
const minWeightKg = 35;
const maxWeightKg = 124;

const weightInput = document.getElementById('weight');
const weightUnitSpan = document.getElementById('weight-unit');
const weightDecrementBtn = document.getElementById('decrement-weight');
const weightIncrementBtn = document.getElementById('increment-weight');

// Update the weight value based on kg or lb
function updateWeightValue(amount) {
    let weight = parseFloat(weightInput.value);
    if (isKg) {
        weight = Math.min(maxWeightKg, Math.max(minWeightKg, weight + amount));
    } else {
        weight = weight / kgToLbFactor;
        weight = Math.min(maxWeightKg, Math.max(minWeightKg, weight + (amount / kgToLbFactor)));
    }
    selectedWeight = parseFloat(isKg ? weight : (weight * kgToLbFactor).toFixed(0));
    weightInput.value = selectedWeight;
    updateResultFields();

    // Update button colors
    updateButtonStyles(weight);
}

// Update weight from direct input changes
function handleInputChange() {
    let weight = parseFloat(weightInput.value);
    if (isNaN(weight)) return;

    weight = isKg ? weight : weight / kgToLbFactor;
    weight = Math.min(maxWeightKg, Math.max(minWeightKg, weight));
    selectedWeight = parseFloat(isKg ? weight : (weight * kgToLbFactor).toFixed(0));
    updateResultFields();

    // Update button colors
    updateButtonStyles(weight);
}

// Change button styles based on the current weight
function updateButtonStyles(weight) {
    // If weight is at minimum, change decrement button color
    if (weight <= minWeightKg) {
        weightDecrementBtn.style.backgroundColor = '#fff';
        weightDecrementBtn.style.color = '#333333';
        weightDecrementBtn.style.border = '1px solid #333333';
    } else {
        weightDecrementBtn.style.backgroundColor = '';
        weightDecrementBtn.style.color = '';
        weightDecrementBtn.style.border = '';
    }

    // If weight is at maximum, change increment button color
    if (weight >= maxWeightKg) {
        weightIncrementBtn.style.backgroundColor = '#fff';
        weightIncrementBtn.style.color = '#333333';
        weightIncrementBtn.style.border = '1px solid #333333';
    } else {
        weightIncrementBtn.style.backgroundColor = '';
        weightIncrementBtn.style.color = '';
        weightIncrementBtn.style.border = '';
    }
}

// Handle decrement
weightDecrementBtn.addEventListener('click', () => {
    updateWeightValue(-1);
});

// Handle increment
weightIncrementBtn.addEventListener('click', () => {
    updateWeightValue(1);
});

// Listen for direct changes in the input field
weightInput.addEventListener('input', handleInputChange);

// Listen for unit change (kg or lb) and update the input and label accordingly
function toggleWeightUnit(isKgSelected) {
    isKg = isKgSelected;
    let weight = parseFloat(weightInput.value);
    weightInput.value = isKg ? (weight / kgToLbFactor).toFixed(0) : (weight * kgToLbFactor).toFixed(0);
    weightUnitSpan.textContent = isKg ? 'kg' : 'lb';
}

// Height selection-----------------------------------------------------------------------------
let isCm = true;
const cmToInchFactor = 0.393701;
const minHeightCm = 130;
const maxHeightCm = 230;

const heightInput = document.getElementById('height');
const heightUnitSpan = document.getElementById('height-unit');
const heightDecrementBtn = document.getElementById('decrement-height');
const heightIncrementBtn = document.getElementById('increment-height');

// Update the height value based on cm or inches
function updateHeightValue(amount) {
    let height = parseFloat(heightInput.value);
    if (isCm) {
        height = Math.min(maxHeightCm, Math.max(minHeightCm, height + amount));
    } else {
        height = height / cmToInchFactor;
        height = Math.min(maxHeightCm, Math.max(minHeightCm, height + (amount / cmToInchFactor)));
    }
    selectedHeight = parseFloat(isCm ? height : (height * cmToInchFactor).toFixed(0));
    heightInput.value = selectedHeight;
    updateResultFields();

    // Update button colors
    updateHeightButtonStyles(height);
}

// Update height from direct input changes
function handleHeightInputChange() {
    let height = parseFloat(heightInput.value);
    if (isNaN(height)) return;

    height = isCm ? height : height / cmToInchFactor;
    height = Math.min(maxHeightCm, Math.max(minHeightCm, height));
    selectedHeight = parseFloat(isCm ? height : (height * cmToInchFactor).toFixed(0));
    updateResultFields();

    // Update button colors
    updateHeightButtonStyles(height);
}

// Change button styles based on the current height
function updateHeightButtonStyles(height) {
    // If height is at minimum, change decrement button color
    if (height <= minHeightCm) {
        heightDecrementBtn.style.backgroundColor = '#fff';
        heightDecrementBtn.style.color = '#333333';
        heightDecrementBtn.style.border = '1px solid #333333';
    } else {
        heightDecrementBtn.style.backgroundColor = '';
        heightDecrementBtn.style.color = '';
        heightDecrementBtn.style.border = '';
    }

    // If height is at maximum, change increment button color
    if (height >= maxHeightCm) {
        heightIncrementBtn.style.backgroundColor = '#fff';
        heightIncrementBtn.style.color = '#333333';
        heightIncrementBtn.style.border = '1px solid #333333';
    } else {
        heightIncrementBtn.style.backgroundColor = '';
        heightIncrementBtn.style.color = '';
        heightIncrementBtn.style.border = '';
    }
}

// Handle decrement
heightDecrementBtn.addEventListener('click', () => {
    updateHeightValue(-1);
});

// Handle increment
heightIncrementBtn.addEventListener('click', () => {
    updateHeightValue(1);
});

// Listen for direct changes in the input field
heightInput.addEventListener('input', handleHeightInputChange);

// Listen for unit change (cm or inches) and update the input and label accordingly
function toggleHeightUnit(isCmSelected) {
    isCm = isCmSelected;
    let height = parseFloat(heightInput.value);
    heightInput.value = isCm ? (height / cmToInchFactor).toFixed(0) : (height * cmToInchFactor).toFixed(0);
    heightUnitSpan.textContent = isCm ? 'cm' : 'in';
}