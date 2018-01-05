import './InputTag.sass'

import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icons/Icon'

const InputTag = props => {
  const { name, handleRemove } = props

  return (
    <span
      className="input-tag"
      tabIndex="0"
      onClick={() => handleRemove(name)}
    >
      {name}
      <span className="remove-icon">
        <Icon iconKey="cross" />
      </span>
    </span>
  )
}

InputTag.propTypes = {
  name: PropTypes.string,
  handleRemove: PropTypes.func.isRequired
}


export default InputTag
