import './IconLabel.sass'

import React from 'react'
import PropTypes from 'prop-types'
import AppIcons from './AppIcons'

const IconInput = props => {
  const { leftIcon, rightIcon, className, text } = props

  const LeftIcon = AppIcons[leftIcon]
  const RightIcon = AppIcons[rightIcon]

  return (
    <label className={`icon-label ${className}`}>
      {leftIcon && <LeftIcon className="first-icon" />}
      <span className="icon-label-text">{text}</span>
      {rightIcon && <RightIcon className="last-icon" />}
    </label>
  )
}

IconInput.propTypes = {
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  inputProps: PropTypes.object,
  className: PropTypes.string
}

IconInput.defaultProps = {
  className: ''
}

export default IconInput
