import './OpenClose.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'

import { getOpenCloseStatus } from '../../models/hours'
import { OpenCloseSkeleton } from './OpenCloseSkeleton'

const OpenClose = props => {
  const { hours, timezone } = props
  let icon

  if (hours == null) {
    return <OpenCloseSkeleton />
  }

  const status = getOpenCloseStatus(hours, timezone)

  if (status === 'open') icon = <Icon iconKey="stopwatch" label="Open Now" />
  else if (status === 'closed')
    icon = <Icon iconKey="stopwatch_cross" label="Closed" />
  else if (status === 'closing_soon')
    icon = <Icon iconKey="stopwatch_running" label="Closing Soon" />
  else if (status === 'opening_soon')
    icon = <Icon iconKey="stopwatch_running" label="Opening Soon" />

  return <div className={`open-close ${status}`}>{icon}</div>
}

OpenClose.propTypes = {
  hours: PropTypes.array,
  timezone: PropTypes.string,
}

OpenClose.defaultProps = {
  hours: [],
}

export default OpenClose
