import React from 'react'

const Digit = ({text}) => (
  text === '0' ?
    <div className="zero" >{text}</div>:
    <div>{text}</div>
)

export default Digit
