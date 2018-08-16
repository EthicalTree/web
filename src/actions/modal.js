export const openModal = modalName => {
  return dispatch => {
    dispatch({ type: 'OPEN_MODAL', data: modalName })
  }
}

export const closeModal = () => {
  return dispatch => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
}
