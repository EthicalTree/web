import { api } from '../utils/api'

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
