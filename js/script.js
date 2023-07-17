const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons")
const ac = document.querySelector(".ac");
const operators = document.querySelectorAll(".operator")
let toClear;
let result, operator1;

function changeDisplay(e) {
  if (display.textContent === "0" || toClear) {
    display.textContent = ""
  };
  display.textContent += e.target.textContent;
  toClear = false;
}

function clearDisplay() {
  display.textContent = "0";
}

function displayResult(e, makeNull=false) {
  if (operator1) {
    console.log(operator1, result, +display.textContent);
    result = operate(operator1, result, +display.textContent)
    display.textContent = result;
  }

  result = +display.textContent;
  operator1 = e.target.textContent;
  
  if (makeNull) {
    operator1 = null
  }

  toClear = true;
  console.table(operator1, result);
}

buttons.addEventListener("mouseup", (e) => {
  if (e.target.classList.contains("ac")) {
    result = operator1 = null;
    clearDisplay();
  }
  if (e.target.classList.contains("change-sign")) {
    display.textContent = -(+display.textContent);
  }
  if (e.target.classList.contains("percent")) {
    display.textContent = (+display.textContent)/100;
  }
  if (e.target.classList.contains("number")) {
  // if (!isNaN(e.target.textContent)) {
    changeDisplay(e);
  }
  if (e.target.classList.contains("operator")) {
    displayResult(e)
  }
  if (e.target.classList.contains("equals")) {
    displayResult(e, true);
  }
})

function add(a, b) {
    return a + b;
};
  
function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            break;
    }
}