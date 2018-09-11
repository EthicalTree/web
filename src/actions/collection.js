import querystring from 'querystring'
import { api } from '../utils/api'
import { processLocation } from '../utils/location'

export const getCollection = ({ location, slug, page = 1 }) => {
  const params = {
    location: processLocation(location),
    page,
  }

  return dispatch => {
    dispatch({ type: 'SET_GET_COLLECTION_LOADING', data: true })

    api
      .get(`/v1/collections/${slug}?${querystring.stringify(params)}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_COLLECTION', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_COLLECTION_LOADING', data: false })
      })
  }
}

export const addImageToCollection = async data => {
  const { slug, imageKey } = data

  return await api
    .post(`/v1/collections/${slug}/images`, {
      key: imageKey,
      type: 'collection',
    })
    .catch(() => {})
}

export const deleteImageFromCollection = async data => {
  const { slug, imageId } = data

  return await api
    .delete(`/v1/collections/${slug}/images/${imageId}?type=collection`)
    .catch(() => {})
}

export const makeImageCollectionCover = async data => {
  const { slug, imageId } = data

  return await api
    .put(`/v1/collections/${slug}/images/${imageId}`, {
      make_cover: true,
      type: 'collection',
    })
    .catch(() => {})
}
