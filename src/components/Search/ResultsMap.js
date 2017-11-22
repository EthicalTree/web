import React from 'react'
import Map from '../Global/Map'
import Markers from '../Util/Map/Markers'
import { Col } from 'reactstrap'

class ResultsMap extends React.Component {

  addBounds = location => {
    const { bounds } = this.state
    bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))
  }

  boundsChanged = () => {

  }

  constructor(props) {
    super(props)

    this.state = {
      bounds: new window.google.maps.LatLngBounds()
    }
  }

  shouldComponentUpdate(newProps, newState) {
    const { search } = newProps
    const oldSearch = this.props.search

    const listingsChanged = search.listings.map(l => oldSearch.listings.find(ol => ol.slug === l.slug)).some(l => !l)
    const resultChanged = search.selectedResult !== oldSearch.selectedResult
    const zoomChanged = newState.zoom !== this.state.zoom
    return resultChanged || zoomChanged || listingsChanged
  }

  render() {
    const { search, dispatch, overlay } = this.props
    const { bounds, zoom } = this.state

    const markers = (
      <Markers
        listings={search.listings}
        addBounds={this.addBounds}
        onMarkerClick={slug => {
          const newSlug = !!search.selectedResult && search.selectedResult === slug ? null : slug
          dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: newSlug })
          dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: newSlug })
        }}
        onMarkerMouseOver={slug => dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: slug })}
        onMarkerMouseOut={slug => dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: search.selectedResult })}
      />
    )

    const onLoad = map => {
      if (map) {
        this.map = map

        map.fitBounds(bounds)
      }
    }

    return (
      <Col className="search-map-area" sm="4">
        <div className="search-map">
          <Map
            onLoad={onLoad}
            onClick={() => {
              setTimeout(() => dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: null }), 0)
            }}
            onBoundsChanged={this.boundsChanged}
            markers={markers}
            overlay={overlay}
            zoom={zoom}
            defaultOptions={{
              zoomControl: true,
              draggableCursor: 'pointer'
            }}
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }/>
        </div>
      </Col>
    )
  }
}

export default ResultsMap
