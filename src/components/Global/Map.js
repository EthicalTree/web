import React from 'react'
import PropTypes from 'prop-types'

import { withGoogleMap, GoogleMap } from 'react-google-maps'

const Map = withGoogleMap(props => {
  let { center, markers, overlay } = props
  let zoom = 11

  if (!center) {
    center = { lat: 0, lng: 0 }
    zoom = 1
  }

  return (
    <GoogleMap
      {...props}
      ref={props.onLoad}
      zoom={props.zoom || zoom}
      defaultOptions={{
        ...props.defaultOptions,
        disableDefaultUI: true
      }}
      center={center}
    >
      {markers && markers}
      {overlay && overlay}
    </GoogleMap>
  )
})

Map.propTypes = {
  center: PropTypes.object,
  markers: PropTypes.object,
  overlay: PropTypes.object
}

export default Map
