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
  return window[operation](firstVar, secondVar);
}

let buttonArray = document.querySelectorAll('.button');
let equalsButton = document.getElementById('equals');
let operator = '';
let firstVarMode = true;
let firstVar = '';
let secondVar = '';

buttonArray.forEach(button => button.addEventListener('click', function(){
  if (button.classList.contains('operator')) {
    if (operator === '') {
      operator = button.id;
      firstVarMode = false;
    }
  } else if (button.classList.contains('number')) {
    if (firstVarMode) {
      firstVar += button.textContent;
    } else {
      secondVar += button.textContent;
    }
  }
}))

equalsButton.addEventListener('click', function() {
  if (firstVar.length > 0 && secondVar.length > 0) {
    
    let solution = operate(parseInt(firstVar), parseInt(secondVar), operator);
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