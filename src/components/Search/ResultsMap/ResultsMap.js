import React from 'react'
import { withRouter } from 'react-router-dom'
import { Col } from 'reactstrap'

import { Map } from '../../Maps/Map'
import { Markers } from '../../Maps/Markers'

export class ResultsMap extends React.Component {

  updateMapPosition = () => {
    if (this.map) {
      this.setState({
        mapHeight: this.getInnerHeight(),
        scrollTop: this.app.scrollTop
      })
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      mapHeight: this.getInnerHeight(),
      scrollTop: 0
    }
  }

  componentDidMount() {
    this.app = document.getElementsByClassName('app')[0]
    this.app.addEventListener('scroll', this.updateMapPosition)
    window.addEventListener('resize', this.updateMapPosition)
  }

  componentWillUnmount() {
    this.app.removeEventListener('scroll', this.updateMapPosition)
    window.removeEventListener('resize', this.updateMapPosition)
  }

  shouldComponentUpdate(newProps, newState) {
    const { search, location } = this.props
    const searchChanged = newProps.location.search !== location.search
    const featuredChanged = newProps.search.featured.map(id => id).join(',') !== search.featured.map(id => id).join(',')
    const selectionChanged = newProps.search.selectedResult !== search.selectedResult
    const stateChanged = newState !== this.state

    const shouldUpdate = searchChanged || selectionChanged || featuredChanged

    if (shouldUpdate) {
      this.hasBeenFit = false
    }

    return shouldUpdate || stateChanged
  }

  getInnerHeight() {
    return window.innerHeight - 73
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

    const { zoom, mapHeight, scrollTop } = this.state

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
        if (!this.hasBeenFit) {
          map.fitBounds(bounds)
          this.hasBeenFit = true
        }
      }
    }

    return (
      <Col className={`search-map-area ${hiddenClass}`}>
        <div
          className="search-map"
          ref={map => this.map = map}
          style={{
            height: mapHeight,
            marginTop: scrollTop
          }}
        >
          <Map
            key={search.resultMode}
            onLoad={onLoad}
            onClick={handleMapClick}
            zoom={zoom}
            defaultOptions={{
              zoomControl: true,
              draggableCursor: 'pointer',
              gestureHandling: 'cooperative'
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
