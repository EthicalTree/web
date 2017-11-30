import { api, authenticate, deauthenticate } from '../utils/api'

export const login = data => {
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
          dispatch({ type: 'CLOSE_MODAL' })
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

export const logout = (history) => {
  return dispatch => {
    deauthenticate()
    dispatch({ type: 'SET_USER_LOADING', data: true })
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'CLOSE_MODAL' })
    history.push(`/`)
    setTimeout(() => {
      dispatch({ type: 'SET_USER_LOADING', data: false })
    }, 500)
  }
}

export const sendForgotPasswordRequest = email => {
  return dispatch => {
    dispatch({ type: 'SET_FORGOT_PASSWORD_LOADING', data: true })

    api.post('/forgot_password', { email })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_FORGOT_PASSWORD_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'OPEN_MODAL', data: 'login' })
          dispatch({ type: 'SET_LOGIN_INFO', data: "Password reset link has been sent! Check your email and follow the link provided." })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_FORGOT_PASSWORD_LOADING', data: false })
      })
  }
}

export const checkForgotPassword = token => {
  return dispatch => {
    dispatch({ type: 'SET_CHANGE_PASSWORD_LOADING', data: true })

    api.post('/forgot_password', {
      token,
      check: true
    }).then(response => {
      const email = response.data.email || ''
      dispatch({ type: 'SET_FORGOT_PASSWORD_EMAIL', data: email })
      dispatch({ type: 'SET_CHANGE_PASSWORD_LOADING', data: false })
    })

  }
}

export const changePassword = (data, token, history) => {
  const { password, confirmPassword } = data

  return dispatch => {
    dispatch({ type: 'SET_CHANGE_PASSWORD_LOADING', data: true })

    api.post('/forgot_password', {
      password,
      passwordConfirmation: confirmPassword,
      token
    }).then(response => {
      if (response.data.errors) {
        dispatch({ type: 'SET_CHANGE_PASSWORD_ERROR', data: response.data.errors })
      }
      else {
        history.push(`/`)
        dispatch({ type: 'SET_LOGIN_INFO', data: "Your password has been successfully reset!" })
        dispatch({ type: 'OPEN_MODAL', data: 'login' })
      }
    }).then(() => {
      dispatch({ type: 'SET_CHANGE_PASSWORD_LOADING', data: false })
    })
  }
}

export const signup = data => {
  return dispatch => {
    dispatch({ type: 'SET_SIGNUP_LOADING', data: true })

    const user = {
      user: {
        email: data.email,
        password: data.password,
        passwordConfirmation: data.confirmPassword
      }
    }

    api.post('/signup', user)
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_SIGNUP_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SIGNUP' })
          dispatch({ type: 'OPEN_MODAL', data: 'verifying_email' })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_SIGNUP_LOADING', data: false })
      })

  }
}

export const verifyEmail = data => {
  return dispatch => {
    dispatch({ type: 'SET_VERIFY_EMAIL_LOADING', data: true })

    api.post('/confirm_email', { token: data.token })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_VERIFY_EMAIL_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'VERIFY_EMAIL' })
          dispatch({ type: 'OPEN_MODAL', data: 'login' })
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
        const user = response.data.user

        dispatch({ type: 'SET_CURRENT_USER', data: user })
        dispatch({ type: 'SET_ACCOUNT_FIRST_NAME', data: user.firstName })
        dispatch({ type: 'SET_ACCOUNT_LAST_NAME', data: user.lastName })
      })
      .then(() => {
        dispatch({ type: 'SET_USER_LOADING', data: false })
      })
  }
}

export const getSessionInformation = () => {
  return dispatch => {
    api.get('/sessions')
      .then(response => {
        dispatch({ type: 'SET_SESSION_INFO', data: response.data })
      })
  }
}

