import React, { Component } from 'react'
import './App.css'
import Result from '../Result'
import Operator1 from '../Operator1'
import Operator2 from '../Operator2'
import Digit from '../Digit'
import operators from '../../data/operators'
import cal from '../../utils/caculator'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '0',
    }
    this.commandHandler = this.commandHandler.bind(this)
  }

  commandHandler(val) {
    const newResult = cal(val)
    this.setState({
      result: newResult,
    })
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
