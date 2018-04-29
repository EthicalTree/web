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
    const { search, location } = this.props
    const searchChanged = newProps.location.search !== location.search
    const featuredChanged = newProps.search.featured.map(id => id).join(',') !== search.featured.map(id => id).join(',')
    const selectionChanged = newProps.search.selectedResult !== search.selectedResult

    return searchChanged || selectionChanged || featuredChanged
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
    const boundListings = [...search.listings, ...search.featured]

    boundListings.forEach(l => {
      const location = l.locations[0]
      bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))
    })

    const markers = (
      <Markers
        listings={boundListings}
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
