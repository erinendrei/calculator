const equalsButton = document.getElementById("equals")
const addButton = document.getElementById("add")
const subtractButton = document.getElementById("subtract")
const multiplyButton = document.getElementById("multiply")
const divideButton = document.getElementById("divide")
const clearButton = document.getElementById("clear")
const decimalButton = document.getElementById("decimal")
const escButton = document.getElementById("esc")
const pmButton = document.getElementById("plusminus")
const display = document.getElementById("display")

const decimalPlaces = 9

let firstOperand = '0';
let secondOperand;
let currentOperator;
let currentResult = '';

// Operate functionality
function operate(operator, a, b) {

    switch (operator) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "*":
            return multiply(a, b)
        case "/":
            return divide(a, b)
    }
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return b === 0 ? "Nem." : a / b
}

// Operator buttons
operatorButtons = document.querySelectorAll(".operator")
operatorButtons.forEach((btn) => btn.addEventListener('click', setOperator))



function setOperator(e) {
    if (currentResult && !firstOperand) {
        firstOperand = currentResult
        secondOperand = ''
    }

    if (e.target.id == "subtract") {
        if (!firstOperand) {
            firstOperand = '-'
            display.textContent = firstOperand
        }
        if (firstOperand && currentOperator && !secondOperand) {
            secondOperand = '-'
            display.textContent += secondOperand
        }
    }

    let lastChar = display.textContent.split("").pop()
    if (parseInt(lastChar) || parseInt(lastChar) === 0) {
        if (currentOperator) {
            //multiple operations
            firstOperand = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand))
        }

        currentOperator = e.target.dataset.id
        display.textContent += currentOperator
        secondOperand = ''
    }

}

// Number buttons
numberButtons = document.querySelectorAll(".number")
numberButtons.forEach((btn) => btn.addEventListener('click', setOperand))

function setOperand(e) {
    operand = e.target.textContent

    if (!firstOperand || (firstOperand == '0' && !currentOperator)) {
        firstOperand = operand
        display.textContent = operand
        secondOperand = ''
    }
    else if (firstOperand && firstOperand !== '0' && !currentOperator) {
        if (firstOperand == '-0') {
            firstOperand = '-'
            display.textContent = firstOperand
        }
        firstOperand += operand
        display.textContent += operand
        secondOperand = ''
    }
    else if (firstOperand && currentOperator) {
        secondOperand += operand
        display.textContent += operand
    }
}

// Equals button
equalsButton.addEventListener('click', equalsListener)

function equalsListener(e) {
    if (firstOperand && secondOperand) {
        currentResult = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand)).toFixed(decimalPlaces)
        splitResult = currentResult.split(".")
        splitLast = splitResult[splitResult.length - 1]
        // Truncate number if ending in zeros
        if (splitLast[splitLast.length - 1] === '0') {
            currentResult = parseFloat(currentResult)
        }
    }
    else if (!currentResult) {
        currentResult = '0'
    }
    display.textContent = currentResult
    currentOperator = null
    firstOperand = null
    secondOperand = null
}



// Clear button
clearButton.addEventListener('click', clearListener)

function clearListener() {
    firstOperand = '0'
    secondOperand = ''
    currentOperator = ''
    currentResult = '0'
    display.textContent = '0'
}

// Decimal button    
decimalButton.addEventListener('click', decimalListener)

function decimalListener() {

    if (!firstOperand) {
        firstOperand = '0.'
        display.textContent += "."
    }
    else if (!currentOperator && !firstOperand.includes(".")) {
        firstOperand += "."
        display.textContent += "."

    }
    else if (currentOperator && !secondOperand.includes(".")) {
        secondOperand += "."
        display.textContent += "."
    }

}

// Backspace button
escButton.addEventListener('click', escListener)

function escListener() {
    if (!firstOperand) {
        if (currentResult) {
            if (currentResult.toString().length > 1) {
                firstOperand = currentResult.toString().slice(0, -1)
            }
            else {
                firstOperand = '0'
            }
            currentResult = ''
            secondOperand = ''
        }
        else if (!currentResult) {
            firstOperand = '0'
        }

        display.textContent = firstOperand
    }

    else {
        if (firstOperand.length == 1 && !currentOperator) {
            firstOperand = '0'
            display.textContent = '0'
        }
        else {
            if (firstOperand.length > 1 && !currentOperator) {
                firstOperand = firstOperand.slice(0, -1)
            }
            else if (currentOperator && (!secondOperand)) {
                currentOperator = null
            }
            else {
                secondOperand = secondOperand.slice(0, -1)
            }
            display.textContent = display.textContent.slice(0, -1)
        }
    }
}

//Plus-minus button

pmButton.addEventListener('click', pmListener)
function pmListener() {
    if (!firstOperand) {
        if (String(currentResult)[0] !== '-') { firstOperand = '-' + currentResult }
        else { firstOperand = String(currentResult).slice(1, currentResult.length) }
        display.textContent = firstOperand
    }
    else if (firstOperand[0] == '-' && !currentOperator) {
        firstOperand = firstOperand.slice(1, firstOperand.length)
        display.textContent = firstOperand
    }
    else if (firstOperand[0] !== '-' && !currentOperator) {
        firstOperand = '-' + firstOperand
        display.textContent = firstOperand
    }
    else if (currentOperator && !secondOperand) {
        secondOperand = '-'
        display.textContent += secondOperand
    }
    else if (secondOperand[0] !== '-') {
        secondOperand = '-' + secondOperand
        display.textContent = firstOperand + currentOperator + secondOperand
    }
    else if (secondOperand[0] == '-') {
        secondOperand = secondOperand.slice(1, secondOperand.length)
        display.textContent = firstOperand + currentOperator + secondOperand
    }

}

window.addEventListener('keydown', getKeyPress)

const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.', 'Backspace', 'Enter', '=']
function getKeyPress(e) {

    if (allowedKeys.includes(e.key)) {
        if (e.key === 'Enter') {
            keyIdString = `[data-id="="]`
        }
        else {
            keyIdString = `[data-id="${e.key}"]`
        }
        let btn = document.querySelector(keyIdString)
        btn.click()
    }
    e.preventDefault()
}

