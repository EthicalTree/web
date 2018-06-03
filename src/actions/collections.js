import querystring from 'querystring'
import { api } from '../utils/api'
import { getSavedSearchLocation } from '../utils/address'

export const getCollections = (options={}) => {
  const location = getSavedSearchLocation()

  const data = {
    location,
    ...options
  }

  return dispatch => {
    dispatch({ type: 'SET_COLLECTIONS_LOADING', data: true })

    api.get(`/v1/collections?${querystring.stringify(data)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_COLLECTIONS', data: data.collections })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_COLLECTIONS_LOADING', data: false })
      })
  }
}
