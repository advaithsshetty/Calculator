let display = document.getElementById('display');
let operations = document.getElementById('operations');
let operator = '';
let operand1 = '';
let operand2 = '';
let historyElement = document.getElementById('history');

function updateDisplay(value) {
    display.value = value;
}

function updateOperations(value) {
    operations.value = value;
}

function clearDisplay() {
    updateDisplay('');
    updateOperations('');
}

function appendCharacter(character) {
  display.value += character;

}

function appendOperator(op) {
    operator = op;
    operand1 = display.value;
    updateOperations(`${operand1} ${operator}`);
    display.value = '';
}

function calculateResult() {
    operand2 = display.value;
    let expression = `${operand1} ${operator} ${operand2}`;
    try {
        const result = new Function(`return ${expression}`)();
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid operation');
        }
        updateDisplay(result);
        updateOperations('');
    } catch (error) {
        console.error(error);
        updateDisplay('Error');
    }
}

function backspace() {
    const currentDisplay = display.value;
    display.value = currentDisplay.slice(0, -1);
}

function showPopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'block';
}

function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
}

function toggleFullscreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullscreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
    const exitFullscreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullscreen.call(docEl);
    } else {
        exitFullscreen.call(doc);
    }
}