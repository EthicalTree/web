import querystring from 'querystring'
import { api } from '../utils/api'
import { success } from '../utils/notifications'

export const download = (type, fields, format) => {
  const queryObj = {
    format,
    fields: fields.join(','),
    type,
  }

  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .download(
        `/v1/admin/exports?${querystring.stringify(queryObj)}`,
        `${type}_export.${format}`
      )
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const getUsers = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .get(`/v1/admin/users?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { users, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_USERS', data: users })
        dispatch({
          type: 'SET_ADMIN_PAGINATION',
          data: { currentPage, totalPages },
        })
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

    api
      .get(`/v1/admin/tags?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { tags, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_TAGS', data: tags })
        dispatch({
          type: 'SET_ADMIN_PAGINATION',
          data: { currentPage, totalPages },
        })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const getListings = params => {
  const queryObj = {
    ...params,
    filters: params.filters ? params.filters.join(',') : '',
  }

  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .get(`/v1/admin/listings?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { listings, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_LISTINGS', data: listings })
        dispatch({
          type: 'SET_ADMIN_PAGINATION',
          data: { currentPage, totalPages },
        })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const getCollections = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .get(`/v1/admin/collections?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { collections, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_LISTS', data: collections })
        dispatch({
          type: 'SET_ADMIN_PAGINATION',
          data: { currentPage, totalPages },
        })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const getLocations = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .get(`/v1/admin/locations?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { locations, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_LOCATIONS', data: locations })
        dispatch({
          type: 'SET_ADMIN_PAGINATION',
          data: { currentPage, totalPages },
        })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADMIN_LOADING', data: false })
      })
  }
}

export const editUser = userData => {
  return dispatch => {
    api
      .put(`/v1/admin/users/${userData.id}`, { user: userData })
      .then(() => {
        dispatch(getUsers())
        success('User successfully saved.')
      })
      .catch(() => {})
  }
}

export const setListingVisibility = (listingId, visibility) => {
  return dispatch => {
    api
      .put(`/v1/admin/listings/${listingId}`, { visibility })
      .then(() => {
        success('Listing successfully updated')
      })
      .catch(() => {})
  }
}

export const setTagUseType = (tagId, useType) => {
  return dispatch => {
    api
      .put(`/v1/admin/tags/${tagId}`, { useType })
      .then(() => {
        success('Tag successfully updated')
      })
      .catch(() => {})
  }
}

export const updateCollection = collection => {
  return dispatch => {
    api
      .put(`/v1/admin/collections/${collection.id}`, { collection })
      .then(list => {
        dispatch(getCollections())
        success('List was successfully updated')
      })
      .catch(() => {})
  }
}

export const updateListing = listingData => {
  return dispatch => {
    api
      .put(`/v1/admin/listings/${listingData.id}`, { listing: listingData })
      .then(() => {
        dispatch(getListings({ page: 1 }))
      })
      .catch(() => {})
  }
}

export const addCollection = ({ name, description, hashtag, location }) => {
  const collection = { name, description, hashtag, location }

  return dispatch => {
    api.post(`/v1/admin/collections`, { collection }).then(({ data }) => {
      if (data.errors) {
        dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
      } else {
        dispatch({ type: 'CLOSE_MODAL' })
        success('List created')
        dispatch(getCollections())
      }
    })
  }
}

export const editCollection = ({
  id,
  name,
  description,
  hashtag,
  location,
}) => {
  const collection = { name, description, hashtag, location }

  return dispatch => {
    api.put(`/v1/admin/collections/${id}`, { collection }).then(({ data }) => {
      if (data.errors) {
        dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
      } else {
        dispatch({ type: 'CLOSE_MODAL' })
        success('Collection updated')
        dispatch(getCollections())
      }
    })
  }
}

export const editLocation = location => {
  return dispatch => {
    api
      .put(`/v1/admin/locations/${location.id}`, { location })
      .then(({ data }) => {
        if (data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
        } else {
          dispatch({ type: 'CLOSE_MODAL' })
          success('Location updated')
          dispatch(getLocations())
        }
      })
  }
}

export const addTag = ({ hashtag, useType }) => {
  const tag = { hashtag, useType }

  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api
      .post(`/v1/admin/tags`, { tag })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        } else {
          dispatch({ type: 'CLOSE_MODAL' })
          success('Tag created')
          dispatch(getTags())
        }
      })
      .catch(() => {})
  }
}

export const deleteCollection = id => {
  return dispatch => {
    api
      .delete(`/v1/admin/collections/${id}`)
      .then(() => {
        success('Collection deleted')
        dispatch(getCollections())
      })
      .catch(() => {})
  }
}

export const deleteTag = id => {
  return dispatch => {
    api
      .delete(`/v1/admin/tags/${id}`)
      .then(() => {
        success('Tag deleted')
        dispatch(getTags())
      })
      .catch(() => {})
  }
}
