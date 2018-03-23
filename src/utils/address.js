import store from 'store'

const GOOGLE_MAPS_DIRECTIONS_BASE_URL = 'https://www.google.com/maps/dir/?api=1&destination='

class AddressException {
  constructor(msg) {
    this.message = msg
    this.name = 'AddressException'
  }
}

export const mapAddressComponents = components => {
  let addressMap = {}

  components.forEach(component => {
    component.types.forEach(type => {
      addressMap[type] = component['short_name']
    })
  })

  return addressMap
}

export const formatAddress = (components, format='simple') => {
  const addressMap = mapAddressComponents(components)

  if (format === 'simple') {
    return `${addressMap['street_number']} ${addressMap['route']}, ${addressMap['locality']}`
  }

  throw new AddressException(`${format} is not a valid format`)
}

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
