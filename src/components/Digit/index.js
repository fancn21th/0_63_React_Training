import React from 'react'
import PropTypes from 'prop-types'

const Digit = ({ text, onClick }) => {
  const onClickHandler = () => {
    onClick(text, 'digit')
  }
  return text === '0'
    ? <div className="zero" onClick={onClickHandler} role="button" tabIndex="0">{text}</div>
    : <div onClick={onClickHandler} role="button" tabIndex="0">{text}</div>
}

Digit.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Digit
