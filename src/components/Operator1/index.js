import React from 'react'
import PropTypes from 'prop-types'

const Operator1 = ({ text, onClick }) => (
  <div onClick={() => onClick(text)} role="button" tabIndex="0">
    { text }
  </div>
)

Operator1.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Operator1
