import React, { Component } from 'react'
import './App.css'
import Result from '../Result'
import Operator1 from '../Operator1'
import Operator2 from '../Operator2'
import Digit from '../Digit'
import operators from './operators'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: 520,
    }
    this.lastOprand = null
    this.isNextOperand = false
    this.commandHandler = this.commandHandler.bind(this)
  }

  commandHandler(val, type = '') {
    if (type) {
      switch (type.toLowerCase()) {
      case 'digit':
        if (this.isNextOperand) {
          this.setState({
            result: val,
          })
          this.isNextOperand = false
        } else {
          // this.setState({
          //   result: this.state.result + val,
          // })
          this.setState(preState => preState.result + val)
        }
        break
      default:
        break
      }
      return
    }
    const { result } = this.state
    switch (val.toLowerCase()) {
    case 'c':
      this.setState({
        result: 0,
      })
      break
    case '+/-':
      // this.setState({
      //   result: this.state.result.charAt(0) === '-'
      //     ? this.state.result.substring(1)
      //     : `-${this.state.result}`,
      // })
      this.setState(preState => (preState.result.charAt(0) === '-'
        ? preState.result.substring(1)
        : `-${preState.result}`))
      break
    case '+':
      this.lastOprand = result
      this.isNextOperand = true
      break
    case '=':
      this.setState({
        result: parseInt(this.lastOprand, 10) + parseInt(result, 10),
      })
      break
    default:
      break
    }
  }

  render() {
    const { result } = this.state
    return (
      <div className="calculator">
        {
          operators.map((operator) => {
            switch (operator.type.toLowerCase()) {
            case 'result':
              return (
                <Result
                  key={operator.val}
                  text={result}
                />
              )
            case 'operator1':
              return (
                <Operator1
                  key={operator.val}
                  text={operator.val}
                  onClick={this.commandHandler}
                />
              )
            case 'operator2':
              return (
                <Operator2
                  key={operator.val}
                  text={operator.val}
                  onClick={this.commandHandler}
                />
              )
            case 'digit':
              return (
                <Digit
                  key={operator.val}
                  text={operator.val}
                  onClick={this.commandHandler}
                />
              )
            default:
              return (<div key={operator.val}>{operator.val}</div>)
            }
          })
        }
      </div>
    )
  }
}

export default App
