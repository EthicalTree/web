import querystring from 'querystring'
import { api } from '../utils/api'

export const performSearch = (query, ethicalities, history, page) => {

  const queryObj = {
    query,
    ethicalities: ethicalities.join(','),
    page
  }

  return dispatch => {
    history.push(`/s/${query}?${querystring.stringify(queryObj)}`)

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

