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
import { setGeoLocation, getGeoLocation } from '../utils/location'

export const performSearch = (params={}) => {
  const queryObj = {
    ...params,
    ethicalities: params.ethicalities.join(',')
  }

  return dispatch => {
    trackEvent({
      action: 'Listing Search',
      category: 'Search',
      label: params.query
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

const actualSetSearchLocation = (dispatch, location, city) => {
    setSavedSearchLocation(location)
    setSavedCity(city)

    dispatch({ type: 'SET_SEARCH_QUERY_PARAMS', data: {location}})
    dispatch({ type: 'SET_USER_LOCATION', data: { location, city } })
    dispatch({ type: 'SET_SEARCH_PENDING', data: true })
}

export const setSearchLocation = (l, c) => {
  let location = l ? l : getSavedSearchLocation()
  let city = c ? c : getSavedCity()

  location = toTitleCase(location)
  city = toTitleCase(city)

  return dispatch => {
    if (location === "Near Me") {
      setGeoLocation(() => {
        actualSetSearchLocation(dispatch, location, city)
      })
    } else {
      actualSetSearchLocation(dispatch, location, city)
    }
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
  const latlng = getGeoLocation();
  const queryObj = Object.assign({}, query, latlng ? latlng : {})

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
