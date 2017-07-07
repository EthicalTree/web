
export const setConfirm = (confirmData) => {
  const { action, data, msg } = confirmData

  return dispatch => {
    dispatch({ type: 'SET_CONFIRM_MODAL', data: true })
    dispatch({ type: 'SET_CONFIRM_MODAL_DATA', data: {
      action, data, msg
    }})
  }
}

export const confirmProxy = (confirmData) => {
  const { action, data } = confirmData

  return dispatch => {
    dispatch(action(data))
    dispatch({ type: 'SET_CONFIRM_MODAL', data: false })
    dispatch({ type: 'CLEAR_CONFIRM_MODAL_DATA' })
  }
}
