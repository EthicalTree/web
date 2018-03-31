import React from 'react'
import { withRouter } from 'react-router-dom'
import { Col } from 'reactstrap'

import { Map } from '../../Maps/Map'
import { Markers } from '../../Maps/Markers'

export class ResultsMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(newProps) {
    const searchChanged = newProps.location.search !== this.props.location.search
    const selectionChanged = newProps.search.selectedResult !== this.props.search.selectedResult

    return searchChanged || selectionChanged
  }

  render() {
    const {
      handleMarkerClick,
      handleMarkerMouseOver,
      handleMarkerMouseOut,
      handleMapClick,
      overlay,
      search,
    } = this.props

    const { zoom } = this.state
    const hiddenClass = search.resultMode === 'listing' ? 'd-none d-xl-block' : ''
    let bounds = new window.google.maps.LatLngBounds()

    search.listings.forEach(l => {
      const location = l.locations[0]
      bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))
    })

    const markers = (
      <Markers
        listings={search.listings}
        onMarkerClick={handleMarkerClick}
        onMarkerMouseOver={handleMarkerMouseOver}
        onMarkerMouseOut={handleMarkerMouseOut}
      />
    )

    const onLoad = map => {
      if (map) {
        this.map = map

        if (!this.hasBeenFit) {
          map.fitBounds(bounds)
          this.hasBeenFit = true
        }
      }
    }

    return (
      <Col className={`search-map-area ${hiddenClass}`}>
        <div className="search-map">
          <Map
            key={search.resultMode}
            onLoad={onLoad}
            onClick={handleMapClick}
            zoom={zoom}
            defaultOptions={{
              zoomControl: true,
              draggableCursor: 'pointer'
            }}
          >
            {markers}
            {overlay}
          </Map>
        </div>
      </Col>
    )
  }
}

export default withRouter(ResultsMap)
