import './IconInput.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import AppIcons from './AppIcons'

const IconInput = props => {
  const { leftIcon, rightIcon, inputProps, className, onClick } = props

  const LeftIcon = AppIcons[leftIcon]
  const RightIcon = AppIcons[rightIcon]

  return (
    <div tabIndex="-1" onClick={onClick} className={`icon-input ${className}`}>
      <Input {...inputProps} />
      {leftIcon && <LeftIcon className="first-icon" />}
      {rightIcon && <RightIcon className="last-icon" />}
    </div>
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
