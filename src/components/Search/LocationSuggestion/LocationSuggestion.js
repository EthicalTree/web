import React from 'react'
import { Icon } from '../../Icon'

const LocationSuggestion = suggestion => {
  if (suggestion.id === 'nearme') {
    return (
      <span className="near-me">
        {suggestion.name}
        <Icon iconKey="map_marker" />
      </span>
    )
  } else {
    return <span>{suggestion.name}</span>
  }
}

export default LocationSuggestion
