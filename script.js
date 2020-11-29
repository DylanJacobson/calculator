function add(firstVar, secondVar) {
  return firstVar + secondVar;
}

function subtract(firstVar, secondVar) {
  return firstVar - secondVar;
}

function multiply(firstVar, secondVar) {
  return firstVar * secondVar;
}

function divide(firstVar, secondVar) {
  return firstVar / secondVar;
}

function operate(firstVar, secondVar, operation) {
  // return window[operation](firstVar, secondVar);
  switch (operation) {
    case '+':
      return add(firstVar, secondVar);
    case '-':
      return subtract(firstVar, secondVar);
    case 'x':
      return multiply(firstVar, secondVar);
    case '/':
      return divide(firstVar, secondVar);
  }
}

let buttonArray = document.querySelectorAll('button');
let equalsButton = document.getElementById('equals');
let displayDiv = document.getElementById('display');
let operator = '';
let firstVarMode = true;
let firstVar = '';
let secondVar = '';

buttonArray.forEach(button => button.addEventListener('click', function(){
  if (button.classList.contains('operator')) {
    if (operator === '') {
      operator = button.textContent;
      firstVarMode = false;
    }
  } else if (button.classList.contains('number')) {
    if (firstVarMode) {
      firstVar += button.textContent;
    } else {
      secondVar += button.textContent;
    }
  }
  displayDiv.textContent = firstVar + operator + secondVar;
}))

equalsButton.addEventListener('click', function() {
  if (firstVar.length > 0 && secondVar.length > 0) {
    
    let solution = operate(parseFloat(firstVar), parseFloat(secondVar), operator);
    displayDiv.textContent = solution;
    console.log(solution);
    
    clearVariables();
  }
})

function clearVariables() {
  operator = '';
  firstVarMode = true;
  firstVar = '';
  secondVar = '';
}