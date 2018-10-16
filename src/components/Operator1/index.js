import React from 'react'

const Operator1 = ({ text, onClick }) => (
  <div onClick={() => onClick(text)}>
    { text }
  </div>
)

export default Operator1
