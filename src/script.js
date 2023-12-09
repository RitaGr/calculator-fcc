import ReactDOM from "https://cdn.skypack.dev/react-dom@18.0.1";
import React from "https://cdn.skypack.dev/react@18.0.1";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "0",
      currentInput: "",
      operator: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
  }

  handleClick(value) {
    if (value === ".") {
      this.handleDecimal();
    } else if (["+", "-", "*", "/"].includes(value)) {
      this.handleOperator(value);
    } else {
      this.handleNumber(value);
    }
  }

  handleDecimal() {
    if (!this.state.currentInput.includes(".")) {
      this.setState({
        result: this.state.result + ".",
        currentInput: this.state.currentInput + ".",
      });
    }
  }

handleOperator(operator) {
  // Define a regular expression to match operators excluding the minus sign
  const operatorRegex = /[\/*+]/;

  if (this.state.currentInput && !this.state.operator) {
    // Case 1: An operator is pressed after a number
    this.setState({
      result: this.state.result + operator,
      currentInput: "",
      operator: operator,
    });
  } else if (this.state.operator && !this.state.currentInput) {
    // Case 2: An operator is pressed immediately after another operator
    if (operator === "-" && this.state.operator !== "-") {
      // Append the "-" operator without erasing the previous operator
      this.setState({
        result: this.state.result + operator,
        currentInput: operator,
      });
    } else {
      // Check if there are already two operators in the expression
      const lastTwoOperators = this.state.result.match(/[\/*+-]{2}$/);

      if (lastTwoOperators && lastTwoOperators[0]) {
        // Replace the last operator with the new one
        const updatedResult = this.state.result.replace(/[\/*+-]$/, operator);
        this.setState({
          result: updatedResult,
          operator: operator,
        });
      } else {
        // Replace the previous operator with the new one
        const updatedResult = this.state.result.slice(0, -1) + operator;
        this.setState({
          result: updatedResult,
          operator: operator,
        });
      }
    }
  } else if (this.state.operator && this.state.currentInput) {
    // Case 3: Consecutive operators are pressed
   const lastTwoOperators = this.state.result.match(/[\/*+-]{2}$/);

if (lastTwoOperators && lastTwoOperators[0] && lastTwoOperators[0].includes("-")) {
  // If the second-to-last operator is "-", treat the last operator as a continuation
  const updatedResult = this.state.result.slice(0, -2) + operator; // Remove the last two operators
  this.setState({
    result: updatedResult,
    currentInput: "",
    operator: operator,
  });
}
 else {
      // Evaluate expressions with consecutive operators correctly
      const updatedResult = eval(this.state.result).toString() + operator;
      this.setState({
        result: updatedResult,
        currentInput: "",
        operator: operator,
      });
    }
  } else if (!this.state.operator && this.state.result !== "0") {
    // Case 4: An operator is pressed immediately after the equal sign
    this.setState({
      result: this.state.result + operator,
      operator: operator,
    });
  }
}



  handleNumber(value) {
    if (this.state.result === "0" || this.state.result === "Error") {
      this.setState({ result: value, currentInput: value });
    } else {
      this.setState({
        result: this.state.result + value,
        currentInput: this.state.currentInput + value,
      });
    }
  }

  handleEqualClick() {
  try {
    // Replace consecutive minus signs with a single minus sign
    const sanitizedResult = this.state.result.replace(/--+/g, "+");
    // Evaluate expressions with consecutive operators correctly
    const result = eval(sanitizedResult.replace(/[\+\*\/-]+$/, ""));
    this.setState({ result: result.toString() });
  } catch (error) {
    this.setState({ result: "Error" });
  }
}



  clear() {
    this.setState({
      result: "0",
      currentInput: "",
      operator: "",
    });
  }

  render() {
    return (
      <div id="main-container">
        <div id="calculator-container">
          <h1 id="display">{this.state.result}</h1>
          <button className="equal" onClick={this.handleEqualClick} id="equals">
            =
          </button>
          
            <button 
              onClick={() => this.handleClick("0")}
              className="zero-btn num"
              id="zero"
            >
              0
            </button>
            <button
              onClick={() => this.handleClick("1")}
              className="num one-btn"
              id="one"
            >
              1
            </button>
            <button
              onClick={() => this.handleClick("2")}
              className="num two-btn"
              id="two"
            >
              2
            </button>
            <button
              onClick={() => this.handleClick("3")}
              className="num three-btn"
              id="three"
            >
              3
            </button>
            <button
              onClick={() => this.handleClick("4")}
              className="num four-btn"
              id="four"
            >
              4
            </button>
            <button
              onClick={() => this.handleClick("5")}
              className="num five-btn"
              id="five"
            >
              5
            </button>
            <button
              onClick={() => this.handleClick("6")}
              className="num six-btn"
              id="six"
            >
              6
            </button>
            <button
              onClick={() => this.handleClick("7")}
              className="num seven-btn"
              id="seven"
            >
              7
            </button>
            <button
              onClick={() => this.handleClick("8")}
              className="num eight-btn"
              id="eight"
            >
              8
            </button>
            <button
              onClick={() => this.handleClick("9")}
              className="num nine-btn"
              id="nine"
            >
              9
            </button>
            <button
              onClick={() => this.handleClick(".")}
              className="dot-btn num"
              id="decimal"
            >
              .
            </button>

          <button onClick={() => this.handleClick("+")} id="add" className="operation-btn add">
            +
          </button>
          <button onClick={() => this.handleClick("-")} id="subtract" className="operation-btn subtract">
            -
          </button>
          <button  onClick={() => this.handleClick("*")} id="multiply" className="operation-btn multiply">
            x
          </button>
          <button onClick={() => this.handleClick("/")} id="divide" className="operation-btn divide">
            /
          </button>
          <button className="clear" onClick={this.clear} id="clear">
            AC
          </button>

        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));