export default class Calculator {
  constructor() {
    this.buffer = 0;
    this.history = [];
    this.userInput = '';
    this.initializeOnClickEvents();
    this.initializeOnKeyDownEvent();
  }

  initializeOnKeyDownEvent = () => {
    document.querySelector('body').addEventListener('keydown', (e) => {
      if (!isNaN(e.key) || e.key === '.') this.digitOnClick(e.key);
      if (['/', 'x', '+', '-'].includes(e.key))
        this.twoArgOperatorOnClick(e.key);
      if (e.key === '=') this.equalsOperatorOnClick(e.key);
    });
  };

  initializeOnClickEvents = () => {
    this.initializeOnClickEvent('digit', this.digitOnClick);
    this.initializeOnClickEvent('operator twoArg', this.twoArgOperatorOnClick);
    this.initializeOnClickEvent('equals', this.equalsOperatorOnClick);
    this.initializeOnClickEvent(
      'operator clearEntry',
      this.clearEntryOperatorOnClick
    );
    this.initializeOnClickEvent(
      'operator clearAll',
      this.clearAllOperatorOnClick
    );
    this.initializeOnClickEvent('operator oneArg', this.oneArgOperatorOnClick);
  };

  initializeOnClickEvent = (className, onClickFn) => {
    const elements = document.getElementsByClassName(className);

    for (let element of elements) {
      element.addEventListener('click', () => onClickFn(element.innerHTML));
    }
  };

  showHistory = () => {
    console.log(this.history);
    document.getElementById('history').innerHTML = this.history.join(' ');
  };

  clearEntryOperatorOnClick = () => {
    this.userInput = '';
    document.getElementById('userInput').innerHTML = this.userInput;
  };

  clearAllOperatorOnClick = () => {
    this.clearEntryOperatorOnClick();
    this.history = [];
    this.buffer = 0;
    this.showHistory();
  };

  digitOnClick = (value) => {
    if (this.userInput === '0' && value !== '.') {
      this.userInput = this.userInput.slice(0, -1);
    }
    this.userInput = this.userInput + value;
    this.showHistory();
    document.getElementById('userInput').innerHTML = this.userInput;
  };

  equalsOperatorOnClick = (value) => {
    if (this.userInput !== '' && this.history.length >= 2) {
      this.history.push(this.userInput);
      this.history.push(value);
      this.buffer = this.performOperation(
        this.history[this.history.length - 3],
        parseFloat(
          this.history.length !== 4
            ? this.buffer
            : this.history[this.history.length - 4]
        ),
        parseFloat(this.userInput)
      );
      this.showHistory();
      document.getElementById('userInput').innerHTML = this.buffer;
      this.history = [];
      this.userInput = '';
    }
  };

  oneArgOperatorOnClick = (operator) => {
    if (this.userInput !== '') {
      this.equalsOperatorOnClick();
      let value = this.userInput ? this.userInput : this.buffer;
      this.history =
        operator === '√' ? [operator, value, '='] : [value, operator, '='];
      this.buffer = this.performOperation(operator, value);
      this.showHistory();
      document.getElementById('userInput').innerHTML = this.buffer;
      this.history = [];
      this.userInput = '';
      this.buffer = 0;
    }
  };

  twoArgOperatorOnClick = (operator) => {
    if (this.userInput !== '') {
      this.history.push(this.userInput);
      if (this.history.length >= 3) {
        this.buffer = this.performOperation(
          this.history[this.history.length - 2],
          parseFloat(
            this.history.length !== 3
              ? this.buffer
              : this.history[this.history.length - 3]
          ),
          parseFloat(this.history[this.history.length - 1])
        );
        document.getElementById('userInput').innerHTML = this.buffer;
      }
      this.history.push(operator);
      this.showHistory();
      this.userInput = '';
    }
    if (
      this.history[this.history.length - 1] !== operator &&
      this.history[this.history.length - 1]
    ) {
      this.history[this.history.length - 1] = operator;
      this.showHistory();
    }
  };

  performOperation = (operator, valA, valB) => {
    console.log(valA, operator, valB);
    switch (operator) {
      case '+':
        return valA + valB;
      case '-':
        return valA - valB;
      case '/': {
        if (valB === 0) {
          this.history = this.history.slice(0, this.history.length - 2);
          alert('Dividing by 0 is not allowed!');
          return this.buffer;
        }
        return valA / valB;
      }
      case 'x':
        return valA * valB;
      case '²':
        return valA * valA;
      case '√':
        return Math.sqrt(valA);
      default:
        return undefined;
    }
  };
}
