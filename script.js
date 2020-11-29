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