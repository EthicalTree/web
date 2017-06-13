
const listing = (state={}, action) => {

  switch (action.type) {
    case 'SET_NEW_LISTING_MODAL':
      return {...state, isAddingListing: action.data}
    default:
      return state
  }

}

export default listing
