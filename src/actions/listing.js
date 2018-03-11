import moment from 'moment-timezone'
import { api } from '../utils/api'
import { error } from '../utils/notifications'

export const getListing = (slug) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_LISTING_LOADING', data: true })

    api.get(`/v1/listings/${slug}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_LISTING', data })
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
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
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

export const addTagToListing = (listingSlug, hashtag) => {
  const tag = { hashtag, useType: 'admin' }

  return dispatch => {
    api.post(`/v1/listings/${listingSlug}/tags`, { tag })
      .then(newTag => {
        dispatch({ type: 'ADD_TAG_TO_LISTING', data: newTag.data.tag})
      })
      .catch(err => {
        if (err.response.status === 409) {
          error("Listing already contains that tag")
        }
      })
  }
}

export const removeTagFromListing = (listingSlug, id) => {
  return dispatch => {
    api.delete(`/v1/listings/${listingSlug}/tags/${id}`)
      .then(() => {
        dispatch({ type: 'REMOVE_TAG_FROM_LISTING', data: id })
      })
      .catch(err => {
        if (err.response.status === 404) {
          error("Could not find tag to remove")
        }
      })
  }
}


export const editEthicalities = (listingSlug, ethicalities) => {
  return dispatch => {
    dispatch({ type: 'SET_EDIT_LISTING_ETHICALITIES_LOADING', data: true })

    api.post(`/v1/listings/${listingSlug}/listing_ethicalities`, { ethicalities })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
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
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING', data: response.data })
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_EDIT_DESCRIPTION_LOADING', data: false })
      })
  }
}

export const editLocation = (listingSlug, data) => {
  const { location } = data

  return dispatch => {
    api.post(`/v1/listings/${listingSlug}/locations`, { location })
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
          dispatch({ type: 'SET_MODAL_ERRORS', data: "You must select a location on the map" })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_EDIT_LOCATION_LOADING', data: false })
      })

  }
}

export const addImageToListing = data => {
  const { listingSlug, imageKey } = data

  return dispatch => {
    api.post(`/v1/listings/${listingSlug}/images`, { key: imageKey })
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

export const addImageToMenu = data => {
  const { listingSlug, menuId, imageKey } = data

  return dispatch => {
    api.post(`/v1/listings/${listingSlug}/menus/${menuId}/images`, { key: imageKey })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_MENU_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_MENU_CURRENT_IMAGE' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_MENU_IMAGE_UPLOAD_PROGRESS', data: undefined })
      })
  }

}

export const deleteImageFromListing = data => {
  const { listingSlug, imageId } = data

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    api.delete(`/v1/listings/${listingSlug}/images/${imageId}`)
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

export const deleteImageFromMenu = data => {
  const { listingSlug, menuId, imageId } = data

  return dispatch => {
    dispatch({ type: 'SET_MENU_IMAGE_LOADING', data: true })

    api.delete(`/v1/listings/${listingSlug}/menus/${menuId}/images/${imageId}`)
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_MENU_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_MENU_CURRENT_IMAGE' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_MENU_IMAGE_LOADING', data: false })
      })
  }
}

export const makeImageCover = data => {
  const { listingSlug, imageId } = data

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    api.put(`/v1/listings/${listingSlug}/images/${imageId}`, { make_cover: true })
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

export const saveOperatingHours = (listingSlug, operatingHours) => {
  const utcHours = {}

  Object.keys(operatingHours).forEach(day => {
    utcHours[day] = {...operatingHours[day], hours: operatingHours[day].hours.map(h => {
      return {
        openStr: moment(h.openStr, 'hh:mm a').utc().format('hh:mm a'),
        closeStr: moment(h.closeStr, 'hh:mm a').utc().format('hh:mm a')
      }
    })}
  })

  return dispatch => {
    dispatch({ type: 'SET_EDITING_OPERATING_HOURS_LOADING', data: true })

    api.post(`/v1/listings/${listingSlug}/operating_hours`, utcHours)
      .then(response => {
        const operatingHours = response.data.operatingHours

        if (operatingHours) {
          dispatch(getListing(listingSlug))
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_EDITING_OPERATING_HOURS_LOADING', data: false })
      })

  }
}
