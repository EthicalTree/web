import querystring from 'querystring'
import { api } from '../utils/api'
import history from '../utils/history'
import { serializeEthicalities } from '../utils/ethicalities'
import store from 'store'

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
  const query = params.query == null ? search.query : params.query

  return dispatch => {
    dispatch({
      type: 'SET_SEARCH_QUERY_PARAMS',
      data: params,
    })

    delete params['query']

    const { historyParams } = parseSearchParams(search)
    const mergedParams = { ...historyParams, ...params }

    // filter out the paramaters that that are the defaults
    // this helps remove clutter in the url
    let finalParams = {
      location: mergedParams.location,
    }

    if (mergedParams.page > 1) finalParams.page = mergedParams.page
    if (mergedParams.openNow) finalParams.openNow = mergedParams.openNow
    if (mergedParams.nelat) finalParams.nelat = mergedParams.nelat
    if (mergedParams.nelng) finalParams.nelng = mergedParams.nelng
    if (mergedParams.swlat) finalParams.swlat = mergedParams.swlat
    if (mergedParams.swlng) finalParams.swlng = mergedParams.swlng
    if (mergedParams.ethicalities.length > 0) {
      finalParams.ethicalities = serializeEthicalities(
        mergedParams.ethicalities
      )
    }

    // link to the search
    history.push({
      pathname: `/s/${encodeURIComponent(query || '')}`,
      search: `${querystring.stringify(finalParams)}`,
    })
  }
}

const parseSearchParams = search => {
  const params = {
    ethicalities: serializeEthicalities(search.selectedEthicalities),
    page: search.currentPage,
    nelat: search.nelat,
    nelng: search.nelng,
    swlat: search.swlng,
    swlng: search.swlng,
  }

  const apiParams = {
    ...params,
    open_now: search.openNow,
    location: processLocation(search.location),
  }

  const historyParams = {
    ...params,
    openNow: search.openNow,
    location: search.location.name,
  }

  return { params, apiParams, historyParams }
}

export const performSearchApiCall = search => {
  const { apiParams } = parseSearchParams(search)

  return dispatch => {
    trackEvent({
      action: 'Listing Search',
      category: 'Search',
      label: search.query,
    })

    dispatch({ type: 'SET_SEARCH_LOADING', data: true })

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
      setSavedSearchLocation(location.id)
      dispatch({ type: 'SET_SEARCH_LOCATION', data: location })
    } else if (location && location.nearMe) {
      setSavedSearchLocation('nearme')
      dispatch({
        type: 'SET_SEARCH_LOCATION',
        data: { ...location, ...NEAR_ME_LOCATION },
      })
    } else {
      dispatch({ type: 'SET_SEARCH_LOCATION', data: DEFAULT_LOCATION })
    }
  }
}

export const setSearchLocation = ({ id, location, nearMe }) => {
  let url = id
    ? `/v1/locations/${id}`
    : `/v1/locations?name=${location}&withNeighbourhoods=1`

  return dispatch => {
    let latlng = getGeoLocation()

    if (nearMe && latlng) {
      url = `/v1/locations?name=${latlng.lat},${
        latlng.lng
      }&withNeighbourhoods=1`
    }

    api.get(url).then(({ data }) => {
      if (nearMe) {
        // update nearme latlng from server if html5 location
        // hasn't been accepted
        if (!latlng) {
          store.set('ETHICALTREE_GEOLOCATION', {
            lat: data.latitude,
            lng: data.longitude,
          })
        }

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

export const toggleSearchEthicalities = (ethicalities, slug, track = false) => {
  let selectedEthicalities

  if (ethicalities.includes(slug)) {
    selectedEthicalities = ethicalities.filter(e => e !== slug)
  } else {
    selectedEthicalities = [...ethicalities, slug]
  }

  if (track) {
    trackEvent({
      action: 'Select Ethicality',
      category: 'Ethicality',
      label: slug,
    })
  }

  return selectedEthicalities
}

export const getCategories = () => {
  return () => {}
}
