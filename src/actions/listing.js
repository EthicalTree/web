import { api } from '../utils/api'
import { error, success } from '../utils/notifications'
import { trackEvent } from '../utils/ga'
import history from '../utils/history'

export const getListing = slug => {
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

export const gotoListing = ({ city, slug }) => {
  return dispatch => {
    history.push(`/listings/${city}/${slug}`)
  }
}

export const addListing = (data, history) => {
  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })


    api.post('/v1/listings', { listing: data })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING', data: response.data })
          dispatch({ type: 'CLOSE_MODAL' })

          trackEvent({
            action: 'Add Listing',
            category: 'Listing',
            label: response.data.slug
          })

          history.push(`/listings/_/${response.data.slug}`)
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
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
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api.post(`/v1/listings/${listingSlug}/ethicalities`, { ethicalities })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        }
        else {
          dispatch({ type: 'SET_LISTING_ETHICALITIES', data: response.data.ethicalities })
          dispatch({ type: 'CLOSE_MODAL' })

          trackEvent({
            action: 'Edit Listing Ethicalities',
            category: 'Listing',
            label: listingSlug
          })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })
  }
}

export const editListing = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api.put(`/v1/listings/${data.slug}`, { listing: data })
      .then(response => {
        if (response.data.errors) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: response.data.errors })
        }
        else {
          if (data.claim && response.data.claimed) {
            success('Listing claimed')
            dispatch(getListing(data.slug))
          }
          else {
            dispatch({ type: 'SET_LISTING', data: response.data })
            dispatch({ type: 'CLOSE_MODAL' })

            trackEvent({
              action: 'Edit Listing Description',
              category: 'Listing',
              label: data.slug
            })
          }


        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })
  }
}

export const editLocation = (listingSlug, data) => {
  const { location } = data

  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api.post(`/v1/listings/${listingSlug}/locations`, { location })
      .then(response => {
        if (response.data.errors) {
        }
        else {
          dispatch({ type: 'SET_LISTING_LOCATION', data: response.data.locations})
          dispatch({ type: 'CLOSE_MODAL' })

          trackEvent({
            action: 'Edit Listing Location',
            category: 'Listing',
            label: listingSlug
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          dispatch({ type: 'SET_MODAL_ERRORS', data: "You must select a location on the map" })
        }
      })
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })

  }
}

export const addImageToListing = data => {
  const type = 'listing'
  const { listingSlug, imageKey } = data

  return dispatch => {
    api.post(`/v1/listings/${listingSlug}/images`, { key: imageKey, type })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: response.data.images.reverse()[0] })

          trackEvent({
            action: 'Add Image to Listing',
            category: 'Listing',
            label: listingSlug
          })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: undefined })
      })
  }
}

export const addImageToMenu = data => {
  const type = 'menu'
  const { listingSlug, menuId, imageKey } = data

  return dispatch => {
    api.post(
      `/v1/listings/${listingSlug}/menus/${menuId}/images`,
      { key: imageKey, type }
    ).then(response => {
      if (response.data.images) {
        dispatch({ type: 'SET_LISTING_MENU_IMAGES', data: response.data.images })
        dispatch({ type: 'SET_LISTING_MENU_CURRENT_IMAGE' })

        trackEvent({
          action: 'Add Image to Menu',
          category: 'Listing',
          label: listingSlug
        })
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

    api.delete(`/v1/listings/${listingSlug}/images/${imageId}?type=listing`)
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })

          trackEvent({
            action: 'Remove Image from Listing',
            category: 'Listing',
            label: listingSlug
          })
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

    api.delete(`/v1/listings/${listingSlug}/menus/${menuId}/images/${imageId}?type=menu`)
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_MENU_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_MENU_CURRENT_IMAGE' })

          trackEvent({
            action: 'Remove Image from Menu',
            category: 'Listing',
            label: listingSlug
          })
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
  const type = 'listing'

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    api.put(`/v1/listings/${listingSlug}/images/${imageId}`, { make_cover: true, type })
      .then(response => {
        if (response.data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: response.data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })

          trackEvent({
            action: 'Make Image Cover',
            category: 'Listing',
            label: listingSlug
          })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_IMAGE_LOADING', data: false })
      })
  }
}

export const updateListingImage = ({ listingSlug, imageId, offset }) => {
  const data = {
    offsetY: offset ? offset.y : undefined,
    type: 'listing'
  }

  return dispatch => {
    dispatch({ type: 'SET_IMAGE_LOADING', data: true })

    api.put(`/v1/listings/${listingSlug}/images/${imageId}`, data)
      .then(({ data }) => {
        if (data.images) {
          dispatch({ type: 'SET_LISTING_IMAGES', data: data.images })
          dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: data.images.find(i => i.id === imageId) })

          trackEvent({
            action: 'Reposition Listing Image',
            category: 'Listing',
            label: listingSlug
          })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_IMAGE_LOADING', data: false })
      })
  }
}

export const saveOperatingHours = (listing, operatingHours) => {
  const utcHours = {}

  Object.keys(operatingHours).forEach(day => {
    utcHours[day] = {...operatingHours[day], hours: operatingHours[day].hours.map(h => {
      return {
        open_24_hour: h.open.clone().tz(listing.timezone).utc().format('HH:mm'),
        close_24_hour: h.close.clone().tz(listing.timezone).utc().format('HH:mm')
      }
    })}
  })

  return dispatch => {
    dispatch({ type: 'SET_MODAL_LOADING', data: true })

    api.post(`/v1/listings/${listing.slug}/operating_hours`, utcHours)
      .then(response => {
        const operatingHours = response.data.operatingHours

        if (operatingHours) {
          dispatch(getListing(listing.slug))
          dispatch({ type: 'CLOSE_MODAL' })

          trackEvent({
            action: 'Save Listing Operating Hours',
            category: 'Listing',
            label: listing.slug
          })
        }
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_MODAL_LOADING', data: false })
      })

  }
}
