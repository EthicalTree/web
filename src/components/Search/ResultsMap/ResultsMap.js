import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col } from 'reactstrap'

import { Map } from '../../Maps/Map'
import { Markers } from '../../Maps/Markers'
import { MapControl } from '../../Maps/MapControl'

export class ResultsMap extends React.Component {

  updateMapPosition = () => {
    if (this.mapEl) {
      this.setState({
        mapHeight: this.getInnerHeight(),
        scrollTop: document.getElementsByTagName('html')[0].scrollTop
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
    if (map) {
      this.map = map
      this.updateMapPosition()
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      boundsChanged: false,
      mapHeight: this.getInnerHeight(),
      scrollTop: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateMapPosition)
    window.addEventListener('resize', this.updateMapPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateMapPosition)
    window.removeEventListener('resize', this.updateMapPosition)
  }

  getInnerHeight() {
    return window.innerHeight - 73
  }

  renderSearchTools() {
    const { boundsChanged } = this.state

    if (this.map && boundsChanged) {
      return (
        <MapControl
          position={window.google.maps.ControlPosition.TOP_LEFT}
        >
          <div className="ml-2 mt-2">
            <Button
              onClick={this.handleRedoSearch}
              color="default"
            >
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
    const { search } = this.props
    const { boundsChanged } = this.state
    const { nelat, nelng, swlat, swlng } = search

    if (boundsChanged) {
      this.bounds = this.map.getBounds()
    }
    else if (nelat && nelng && swlat && swlng) {
      const sw = new window.google.maps.LatLng(swlat, swlng)
      const ne = new window.google.maps.LatLng(nelat, nelng)
      this.bounds = new window.google.maps.LatLngBounds(sw, ne)
    }
    else {
      this.bounds = new window.google.maps.LatLngBounds()
      padding = 8

      this.getBoundListings().forEach(l => {
        const location = l.location
        this.bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))
      })
    }

    if (this.map && this.bounds) {
      this.map.fitBounds(this.bounds, padding)
    }
  }

  getBoundListings() {
    const { search } = this.props
    return [...search.listings, ...search.featured]
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

    const {
      mapHeight,
      scrollTop,
    } = this.state

    const hiddenClass = search.resultMode === 'listing' ? 'd-none d-xl-block' : ''

    const markers = (
      <Markers
        listings={this.getBoundListings()}
        onMarkerClick={handleMarkerClick}
        onMarkerMouseOver={handleMarkerMouseOver}
        onMarkerMouseOut={handleMarkerMouseOut}
      />
    )

    this.calculateBounds()

    return (
      <Col className={`search-map-area ${hiddenClass}`}>
        <div
          className="search-map"
          ref={map => this.mapEl = map}
          style={{
            height: mapHeight,
            marginTop: scrollTop
          }}
        >
          <Map
            onLoad={this.handleMapLoad}
            onClick={handleMapClick}
            onDragEnd={this.handleBoundsChanged}
            defaultOptions={{
              maxZoom: 16,
              zoomControl: true,
              draggableCursor: 'pointer',
              gestureHandling: 'cooperative'
            }}
          >
            {markers}
            {overlay}
            {this.renderSearchTools()}
          </Map>
        </div>
      </Col>
    )
  }
}

export default withRouter(ResultsMap)
