import React from 'react'
import './index.css'

const Operator2 = ({text, onClick}) => (
  <div
    className="operator2"
    onClick={() => onClick(text)}
  >
    { text }
  </div>
)

export default Operator2
