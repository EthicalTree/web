import querystring from 'querystring'
import { api } from '../utils/api'

import {
  DEFAULT_LOCATION,
  NEAR_ME_LOCATION,
  getGeoLocation,
  processLocation,
  setSavedSearchLocation,
} from '../utils/location'

import { trackEvent } from '../utils/ga'

export const performSearch = (params = {}) => {
  const queryObj = {
    ...params,
    ethicalities: params.ethicalities.join(','),
    location: processLocation(params.location),
  }

  return dispatch => {
    trackEvent({
      action: 'Listing Search',
      category: 'Search',
      label: params.query,
    })

    api
      .get(`/v1/search?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_SEARCH_RESULTS', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_SEARCH_LOADING', data: false })
      })
  }
}

export const updateWithSearchLocation = location => {
  return dispatch => {
    if (location && location.id) {
      const searchLocation = location.nearMe
        ? { ...location, ...NEAR_ME_LOCATION }
        : location

      setSavedSearchLocation(location.id)
      dispatch({ type: 'SET_SEARCH_LOCATION', data: searchLocation })
    } else {
      dispatch({ type: 'SET_SEARCH_LOCATION', data: DEFAULT_LOCATION })
    }
  }
}

export const setSearchLocation = ({ id, location, nearMe }) => {
  let url = id ? `/v1/locations/${id}` : `/v1/locations?name=${location}`

  return dispatch => {
    const latlng = getGeoLocation()

    if (nearMe && latlng) {
      url = `/v1/locations?name=${latlng.lat},${latlng.lng}`
    }

    api.get(url).then(({ data }) => {
      if (nearMe && latlng) {
        dispatch(
          updateWithSearchLocation({
            ...data,
            ...latlng,
            ...NEAR_ME_LOCATION,
          })
        )
      } else {
        dispatch(updateWithSearchLocation(data))
      }

      dispatch({ type: 'SET_SEARCH_PENDING', data: true })
    })
  }
}

export const toggleSearchEthicalities = (ethicalities, slug) => {
  let selectedEthicalities

  if (ethicalities.includes(slug)) {
    selectedEthicalities = ethicalities.filter(e => e !== slug)
  } else {
    selectedEthicalities = [...ethicalities, slug]
  }

  trackEvent({
    action: 'Select Ethicality',
    category: 'Ethicality',
    label: slug,
  })

  return selectedEthicalities
}

export const getFeaturedListings = ({ count, location }) => {
  const data = {
    count,
    location: processLocation(location),
    is_featured: true,
  }

  return dispatch => {
    dispatch({ type: 'SET_FEATURED_LISTINGS_LOADING', data: true })

    api
      .get(`/v1/listings?${querystring.stringify(data)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_FEATURED_LISTINGS', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_FEATURED_LISTINGS_LOADING', data: false })
      })
  }
}

export const getCategories = () => {
  return () => {}
}
