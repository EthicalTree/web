import store from 'store'

import { setSearchLocation } from './search'

import { api, authenticate } from '../utils/api'
import { trackPageView } from '../utils/ga'
import { hasSavedLocation } from '../utils/address'
import { assignBugsnagUser } from '../utils/bugsnag'

export const initApp = (options = {}) => {
  const token = store.get('ETHICALTREE_AUTH_TOKEN')
  const { location } = options.queryParams

  return dispatch => {
    dispatch({ type: 'SET_LOADING', data: true })

    if (location) {
      dispatch(setSearchLocation(location, location))
    }

    const requests = [
      api.get('/sessions'),
      api.get('/v1/ethicalities'),
      api.get('/v1/plans'),
    ]

    if (token) {
      authenticate(token)
      requests.push(api.get('/users/current'))
    } else {
      requests.push(new Promise(resolve => resolve({ data: {} })))
      trackPageView()
    }

    Promise.all(requests)
      .then(
        api.spread((s, e, p, u) => {
          const sessionData = s.data
          const ethicalitiesData = e.data
          const plans = p.data
          const { user } = u.data
          const { location } = sessionData

          if (!hasSavedLocation() && location && location.directoryLocation) {
            const { city, directoryLocation } = location
            dispatch(setSearchLocation(directoryLocation, city))
          }

          dispatch({ type: 'SET_SESSION_INFO', data: sessionData })
          dispatch({ type: 'SET_ETHICALITIES', data: ethicalitiesData })
          dispatch({ type: 'SET_PLANS', data: plans })

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
