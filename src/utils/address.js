import store from 'store'

const GOOGLE_MAPS_DIRECTIONS_BASE_URL = 'https://www.google.com/maps/dir/?api=1&destination='

export const getSavedSearchLocation = () => {
  let location = store.get('ETHICALTREE_SEARCH_LOCATION')

  if (!location) {
    location = 'Ottawa, ON'
    setSavedSearchLocation(location)
  }

  return location
}

export const setSavedSearchLocation = location => {
  store.set('ETHICALTREE_SEARCH_LOCATION', location)
}

export const formatGetDirectionsUrl = (lat, lng) => {
  return `${GOOGLE_MAPS_DIRECTIONS_BASE_URL}${lat},${lng}`
}
