import querystring from 'querystring'
import { api } from '../utils/api'

export const performSearch = (query, ethicalities, history, page) => {

  const queryObj = {
    query,
    ethicalities: ethicalities.join(','),
    page
  }

  return dispatch => {
    history.push(`/s/${query}?${querystring.stringify({ page })}`)

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
