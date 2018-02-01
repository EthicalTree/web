import './OpenClose.css'

import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icons/Icon'

const OpenClose = props => {
  const { status } = props
  let icon

  if (status === 'open')
    icon = <Icon iconKey="stopwatch" label="Open Now" />
  else if (status === 'closed')
    icon = <Icon iconKey="stopwatch_cross" label="Closed" />
  else if (status === 'closing_soon')
    icon = <Icon iconKey="stopwatch_running" label="Closing Soon" />
  else if (status === 'opening_soon')
    icon = <Icon iconKey="stopwatch_running" label="Opening Soon" />

  return (
    <div className={`open-close ${status}`}>
      {icon}
    </div>
  )
}

OpenClose.propTypes = {
  status: PropTypes.oneOf(['open', 'closed', 'closing_soon', 'opening_soon']).isRequired
}

export default OpenClose
