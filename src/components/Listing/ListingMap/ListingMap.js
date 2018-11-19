import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { Marker } from 'react-google-maps'
import { Icon } from '../../Icon'
import { Map } from '../../Maps/Map'
import { formatGetDirectionsUrl, formatAddress } from '../../../utils/address'
import { trackEvent } from '../../../utils/ga'

const ListingMap = props => {
  const { location, canEdit, dispatch } = props
  const hasLocation = location && !isEmpty(location)

  if (hasLocation) {
    const geocoder = new window.google.maps.Geocoder()
    const latLng = { lat: location.lat, lng: location.lng }

    geocoder.geocode({ location: latLng }, function(results, status) {
      if (status === 'OK') {
        dispatch({ type: 'SET_LISTING_LOCATION', data: location })
      }
    })
  }

  return (
    <div className="listing-map">
      <div className="location-title">
        <h3>
          How to get here
          {canEdit && hasLocation && (
            <a
              className="btn btn-sm btn-default ml-3"
              href=""
              onClick={props.onClickLocationEdit}
            >
              Edit
            </a>
          )}
        </h3>
        {hasLocation && (
          <a
            href={formatGetDirectionsUrl(location.lat, location.lng)}
            rel="noopener noreferrer"
            target="_blank"
            className="external-link"
            onClick={() => {
              trackEvent({
                action: 'Clicked Get Direction',
                category: 'Listing',
              })
            }}
          >
            Get Directions
            <Icon iconKey="extract" />
          </a>
        )}
      </div>

      {hasLocation && (
        <p className="address-area">
          {formatAddress(location.address, location.city, location.region)}
        </p>
      )}

      <div className="listing-map-area">
        {hasLocation && (
          <Map
            zoom={16}
            defaultOptions={{
              scrollwheel: false,
              disableDefaultUI: false,
            }}
            center={{
              lat: location.lat,
              lng: location.lng,
            }}
          >
            <Marker
              key={`${location.lat}+${location.lng}`}
              position={{
                lat: location.lat,
                lng: location.lng,
              }}
            />
          </Map>
        )}

        {!hasLocation && (
          <div className="no-content">
            {canEdit && (
              <a
                href=""
                onClick={props.onClickLocationEdit}
                className="btn btn-default"
              >
                Add a location
              </a>
            )}
            {!canEdit && <p>No location set!</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingMap
