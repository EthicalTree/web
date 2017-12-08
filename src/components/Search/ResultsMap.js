import React from 'react'
import Map from '../Global/Map'
import Markers from '../Util/Map/Markers'
import { Col } from 'reactstrap'

class ResultsMap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { search, dispatch, overlay } = this.props
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
      <Col className={`search-map-area ${hiddenClass}`}>
        <div className="search-map">
          <Map
            key={search.resultMode}
            onLoad={onLoad}
            onClick={() => {
              setTimeout(() => dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: null }), 0)
            }}
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
