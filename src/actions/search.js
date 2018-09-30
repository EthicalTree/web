import querystring from 'querystring'
import { api } from '../utils/api'
import history from '../utils/history'
import { serializeEthicalities } from '../utils/ethicalities'

import {
  DEFAULT_LOCATION,
  NEAR_ME_LOCATION,
  getGeoLocation,
  processLocation,
  setSavedSearchLocation,
} from '../utils/location'

import { trackEvent } from '../utils/ga'

export const setSearchUrl = (search, params) => {
  // set the url to /s/... to route to searchresultspage component/update it
  return dispatch => {
    dispatch({
      type: 'SET_SEARCH_QUERY_PARAMS',
      data: params,
    })

    const { historyParams } = parseSearchParams(search)
    const mergedParams = { ...historyParams, ...params }
    const { query, ...restOfMergedParams } = mergedParams

    restOfMergedParams.ethicalities = serializeEthicalities(
      restOfMergedParams.ethicalities
    )

    // set the state flag so that the SearchResultsPage knows not to update the
    // history which would make the whole page re-render
    history.push({
      pathname: `/s/${encodeURIComponent(query || '')}`,
      search: `${querystring.stringify(restOfMergedParams)}`,
      state: { dontUpdateHistoryOnApiFetch: true },
    })
  }
}

const parseSearchParams = search => {
  const params = {
    ethicalities: serializeEthicalities(search.selectedEthicalities),
    page: search.currentPage,
    query: search.query,
    open_now: search.openNow,
    nelat: search.nelat,
    nelng: search.nelng,
    swlat: search.swlng,
    swlng: search.swlng,
  }

  const apiParams = {
    ...params,
    location: processLocation(search.location),
  }

  const historyParams = {
    ...params,
    location: search.location.name,
  }

  return { params, apiParams, historyParams }
}

export const setHistoryFromSearch = search => {
  const { historyParams } = parseSearchParams(search)
  history.push(
    `/s/${encodeURIComponent(search.query || '')}?${querystring.stringify(
      historyParams
    )}`
  )
}

export const performSearchApiCall = search => {
  const { apiParams } = parseSearchParams(search)

  return dispatch => {
    trackEvent({
      action: 'Listing Search',
      category: 'Search',
      label: search.query,
    })

    api
      .get(
        `/v1/search?${querystring.stringify({
          ...apiParams,
          query: search.query,
        })}`
      )
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

      dispatch({
        type: 'SET_SEARCH_QUERY_PARAMS',
        data: { page: 1 },
      })
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
