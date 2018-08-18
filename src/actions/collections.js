import querystring from 'querystring'
import { api } from '../utils/api'
import { getSavedSearchLocation } from '../utils/address'
import { processLocation } from '../utils/location'

export const getCollections = ({ page = 1 }) => {
  const location = getSavedSearchLocation()

  const data = {
    location: processLocation(location),
    page
  }

  return dispatch => {
    dispatch({ type: 'SET_COLLECTIONS_LOADING', data: true })

    api
      .get(`/v1/collections?${querystring.stringify(data)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_COLLECTIONS', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_COLLECTIONS_LOADING', data: false })
      })
  }
}
