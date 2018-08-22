import React from 'react'
import store from '../../../store/store'
import { withRouter } from 'react-router-dom'
import { Button, Col } from 'reactstrap'
import { InfoWindow } from 'react-google-maps'

import { Map } from '../../Maps/Map'
import { Markers, PinMarker } from '../../Maps/Markers'
import { MapControl } from '../../Maps/MapControl'

export class ResultsMap extends React.Component {
  updateMapPosition = () => {
    if (this.mapEl) {
      this.setState({
        mapHeight: this.getInnerHeight(),
        scrollTop: document.getElementsByTagName('html')[0].scrollTop,
      })
    }
  }

  handleBoundsChanged = () => {
    if (this.map) {
      this.setState({ boundsChanged: true })
    }
  }

  handleRedoSearch = () => {
    const { handleRedoSearch } = this.props
    handleRedoSearch(this.bounds)
  }

  handleMapLoad = map => {
    const { handleMapLoad } = this.props
    if (!this.map) {
      this.map = map
    }
    this.calculateBounds()
    handleMapLoad && handleMapLoad(map)
  }

  constructor(props) {
    super(props)

    this.state = {
      boundsChanged: false,
      showYouAreHere: false,
      scrollTop: 0,
    }
  }

  renderSearchTools() {
    const { boundsChanged } = this.state

    if (this.map && boundsChanged) {
      return (
        <MapControl position={window.google.maps.ControlPosition.TOP_LEFT}>
          <div className="ml-2 mt-2">
            <Button onClick={this.handleRedoSearch} color="default">
              Redo search in this area
            </Button>
          </div>
        </MapControl>
      )
    }

    return null
  }

  calculateBounds() {
    let padding = 0
    const { bounds } = this.props
    const { boundsChanged } = this.state
    const { nelat, nelng, swlat, swlng } = bounds || {}

    if (boundsChanged) {
      this.bounds = this.map.getBounds()
    } else if (nelat && nelng && swlat && swlng) {
      const sw = new window.google.maps.LatLng(swlat, swlng)
      const ne = new window.google.maps.LatLng(nelat, nelng)
      this.bounds = new window.google.maps.LatLngBounds(sw, ne)
    } else {
      this.bounds = new window.google.maps.LatLngBounds()
      padding = 8

      this.getBoundListings().forEach(l => {
        const location = l.location
        this.bounds.extend(
          new window.google.maps.LatLng(location.lat, location.lng)
        )
      })
    }

    if (this.map && this.bounds) {
      this.map.fitBounds(this.bounds, padding)
    }
  }

  getBoundListings() {
    let { listings, featured } = this.props
    listings = listings || []
    featured = featured || []
    return [...listings, ...featured]
  }

  render() {
    const {
      handleMarkerClick,
      handleMarkerMouseOver,
      handleMarkerMouseOut,
      handleMapClick,
      overlay,
      resultMode,
      mapHeight,
      scrollTop,
      mapEl,
    } = this.props

    const session = store.getState().session
    const location = session.location || {}

    const hiddenClass = resultMode === 'listing' ? 'd-none d-xl-block' : ''
    const { showYouAreHere } = this.state

    const markers = (
      <Markers
        listings={this.getBoundListings()}
        onMarkerClick={handleMarkerClick}
        onMarkerMouseOver={handleMarkerMouseOver}
        onMarkerMouseOut={handleMarkerMouseOut}
      />
    )

    return (
      <Col className={`search-map-area ${hiddenClass}`}>
        <div
          className="search-map"
          ref={mapEl}
          style={{
            height: mapHeight,
            marginTop: scrollTop,
          }}>
          <Map
            onLoad={this.handleMapLoad}
            onClick={handleMapClick}
            onDragEnd={this.handleBoundsChanged}
            defaultOptions={{
              maxZoom: 16,
              zoomControl: true,
              draggableCursor: 'pointer',
              gestureHandling: 'cooperative',
            }}>
            {markers}
            {location.latitude &&
              location.longitude && (
                <React.Fragment>
                  <PinMarker
                    location={location}
                    onClick={() =>
                      this.setState({ showYouAreHere: !showYouAreHere })
                    }>
                    {showYouAreHere && (
                      <InfoWindow>
                        <span>You are here</span>
                      </InfoWindow>
                    )}
                  </PinMarker>
                </React.Fragment>
              )}
            {overlay}
            {this.renderSearchTools()}
          </Map>
        </div>
      </Col>
    )
  }
}

export default withRouter(ResultsMap)
