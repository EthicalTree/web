import querystring from 'querystring'
import { api } from '../utils/api'
import { success } from '../utils/notifications'

export const getUsers = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api.get(`/v1/admin/users?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { users, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_USERS', data: users })
        dispatch({ type: 'SET_ADMIN_PAGINATION', data: { currentPage, totalPages }})
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const getTags = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api.get(`/v1/admin/tags?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { tags, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_TAGS', data: tags })
        dispatch({ type: 'SET_ADMIN_PAGINATION', data: { currentPage, totalPages }})
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const getListings = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api.get(`/v1/admin/listings?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { listings, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_LISTINGS', data: listings })
        dispatch({ type: 'SET_ADMIN_PAGINATION', data: { currentPage, totalPages } })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
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

export const setListingVisibility = (listingId, visibility) => {
  return dispatch => {
    api.put(`/v1/admin/listings/${listingId}`, {visibility})
      .then(() => {
        dispatch({ type: 'UPDATE_ADMIN_LISTING', data: { listingId, visibility } })
        success('Listing successfully updated')
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

