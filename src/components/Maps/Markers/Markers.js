import React from 'react'
import PropTypes from 'prop-types'
import uniqBy from 'lodash/uniqBy'
import Marker from './Marker'

const Markers = props => {
  const {
    listings,
    onMarkerClick,
    onMarkerMouseOver,
    onMarkerMouseOut
  } = props

  return (
    <div>
      {uniqBy(listings, l => l.id).map(listing => {
        const location = listing.location

        return (
          <Marker
            key={location.id}
            listingSlug={listing.slug}
            location={location}
            onClick={onMarkerClick}
            onMouseOver={onMarkerMouseOver}
            onMouseOut={onMarkerMouseOut}
          />
        )
      })}
    </div>
  )
}

Markers.propTypes = {
  listings: PropTypes.array,
  addBounds: PropTypes.func,
  onMarkerClick: PropTypes.func,
  onMarkerMouseOver: PropTypes.func,
  onMarkerMouseOut: PropTypes.func
}

Markers.defaultProps = {
  listings: [],
  addBounds: () => {},
  onMarkerClick: () => {},
  onMarkerMouseOver: () => {},
  onMarkerMouseOut: () => {}
}

export default Markers
