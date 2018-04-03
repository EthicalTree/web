import { api } from '../utils/api'

export const getCuratedLists = () => {
  return dispatch => {
    dispatch({ type: 'SET_COLLECTIONS_LOADING', data: true })

    api.get(`/v1/curated_lists`)
      .then(({ data }) => {
        dispatch({ type: 'SET_COLLECTIONS', data: data.curatedLists })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_COLLECTIONS_LOADING', data: false })
      })
  }
}

export const getCuratedList = ({ slug, page=1 }) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_CURATED_LIST_LOADING', data: true })

    api.get(`/v1/curated_lists/${slug}?page=${page}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_CURATED_LIST', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_CURATED_LIST_LOADING', data: false })
      })
  }
}
