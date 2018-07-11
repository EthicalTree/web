const defaultState = {
  currentImage: null,
  currentMenuImage: null,
  isListingLoading: true,
  isImageLoading: false,
  listingInfoTab: 'location',
  menus: [{}],
  images: [],
  tags: [],
  featuredListings: []
}

const listing = (state=defaultState, {type, data}) => {

  switch (type) {
    case 'SET_LISTING':
      return {...state, ...data}
    case 'SET_GET_LISTING_LOADING':
      return {...state, isListingLoading: data}
    case 'SET_LISTING_ETHICALITIES':
      return {...state, ethicalities: data}
    case 'SET_IMAGE_UPLOAD_PROGRESS':
      return {...state, uploadProgress: data}
    case 'SET_MENU_IMAGE_UPLOAD_PROGRESS':
      return {...state, menus: [{...state.menus[0], uploadProgress: data}]}
    case 'SET_IMAGE_LOADING':
      return {...state, isImageLoading: data}
    case 'SET_MENU_IMAGE_LOADING':
      return {...state, menus: [{...state.menus[0], isImageLoading: data}]}
    case 'SET_LISTING_IMAGES':
      return {...state, images: data}
    case 'SET_LISTING_MENU_IMAGES':
      return {...state, menus: [{...state.menus[0], images: data}]}
    case 'SET_LISTING_OPERATING_HOURS':
      return {...state, operatingHours: data}
    case 'SET_LISTING_LOCATION':
      return {...state, location: data}
    case 'CHANGE_LISTING_INFO_TAB':
      return {...state, listingInfoTab: data}
    case 'ADD_TAG_TO_LISTING':
      return {...state, tags: [...state.tags, data]}
    case 'REMOVE_TAG_FROM_LISTING':
      return {...state, tags: [...state.tags.filter(t => (t.id !== data))]}
    case 'SET_LISTING_MENU_CURRENT_IMAGE':
      const menu = state.menus[0] || {}

      if (!data && menu.images && menu.images.length > 0) {
        return {...state, currentMenuImage: menu.images[0]}
      }

      return {...state, currentMenuImage: data}
    case 'SET_LISTING_CURRENT_IMAGE':
      if (!data && state.images && state.images.length > 0) {
        return {...state, currentImage: state.images[0]}
      }

      return {...state, currentImage: data}
    default:
      return state
  }

}

export default listing
