import React from 'react'
import PropTypes from 'prop-types'

const Result = ({ text }) => (
  <div className="result">{text}</div>
)

Result.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Result
