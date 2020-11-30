//TODO: Clear button doesn't fully clear, split into "clear" and "all clear"?

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const working = document.querySelector("#working");
const storage = document.querySelector("#storage");

let hasSolved = false;
let hasOperator = false;
let firstNum = "";
let secondNum = "";
let firstNumMode = true;

function operate(operator, firstNum, secondNum) {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);
  hasSolved = true;
  if (operator === "+") {
    return add(firstNum, secondNum);
  } else if (operator === "-") {
    return subtract(firstNum, secondNum);
  } else if (operator === "x") {
    return multiply(firstNum, secondNum);
  } else if (operator === "/") {
    return divide(firstNum, secondNum);
  }
}

function addChar(char) {
  if (firstNumMode) {
    if (char === "." && firstNum.includes(char)) {
      // do nothing
    } else {
      if (firstNum.length < 18) {
        firstNum += char;
      }
      updateDisplay();
    }
  } else {
    if (hasOperator) {
      if (char === "." && secondNum.includes(char)) {
        // do nothing
      } else {
        if (secondNum.length < 18) {
          secondNum += char;
        }
        updateDisplay();
      }
    }
  }
}

function updateDisplay() {
  if (firstNumMode) {
    working.textContent = firstNum;
  } else {
    working.textContent = secondNum;
  }
}

let operator = "";
function addOperator() {
  hasSolved = false;
  if (!hasOperator && firstNum !== '') {
    firstNumMode = false;
    hasOperator = true;
    operator = this.textContent;
    //updateDisplay();
    storage.textContent = `${firstNum} ${operator}`;
    working.textContent = 0;
  }
}

function clear(displayVal) {
  if (firstNumMode) {
    firstNum = "";
  } else {
    secondNum = "";
  }
}

function allclear(displayVal) {
  operator = "";
  hasOperator = false;
  working.textContent = displayVal;
  storage.textContent = "";
  hasSolved = false;
  firstNum = "";
  secondNum = "";
  firstNumMode = true;
}

const display = document.querySelector("#display");

const keypad = document.createElement("div");
keypad.style.display = "grid";
keypad.style.gridTemplateColumns = "repeat(3, 1fr)";
keypad.style.gridTemplateRows = "repeat(5, 1fr)";
keypad.style.width = "150px";
keypad.style.margin = "auto";

let numKeys = Array.from(document.querySelectorAll(".numkey"));
for (let i = 0; i < numKeys.length; i++) {
  numKeys[i].addEventListener("click", function () {
    if (!hasSolved) {
      addChar(this.textContent);
    } else {
      allclear(this.textContent);
      addChar(this.textContent);
    }
  });
}

const decimalKey = document.querySelector("#decimal");
decimalKey.addEventListener("click", function () {
  if (!hasSolved) {
    addChar(this.textContent);
  }
});

let operateKeys = Array.from(document.querySelectorAll(".operator"));
for (let j = 0; j < operateKeys.length; j++) {
  operateKeys[j].addEventListener("click", addOperator);
}

const eqKey = document.querySelector("#equals");
eqKey.addEventListener("click", function () {
  if (hasOperator && secondNum != "") {
    hasOperator = false;
    let solution = operate(operator, firstNum, secondNum);
    
    if (solution.toString().length > 19) {
      try {
        solution = solution.toFixed(19 - Math.trunc(solution));
        firstNum = solution;
      } catch (err) {
        solution = "ERROR";
        allclear(solution);
        console.log(err);
      }
    } else {
      firstNum = solution;
    }
    secondNum = "";
    working.textContent = solution;
    storage.textContent = "";
  }
});

const allClearKey = document.querySelector("#allclear");
allClearKey.addEventListener("click", function () {
  allclear("0");
});

const clearKey = document.querySelector("#clear");
clearKey.addEventListener("click", function(){
  clear("0");
  updateDisplay();
})