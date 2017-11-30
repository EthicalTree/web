import querystring from 'querystring'
import { api } from '../utils/api'

export const performSearch = (query, ethicalities, page) => {

  const queryObj = {
    query,
    ethicalities: ethicalities.join(','),
    page
  }

  return dispatch => {
    dispatch({ type: 'SET_SEARCH_LOADING', data: true })

    api.get(`/v1/search?${querystring.stringify(queryObj)}`)
      .then(results => {
        dispatch({ type: 'SET_SEARCH_RESULTS', data: results.data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_SEARCH_LOADING', data: false })
      })
  }
}

export const toggleSearchEthicalities = (ethicalities, slug) => {
  let selectedEthicalities

  if (ethicalities.includes(slug)) {
    selectedEthicalities = ethicalities.filter(e => e !== slug)
  }
  else {
    selectedEthicalities = [...ethicalities, slug]
  }

  return selectedEthicalities
}

export const getLocations = query => {
  const queryObj = {
    query
  }

  return dispatch => {
    api.get(`/v1/locations?${querystring.stringify(queryObj)}`)
      .then(results => {
        dispatch({ type: 'SET_SEARCH_LOCATION_SUGGESTIONS', data: results.data })
      })
  }
}

export const getCategories = query => {
  return dispatch => {

  }
}
