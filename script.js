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

function clearVariables() {
  operator = '';
  firstVarMode = true;
  firstVar = '';
  secondVar = '';
}

function processNumbers(buttonText, currentVar) {
  if ((buttonText === '.' && currentVar.includes('.')) ||
      (currentVar.length === 6)) {
    // keeps user from entering a second decimal to a variable
    return '';
  } else {
    return buttonText;
  }
}

function solve() {
  if (operator === '/' && secondVar == 0) {
    activeDisplayDiv.innerHTML = '<a href="https://en.wikipedia.org/wiki/Division_by_zero">You can\'t divide by zero!</a>';
    clearVariables();
  }
  if (firstVar.length > 0 && secondVar.length > 0) {
    
    let solution = operate(parseFloat(firstVar), parseFloat(secondVar), operator);
    activeDisplayDiv.textContent = solution;
    
    clearVariables();

    firstVar = solution.toString();
  }
}

function moveActiveToStorage() {
  storageDisplayDiv.textContent = activeDisplayDiv.textContent; 
}

let buttonArray = document.querySelectorAll('button');
let equalsButton = document.getElementById('equals');
let storageDisplayDiv = document.getElementById('storage');
let activeDisplayDiv = document.getElementById('active');
let operator = '';
let firstVarMode = true;
let firstVar = '';
let secondVar = '';

buttonArray.forEach(button => button.addEventListener('click', function(){
  if (button.classList.contains('operator')) {
    if (operator === '' && firstVar.length > 0) {
      operator = button.textContent;
      firstVarMode = false;
    } else if (operator.length === 1 && secondVar.length > 0) {
      solve();
      operator = button.textContent;
      firstVarMode = false;
    }
  } else if (button.classList.contains('number')) {
    if (firstVarMode) {
      firstVar += processNumbers(button.textContent, firstVar);
    } else {
      secondVar += processNumbers(button.textContent, secondVar);
    }
  } else if (button.id === 'clear'){
    clearVariables();
  }
  activeDisplayDiv.textContent = firstVar + operator + secondVar;
}))

equalsButton.addEventListener('click', solve)