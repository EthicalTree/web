import React from 'react'
import { Marker } from 'react-google-maps'
import { Icon } from '../../Icon'
import { Map } from '../../Maps/Map'
import { formatGetDirectionsUrl } from '../../../utils/address'

const ListingMap = props => {
  const { locations, canEdit, dispatch } = props
  const hasLocations = locations && locations.length > 0

  if (hasLocations) {
    const geocoder = new window.google.maps.Geocoder()
    const latLng = {lat: locations[0].lat, lng: locations[0].lng}

    geocoder.geocode({'location': latLng}, function(results, status) {
      if (status === 'OK') {
        dispatch({ type: 'SET_LISTING_LOCATION', data: [{
          ...locations[0]
        }]})
      }
    })
  }

  return (
    <div className="listing-map">
      <div className="location-title">
        <h3>
          How to get here
          {canEdit && hasLocations &&
            <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickLocationEdit}>
              Edit
            </a>
          }
        </h3>
        {hasLocations &&
          <a
            href={formatGetDirectionsUrl(locations[0].lat, locations[0].lng)}
            rel="noopener noreferrer"
            target="_blank"
            className="external-link"
          >
            Get Directions
            <Icon iconKey="extract" />
          </a>
        }
      </div>

      {hasLocations &&
        <p className="address-area">
          {locations[0].formattedAddress}
        </p>
      }

      <div className="listing-map-area">
        {hasLocations &&
          <Map
            zoom={16}
            defaultOptions={{
              scrollwheel: false,
              disableDefaultUI: false
            }}
            center={{
              lat: locations[0].lat,
              lng: locations[0].lng
            }}
          >
            <Marker
              key={`${locations[0].lat}+${locations[0].lng}`}
              position={{
                lat: locations[0].lat,
                lng: locations[0].lng
              }}
            />
          </Map>
        }

        {!hasLocations &&
          <div className="no-content">
            {canEdit &&
              <a
                href=""
                onClick={props.onClickLocationEdit}
                className="btn btn-default">
                Add a location
              </a>
            }
            {!canEdit &&
              <p>No location set!</p>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default ListingMap
