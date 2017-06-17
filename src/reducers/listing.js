
const listing = (state={}, action) => {

  switch (action.type) {
    case 'SET_ADD_LISTING_MODAL':
      return {...state, isAddingListing: action.data}
    case 'SET_Add_LISTING_LOADING':
      return {...state, isAddingListingLoading: action.data}
    case 'SET_ADD_LISTING_ERROR':
      return {...state, addListingErrors: action.data}
    case 'SET_GET_LISTING_LOADING':
      return {...state, isListingLoading: action.data}
    case 'SET_LISTING':
      return {...state, listing: action.data}
    default:
      return state
  }

}

export default listing
