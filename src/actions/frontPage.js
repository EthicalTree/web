import { api } from '../utils/api'

export const getCuratedLists = () => {
  return dispatch => {
    dispatch({ type: 'SET_CURATED_LISTS_LOADING', data: true })

    api.get('/v1/curated_lists')
      .then(({ data }) => {
        dispatch({ type: 'SET_CURATED_LISTS', data: data.curatedLists })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_CURATED_LISTS_LOADING', data: false })
      })
  }
}
