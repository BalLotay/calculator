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

buttons.addEventListener("mouseup", doStuffFirst)

function doStuffFirst(e) {
  if (e instanceof KeyboardEvent) {
    let button = document.querySelector(`[data-key="${e.key}"]`);
    if (!button) {
      button = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
    }
    if (button) {
      doStuff(button)
    }
  }
  if (e instanceof MouseEvent) {
    // console.log(e.target);
    doStuff(e.target);
  }
}

function doStuff(element) {
  console.log(element.classList);
  switch (true) {
    case element.classList.contains("ac"):
        result = operator1 = null;
        clearDisplay(); break;

    case element.classList.contains("change-sign"):
        display.textContent = -(+display.textContent); break;

    case element.classList.contains("percent"):
        display.textContent = (+display.textContent)/100; break;

    case element.classList.contains("number"):
        changeDisplay(element.textContent); break;

    case element.classList.contains("operator"):
        displayResult(element.textContent); break;

    case element.classList.contains("equals"):
        displayResult(element.textContent, true); break;
  }
}

window.addEventListener("keydown", doStuffFirst)
// window.addEventListener("keydown", (e) => {
//   let button = document.querySelector(`[data-key="${e.key}"]`)
//   console.log(button);
//   if ((!isNaN(e.key) && e.key !== " ") || e.key === ".") {
//     let numbersArray = Array.from(numbers);
//     for (let i = 0; i < numbersArray.length; i++) {
//       let element = numbersArray[i] 
//       if (element.textContent === e.key) {
//         console.log(element);
//         element.classList.add("number-click");
//         break;
//       }
//     }
//     changeDisplay(e.key);
//   }
//   switch (e.key) {
//     case "+":
//     case "-":
//       displayResult(e.key); break;
//     case "/":
//       displayResult("÷"); break;
//     case "*":
//       displayResult("×"); break;
//     case "=":
//     case "Enter":
//       displayResult("=", true); break;
//     case "%":
//     case "p":
//     case "P":
//       display.textContent = (+display.textContent)/100; break;
//     case "a":
//     case "A":
//       result = operator1 = null;
//       clearDisplay(); break;
//     case "c":
//     case "C":
//       navigator.clipboard.writeText(display.textContent); break;
//     case "v":
//     case "V":
//       paste(display); break;
//     case "s":
//     case "S":
//       display.textContent = -(+display.textContent); break;
//     case "m":
//     case "M":
//       body.classList.toggle("light-mode"); break;
//     case "Backspace":
//       let text = display.textContent;
//       if (text === "0")       {break;}
//       if (text.length === 1)  {display.textContent = "0"; break;}
//       display.textContent = text.substring(0,text.length-1); break;
//     case " ":
//       cheatSheet.classList.toggle("block"); break;
//   }
// })

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