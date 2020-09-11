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
      if (!isNaN(e.key)) this.digitOnClick(e.key);
      if (['/', 'x', '+', '-'].includes(e.key))
        this.twoArgOperatorOnClick(e.key);
    });
  };

  initializeOnClickEvents = () => {
    this.initializeOnClickEvent('digit', this.digitOnClick);
    this.initializeOnClickEvent('operator twoArg', this.twoArgOperatorOnClick);
    this.initializeOnClickEvent('equals', this.equalsOperatorOnClick);
  };

  initializeOnClickEvent = (className, onClickFn) => {
    const elements = document.getElementsByClassName(className);

    for (let element of elements) {
      element.addEventListener('click', () => onClickFn(element.innerHTML));
    }
  };

  digitOnClick = (value) => {
    this.userInput = this.userInput + value;
    document.getElementById('userInput').innerHTML = this.userInput;
  };

  twoArgOperatorOnClick = (value) => {
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
      this.history.push(value);
      this.showHistory();
      this.userInput = '';
    } else {
      this.history.pop();
      this.history.push(value);
      this.showHistory();
    }
  };

  equalsOperatorOnClick = (value) => {
    if (this.userInput !== '') {
      console.log(this.buffer);
      console.log(this.history);
    }
  };

  showHistory = () => {
    document.getElementById('history').innerHTML = this.history.join(' ');
  };

  performOperation = (operator, valA, valB) => {
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
      case '&sup2;':
        return valA * valA;
      case '&Sqrt;':
        Math.sqrt(valA);
      default:
        return undefined;
    }
  };
}