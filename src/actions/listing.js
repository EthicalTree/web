import axios from 'axios'

import { error } from '../components/Util/Notifications'
import { apiRoute } from '../utils/api'

export const getListing = (slug) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_LISTING_LOADING', data: true })

    axios.get(apiRoute(`/v1/listings/${slug}`)).then(listing => {
        dispatch({ type: 'SET_LISTING', data: listing.data })
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_GET_LISTING_LOADING', data: false })
      })
  }
}

export const addListing = (data, history) => {
  return dispatch => {
    dispatch({ type: 'SET_ADD_LISTING_LOADING', data: true })

    axios.post(apiRoute('/v1/listings'), { listing: data })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_ADD_LISTING_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING', data: response.data })
          dispatch({ type: 'SET_ADD_LISTING_MODAL', data: false })
          history.push(`/listings/${response.data.slug}`)
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_ADD_LISTING_LOADING', data: false })
      })
  }
}

export const editDescription = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_EDIT_DESCRIPTION_LOADING', data: true })

    axios.put(apiRoute(`/v1/listings/${data.slug}`), { listing: data })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_EDIT_DESCRIPTION_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING', data: response.data.listing })
          dispatch({ type: 'SET_EDITING_LISTING_DESCRIPTION', data: false })
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_EDIT_DESCRIPTION_LOADING', data: false })
      })
  }
}

export const editLocation = (listing_slug, data) => {
  const { location } = data

  return dispatch => {
    axios.post(apiRoute(`/v1/listings/${listing_slug}/locations`), { location })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_EDIT_LOCATION_ERROR', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING_LOCATION', data: response.data.locations})
          dispatch({ type: 'SET_EDITING_LISTING_LOCATION', data: false })
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_EDIT_LOCATION_LOADING', data: false })
      })

  }
}

export const addImageToListing = (listing_slug, image_key) => {
  return dispatch => {

    axios.post(apiRoute(`/v1/listings/${listing_slug}/images`), { key: image_key })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: undefined })
      })
  }
}

export const deleteImageFromListing = (data) => {
  const { listing_slug, image_id } = data

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    axios.delete(apiRoute(`/v1/listings/${listing_slug}/images/${image_id}`))
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_IMAGE_LOADING', data: false })
      })

  }
}

export const makeImageCover = (data) => {
  const { listing_slug, image_id } = data

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    axios.put(apiRoute(`/v1/listings/${listing_slug}/images/${image_id}`), { make_cover: true })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_IMAGE_LOADING', data: false })
      })
  }
}

export const saveOperatingHours = (listing_slug, operating_hours) => {
  return dispatch => {
    dispatch({ type: 'SET_EDITING_OPERATING_HOURS_LOADING', data: true })

    axios.post(apiRoute(`/v1/listings/${listing_slug}/operating_hours`), operating_hours)
      .then(response => {
        const operatingHours = response.data.operating_hours

        if (operatingHours) {
          dispatch({ type: 'SET_LISTING_OPERATING_HOURS', data: operatingHours})
          dispatch({ type: 'SET_EDITING_LISTING_OPERATING_HOURS', data: false })
        }
      })
      .catch(() => {
        error()
      })
      .then(() => {
        dispatch({ type: 'SET_EDITING_OPERATING_HOURS_LOADING', data: false })
      })

  }
}
