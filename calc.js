const equalsButton = document.getElementById("equals")
const addButton = document.getElementById("add")
const subtractButton = document.getElementById("subtract")
const multiplyButton = document.getElementById("multiply")
const divideButton = document.getElementById("divide")
const clearButton = document.getElementById("clear")
const decimalButton = document.getElementById("decimal")
const escButton = document.getElementById("esc")
const display = document.getElementById("display")

let firstOperand = '0';
let secondOperand;
let currentOperator;
let currentResult;

// Operate functionality
function operate(operator, a, b) {

    switch (operator) {
        case "+":
            res = add(a, b)
            return res
        case "-":
            res = subtract(a, b)
            return res
        case "*":
            res = multiply(a, b)
            return res
        case "/":
            res = divide(a, b)
            return res
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

addButton.setAttribute('operator', '+')
subtractButton.setAttribute('operator', '-')
multiplyButton.setAttribute('operator', '*')
divideButton.setAttribute('operator', '/')

function setOperator(e) {

    if (display.textContent == currentResult) {
        firstOperand = currentResult
        secondOperand = ''
    }
    if (currentOperator) {
        //typing operator after operator

        //multiple operations
        firstOperand = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand))
        secondOperand = ''
    }
    if (e.target.id == "subtract" && !firstOperand) {
        firstOperand = '-'
        display.textContent = firstOperand
    }
    else {
        currentOperator = e.target.getAttribute('operator')
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
        currentResult = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand)).toFixed(1)
        splitResult = currentResult.split(".")
        // Truncate number if ending in '.0'
        if (splitResult[splitResult.length - 1] === '0') {
            currentResult = Math.trunc(parseInt(currentResult))
        }
    }
    else {
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
    firstOperand = ''
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

