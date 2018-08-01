import React from 'react'
import { Icon } from '../../Icon'

const STATUS_MAPPING = {
  pending_verification: {
    iconKey: 'hourglass',
    label: 'Pending Verification'
  },
  claimed: {
    iconKey: 'check',
    label: 'Claimed'
  }
}

export const ClaimStatus = props => {
  const { status } = props

  if (!STATUS_MAPPING[status]) {
    return null
  }

  const mapping = STATUS_MAPPING[status]

  return (
    <Icon
      iconKey={mapping.iconKey}
      title={mapping.label}
    />
  )
}

export default ClaimStatus
