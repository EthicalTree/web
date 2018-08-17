export const setConfirm = confirmData => {
  const { action, data, msg, title } = confirmData

  return dispatch => {
    dispatch({ type: 'OPEN_MODAL', data: 'confirm' })
    dispatch({
      type: 'SET_CONFIRM_MODAL_DATA',
      data: {
        action,
        data,
        msg,
        title,
      },
    })
  }
}

export const confirmProxy = confirmData => {
  const { action, data } = confirmData

  return dispatch => {
    dispatch(action(data))
    dispatch({ type: 'CLOSE_MODAL' })
    dispatch({ type: 'CLEAR_CONFIRM_MODAL_DATA' })
  }
}
