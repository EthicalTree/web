import React from 'react'
import history from '../utils/history'

import { api, authenticate, deauthenticate } from '../utils/api'
import { trackPageView } from '../utils/ga'
import { assignBugsnagUser } from '../utils/bugsnag'

export const login = data => {
  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api
      .post('/login', { auth: data })
      .then(response => {
        if (response.data.error === 'user-not-confirmed') {
          history.push(`/verify-email?email=${data.email}`)
        } else if (!response.data.jwt) {
          const errors = response.data.errors || [
            'Invalid email/password combination',
          ]
          dispatch({ type: 'SET_MODAL_ERRORS', data: errors })
        } else {
          const jwt = response.data.jwt
          authenticate(jwt)

          dispatch({ type: 'LOGIN', data: response.data })
          dispatch({ type: 'CLOSE_MODAL' })

          dispatch(getCurrentUser())
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_MODAL_ERRORS', data: ['Invalid email/password'] })
      })
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })
  }
}

export const logout = () => {
  return dispatch => {
    deauthenticate()
    dispatch({ type: 'SET_USER_LOADING', data: true })
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'CLOSE_MODAL' })
    history.push('/')
    setTimeout(() => {
      dispatch({ type: 'SET_USER_LOADING', data: false })
    }, 500)
  }
}

export const sendForgotPasswordRequest = email => {
  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api
      .post('/forgot_password', { email })
      .then(response => {
        if (response.data.errors) {
          dispatch({
            type: 'SET_FORGOT_PASSWORD_ERROR',
            data: response.data.errors,
          })
        } else {
          dispatch({ type: 'OPEN_MODAL', data: 'login' })
          dispatch({
            type: 'SET_LOGIN_INFO',
            data:
              'Password reset link has been sent! Check your email and follow the link provided.',
          })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })
  }
}

export const checkForgotPassword = token => {
  return dispatch => {
    dispatch({ type: 'SET_CHANGE_PASSWORD_LOADING', data: true })

    api
      .post('/forgot_password', {
        token,
        check: true,
      })
      .then(response => {
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

    api
      .post('/forgot_password', {
        password,
        passwordConfirmation: confirmPassword,
        token,
      })
      .then(response => {
        if (response.data.errors) {
          dispatch({
            type: 'SET_CHANGE_PASSWORD_ERROR',
            data: response.data.errors,
          })
        } else {
          history.push('/')
          dispatch({
            type: 'SET_LOGIN_INFO',
            data: 'Your password has been successfully reset!',
          })
          dispatch({ type: 'OPEN_MODAL', data: 'login' })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_CHANGE_PASSWORD_LOADING', data: false })
      })
  }
}

export const signup = data => {
  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    const dataObj = {
      claimId: data.claimId,
      claimListingSlug: data.listingSlug,
      ethicalities: data.selectedEthicalities,
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
        contactNumber: data.contactNumber,
        position: data.position,
      },
    }

    api
      .post('/signup', dataObj)
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        } else {
          dispatch({ type: 'SIGNUP' })
          dispatch({ type: 'CLOSE_MODAL' })

          if (data.listingSlug) {
            dispatch(login(data))
          } else {
            history.push(`/verify-email?email=${data.email}`)
          }
        }
      })
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })
  }
}

export const verifyEmail = data => {
  return dispatch => {
    dispatch({ type: 'SET_VERIFY_EMAIL_LOADING', data: true })

    api
      .post('/confirm_email', { email: data.email, token: data.token })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        } else {
          dispatch({ type: 'VERIFY_EMAIL' })
          dispatch({ type: 'OPEN_MODAL', data: 'login' })
          dispatch({ type: 'SET_MODAL_ERRORS', data: null })
          history.push('/')
          dispatch({
            type: 'SET_LOGIN_INFO',
            data:
              "Great, you're verified! Feel free to login whenever, and thanks for registering :)",
          })
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

    api
      .get('/users/current')
      .then(response => {
        const user = response.data.user

        dispatch({ type: 'SET_CURRENT_USER', data: user })
        dispatch({
          type: 'SET_SEARCH_QUERY_PARAMS',
          data: { ethicalities: user.ethicalities },
        })
        dispatch({ type: 'SET_ACCOUNT_FIRST_NAME', data: user.firstName })
        dispatch({ type: 'SET_ACCOUNT_LAST_NAME', data: user.lastName })

        trackPageView({ user })
        assignBugsnagUser(user)
      })
      .then(() => {
        dispatch({ type: 'SET_USER_LOADING', data: false })
      })
  }
}

export const getSessionInformation = () => {
  return dispatch => {
    dispatch({ type: 'SET_LOADING', data: true })
    api.get('/sessions').then(response => {
      dispatch({ type: 'SET_SESSION_INFO', data: response.data })
      dispatch({ type: 'SET_LOADING', data: false })
    })
  }
}

export const openClaimListingSignup = (listingSlug, claimId) => {
  return dispatch => {
    dispatch({ type: 'OPEN_MODAL', data: 'signup' })
    dispatch({
      type: 'UPDATE_MODAL_DATA',
      data: {
        claimId,
        isBusinessOwnerSignup: true,
        listingSlug,
      },
    })

    dispatch({
      type: 'SET_MODAL_INFO_MESSAGES',
      data: [
        <div key="claim-listing-message">
          Thanks for improving your page to show our users accurate information
          and images for your business. Create a free account below to gain full
          edit control of your page.
          <br />
          <br />
          Claimed and updated pages receive 3.2x more traffic.
        </div>,
      ],
    })
  }
}
