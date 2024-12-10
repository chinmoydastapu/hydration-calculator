let isSettingsOpen = false;

// Array to track selected units
let selectedUnits = ['kg', 'cm', 'cl'];

function toggleSettings() {
    const button = document.getElementById('toggle-btn');
    const settingsPanel = document.getElementById('settings-panel');

    if (!isSettingsOpen) {
        button.innerHTML = `<img src=${'../img/close-icon.svg'} alt='X'>`;
        settingsPanel.classList.add('visible');
        isSettingsOpen = true;
        button.style.boxShadow = "none";
        settingsPanel.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    } else {
        button.innerHTML = `<img src=${'../img/setting-icon.svg'} alt='X'>`;
        settingsPanel.classList.remove('visible');
        isSettingsOpen = false;
        button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        settingsPanel.style.boxShadow = "none";
    }
}

function toggleUnits(selected, other) {
    const selectedBtn = document.getElementById(`${selected}-btn`);
    const otherBtn = document.getElementById(`${other}-btn`);

    selectedBtn.classList.add('active');
    otherBtn.classList.remove('active');
    updateSelectedUnits(selected, other);
}

function updateSelectedUnits(selected, other) {
    if (selected === 'kg' || selected === 'lb') {
        selectedUnits[0] = selected;
        selectedUnits[0] === 'kg' ? toggleWeightUnit(true) : toggleWeightUnit(false);
    } else if (selected === 'cm' || selected === 'inch') {
        selectedUnits[1] = selected;
        selectedUnits[1] === 'cm' ? toggleHeightUnit(true) : toggleHeightUnit(false);
    } else if (selected === 'cl' || selected === 'oz') {
        selectedUnits[2] = selected;
        selectedUnits[2] === 'cl' ? toggleLiquidUnit(true) : toggleLiquidUnit(false);
    }
}