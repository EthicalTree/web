import './Icon.css'

import React from 'react'
import PropTypes from 'prop-types'
import icons from './AppIcons'

const Icon = props => {
  const { iconKey, label, className } = props
  const InnerIcon = icons[iconKey]

  if (!InnerIcon) {
    throw Error(`${iconKey} is not a valid icon`)
  }

  return (
    <span className="et-icon-container">
      <span className={`et-icon ${className}`}>
        <InnerIcon />
        {label &&
          <span className="icon-label">{label}</span>
        }
      </span>
    </span>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  iconKey: PropTypes.string.isRequired,
  label: PropTypes.string
}

Icon.defaultProps = {
  className: ''
}

export default Icon
