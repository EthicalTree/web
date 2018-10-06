import store from 'store'

import { updateWithSearchLocation } from './search'
import { api, authenticate } from '../utils/api'
import { trackPageView } from '../utils/ga'
import { assignBugsnagUser } from '../utils/bugsnag'

import { getGeoLocation, getSavedSearchLocation } from '../utils/location'

export const initApp = (options = {}) => {
  const token = store.get('ETHICALTREE_AUTH_TOKEN')
  const { location } = options.queryParams

  const savedLocation = getSavedSearchLocation()
  const latlng = getGeoLocation()
  const nearMe = savedLocation === 'nearme'

  return dispatch => {
    dispatch({ type: 'SET_LOADING', data: true })

    const requests = [
      api.get('/sessions'),
      api.get('/v1/ethicalities'),
      api.get('/v1/plans'),
      api.get('/v1/seo_paths'),
    ]

    // Set user
    if (token) {
      authenticate(token)
      requests.push(api.get('/users/current'))
    } else {
      requests.push(new Promise(resolve => resolve({ data: {} })))
      trackPageView()
    }

    // Set location
    if (location) {
      requests.push(api.get(`/v1/locations?name=${location}`))
    } else if (savedLocation && latlng && nearMe) {
      requests.push(api.get(`/v1/locations?name=${latlng.lat},${latlng.lng}`))
    } else if (savedLocation && !nearMe) {
      requests.push(api.get(`/v1/locations/${savedLocation}`))
    } else {
      requests.push(new Promise(resolve => resolve({ data: null })))
    }

    Promise.all(requests)
      .then(
        api.spread((s, e, p, sp, u, l) => {
          const sessionData = s.data
          const ethicalitiesData = e.data
          const plans = p.data
          const seoPaths = sp.data
          const { user } = u.data
          const location = l.data

          dispatch(
            updateWithSearchLocation({
              ...location,
              nearMe,
            })
          )

          dispatch({ type: 'SET_SESSION_INFO', data: sessionData })
          dispatch({ type: 'SET_ETHICALITIES', data: ethicalitiesData })
          dispatch({ type: 'SET_PLANS', data: plans })
          dispatch({ type: 'SET_SEO_PATHS', data: seoPaths })

          if (user) {
            dispatch({ type: 'SET_CURRENT_USER', data: user })
            dispatch({ type: 'SET_ACCOUNT_FIRST_NAME', data: user.firstName })
            dispatch({ type: 'SET_ACCOUNT_LAST_NAME', data: user.lastName })
            trackPageView({ user })
            assignBugsnagUser(user)
          }

          dispatch({ type: 'SET_USER_LOADING', data: false })
        })
      )
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_LOADING', data: false })
      })
  }
}

export const getEthicalities = () => {
  return dispatch => {
    dispatch({ type: 'SET_GET_ETHICALITIES_LOADING', data: true })

    api
      .get('/v1/ethicalities')
      .then(ethicalities => {
        dispatch({ type: 'SET_ETHICALITIES', data: ethicalities.data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_ETHICALITIES_LOADING', data: false })
      })
  }
}
