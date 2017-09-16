
const confirm = (state={}, action) => {

  switch (action.type) {
    case 'SET_CONFIRM_MODAL_DATA':
      return {...state, ...action.data}
    case 'CLEAR_CONFIRM_MODAL_DATA':
      return {}
    default:
      return state
  }

}

export default confirm
