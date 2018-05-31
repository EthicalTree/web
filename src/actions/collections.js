import querystring from 'querystring'
import { api } from '../utils/api'
import { getSavedSearchLocation } from '../utils/address'

export const getCollections = () => {
  const location = getSavedSearchLocation()

  return dispatch => {
    dispatch({ type: 'SET_COLLECTIONS_LOADING', data: true })

    api.get(`/v1/collections?${querystring.stringify({ location })}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_COLLECTIONS', data: data.collections })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_COLLECTIONS_LOADING', data: false })
      })
  }
}
