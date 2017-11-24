import './IconInput.sass'

import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import AppIcons from './AppIcons'

const IconInput = props => {
  const { icon, inputProps, className } = props
  const Icon = AppIcons[icon]

  return (
    <div className={`icon-input ${className}`}>
      <Input {...inputProps} />
      <Icon />
    </div>
  )
}

IconInput.propTypes = {
  icon: PropTypes.string,
  inputProps: PropTypes.object,
  className: PropTypes.string
}

IconInput.defaultProps = {
  className: ''
}

export default IconInput
