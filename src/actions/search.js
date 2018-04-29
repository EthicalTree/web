import querystring from 'querystring'
import { api } from '../utils/api'
import { setSavedSearchLocation, getSavedSearchLocation } from '../utils/address'
import { trackEvent } from '../utils/ga'

export const performSearch = (query, ethicalities, location, page) => {

  const queryObj = {
    query,
    ethicalities: ethicalities.join(','),
    location,
    page
  }

  return dispatch => {
    dispatch({ type: 'SET_SEARCH_LOADING', data: true })

    trackEvent({
      action: 'Listing Search',
      category: 'Search',
      label: query
    })

    api.get(`/v1/search?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_SEARCH_RESULTS', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_SEARCH_LOADING', data: false })
      })
  }
}

export const setSearchLocation = l => {
  const location = l ? l : getSavedSearchLocation()

  return dispatch => {
    setSavedSearchLocation(location)
    dispatch({ type: 'SET_SEARCH_LOCATION', data: location })
    dispatch({ type: 'SET_USER_LOCATION', data: location })
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

  trackEvent({
    action: 'Select Ethicality',
    category: 'Ethicality',
    label: slug
  })

  return selectedEthicalities
}

export const getLocations = query => {
  const queryObj = { query }

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
