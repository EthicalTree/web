import querystring from 'querystring'
import { api } from '../utils/api'
import { getSavedSearchLocation } from '../utils/address'

export const getCuratedLists = () => {
  const location = getSavedSearchLocation()

  return dispatch => {
    dispatch({ type: 'SET_CURATED_LISTS_LOADING', data: true })

    api.get(`/v1/curated_lists?${querystring.stringify({ location })}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_CURATED_LISTS', data: data.curatedLists })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_CURATED_LISTS_LOADING', data: false })
      })
  }
}
