
const header = (state={}, action) => {

  switch (action.type) {
    case 'TOGGLE_HEADER_ACCOUNT_DROPDOWN':
      return {...state, isAccountDropdownOpen: !state.isAccountDropdownOpen}
    case 'TOGGLE_HEADER_ACCESSIBLE':
      return {...state, isOpen: !state.isOpen}
    case 'ROUTE_HAS_CHANGED':
      // Toggle a rerender
      return {...state}
    default:
      return state
  }

}

export default header
