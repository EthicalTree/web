import React from 'react'
import PropTypes from 'prop-types'

import { withGoogleMap, GoogleMap } from 'react-google-maps'

export class Map extends React.Component {
  render() {
    const {
      center,
      children,
      defaultOptions,
      onLoad,
      zoom
    } = this.props

    return (
      <GoogleMap
        {...this.props}
        ref={onLoad}
        zoom={zoom}
        defaultOptions={{
          disableDefaultUI: true,
          ...defaultOptions,
        }}
        defaultCenter={center}
      >
        {children}
      </GoogleMap>
    )
  }
}

Map.propTypes = {
  center: PropTypes.object
}

Map.defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 11
}

export default withGoogleMap(Map)
