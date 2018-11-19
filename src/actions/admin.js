import querystring from 'querystring'
import { api, delay, externalDownload } from '../utils/api'
import { error, success } from '../utils/notifications'

const POLL_INTERVAL = 1000

export const pollJob = (jobId, onProgress) => {
  return api.get(`/v1/admin/jobs/${jobId}`).then(response => {
    const { data } = response

    if (data.realtimeProgress >= 0) {
      onProgress(data.realtimeProgress)
    }

    if (data.status === 'complete') {
      return response
    } else if (data.status === 'error') {
      return Promise.reject()
    } else {
      return delay(POLL_INTERVAL).then(() => {
        return pollJob(jobId, onProgress)
      })
    }
  })
}

export const download = (type, fields, format) => {
  const queryObj = {
    format,
    fields: fields.join(','),
    type,
  }

  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .get(
        `/v1/admin/exports?${querystring.stringify(queryObj)}`,
        `${type}_export.${format}`
      )
      .then(({ data }) => {
        if (data.id) {
          setTimeout(() => {
            const onProgress = progress => {
              dispatch({
                type: 'SET_ADMIN_IMPORT_EXPORT_PROGRESS',
                data: progress,
              })
            }

            onProgress(0)

            pollJob(data.id, onProgress)
              .then(response => {
                if (response && response.data && response.data.payloadObject) {
                  externalDownload(
                    response.data.payloadObject.downloadUrl,
                    `${type}_export.${format}`
                  )
                }
              })
              .catch(() => {
                error('An error occurred while running the job.')
              })
              .then(() => {
                dispatch({ type: 'SET_ADMIN_LOADING', data: false })
              })
          }, 0)
        } else {
          error('There was an error starting the job.')
        }
      })
      .catch(() => {})
  }
}

export const upload = (type, fields, file) => {
  const formData = new FormData()
  formData.append('csv', file)
  formData.append('type', type)
  formData.append('fields', fields)

  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .post(`/v1/admin/imports`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.id) {
          setTimeout(() => {
            const onProgress = progress => {
              dispatch({
                type: 'SET_ADMIN_IMPORT_EXPORT_PROGRESS',
                data: progress,
              })
            }

            onProgress(0)

            pollJob(data.id, onProgress)
              .then(() => {
                success('Items successfully imported. ')
              })
              .catch(() => {
                error('An error occurred while running the job.')
              })
              .then(() => {
                dispatch({ type: 'SET_ADMIN_LOADING', data: false })
              })
          }, 0)
        } else {
          error('There was an error starting the job.')
        }
      })
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

export const getSeoPaths = queryObj => {
  return dispatch => {
    dispatch({ type: 'SET_ADMIN_LOADING', data: true })

    api
      .get(`/v1/admin/seo_paths?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { seoPaths, currentPage, totalPages } = data
        dispatch({ type: 'SET_ADMIN_SEO_PATHS', data: seoPaths })
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

export const deleteUser = id => {
  return dispatch => {
    api
      .delete(`/v1/admin/users/${id}`)
      .then(() => {
        success('User deleted')
        dispatch(getUsers())
      })
      .catch(() => {})
  }
}

export const setListingVisibility = (listingId, visibility) => {
  return () => {
    api
      .put(`/v1/admin/listings/${listingId}`, { visibility })
      .then(() => {
        success('Listing successfully updated')
      })
      .catch(() => {})
  }
}

export const setTagUseType = (tagId, useType) => {
  return () => {
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
      .then(() => {
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
    api.post('/v1/admin/collections', { collection }).then(({ data }) => {
      if (data.errors) {
        dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
      } else {
        dispatch({ type: 'CLOSE_MODAL' })
        success('Collection created')
        dispatch(getCollections())
      }
    })
  }
}

export const addSeoPath = ({ path, title, description, header }) => {
  const seoPath = { path, title, description, header }

  return dispatch => {
    api.post('/v1/admin/seo_paths', { seoPath }).then(({ data }) => {
      if (data.errors) {
        dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
      } else {
        dispatch({ type: 'CLOSE_MODAL' })
        success('Seo Path created')
        dispatch(getSeoPaths())
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

export const addLocation = ({ lat, lng }) => {
  return dispatch => {
    api.post(`/v1/admin/locations/`, { lat, lng }).then(({ data }) => {
      if (data.errors) {
        dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
      } else {
        dispatch({ type: 'UPDATE_MODAL_DATA', data: { ...data.location } })
        dispatch({ type: 'OPEN_MODAL', data: 'admin-edit-location' })
        success('Location created')
        dispatch(getLocations())
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

export const editSeoPath = seoPath => {
  return dispatch => {
    api
      .put(`/v1/admin/seo_paths/${seoPath.id}`, { seoPath })
      .then(({ data }) => {
        if (data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: data.errors })
        } else {
          dispatch({ type: 'CLOSE_MODAL' })
          success('Seo Path updated')
          dispatch(getSeoPaths())
        }
      })
  }
}

export const addTag = ({ hashtag, useType }) => {
  const tag = { hashtag, useType }

  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api
      .post('/v1/admin/tags', { tag })
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

export const deleteSeoPath = id => {
  return dispatch => {
    api
      .delete(`/v1/admin/seo_paths/${id}`)
      .then(() => {
        success('Seo Path deleted')
        dispatch(getSeoPaths())
      })
      .catch(() => {})
  }
}
