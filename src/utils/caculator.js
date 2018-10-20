const TYPE_DIGIT = 'TYPE_DIGIT'
const TYPE_OPERATOR = 'TYPE_OPERATOR'
const TYPE_EQUAL = 'TYPE_EQUAL'
const TYPE_DOT = 'TYPE_DOT'
const TYPE_CLEAR = 'TYPE_CLEAR'
const TYPE_MINUS = 'TYPE_MINUS'
const TYPE_PERCENTAGE = 'TYPE_PERCENTAGE'

// 闭包缓存
let lastCommand = null
let currentResult = '0'
let lastResult = null
let lastOperator = null

const reset = () => {
  lastCommand = null
  currentResult = '0'
  lastResult = null
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

const calculate = (a, ops, b) => calculatorFunctions[ops](a, b).toString()

const calDigit = (command) => {
  // 如果这是第一个输入的数字
  if (!lastCommand) {
    currentResult = command
    return
  }

  if (lastCommand.type === TYPE_DIGIT
    || lastCommand.type === TYPE_CLEAR
    || lastCommand.type === TYPE_PERCENTAGE) {
    /*
      two cases:
        1. override the current result
        2. append to current result
    */
    const minus = currentResult.charAt(0) === '-' ? '-' : ''
    currentResult = currentResult === '0' || currentResult === '-0'
      ? `${minus}${command}`
      : currentResult + command
  } else if (lastCommand.type === TYPE_OPERATOR) {
    lastResult = currentResult
    currentResult = command
  } else if (lastCommand.type === TYPE_DOT) {
    currentResult += command
  }
}

const callEqual = () => {
  if (currentResult && lastResult) {
    currentResult = calculate(
      parseFloat(currentResult, 10),
      lastOperator,
      parseFloat(lastResult, 10),
    )
  }
}

const callOperator = (command) => {
  lastOperator = command
}

const callClear = () => {
  reset()
}

const callPercentage = () => {
  currentResult = currentResult !== '0' && currentResult !== '-0'
    ? (parseFloat(currentResult) / 100).toString()
    : currentResult
}

const callMinus = () => {
  currentResult = currentResult.charAt(0) === '-'
    ? currentResult.substring(1)
    : `-${currentResult}`
}

const callDot = () => {
  currentResult = currentResult.endsWith('.') ? currentResult : `${currentResult}.`
}

/*
  mental model:
    1. result + command => result
*/

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
  case TYPE_DOT:
    callDot(command)
    break
  case TYPE_PERCENTAGE:
    callPercentage(command)
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
