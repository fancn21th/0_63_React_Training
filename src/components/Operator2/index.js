import React from 'react'
import './index.css'
import PropTypes from 'prop-types'

const Operator2 = ({ text, onClick }) => (
  <div
    className="operator2"
    onClick={() => onClick(text)}
    role="button"
    tabIndex="0"
  >
    { text }
  </div>
)

Operator2.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Operator2
