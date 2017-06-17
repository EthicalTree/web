import axios from 'axios'

import { apiRoute } from '../utils/api'

export const getListing = (slug) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_LISTING_LOADING', data: true })

    axios.get(`/v1/listings/${slug}`).then(listing => {
        dispatch({ type: 'SET_LISTING', data: listing.data })
      })
      .catch(() => {
        dispatch({ type: 'SET_GET_LISTING_ERROR' })
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
          console.log(response.data.slug)
          history.push(`/listings/${response.data.slug}`)
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_ADD_LISTING_ERROR' })
      })
      .then(() => {
        dispatch({ type: 'SET_ADD_LISTING_LOADING', data: false })
      })
  }
}
