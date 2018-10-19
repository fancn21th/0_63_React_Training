const TYPE_DIGIT = 'TYPE_DIGIT'
const TYPE_OPERATOR = 'TYPE_OPERATOR'
const TYPE_EQUAL = 'TYPE_EQUAL'
const TYPE_DOT = 'TYPE_DOT'
const TYPE_CLEAR = 'TYPE_CLEAR'
const TYPE_MINUS = 'TYPE_MINUS'
const TYPE_PERCENTAGE = 'TYPE_PERCENTAGE'

// 闭包缓存
let lastCommand = null
let lastOperator = null
let lastOperand = null
let currentResult = '0'
let isMinus = false

const reset = () => {
  isMinus = false
  lastCommand = null
  lastOperator = null
  lastOperand = null
  currentResult = '0'
}

const getType = (command) => {
  const types = {
    TYPE_DIGIT: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    TYPE_OPERATOR: ['/', '*', '-', '+'],
    TYPE_EQUAL: ['='],
    TYPE_DOT: ['.'],
    TYPE_CLEAR: ['C'],
    TYPE_MINUS: ['+/-'],
    TYPE_PERCENTAGE: ['%'],
  }
  const foundType = Object.keys(types).find(type => types[type].includes(command))
  if (foundType) return foundType
  throw new Error('wrong type')
}

const calculatorFunctions = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '-': (a, b) => a - b,
  '+': (a, b) => a + b,
}

const saveLastOperand = (val) => {
  lastOperand = isMinus ? -val : val
  isMinus = false
}

const calculate = (a, ops, b) => calculatorFunctions[ops](a, b)

const calDigit = (command) => {
  if (!lastCommand) {
    currentResult = command
    return
  }

  if (lastCommand.type === TYPE_DIGIT) {
    currentResult = currentResult === '0'
      ? command
      : currentResult + command
  } else if (lastCommand.type === TYPE_OPERATOR) {
    saveLastOperand(currentResult)
    currentResult = command
  }
}

const callEqual = () => {
  if (currentResult && lastOperand) {
    currentResult = calculate(parseInt(currentResult, 10), lastOperator, parseInt(lastOperand, 10))
  }
}

const callOperator = (command) => {
  lastOperator = command
}

const callClear = () => {
  isMinus = false
  lastCommand = null
  lastOperator = null
  lastOperand = null
  currentResult = '0'
}

const callMinus = () => {
  isMinus = !isMinus
}

const cal = (command) => {
  const type = getType(command)
  switch (type) {
  case TYPE_DIGIT:
    calDigit(command)
    break
  case TYPE_OPERATOR:
    callOperator(command)
    break
  case TYPE_EQUAL:
    callEqual(command)
    break
  case TYPE_CLEAR:
    callClear(command)
    break
  case TYPE_MINUS:
    callMinus(command)
    break
  default:
    break
  }

  // 最后步骤，记录上次的命令
  lastCommand = {
    type,
    command,
  }

  return currentResult
}

export default cal
