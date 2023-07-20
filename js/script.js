const body = document.querySelector("body");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const numbers = document.querySelectorAll(".number")
const ac = document.querySelector(".ac");
const operators = document.querySelectorAll(".operator");
const darkMode = document.querySelector("svg");
const cheatSheet = document.querySelector(".cheatsheet");
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
  console.log(operator1);
  if (operator1) {
    console.log(operator1, result, +display.textContent);
    result = operate(operator1, result, +display.textContent);
    display.textContent = (result === Infinity || isNaN(result)) ? "☠️" : result;
  }

  result = +display.textContent;
  operator1 = text;
  
  if (makeNull) {
    operator1 = null
  }

  toClear = true;
  console.table(operator1, result);
}


function checkIfButtonExists(e) {
  let button;
  if (e instanceof KeyboardEvent) {
    button = document.querySelector(`[data-key="${e.key}"]`);
    if (!button) {
      button = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
    }
  }
  else if (e instanceof MouseEvent) {
    button = e.target;
  }
  
  if (button) doStuffIfButtonExists(button);
}


window.addEventListener("keydown", checkIfButtonExists)
buttons.addEventListener("mouseup", checkIfButtonExists)

function doStuffIfButtonExists(element) {
    let keyText = element.dataset.key;

    if ((!isNaN(keyText) && keyText !== " ") || keyText === ".") {
      element.classList.add("number-click");
      changeDisplay(keyText);
      return;
    }

    switch (keyText) {
      case "+":
      case "-":
        displayResult(keyText); break;
      case "/":
        displayResult("÷"); break;
      case "*":
        displayResult("×"); break;
      case "=":
      case "Enter":
        displayResult(keyText, true); break;
      case "%":
      case "p":
        display.textContent = (+display.textContent)/100; break;
      case "a":
        result = operator1 = null;
        clearDisplay(); break;
      case "c":
        navigator.clipboard.writeText(display.textContent); break;
      case "v":
        paste(display); break;
      case "s":
        display.textContent = -(+display.textContent); break;
      case "m":
        body.classList.toggle("light-mode"); break;
      case "Backspace":
        let text = display.textContent;
        if (text === "0")       {break;}
        if (text.length === 1)  {display.textContent = "0"; break;}
        display.textContent = text.substring(0,text.length-1); break;
      case " ":
        cheatSheet.classList.toggle("block"); break;
    }
  }

window.addEventListener("transitionend", (e) => {
  if (e.target.classList.contains("number-click")) {
    e.target.classList.remove("number-click");
  }
})

display.addEventListener("click", () => {
  navigator.clipboard.writeText(display.textContent);
})

darkMode.addEventListener("click", () => {
  body.classList.toggle("light-mode");
})

async function paste(input) {
  let text = await navigator.clipboard.readText();
  if (!isNaN(text) && text !== "") {
    input.textContent = text;
  }
  console.log(text);
}

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