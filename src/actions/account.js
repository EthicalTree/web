import { api } from '../utils/api'
import { success } from '../utils/notifications'

export const changePersonalDetails = details => {
  const { firstName, lastName } = details
  const user = { firstName, lastName }

  return dispatch => {
    dispatch({ type: 'SET_LOADING', data: true })

    api.put(`/users/current`, user)
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_EDIT_PERSONAL_DETAILS_ERRORS', data: response.data.errors  })
        }
        success('Your personal details have been saved.')
        dispatch({ type: 'SET_PERSONAL_DETAILS_DIRTY', data: false })
        dispatch({ type: 'UPDATE_CURRENT_USER', data: user })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_LOADING', data: false })
      })
  }
}
