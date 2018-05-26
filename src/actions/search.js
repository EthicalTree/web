import querystring from 'querystring'
import { api } from '../utils/api'

import {
  getSavedCity,
  setSavedCity,
  setSavedSearchLocation,
  getSavedSearchLocation
} from '../utils/address'

import { trackEvent } from '../utils/ga'
import { toTitleCase } from '../utils/string'

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
  let location = l ? l : getSavedSearchLocation()
  location = toTitleCase(location)

  return dispatch => {
    setSavedSearchLocation(location)

    api.get(`/v1/directory_locations?${querystring.stringify({ location })}`)
      .then(({ data }) => {
        const city = data.city ? data.city : getSavedCity()
        setSavedCity(city)

        dispatch({ type: 'SET_SEARCH_LOCATION', data: location })
        dispatch({ type: 'SET_USER_LOCATION', data: {
          location,
          city
        }})
      })
      .catch(() => {})
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

export const getFeaturedListings = ({ count }) => {
  const location = getSavedSearchLocation()

  const data = {
    count,
    location,
    is_featured: true
  }

  return dispatch => {
    dispatch({ type: 'SET_FEATURED_LISTINGS_LOADING', data: true })

    api.get(`/v1/listings?${querystring.stringify(data)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_FEATURED_LISTINGS', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_FEATURED_LISTINGS_LOADING', data: false })
      })
  }
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
