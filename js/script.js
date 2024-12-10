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

function updateResultFields () {
    const waterLossDiv = document.getElementById('water-loss-div');
    const waterGainFromFoodDiv = document.getElementById('water-gain-div');
    const hydrationStatusDiv = document.getElementById('hydration-status-div');
    const actualLiquidIntakeDiv = document.getElementById('actual-liquid-intake-div');
    const hydrationStatusTextDiv = document.getElementById('hydration-status-text-div');
    const findOutMoreDiv = document.getElementById('find-out-more-div');
    // console.log("Selected Gender: ", selectedGender);
    // console.log("Selected Age: ", selectedAge);
    // console.log("Selected weight: ", selectedWeight);
    // console.log("Selected height: ", selectedHeight);
    // console.log("Selected activity: ", selectedActivity);
    // console.log("Selected country: ", selectedCountry);
    // console.log("Weather:", getClimate(selectedCountry));
    // console.log("Selected liquid: ", 
    //     (selectedWater+selectedSoda+selectedDietSoda+selectedFruitJuice+selectedCoffeeSugar+selectedCoffee+selectedWine+selectedBeer+selectedSport+selectedEnergy)
    // );

    // Update selected weight and height into kg and cm
    if (selectedUnits[0] === 'lb') {
        selectedWeight *= 0.454;
    }
    if (selectedUnits[1] === 'inch') {
        selectedHeight *= 2.54;
    }

    // Calculate total water loss
    const totalWaterLoss = calculateWaterDeficit((selectedGender === 'breastfeeding' || selectedGender === 'pregnant') ? 'female' : selectedGender, selectedAge, selectedHeight, selectedWeight, getClimate(selectedCountry), selectedActivity);
    waterLossDiv.innerText = totalWaterLoss;

    // Calculate climate and water gain according to country
    if(getClimate(selectedCountry).toLowerCase() === 'hot') waterGainFromFoodDiv.innerText = 0.5;
    else if(getClimate(selectedCountry).toLowerCase() === 'moderate') waterGainFromFoodDiv.innerText = 0.6;
    else if(getClimate(selectedCountry).toLowerCase() === 'cool') waterGainFromFoodDiv.innerText = 0.7;
    
    // Calculate hydration status
    const hydrationStatus = (parseFloat(totalWaterLoss) - parseFloat(waterGainFromFoodDiv.innerText)).toFixed(1);
    hydrationStatusDiv.innerText = hydrationStatus;
    
    // Calculate actual water intake
    const actualLiquidIntake = (selectedWater*0.25+selectedSoda*0.33+selectedDietSoda*0.33+selectedFruitJuice*0.25+selectedCoffeeSugar*0.125+selectedCoffee*0.125+selectedWine*0.125+selectedBeer*0.25+selectedSport*0.5+selectedEnergy*0.25).toFixed(1);
    actualLiquidIntakeDiv.innerText = actualLiquidIntake;

    // Publish the moral dynamically
    hydrationStatusTextDiv.innerText = hydrationStatus <= actualLiquidIntake ? "“You already seem to be taking in enough liquid every day.”" : "“Careful – it looks like you need to drink more than you thought!”";

    // Publish the find out more dynamically
    if (hydrationStatus <= actualLiquidIntake) {
        findOutMoreDiv.innerHTML = "Based on the information that you have given us, you are drinking a sufficient amount to compensate your daily water losses.<br>Our bodies are perpetually losing water. Much of this loss occurs unconsciously, through breathing and sweating (which happens constantly, even in cool conditions), and so it is easy to under-estimate how much water we need to consume to maintain our water balance.<br>It's true that all liquids hydrate, but it's also true that water is the only liquid our bodies need to hydrate.<br>Water is the most healthy and natural way to maintain you body's water balance.<br>It is recommended that you drink enough water every day. This is a simple and natural way to maintain your body's water balance. Be aware that factors such as hot weather, central heating, and physical exertion can all increase your water requirements.<br>Drinking at least 2L of water a day is a simple step towards a healthier lifestyle. Get into the habit of drinking at least this much water every day, and feel the benefits of being well hydrated.";
    } else {
        findOutMoreDiv.innerHTML = "Based on the information that you have given us, you do not drink enough to compensate your daily water losses.<br>Our bodies are perpetually losing water. Much of this loss occurs unconsciously, through breathing and sweating (which happens constantly, even in cool conditions), and so it is easy to under-estimate how much water we need to consume to maintain our water balance.<br>It's true that all liquids hydrate, but it's also true that water is the only liquid our bodies need to hydrate.<br>Water is the most healthy and natural way to maintain you body's water balance.<br>It is recommended that you drink enough water every day. This is a simple and natural way to maintain your body's water balance. Be aware that factors such as hot weather, central heating, and physical exertion can all increase your water requirements.<br>Drinking at least 2L of water a day is a simple step towards a healthier lifestyle. Get into the habit of drinking at least this much water every day, and feel the benefits of being well hydrated.";
    }
}

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

