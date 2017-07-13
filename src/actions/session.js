import { api, authenticate, deauthenticate } from '../utils/api'

export const login = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_LOGIN_LOADING', data: true })

    api.post('/login', { auth: data })
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

export const logout = () => {
  return dispatch => {
    deauthenticate()
    dispatch({ type: 'LOGOUT' })
  }
}

export const signup = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_SIGNUP_LOADING', data: true })

    const user = {
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword
      }
    }

    api.post('/signup', user)
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_SIGNUP_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SIGNUP' })
          dispatch({ type: 'SET_VERIFYING_EMAIL_MODAL', data: true })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_SIGNUP_LOADING', data: false })
      })

  }
}

export const verifyEmail = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_VERIFY_EMAIL_LOADING', data: true })

    api.post('/confirm_email', { token: data.token })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_VERIFY_EMAIL_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'VERIFY_EMAIL' })
          dispatch({ type: 'SET_LOGIN_MODAL', data: true })
          dispatch({ type: 'SET_LOGIN_INFO', data: "Great, you're verified! Feel free to login whenever, and thanks for registering :)"})
        }
      })
      .then(() => {
        dispatch({ type: 'SET_VERIFY_EMAIL_LOADING', data: false })
      })
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    dispatch({ type: 'SET_USER_LOADING', data: true })

    api.get('/users/current')
      .then(response => {
        dispatch({ type: 'SET_CURRENT_USER', data: response.data })
      })
      .then(() => {
        dispatch({ type: 'SET_USER_LOADING', data: false })
      })
  }
}
