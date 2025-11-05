class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.setPreviousOperand();
    this.setCurrentOperand();
  }

  setPreviousOperand() {
    this.previousOperand = this.previousOperandTextElement;
  }

  setCurrentOperand() {
    this.currentOperand = this.currentOperandTextElement;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.innerText.includes(".")) return;
    this.currentOperand.innerText = this.currentOperand.innerText + number;
  }

  chooseOperation(operation) {
    if (this.currentOperand.innerText === "") return;
    this.operation = operation;
    this.previousOperand.innerText = `${this.currentOperand.innerText} ${this.operation}`;
    this.currentOperand.innerText = "";
  }

  equal() {
    let computation;
    const prevText = this.previousOperand.innerText.trim();
    const previousValue = parseFloat(prevText.split(" ")[0]);
    const currentValue = parseFloat(this.currentOperand.innerText);

    if (isNaN(previousValue) || isNaN(currentValue)) return;

    switch (this.operation) {
      case "+":
        computation = previousValue + currentValue;
        break;
      case "-":
        computation = previousValue - currentValue;
        break;
      case "*":
        computation = previousValue * currentValue;
        break;
      case "/":
        computation = previousValue / currentValue;
        break;
      default:
        return;
    }

    this.currentOperand.innerText = this.getDisplayNumber(computation);
    this.previousOperand.innerText = "";
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  clear() {
    this.previousOperand.innerText = "";
    this.currentOperand.innerText = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand.innerText = this.currentOperand.innerText.slice(0, -1);
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
    calculator.chooseOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", () => {
  calculator.equal();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});
