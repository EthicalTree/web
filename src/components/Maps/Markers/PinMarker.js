import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-google-maps'

const PinMarker = props => {
  const { location, children, ...rest } = props

  return (
    <Marker
      position={{ lat: location.lat, lng: location.lng }}
      icon={{
        url: `data:image/svg+xml;charset=UTF-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path d="M17 5c0-2.756-2.244-5-5-5s-5 2.244-5 5c0 2.062 1.253 3.834 3.038 4.6l0.963 13.934c0.012 0.197 0.141 0.366 0.325 0.434 0.056 0.022 0.116 0.031 0.175 0.031 0.131 0 0.259-0.050 0.353-0.147l1-1c0.084-0.084 0.138-0.197 0.144-0.316l0.959-12.934c1.788-0.766 3.044-2.541 3.044-4.603zM12.016 22.278l-0.091 0.091-0.863-12.456c0.303 0.056 0.616 0.087 0.938 0.087 0.319 0 0.628-0.031 0.931-0.087l-0.916 12.366zM12 8c-1.653 0-3-1.347-3-3s1.347-3 3-3 3 1.347 3 3-1.347 3-3 3z"></path>
<path d="M12 3v1c0.55 0 1 0.45 1 1h1c0-1.103-0.897-2-2-2z"></path>
</svg>`,
      }}
      {...rest}
    >
      {children}
    </Marker>
  )
}

PinMarker.propTypes = {
  location: PropTypes.object,
}

export default PinMarker
