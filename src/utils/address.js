const GOOGLE_MAPS_DIRECTIONS_BASE_URL =
  'https://www.google.com/maps/dir/?api=1&destination='

export const formatGetDirectionsUrl = (lat, lng) => {
  return `${GOOGLE_MAPS_DIRECTIONS_BASE_URL}${lat},${lng}`
}

export const formatAddress = (street, city, province) => {
  return `${street}, ${city}, ${province}`
}

