//assigns the areas from the DOM
const calculator = document.querySelector('.calculator')//pulls the calculator class from inside the document (HTML file)
const keys = calculator.querySelector('.calculator__keys')//pulls the div class inside the calculator class
const display = calculator.querySelector('.calculator__display')//Where the numbers you enter and total will appear

keys.addEventListener('click', event => {//this is activaly watching for your clicks
  if (!event.target.closest('button')) return//reads what button was pushed, in HTML we assigned each button (numbers & operations) as button
  const key = event.target //class & data-type ie number
  const keyValue = key.textContent //the number '1' or operation like '+'
  let displayValue = display.textContent // what to show in the display window
  const {type} = key.dataset //for pulls "number" or type of operator
  const { previousKeyType } = calculator.dataset //keeps track of what was previously clicked

  //Checks for number keys
  if (type === 'number') { //checks the HTML for the data-type
    if (displayValue === '0' || previousKeyType === 'operator' || previousKeyType === 'equal') {//resets display for new number
      display.textContent = keyValue//displays what you clicked
    } else {
      display.textContent = displayValue + keyValue //concatanates the numbers for more than one digit
    }
  }  

  // Checks for operator key
  if (type === 'operator') { //checks the HTML for operator
    calculator.dataset.firstNumber = displayValue //changes first number to the current display
    calculator.dataset.operator = key.dataset.key //Assigned the operator choice
  }

  if (type === 'equal') {
    //Checks to make sure not doing a divide by 0
    if (calculator.dataset.firstNumber === '0' || displayValue === '0' && calculator.dataset.operator === 'divide'){
      display.textContent = 'ERROR' //The error message to display when '0' in divide is selected
    } else {
    display.textContent = calculate(calculator.dataset.firstNumber, calculator.dataset.operator, displayValue) //passing values to the calculate funtion; then display them
    }
  }

  //Running the clear button info
  if (type === 'clear'){ //checks if clear was clicked
    display.textContent = '0'//resets the display area to 0
    delete firstNumber //removes the first number
    delete operator //removes the operator selected
  }
  calculator.dataset.previousKeyType = type//assigns the value of this click to the previousKeyType to use for checking if operator
})

//Calcualte Function make sure this outside the event listener function
function calculate (firstNumber, operator, secondNumber) {
  // Converts to float; if there is no decimal the output will not show one
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)
  //these calculate and returns the totals
  if (operator === 'plus') return firstNumber + secondNumber
  if (operator === 'minus') return firstNumber - secondNumber
  if (operator === 'times') return firstNumber * secondNumber
  if (operator === 'divide') return firstNumber / secondNumber
}

