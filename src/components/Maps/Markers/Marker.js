import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-google-maps'

const ETMarker = props => {
  const { location, listingSlug, onClick, onMouseOver, onMouseOut } = props

  return (
    <Marker
      position={location}
      onClick={() => onClick(listingSlug, location)}
      onMouseOver={() => onMouseOver(listingSlug, location)}
      onMouseOut={() => onMouseOut(listingSlug, location)}
    />
  )
}

ETMarker.propTypes = {
  listingSlug: PropTypes.string,
  location: PropTypes.object,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
}

ETMarker.defaultProps = {
  onClick: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {},
}

export default ETMarker
