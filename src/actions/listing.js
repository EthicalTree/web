import { api } from '../utils/api'

export const getListing = (slug) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_LISTING_LOADING', data: true })

    api.get(`/v1/listings/${slug}`)
      .then(listing => {
        dispatch({ type: 'SET_LISTING', data: listing.data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_LISTING_LOADING', data: false })
      })
  }
}

export const gotoListing = (slug, history) => {
  return dispatch => {
    history.push(`/listings/${slug}`)
  }
}

export const addListing = (data, history) => {
  return dispatch => {
    dispatch({ type: 'SET_ADD_LISTING_LOADING', data: true })

    api.post('/v1/listings', { listing: data })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_ADD_LISTING_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING', data: response.data })
          dispatch({ type: 'CLOSE_MODAL' })
          history.push(`/listings/${response.data.slug}`)
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_ADD_LISTING_LOADING', data: false })
      })
  }
}

export const getEthicalities = () => {
  return dispatch => {
    dispatch({ type: 'SET_GET_ETHICALITIES_LOADING', data: true })

    api.get('/v1/ethicalities')
      .then(ethicalities => {
        dispatch({ type: 'SET_ETHICALITIES', data: ethicalities.data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_ETHICALITIES_LOADING', data: false })
      })
  }
}

export const editEthicalities = (listing_slug, ethicalities) => {
  return dispatch => {
    dispatch({ type: 'SET_EDIT_LISTING_ETHICALITIES_LOADING', data: true })

    api.post(`/v1/listings/${listing_slug}/listing_ethicalities`, { ethicalities })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_EDIT_ETHICALITIES_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING_ETHICALITIES', data: response.data.ethicalities })
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_EDIT_LISTING_ETHICALITIES_LOADING', data: false })
      })
  }
}

export const editDescription = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_EDIT_DESCRIPTION_LOADING', data: true })

    api.put(`/v1/listings/${data.slug}`, { listing: data })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_EDIT_DESCRIPTION_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING', data: response.data.listing })
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_EDIT_DESCRIPTION_LOADING', data: false })
      })
  }
}

export const editLocation = (listing_slug, data) => {
  const { location } = data

  return dispatch => {
    api.post(`/v1/listings/${listing_slug}/locations`, { location })
      .then(response => {
        if (response.data.errors) {
        }
        else {
          dispatch({ type: 'SET_LISTING_LOCATION', data: response.data.locations})
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          dispatch({ type: 'SET_EDIT_LOCATION_ERROR', data: "You must select a location on the map" })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_EDIT_LOCATION_LOADING', data: false })
      })

  }
}

export const addImageToListing = (listing_slug, image_key) => {
  return dispatch => {

    api.post(`/v1/listings/${listing_slug}/images`, { key: image_key })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: undefined })
      })
  }
}

export const deleteImageFromListing = (data) => {
  const { listing_slug, image_id } = data

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    api.delete(`/v1/listings/${listing_slug}/images/${image_id}`)
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_IMAGE_LOADING', data: false })
      })

  }
}

export const makeImageCover = (data) => {
  const { listing_slug, image_id } = data

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    api.put(`/v1/listings/${listing_slug}/images/${image_id}`, { make_cover: true })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_IMAGE_LOADING', data: false })
      })
  }
}

export const saveOperatingHours = (listing_slug, operating_hours) => {
  return dispatch => {
    dispatch({ type: 'SET_EDITING_OPERATING_HOURS_LOADING', data: true })

    api.post(`/v1/listings/${listing_slug}/operating_hours`, operating_hours)
      .then(response => {
        const operatingHours = response.data.operating_hours

        if (operatingHours) {
          dispatch({ type: 'SET_LISTING_OPERATING_HOURS', data: operatingHours})
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_EDITING_OPERATING_HOURS_LOADING', data: false })
      })

  }
}
