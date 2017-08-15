
const header = (state={}, action) => {

  switch (action.type) {
    case 'TOGGLE_HEADER_ACCESSIBLE':
      return {...state, isOpen: !state.isOpen}
    case 'SET_FIXED_HEADER':
      return {...state, isFixed: action.data}
    default:
      return state
  }

}

export default header
