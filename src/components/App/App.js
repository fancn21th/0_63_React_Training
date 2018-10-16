import React, { Component } from 'react';
import './App.css';
import Result from '../Result'
import Operator1 from '../Operator1'
import Operator2 from '../Operator2'
import Digit from '../Digit'
import operators from './operators'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      operators,
      result: 520
    }
    this._lastOprand = null
    this._isNextOperand = false
    this.commandHanlder = this.commandHanlder.bind(this)
  }
  commandHanlder(val, type = '') {
    if (type) {
      switch(type.toLowerCase()) {
        case 'digit':
          if (this._isNextOperand) {
            this.setState({
              result: val
            })
            this._isNextOperand = false
          } else {
            this.setState({
              result: this.state.result + val
            })
          }
          break
        default:
          break
      }
      return
    }
    switch(val.toLowerCase()) {
      case 'c':
        this.setState({
          result: 0
        })
        break
      case '+/-':
        this.setState({
          result: this.state.result.charAt(0) === '-' ?
            this.state.result.substring(1) :
            '-' + this.state.result
        })
        break
      case '+':
        this._lastOprand = this.state.result
        this._isNextOperand = true
        break
      case '=':
        this.setState({
          result: parseInt(this._lastOprand, 10) + parseInt(this.state.result)
        })
        break
      default:
        break
    }
  }
  render() {
    return (
      <div className="calculator">
        {
          this.state.operators.map(operator => {
            switch(operator.type.toLowerCase()) {
              case 'result':
                return (
                  <Result
                    key={operator.val}
                    text={this.state.result}
                  />
                )
              case 'operator1':
                return (
                  <Operator1
                    key={operator.val}
                    text={operator.val}
                    onClick={this.commandHanlder}
                  />
                )
              case 'operator2':
                return (
                  <Operator2
                    key={operator.val}
                    text={operator.val}
                    onClick={this.commandHanlder}
                  />
                )
              case 'digit':
                return (
                  <Digit
                    key={operator.val}
                    text={operator.val}
                    onClick={this.commandHanlder}
                  />
                )
              default:
                return (<div key={operator.val}>{operator.val}</div>)
            }
          })
        }
      </div>
    );
  }
}

export default App;
