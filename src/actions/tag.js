import { api } from '../utils/api'

export const getTag = ({ hashtag, page=1 }) => {
  return dispatch => {
    dispatch({ type: 'SET_GET_TAG_LOADING', data: true })

    api.get(`/v1/tags/${hashtag}?page=${page}`)
      .then(({ data }) => {
        dispatch({ type: 'SET_CURRENT_TAG', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_TAG_LOADING', data: false })
      })
  }
}
