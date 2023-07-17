const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const buttons = document.querySelector(".buttons")
const ac = document.querySelector(".ac");
const operators = document.querySelectorAll(".operator")
const mainArray = [];
let toClear;
let result;

let a, b, operator1;

// function changeDisplay() {
//     numbers.forEach((number) => {
//         number.addEventListener("click", (e) => {
//           console.log(e);
//             if (display.textContent === "0") {display.textContent = ""};
//             display.textContent += number.textContent;
//         });
//     });
// }


function changeDisplay(e) {
  if (display.textContent === "0" || toClear) {
    display.textContent = ""
  };
  // console.log(e.target.textContent);
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
// function displayResult() {
//   let result = display.textContent;

//   if (mainArray.length !== 0) {
//     mainArray.push(display.textContent);

//     let [operator, a, b] = mainArray
//     result = operate(operator, +a, +b);

//     display.textContent = result;
//     mainArray.splice(0, mainArray.length);
//   }

//   mainArray.push(e.target.textContent);
//   mainArray.push(result);
//   toClear = true;
//   console.log(mainArray);
// }

// function clearDisplay() {
//     ac.addEventListener("click", () => {
//         display.textContent = "0";
//     });
// }

function operatorClick() {
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      const currentNumber = +display.textContent;
      // numbers.forEach((number) => {
      //   number.addEventListener("click", () => {
      //     // console.log(currentNumber);
      //     // console.log(number.textContent);

      //     const result = operate(
      //       operator.textContent, 
      //       currentNumber, 
      //       +number.textContent);

      //     display.textContent = result
      //     console.log(currentNumber, operator.textContent, +number.textContent, "=", result);
      //     return;
      //   });
      // });
      display.textContent = ""
      changeDisplay()
    });
  });
    
}

// changeDisplay()
// clearDisplay()
// operatorClick()

console.log(mainArray);

buttons.addEventListener("mouseup", (e) => {
  if (e.target.classList.contains("ac")) {
    result = operator1 = null;
    clearDisplay();
    // mainArray.splice(0, mainArray.length);
  }
  if (e.target.classList.contains("change-sign")) {
    display.textContent = -(+display.textContent);
  }
  if (e.target.classList.contains("percent")) {
    display.textContent = (+display.textContent)/100;
  }
  if (!isNaN(e.target.textContent)) {
    changeDisplay(e);
  }
  if (e.target.classList.contains("operator")) {
    displayResult(e)
  }
  if (e.target.classList.contains("equals")) {
    displayResult(e, true);
  }
})

function evaluateExpression(array) {
  // [0,1,2,+,x,2,-,3]
  // [1,2,+,x,2,-,3]
  // [x,2,+,x,2,-,3]
  
  stringArray = makeString(array);
  
  let stack = [];
  if (isNaN(+stringArray[0])) {
    stack.push(0)
  }
  for (let i = 0; i < stringArray.length; i++) {
    let current = stringArray[i];
    let previous = stringArray[i-1];
    
    if (i === 0) {
      stack.push(current);
      continue;
    }
    
    if (!isNaN(previous) && !isNaN(current)) {
      stack.push(stack.pop() + stringArray[i]);
      continue;
    }
    stack.push(stringArray[i])
  }
  console.log(stack)
}

function makeString(array) {
  let stringArray = [];
  for (let i = 0; i < array.length; i++) {
    stringArray.push(array[i].toString())
  }
  return stringArray;
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