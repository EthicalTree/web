import { api } from '../utils/api'

export const getCuratedList = ({ hashtag, page=1 }) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_CURATED_LIST_LOADING', data: true })

    api.get(`/v1/curated_lists/${hashtag}?page=${page}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_CURATED_LIST', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_CURATED_LIST_LOADING', data: false })
      })
  }
}
