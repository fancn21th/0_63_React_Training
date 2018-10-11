import React, { Component } from 'react';
import './App.css';
import Result from '../Result'
import Operator1 from '../Operator1'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      operators: [{
        type: 'result',
        val: '520'
      },{
        type: 'operator1',
        val: 'C'
      },{
        type: 'operator1',
        val: '+/-'
      },{
        type: 'operator1',
        val: '%'
      },{
        type: 'operator2',
        val: '/'
      },{
        type: 'digit',
        val: '7'
      },{
        type: 'digit',
        val: '8'
      },{
        type: 'digit',
        val: '9'
      },{
        type: 'operator2',
        val: '*'
      },{
        type: 'digit',
        val: '4'
      },{
        type: 'digit',
        val: '5'
      },{
        type: 'digit',
        val: '6'
      },{
        type: 'operator2',
        val: '-'
      },{
        type: 'digit',
        val: '1'
      },{
        type: 'digit',
        val: '2'
      },{
        type: 'digit',
        val: '3'
      },{
        type: 'operator2',
        val: '+'
      },{
        type: 'digit',
        val: '0'
      },{
        type: 'dot',
        val: '.'
      },{
        type: 'operator2',
        val: '='
      }]
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
                  <Result key={operator.val} text={operator.val}/>
                )
              case 'operator1':
                return (
                  <Operator1 key={operator.val} text={operator.val}/>
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
