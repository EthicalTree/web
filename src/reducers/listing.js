
const listing = (state={}, action) => {

  switch (action.type) {
    case 'SET_ADD_LISTING_LOADING':
      return {...state, isAddingListingLoading: action.data}
    case 'SET_ADD_LISTING_ERROR':
      return {...state, addListingErrors: action.data}
    case 'SET_GET_LISTING_LOADING':
      return {...state, isListingLoading: action.data}
    case 'SET_LISTING':
      return {...state,...action.data}
    case 'SET_EDIT_LISTING_ETHICALITIES_LOADING':
      return {...state, isEditingListingEthicalitiesLoading: action.data}
    case 'SET_EDIT_ETHICALITIES_ERROR':
      return {...state, editEthicalitiesErrors: action.data}
    case 'SET_LISTING_ETHICALITIES':
      return {...state, ethicalities: action.data}
    case 'SET_EDIT_DESCRIPTION_LOADING':
      return {...state, isEditingDescriptionLoading: action.data}
    case 'SET_EDIT_DESCRIPTION_ERROR':
      return {...state, editDescriptionErrors: action.data}
    case 'SET_IMAGE_UPLOAD_PROGRESS':
      return {...state, uploadProgress: action.data}
    case 'SET_IMAGE_LOADING':
      return {...state, isImageLoading: action.data}
    case 'SET_LISTING_IMAGES':
      return {...state, images: action.data}
    case 'SET_EDITING_OPERATING_HOURS_LOADING':
      return {...state, isEditingOperatingHoursLoading: action.data}
    case 'SET_LISTING_OPERATING_HOURS':
      return {...state, operating_hours: action.data}
    case 'SET_EDIT_LOCATION_ERROR':
      return {...state, editLocationErrors: action.data}
    case 'SET_LISTING_LOCATION':
      return {...state, locations: action.data}
    case 'SET_LISTING_CURRENT_IMAGE':

      if (!action.data && state.images && state.images.length > 0) {
        return {...state, currentImage: state.images[0]}
      }

      return {...state, currentImage: action.data}
    default:
      return state
  }

}

export default listing
