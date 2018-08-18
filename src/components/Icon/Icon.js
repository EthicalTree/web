import './Icon.css'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import icons from './AppIcons'

import { blurClick, a11yClick } from '../../utils/a11y'

const Icon = props => {
  const { iconKey, label, className, clickable, onClick, ...rest } = props
  const InnerIcon = icons[iconKey]

  const tabIndex = clickable ? '0' : '-1'
  const classNames = classnames('et-icon', className, { clickable })

  if (!InnerIcon) {
    throw Error(`${iconKey} is not a valid icon`)
  }

  return (
    <span
      className={classNames}
      onClick={blurClick(onClick)}
      onKeyPress={a11yClick(onClick)}
      tabIndex={tabIndex}
      {...rest}>
      <InnerIcon />
      {label && <span className="icon-label">{label}</span>}
    </span>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  iconKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  className: '',
  clickable: false,
}

export default Icon
