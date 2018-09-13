import React from 'react'
import { IconInput } from '../../Icon'

const LocationInput = props => {
  const { onClick, value, ...inputProps } = props

  return (
    <IconInput
      className="location-input"
      leftIcon="road_sign"
      rightIcon="chevron_down"
      onClick={onClick}
      inputProps={{
        ...inputProps,
        value: value || '',
      }}
    />
  )
}

export default LocationInput
