import React from 'react'

import { withGoogleMap, GoogleMap } from 'react-google-maps'

const Map = withGoogleMap(props => {
  let { center } = props
  let zoom = 14

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
      center={center}>

      {props.markers &&
        props.markers
      }

    </GoogleMap>
  )

})

export default Map
