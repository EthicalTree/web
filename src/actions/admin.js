import { api } from '../utils/api'
import { success } from '../utils/notifications'

export const getUsers = () => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api.get(`/v1/admin/users`)
      .then(users => {
        if (users.data) {
          dispatch({ type: 'SET_ADMIN_USERS', data: users.data })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
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


