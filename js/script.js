const body = document.querySelector("body");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons")
const ac = document.querySelector(".ac");
const operators = document.querySelectorAll(".operator");
const darkMode = document.querySelector("svg");
let toClear;
let result, operator1;
const re = /^0(\.)*/

function changeDisplay(text) {
  if ((display.textContent.match(re) || toClear) && 
        text === ".") {
    display.textContent = "0.";
    toClear = false;
    return;    
  }
  if (display.textContent === "0" || toClear) {
    display.textContent = "";
  };
  display.textContent += text;
  toClear = false;
}

function clearDisplay() {
  display.textContent = "0";
}

function displayResult(text, makeNull=false) {
  if (operator1) {
    console.log(operator1, result, +display.textContent);
    result = operate(operator1, result, +display.textContent);
    display.textContent = (result === Infinity || result === NaN) ? "☠️" : result;
  }

  result = +display.textContent;
  operator1 = text;
  
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
    changeDisplay(e.target.textContent);
  }
  if (e.target.classList.contains("operator")) {
    displayResult(e.target.textContent)
  }
  if (e.target.classList.contains("equals")) {
    displayResult(e.target.textContent, true);
  }
})

window.addEventListener("keydown", (e) => {
  if ((!isNaN(e.key) && e.key !== " ") || e.key === ".") {
    changeDisplay(e.key);
  }
  switch (e.key) {
    case "+":
    case "-":
      displayResult(e.key); break;
    case "/":
      displayResult("÷"); break;
    case "*":
      displayResult("×"); break;
    case "=":
    case "Enter":
      displayResult("=", true); break;
    case "%":
      display.textContent = (+display.textContent)/100; break;
    case "a":
    case "A":
      result = operator1 = null;
      clearDisplay(); break;
    case "c":
    case "C":
      navigator.clipboard.writeText(display.textContent); break;
    case "s":
    case "S":
      display.textContent = -(+display.textContent); break;
    case "Backspace":
      let text = display.textContent;
      if (text === "0")       {break;}
      if (text.length === 1)  {display.textContent = "0"; break;}
      display.textContent = text.substring(0,text.length-1); break;
  }
})

display.addEventListener("click", () => {
  navigator.clipboard.writeText(display.textContent);
})

darkMode.addEventListener("click", () => {
  body.classList.toggle("light-mode");
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