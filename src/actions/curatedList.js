import querystring from 'querystring'
import { api } from '../utils/api'
import { getSavedSearchLocation } from '../utils/address'

export const getCuratedLists = () => {
  const location = getSavedSearchLocation()

  return dispatch => {
    dispatch({ type: 'SET_COLLECTIONS_LOADING', data: true })

    api.get(`/v1/curated_lists?${querystring.stringify({ location })}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_COLLECTIONS', data: data.curatedLists })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_COLLECTIONS_LOADING', data: false })
      })
  }
}

export const getCuratedList = ({ city, slug, page=1 }) => {
  const location = city ? city : getSavedSearchLocation()
  const params = { location, page }

  return dispatch => {
    dispatch({ type: 'SET_GET_CURATED_LIST_LOADING', data: true })

    api.get(`/v1/curated_lists/${slug}?${querystring.stringify(params)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_CURATED_LIST', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_CURATED_LIST_LOADING', data: false })
      })
  }
}
