class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.allClear();
  }

  allClear() {
    this.currentOperandTextElement.innerText = "";
    this.previousOperandTextElement.innerText = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperandTextElement.innerText =
      this.currentOperandTextElement.innerText.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (
      number === "." &&
      this.currentOperandTextElement.innerText.includes(".")
    )
      return;
    this.currentOperandTextElement.innerText =
      this.currentOperandTextElement.innerText.toString() + number.toString();
  }

  selectOperation(operation) {
    if (this.currentOperandTextElement.innerText) {
      this.operation = operation;
      this.previousOperandTextElement.innerText = `
      ${this.currentOperandTextElement.innerText} ${this.operation}`;
      if (this.operation) {
        this.currentOperandTextElement.innerText = "";
      }
    }
  }

  equalSymbol() {
    let previousValue = parseFloat(this.previousOperandTextElement.innerText);
    let currentValue = parseFloat(this.currentOperandTextElement.innerText);
    let finalResult;
    if (isNaN(previousValue) || isNaN(currentValue)) return;

    switch (this.operation) {
      case "+":
        finalResult = previousValue + currentValue;
        break;
      case "-":
        finalResult = previousValue - currentValue;
        break;
      case "*":
        finalResult = previousValue * currentValue;
        break;
      case "/":
        finalResult = previousValue / currentValue;
        break;
      default:
        return;
    }

    this.currentOperandTextElement.innerText = finalResult.toLocaleString();
    this.previousOperandTextElement.innerText = "";
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

equalsButton.addEventListener("click", () => {
  calculator.equalSymbol();
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
});
