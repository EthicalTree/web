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

export const toggleAdmin = userData => {
  return dispatch => {
    api.put(`/v1/admin/users/${userData.id}`, {user: userData})
      .then(() => {
        dispatch({ type: 'UPDATE_ADMIN_USER', data: userData })
        success('User successfully saved.')
      })
      .catch(() => {})
  }
}

export const setTagUseType = (tagId, useType) => {
  return dispatch => {
    api.put(`/v1/admin/tags/${tagId}`, {useType})
      .then(() => {
        dispatch({ type: 'UPDATE_ADMIN_TAG', data: { tagId, useType } })
        success('Tag successfully updated')
      })
      .catch(() => {})
  }
}

export const addTag = ({ hashtag, useType }) => {
  const tag = { hashtag, useType }

  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api.post(`/v1/admin/tags`, { tag })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        }
        else {
          dispatch({ type: 'CLOSE_MODAL' })
          success('Tag created')
          dispatch(getTags())
        }
      })
      .catch(() => {})
  }
}

export const deleteTag = id => {
  return dispatch => {
    api.delete(`/v1/admin/tags/${id}`)
      .then(() => {
        success('Tag deleted')
        dispatch(getTags())
      })
      .catch(() => {})
  }
}

