import React from 'react'
import { Marker } from 'react-google-maps'
import Map from '../Global/Map'

const ListingMap = props => {
  const { locations, canEdit, dispatch } = props
  const hasLocations = locations && locations.length > 0

  if (hasLocations) {
    const geocoder = new window.google.maps.Geocoder()
    const latLng = {lat: locations[0].lat, lng: locations[0].lng}

    geocoder.geocode({'location': latLng}, function(results, status) {
      if (status === 'OK') {
        dispatch({ type: 'SET_LISTING_LOCATION', data: [{
          ...locations[0],
          address: results[0].formatted_address
        }]})
      }
    })
  }

  return (
    <div className="listing-map">
      <h3>
        How to get here
        {canEdit && hasLocations &&
          <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickLocationEdit}>
            Edit
          </a>
        }
      </h3>
      {hasLocations &&
        <p>{locations[0].address}</p>
      }
      <div className="listing-map-area">
        {hasLocations &&
          <Map
            markers={[
              <Marker
                key={`${locations[0].lat}+${locations[0].lng}`}
                position={{
                  lat: locations[0].lat,
                  lng: locations[0].lng
                }}
              />
            ]}
            defaultOptions={{
              scrollwheel: false
            }}
            center={{
              lat: locations[0].lat,
              lng: locations[0].lng
            }}
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
          />
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