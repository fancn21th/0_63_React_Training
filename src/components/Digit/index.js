import React from 'react'

const Digit = ({text}) => (
  <div className={text === '0' && 'zero'} >{text}</div>
)

export default Digit
