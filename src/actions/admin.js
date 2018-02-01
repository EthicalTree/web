import { api } from '../utils/api'
import { success } from '../utils/notifications'

export const getUsers = () => {
  return dispatch => {
    dispatch({ type: 'SET_USER_ADMIN_LOADING', data: true })

    api.get(`/v1/admin/users`)
      .then(users => {
        if (users.data) {
          dispatch({ type: 'SET_ADMIN_USERS', data: users.data })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_USER_ADMIN_LOADING', data: false })
      })
  }
}

export const getTags = () => {
  return dispatch => {
    dispatch({ type: 'SET_TAG_ADMIN_LOADING', data: true })

    api.get(`/v1/admin/tags`)
      .then(tags => {
        if (tags.data) {
          dispatch({ type: 'SET_ADMIN_TAGS', data: tags.data })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_TAG_ADMIN_LOADING', data: false })
      })
  }
}

export const toggleAdmin = (userData) => {
  return dispatch => {
    api.put(`/v1/admin/users/${userData.id}`, {user: userData})
      .then(() => {
        dispatch({ type: 'UPDATE_ADMIN_USER', data: userData })
        success('User successfully saved.')
      })
      .catch(() => {})
  }
}


