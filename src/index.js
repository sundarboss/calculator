import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last: "",
            display: "0",
            formula: ""
        };

        this.handleClear = this.handleClear.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
    }

    async handleClear() {
        console.log("Iam here")
        await this.setState({
            last: "",
            display: "0",
            formula: ""
        });
    }

    handleOperator(e) {
        let opt = e.target.value;
        let tempLast, tempFormula = '';

        if (opt === "-") {
            if ((Number(this.state.last) >= 0) || (this.state.last.match(/[*/+]/)) || (this.state.last === "")) {
                tempLast = opt;
                tempFormula = this.state.formula + opt;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[=]/)) {
                tempLast = opt;
                tempFormula = this.state.display + opt;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            }
        } else {
            if ((this.state.last === "") || (Number(this.state.last) >= 0)) {
                tempLast = opt;
                tempFormula = this.state.formula + opt;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[*/+]/)) {
                tempLast = opt;
                tempFormula = this.state.formula.substr(0, this.state.formula.length - 1) + opt;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[-]/)) {
                tempLast = opt;
                if (this.state.formula[this.state.formula.length - 2].match(/[*/+]/)) {
                    tempFormula = this.state.formula.substr(0, this.state.formula.length - 2) + opt;
                } else {
                    tempFormula = this.state.formula.substr(0, this.state.formula.length - 1) + opt;
                }
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[=]/)) {
                tempLast = opt;
                tempFormula = this.state.display + opt;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            }
        }
    } 

    handleDecimal(e) {
        let val = e.target.value;
        let tempLast, tempFormula = '';

        if ((this.state.last === "") || (this.state.last.match(/[*/+-]/))) {
            tempLast = "0.";
            tempFormula = this.state.formula + "0.";
            this.setState({
                last: tempLast,
                display: tempLast,
                formula: tempFormula
            });
            return;
        } else if (this.state.last.match(/[=]/)) {
            this.handleClear()
            .then(() => {
                tempLast = "0.";
                tempFormula = this.state.formula + "0.";
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
            });            
            return;
        } else if (!this.state.last.match(/[.]/)) {
            tempLast = this.state.last + val;
            tempFormula = this.state.formula + val;
            this.setState({
                last: tempLast,
                display: tempLast,
                formula: tempFormula
            });
            return;
        }
    }

    handleNumber(e) {
        let num = e.target.value;
        let tempLast, tempFormula = '';

        if (Number(num) === 0) {
            if ((this.state.last === "") || (this.state.last.match(/[.1-9]/))) {
                tempLast = this.state.last + num;
                tempFormula = this.state.formula + num;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[*/+-]/)) {
                tempLast = num;
                tempFormula = this.state.formula + num;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[=]/)) {
                this.handleClear();
                return;
            }
        } else if (this.state.last.length === 20) {
            this.setState({
                last: "",
                display: "DIGIT LIMIT REACHED",
                formula: ""
            });
            return;
        } else if (Number(num) !== 0) {
            if (this.state.last === "0") {
                tempLast = num;
                tempFormula = this.state.formula.substr(0, this.state.formula.length - 1) + num;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[*/+-]/)) {
                tempLast = num;
                tempFormula = this.state.formula + num;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            } else if (this.state.last.match(/[=]/)) {
                this.handleClear()
                .then(() => {
                    tempLast = num;
                    tempFormula = this.state.formula + num;
                    this.setState({
                        last: tempLast,
                        display: tempLast,
                        formula: tempFormula
                    });
                });                
                return;
            } else {
                tempLast = this.state.last + num;
                tempFormula = this.state.formula + num;
                this.setState({
                    last: tempLast,
                    display: tempLast,
                    formula: tempFormula
                });
                return;
            }
        }
    }

    handleEqual(e) {
        let eql = e.target.value;
        let tempLast, tempFormula, evaluate = '';

        if ((this.state.formula === "") || (this.state.formula[0].match(/[*/]/))) {
            this.setState({
                last: "",
                display: "NaN",
                formula: ""
            });
            return;
        } else {
            if (this.state.last.match(/[*/+-]/)) {
                evaluate = eval(this.state.formula.substr(0, this.state.formula.length - 1));
            } else {
                evaluate = eval(this.state.formula);
            }
            evaluate = evaluate.toString();
            tempLast = eql;
            tempFormula = this.state.formula + eql + evaluate;
            this.setState({
                last: tempLast,
                display: evaluate,
                formula: tempFormula
            });
            return;
        }
    }

    render() {
        return (
            <div id="container">
                <div id="formula">{this.state.formula}</div>
                <div id="display">{this.state.display}</div>
                <div id="button-container">
                    <button id="clear" onClick={this.handleClear}>AC</button>
                    <button className="operator" id="divide" value="/" onClick={this.handleOperator}>/</button>
                    <button className="operator" id="multiply" value="*" onClick={this.handleOperator}>x</button>
                    <button className="operator" id="add" value="+" onClick={this.handleOperator}>+</button>
                    <button className="operator" id="subtract" value="-" onClick={this.handleOperator}>-</button>
                    <button className="number" id="one" value="1" onClick={this.handleNumber}>1</button>
                    <button className="number" id="two" value="2" onClick={this.handleNumber}>2</button>
                    <button className="number" id="three" value="3" onClick={this.handleNumber}>3</button>
                    <button className="number" id="four" value="4" onClick={this.handleNumber}>4</button>
                    <button className="number" id="five" value="5" onClick={this.handleNumber}>5</button>
                    <button className="number" id="six" value="6" onClick={this.handleNumber}>6</button>
                    <button className="number" id="seven" value="7" onClick={this.handleNumber}>7</button>
                    <button className="number" id="eight" value="8" onClick={this.handleNumber}>8</button>
                    <button className="number" id="nine" value="9" onClick={this.handleNumber}>9</button>
                    <button className="number" id="zero" value="0" onClick={this.handleNumber}>0</button>
                    <button className="number" id="decimal" value="." onClick={this.handleDecimal}>.</button>
                    <button id="equals" value="=" onClick={this.handleEqual}>=</button>
                </div>                
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));