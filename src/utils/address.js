import store from 'store'

const GOOGLE_MAPS_DIRECTIONS_BASE_URL =
  'https://www.google.com/maps/dir/?api=1&destination='

export const hasSavedLocation = () => {
  const location = _getLocationData()
  return location && location.isSaved
}

export const getSavedSearchLocation = () => {
  return _getLocationData().location
}

export const getSavedCity = () => {
  return _getLocationData().city
}

const _getLocationData = () => {
  let location = store.get('ETHICALTREE_SEARCH_LOCATION')
  let city = store.get('ETHICALTREE_CITY')
  const isSaved = !!(location && city)

  if (!location) {
    location = 'Toronto, ON'
  }

  if (!city) {
    city = 'Toronto'
  }

  return {
    location,
    city,
    isSaved,
  }
}

export const setSavedSearchLocation = location => {
  _setLocationData(location, getSavedCity())
}

export const setSavedCity = city => {
  _setLocationData(getSavedSearchLocation(), city)
}

const _setLocationData = (location, city) => {
  store.set('ETHICALTREE_SEARCH_LOCATION', location)
  store.set('ETHICALTREE_CITY', city)
}

export const formatGetDirectionsUrl = (lat, lng) => {
  return `${GOOGLE_MAPS_DIRECTIONS_BASE_URL}${lat},${lng}`
}

export const formatAddress = (street, city, province) => {
  return `${street}, ${city}, ${province}`
}
