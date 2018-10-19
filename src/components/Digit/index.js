import React from 'react'

const Digit = ({ text, onClick }) => {
  const onClickHandler = () => {
    onClick(text, 'digit')
  }
  return text === '0'
    ? <div className="zero" onClick={onClickHandler}>{text}</div>
    : <div onClick={onClickHandler}>{text}</div>
}

export default Digit
