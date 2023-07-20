const body = document.querySelector("body");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const darkMode = document.querySelector("svg");
const cheatSheet = document.querySelector(".cheatsheet");
let toClear;
let result, operator;
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
  console.log(operator);
  if (operator) {
    console.log(operator, result, +display.textContent);
    result = operate(operator, result, +display.textContent);
    display.textContent = (result === Infinity || isNaN(result)) ? "☠️" : result;
  }

  result = +display.textContent;
  operator = text;
  
  if (makeNull) {
    operator = null
  }

  toClear = true;
  console.table(operator, result);
}

function checkIfButtonExists(e) {
  let button;
  if (e instanceof KeyboardEvent) {
    button = document.querySelector(`[data-key="${e.key}"]`) ?
              document.querySelector(`[data-key="${e.key.toLowerCase()}"]`) :
                document.querySelector(`[data-other-key="${e.key}"]`);
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
    if (element.classList.contains("orange-column")) {
      element.classList.add("orange-column-click");
    }
    if (element.classList.contains("dark-row")) {
      element.classList.add("dark-row-click");
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
        result = operator = null;
        clearDisplay(); break;
      case "c":
        let currentText = display.textContent;
        navigator.clipboard.writeText(display.textContent);
        display.textContent = "✅";
        setTimeout(() => {display.textContent = currentText}, 300); break;
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
  if (e.target.classList.contains("orange-column-click")) {
    e.target.classList.remove("orange-column-click");
  }
  if (e.target.classList.contains("dark-row-click")) {
    e.target.classList.remove("dark-row-click");
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