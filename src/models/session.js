import { path } from 'ramda'

export const getLocation = path(['location'])
export const getLongitude = path(['location', 'longitude'])
export const getLatitude = path(['location', 'latitude'])
export const getSearchLocation = path(['location', 'city'])
