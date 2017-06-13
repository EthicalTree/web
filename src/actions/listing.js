import axios from 'axios'

import { apiRoute, authenticate, deauthenticate } from '../utils/api'

export const login = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_LOGIN_LOADING', data: true })

    axios.post(apiRoute('/login'), { auth: data })
      .then(response => {
        if (!response.data.jwt) {
          dispatch({ type: 'SET_LOGIN_ERROR' })
        }
        else {
          const jwt = response.data.jwt
          authenticate(jwt)

          dispatch({ type: 'LOGIN', data: response.data })
          dispatch(getCurrentUser())
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_LOGIN_ERROR' })
      })
      .then(() => {
        dispatch({ type: 'SET_LOGIN_LOADING', data: false })
      })
  }
}
