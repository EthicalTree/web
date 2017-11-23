import './IconInput.sass'

import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputGroup } from 'reactstrap'
import AppIcons from './AppIcons'

const IconInput = props => {
  const { icon, inputProps, className } = props
  const Icon = AppIcons[icon]

  return (
    <InputGroup className={`icon-input ${className}`}>
      <Input {...inputProps} />
      <Icon />
    </InputGroup>
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
