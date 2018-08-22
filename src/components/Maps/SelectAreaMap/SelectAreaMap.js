import React from 'react'
import PropTypes from 'prop-types'
import { Rectangle } from 'react-google-maps'

import { Map } from '../Map'

export class SelectAreaMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {
      boundlat1,
      boundlng1,
      boundlat2,
      boundlng2,
      lat,
      lng,
      handleBoundsChanged,
    } = this.state

    const bounds = {
      north: boundlat1,
      east: boundlng1,
      south: boundlat2,
      west: boundlng2,
    }

    return (
      <Map
        zoom={13}
        defaultOptions={{
          scrollwheel: true,
          disableDefaultUI: false,
        }}
        center={{ lat, lng }}>
        <Rectangle
          defaultBounds={bounds}
          draggable={true}
          editable={true}
          options={{
            fillColor: '#526173',
            strokeColor: '#526173',
          }}
          onBoundsChanged={() => {
            handleBoundsChanged(this.rect.getBounds())
          }}
          ref={rect => (this.rect = rect)}
        />
      </Map>
    )
  }
}

SelectAreaMap.propTypes = {
  boundlat1: PropTypes.number,
  boundlng1: PropTypes.number,
  boundlat2: PropTypes.number,
  boundlng2: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  handleBoundsChanged: PropTypes.func.isRequired,
}

export default SelectAreaMap
