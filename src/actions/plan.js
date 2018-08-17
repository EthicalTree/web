import { api } from '../utils/api'

export const getPlans = () => {
  return dispatch => {
    dispatch({ type: 'SET_GET_PLANS_LOADING', data: true })

    api
      .get('/v1/plans')
      .then(({ data }) => {
        dispatch({ type: 'SET_PLANS', data })
      })
      .catch(() => {})
      .then(() => {
        dispatch({ type: 'SET_GET_PLANS_LOADING', data: false })
      })
  }
}
