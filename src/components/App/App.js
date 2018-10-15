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
    this.onClick.bind(this)
  }
  onClick(val) {
    switch(val.toLowerCase()) {
      case 'c':
        this.setState({
          result: 0
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
                    onClick={this.onClick}
                  />
                )
              case 'operator2':
                return (
                  <Operator2 key={operator.val} text={operator.val}/>
                )
              case 'digit':
                return (
                  <Digit key={operator.val} text={operator.val}/>
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