// Physical activity selection----------------------------------------------------------
const activityBars = document.querySelectorAll('.activity-bar');
const activityRange = document.getElementById('activity-range');
const selectedActivityText = document.getElementById('selected-activity');

function updateActivityBars(index) {
    activityBars.forEach((bar, idx) => {
        if (idx <= index) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
}

function updateActivity() {
    const index = this.dataset.index ? parseInt(this.dataset.index) : parseInt(activityRange.value);
    updateActivityBars(index);

    selectedActivity = activityBars[index].getAttribute('data-value');
    selectedActivityText.textContent = selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1);
    activityRange.value = index;
    updateResultFields();
}

document.addEventListener('DOMContentLoaded', () => {
    updateActivity.call(document.querySelector('.activity-bar[data-value="moderate"]'));
});

activityBars.forEach((bar, index) => {
    bar.dataset.index = index;
    bar.addEventListener('click', updateActivity);
});

activityRange.addEventListener('input', () => {
    updateActivity.call({dataset: {index: activityRange.value}});
});

// Country selection----------------------------------------------------------
const countrySelect = document.getElementById('country');

// Update the selected country when a new country is chosen
countrySelect.addEventListener('change', (e) => {
    selectedCountry = e.target.value;
    updateResultFields();
});

// Climate calculation according to country
function getClimate(country) {
    const climateData = {
        "UK": "Cool",
        "Argentina": "Moderate",
        "Brazil": "Hot",
        "China": "Moderate",
        "France": "Moderate",
        "Germany": "Cool",
        "Indonesia": "Hot",
        "Japan": "Moderate",
        "Mexico": "Hot",
        "Poland": "Cool",
        "Spain": "Hot",
        "Turkey": "Moderate",
        "Uruguay": "Moderate"
    };

    // Normalize the input to match keys (case-insensitive)
    country = country.trim();

    // Check if the country is in the climateData
    if (climateData[country]) {
        return climateData[country];
    } else {
        return "Moderate";
    }
}

// Liquid taking-----------------------------------------------------------------------------------------------------
let isCl = true;
const minLiquid = 0;
const maxLiquid = 15;

function updateDrinkValue(drinkInput, minValue, maxValue, amount, icon, decrementBtn, incrementBtn) {
    let drinkValue = parseFloat(drinkInput.value);
    drinkValue = Math.min(maxValue, Math.max(minValue, drinkValue + amount));
    
    // Update the input value
    drinkInput.value = drinkValue;

    // Update display and button styles
    updateDrinkDisplay(drinkValue, minValue, drinkInput, icon);
    updateDrinkButtonStyles(drinkValue, minValue, maxValue, decrementBtn, incrementBtn);

    return drinkValue;
}

// Change button styles and display the icon if value is at minimum
function updateDrinkDisplay(value, minValue, drinkInput, icon) {
    if (value <= minValue) {
        drinkInput.style.display = 'none';
        icon.style.display = 'block';
    } else {
        drinkInput.style.display = 'block';
        icon.style.display = 'none';
    }
}

// Change button styles based on the current value
function updateDrinkButtonStyles(value, minValue, maxValue, decrementBtn, incrementBtn) {
    // If at minimum, change decrement button color
    if (value <= minValue) {
        decrementBtn.style.backgroundColor = '#fff';
        decrementBtn.style.color = '#333333';
        decrementBtn.style.border = '1px solid #333333';
    } else {
        decrementBtn.style.backgroundColor = '';
        decrementBtn.style.color = '';
        decrementBtn.style.border = '';
    }

    // If at maximum, change increment button color
    if (value >= maxValue) {
        incrementBtn.style.backgroundColor = '#fff';
        incrementBtn.style.color = '#333333';
        incrementBtn.style.border = '1px solid #333333';
    } else {
        incrementBtn.style.backgroundColor = '';
        incrementBtn.style.color = '';
        incrementBtn.style.border = '';
    }
}

// Water selection-----------------------------------------------------
const waterInput = document.getElementById('water');
const waterIcon = document.getElementById('water-icon');
const waterDecrementBtn = document.getElementById('decrement-water');
const waterIncrementBtn = document.getElementById('increment-water');

// Handle water decrement
waterDecrementBtn.addEventListener('click', () => {
    selectedWater = updateDrinkValue(waterInput, minLiquid, maxLiquid, -1, waterIcon, waterDecrementBtn, waterIncrementBtn);
    updateResultFields();
});

// Handle water increment
waterIncrementBtn.addEventListener('click', () => {
    selectedWater = updateDrinkValue(waterInput, minLiquid, maxLiquid, 1, waterIcon, waterDecrementBtn, waterIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedWater, minLiquid, waterInput, waterIcon);
updateDrinkButtonStyles(selectedWater, minLiquid, maxLiquid, waterDecrementBtn, waterIncrementBtn);

// Soda selection-----------------------------------------------------
const sodaInput = document.getElementById('soda');
const sodaIcon = document.getElementById('soda-icon');
const sodaDecrementBtn = document.getElementById('decrement-soda');
const sodaIncrementBtn = document.getElementById('increment-soda');

// Handle soda decrement
sodaDecrementBtn.addEventListener('click', () => {
    selectedSoda = updateDrinkValue(sodaInput, minLiquid, maxLiquid, -1, sodaIcon, sodaDecrementBtn, sodaIncrementBtn);
    updateResultFields();
});

// Handle soda increment
sodaIncrementBtn.addEventListener('click', () => {
    selectedSoda = updateDrinkValue(sodaInput, minLiquid, maxLiquid, 1, sodaIcon, sodaDecrementBtn, sodaIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedSoda, minLiquid, sodaInput, sodaIcon);
updateDrinkButtonStyles(selectedSoda, minLiquid, maxLiquid, sodaDecrementBtn, sodaIncrementBtn);

// Diet Soda---------------------------------------------
const dietSodaInput = document.getElementById('diet-soda');
const dietSodaIcon = document.getElementById('diet-soda-icon');
const dietSodaDecrementBtn = document.getElementById('decrement-diet-soda');
const dietSodaIncrementBtn = document.getElementById('increment-diet-soda');

// Handle diet soda decrement
dietSodaDecrementBtn.addEventListener('click', () => {
    selectedDietSoda = updateDrinkValue(dietSodaInput, minLiquid, maxLiquid, -1, dietSodaIcon, dietSodaDecrementBtn, dietSodaIncrementBtn);
    updateResultFields();
});

// Handle diet soda increment
dietSodaIncrementBtn.addEventListener('click', () => {
    selectedDietSoda = updateDrinkValue(dietSodaInput, minLiquid, maxLiquid, 1, dietSodaIcon, dietSodaDecrementBtn, dietSodaIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedDietSoda, minLiquid, dietSodaInput, dietSodaIcon);
updateDrinkButtonStyles(selectedDietSoda, minLiquid, maxLiquid, dietSodaDecrementBtn, dietSodaIncrementBtn);

// Fruit Juice----------------------------------------------
const fruitJuiceInput = document.getElementById('fruit-juice');
const fruitJuiceIcon = document.getElementById('fruit-juice-icon');
const fruitJuiceDecrementBtn = document.getElementById('decrement-fruit-juice');
const fruitJuiceIncrementBtn = document.getElementById('increment-fruit-juice');

// Handle fruit juice decrement
fruitJuiceDecrementBtn.addEventListener('click', () => {
    selectedFruitJuice = updateDrinkValue(fruitJuiceInput, minLiquid, maxLiquid, -1, fruitJuiceIcon, fruitJuiceDecrementBtn, fruitJuiceIncrementBtn);
    updateResultFields();
});

// Handle fruit juice increment
fruitJuiceIncrementBtn.addEventListener('click', () => {
    selectedFruitJuice = updateDrinkValue(fruitJuiceInput, minLiquid, maxLiquid, 1, fruitJuiceIcon, fruitJuiceDecrementBtn, fruitJuiceIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedFruitJuice, minLiquid, fruitJuiceInput, fruitJuiceIcon);
updateDrinkButtonStyles(selectedFruitJuice, minLiquid, maxLiquid, fruitJuiceDecrementBtn, fruitJuiceIncrementBtn);

// Coffee Sugar-----------------------------------------------
const coffeeSugarInput = document.getElementById('coffee-sugar');
const coffeeSugarIcon = document.getElementById('coffee-sugar-icon');
const coffeeSugarDecrementBtn = document.getElementById('decrement-coffee-sugar');
const coffeeSugarIncrementBtn = document.getElementById('increment-coffee-sugar');

// Handle coffee sugar decrement
coffeeSugarDecrementBtn.addEventListener('click', () => {
    selectedCoffeeSugar = updateDrinkValue(coffeeSugarInput, minLiquid, maxLiquid, -1, coffeeSugarIcon, coffeeSugarDecrementBtn, coffeeSugarIncrementBtn);
    updateResultFields();
});

// Handle coffee sugar increment
coffeeSugarIncrementBtn.addEventListener('click', () => {
    selectedCoffeeSugar = updateDrinkValue(coffeeSugarInput, minLiquid, maxLiquid, 1, coffeeSugarIcon, coffeeSugarDecrementBtn, coffeeSugarIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedCoffeeSugar, minLiquid, coffeeSugarInput, coffeeSugarIcon);
updateDrinkButtonStyles(selectedCoffeeSugar, minLiquid, maxLiquid, coffeeSugarDecrementBtn, coffeeSugarIncrementBtn);

// Coffee--------------------------------------------------------------
const coffeeInput = document.getElementById('coffee');
const coffeeIcon = document.getElementById('coffee-icon');
const coffeeDecrementBtn = document.getElementById('decrement-coffee');
const coffeeIncrementBtn = document.getElementById('increment-coffee');

// Handle coffee decrement
coffeeDecrementBtn.addEventListener('click', () => {
    selectedCoffee = updateDrinkValue(coffeeInput, minLiquid, maxLiquid, -1, coffeeIcon, coffeeDecrementBtn, coffeeIncrementBtn);
    updateResultFields();
});

// Handle coffee increment
coffeeIncrementBtn.addEventListener('click', () => {
    selectedCoffee = updateDrinkValue(coffeeInput, minLiquid, maxLiquid, 1, coffeeIcon, coffeeDecrementBtn, coffeeIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedCoffee, minLiquid, coffeeInput, coffeeIcon);
updateDrinkButtonStyles(selectedCoffee, minLiquid, maxLiquid, coffeeDecrementBtn, coffeeIncrementBtn);

// Wine----------------------------------------------------------
const wineInput = document.getElementById('wine');
const wineIcon = document.getElementById('wine-icon');
const wineDecrementBtn = document.getElementById('decrement-wine');
const wineIncrementBtn = document.getElementById('increment-wine');

// Handle wine decrement
wineDecrementBtn.addEventListener('click', () => {
    selectedWine = updateDrinkValue(wineInput, minLiquid, maxLiquid, -1, wineIcon, wineDecrementBtn, wineIncrementBtn);
    updateResultFields();
});

// Handle wine increment
wineIncrementBtn.addEventListener('click', () => {
    selectedWine = updateDrinkValue(wineInput, minLiquid, maxLiquid, 1, wineIcon, wineDecrementBtn, wineIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedWine, minLiquid, wineInput, wineIcon);
updateDrinkButtonStyles(selectedWine, minLiquid, maxLiquid, wineDecrementBtn, wineIncrementBtn);

// Beer---------------------------------------------------------
const beerInput = document.getElementById('beer');
const beerIcon = document.getElementById('beer-icon');
const beerDecrementBtn = document.getElementById('decrement-beer');
const beerIncrementBtn = document.getElementById('increment-beer');

// Handle beer decrement
beerDecrementBtn.addEventListener('click', () => {
    selectedBeer = updateDrinkValue(beerInput, minLiquid, maxLiquid, -1, beerIcon, beerDecrementBtn, beerIncrementBtn);
    updateResultFields();
});

// Handle beer increment
beerIncrementBtn.addEventListener('click', () => {
    selectedBeer = updateDrinkValue(beerInput, minLiquid, maxLiquid, 1, beerIcon, beerDecrementBtn, beerIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedBeer, minLiquid, beerInput, beerIcon);
updateDrinkButtonStyles(selectedBeer, minLiquid, maxLiquid, beerDecrementBtn, beerIncrementBtn);

// Sport----------------------------------------------------
const sportInput = document.getElementById('sport');
const sportIcon = document.getElementById('sport-icon');
const sportDecrementBtn = document.getElementById('decrement-sport');
const sportIncrementBtn = document.getElementById('increment-sport');

// Handle sport decrement
sportDecrementBtn.addEventListener('click', () => {
    selectedSport = updateDrinkValue(sportInput, minLiquid, maxLiquid, -1, sportIcon, sportDecrementBtn, sportIncrementBtn);
    updateResultFields();
});

// Handle sport increment
sportIncrementBtn.addEventListener('click', () => {
    selectedSport = updateDrinkValue(sportInput, minLiquid, maxLiquid, 1, sportIcon, sportDecrementBtn, sportIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedSport, minLiquid, sportInput, sportIcon);
updateDrinkButtonStyles(selectedSport, minLiquid, maxLiquid, sportDecrementBtn, sportIncrementBtn);

// Energy ---------------------------------------------------------
const energyInput = document.getElementById('energy');
const energyIcon = document.getElementById('energy-icon');
const energyDecrementBtn = document.getElementById('decrement-energy');
const energyIncrementBtn = document.getElementById('increment-energy');

// Handle energy decrement
energyDecrementBtn.addEventListener('click', () => {
    selectedEnergy = updateDrinkValue(energyInput, minLiquid, maxLiquid, -1, energyIcon, energyDecrementBtn, energyIncrementBtn);
    updateResultFields();
});

// Handle energy increment
energyIncrementBtn.addEventListener('click', () => {
    selectedEnergy = updateDrinkValue(energyInput, minLiquid, maxLiquid, 1, energyIcon, energyDecrementBtn, energyIncrementBtn);
    updateResultFields();
});

// Initialize
updateDrinkDisplay(selectedEnergy, minLiquid, energyInput, energyIcon);
updateDrinkButtonStyles(selectedEnergy, minLiquid, maxLiquid, energyDecrementBtn, energyIncrementBtn);

// Listen for unit change (cl or oz) and update the input and label accordingly-----------------------------------------------------
const waterUnitSpan = document.getElementById('water-unit');
const sodaUnitSpan = document.getElementById('soda-unit');
const dietSodaUnitSpan = document.getElementById('diet-soda-unit');
const fruitJuiceUnitSpan = document.getElementById('fruit-juice-unit');
const coffeeSugarUnitSpan = document.getElementById('coffee-sugar-unit');
const coffeeUnitSpan = document.getElementById('coffee-unit');
const wineUnitSpan = document.getElementById('wine-unit');
const beerUnitSpan = document.getElementById('beer-unit');
const sportUnitSpan = document.getElementById('sport-unit');
const energyUnitSpan = document.getElementById('energy-unit');

function toggleLiquidUnit(isClSelected) {
    isCl = isClSelected;
    waterUnitSpan.textContent = isCl ? '(25cl)' : '(8.5oz)';
    sodaUnitSpan.textContent = isCl ? '(33cl)' : '(11.2oz)';
    dietSodaUnitSpan.textContent = isCl ? '(33cl)' : '(11.2oz)';
    fruitJuiceUnitSpan.textContent = isCl ? '(25cl)' : '(8.5oz)';
    coffeeSugarUnitSpan.textContent = isCl ? '(12.5cl)' : '(4.2oz)';
    coffeeUnitSpan.textContent = isCl ? '(12.5cl)' : '(4.2oz)';
    wineUnitSpan.textContent = isCl ? '(12.5cl)' : '(4.2oz)';
    beerUnitSpan.textContent = isCl ? '(25cl)' : '(8.5oz)';
    sportUnitSpan.textContent = isCl ? '(50cl)' : '(16.9oz)';
    energyUnitSpan.textContent = isCl ? '(25cl)' : '(8.5oz)';
}

// Calculate water loss----------------------------------------------------------------------------
function calculateWaterDeficit(gender, age, height, weight, climate, activityLevel) {
    // Convert string inputs to lowercase for case-insensitive matching
    gender = gender.toLowerCase();
    climate = climate.toLowerCase();
    activityLevel = activityLevel.toLowerCase();

    // Step 1: Calculate Body Surface Area (BSA) using DuBois formula
    const BSA = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);

    // Step 2: Estimate Skin Evaporation Loss based on climate
    const evaporationRates = {
        "hot": 650,
        "moderate": 450,
        "cool": 300
    };
    const skinEvaporationLoss = BSA * evaporationRates[climate];

    // Step 3: Calculate Caloric Expenditure using Mifflin-St Jeor equation
    let BMR;
    if (gender === "male") {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const activityFactors = {
        "sedentary": 1.2,
        "moderate": 1.55,
        "active": 1.9
    };
    const calories = BMR * activityFactors[activityLevel];

    // Step 4: Calculate Respiratory Water Loss
    const respiratoryLoss = calories * 0.12;

    // Step 5: Calculate Metabolic Water Production
    const metabolicWaterProduction = calories * 0.12;

    // Step 6: Calculate Skin Sweat Loss based on climate and activity level
    const sweatRates = {
        "hot": 12,
        "moderate": 8,
        "cool": 5
    };
    const sweatLoss = weight * sweatRates[climate];  // Assuming 1 hour of activity

    // Step 7: Calculate Fixed Water Loss
    const faecalLoss = 200;
    const urineLoss = 1000;

    // Step 8: Calculate Total Water Deficit
    const waterDeficit = skinEvaporationLoss + respiratoryLoss + sweatLoss + faecalLoss + urineLoss - metabolicWaterProduction;

    return (waterDeficit/1000).toFixed(1); 
}

// Hints and tips------------------------------------------------------------------------------------------
function toggleHintsTips(isHidden) {
    const settingsIconDiv = document.getElementById('settings-icon-div');
    settingsIconDiv.style.visibility = isHidden ? 'hidden' : 'visible';

    const slide4Container = document.getElementById('slide-4');
    slide4Container.style.display = isHidden ? 'none' : 'block';

    const sliderFooterDiv = document.getElementById('slider-footer-div');
    sliderFooterDiv.style.opacity = isHidden ? 0 : 1;
    sliderFooterDiv.style.pointerEvents = isHidden ? 'none' : 'auto';

    const hintsTipsContent = document.getElementById('hints-tips-content');
    hintsTipsContent.style.display = isHidden ? 'block' : 'none';
}

// Find out more------------------------------------------------------------------------------------------
function toggleFindOutMore(isHidden) {
    const settingsIconDiv = document.getElementById('settings-icon-div');
    settingsIconDiv.style.visibility = isHidden ? 'hidden' : 'visible';

    const slide4Container = document.getElementById('slide-4');
    slide4Container.style.display = isHidden ? 'none' : 'block';

    const sliderFooterDiv = document.getElementById('slider-footer-div');
    sliderFooterDiv.style.opacity = isHidden ? 0 : 1;
    sliderFooterDiv.style.pointerEvents = isHidden ? 'none' : 'auto';

    const findOutMoreContent = document.getElementById('find-out-more-content');
    findOutMoreContent.style.display = isHidden ? 'block' : 'none';
}