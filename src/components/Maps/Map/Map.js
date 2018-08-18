import React from 'react'

import { withGoogleMap, GoogleMap } from 'react-google-maps'

class InnerMap extends React.Component {
  render() {
    const { center, children, defaultOptions, onLoad, zoom } = this.props

    return (
      <GoogleMap
        {...this.props}
        ref={onLoad}
        minZoom={0}
        zoom={zoom}
        defaultOptions={{
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
          ...defaultOptions,
        }}
        defaultCenter={center}>
        {children}
      </GoogleMap>
    )
  }
}

InnerMap = withGoogleMap(InnerMap)

export const Map = props => {
  return (
    <InnerMap
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  )
}

export default Map
