
const modal = (state={}, action) => {

  switch (action.type) {
    case 'OPEN_MODAL':
      return {...state, openModal: action.data}
    case 'CLOSE_MODAL':
      return {...state, openModal: null}
    default:
      return state
  }

}

export default modal
