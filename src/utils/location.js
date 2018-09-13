import store from 'store'

export const DEFAULT_LOCATION = {
  name: 'Toronto, ON',
  city: 'Toronto',
  id: null,
}

export const NEAR_ME_LOCATION = {
  name: 'Near Me',
  id: 'nearme',
  nearMe: true,
}

export const processLocation = location => {
  if (location) {
    if (location.nearMe) {
      const geolocation = getGeoLocation()

      if (geolocation) {
        return `${geolocation.lat},${geolocation.lng}`
      }
    } else {
      return location.id
    }
  }

  return ''
}

export const getDistance = (lat1, lng1, lat2, lng2) => {
  if (lat1 && lng1 && lat2 && lng2 && window.google) {
    const latLng1 = new window.google.maps.LatLng(lat1, lng1)
    const latLng2 = new window.google.maps.LatLng(lat2, lng2)

    const meters = window.google.maps.geometry.spherical.computeDistanceBetween(
      latLng1,
      latLng2
    )
    const kilometers = meters / 1000

    return kilometers
  }
}

export const setGeoLocation = (onSuccess, onError) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        store.set('ETHICALTREE_GEOLOCATION', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        onSuccess && onSuccess()
      },
      () => {
        onError && onError()
        store.set('ETHICALTREE_GEOLOCATION', false)
      }
    )
  }
}

export const getGeoLocation = () => {
  return store.get('ETHICALTREE_GEOLOCATION')
}

export const setSavedSearchLocation = locationId => {
  store.set('ET_LOCATION', locationId)
}

export const getSavedSearchLocation = () => {
  return store.get('ET_LOCATION')
}
