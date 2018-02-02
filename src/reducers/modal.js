const defaultState = {
  isLoading: false
}

const modal = (state=defaultState, action) => {

  switch (action.type) {
    case 'SET_FULLSCREEN_MODAL_IMAGES':
      return {...state, fullScreenImages: action.data}
    case 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE':
      return {...state, fullScreenCurrentImage: action.data}
    case 'SET_MODAL_ERRORS':
      return {...state, errors: action.data}
    case 'SET_MODAL_LOADING':
      return {...state, isLoading: action.data}
    case 'OPEN_MODAL':
      return {...state, openModal: action.data}
    case 'CLOSE_MODAL':
      return {
        ...state,
        openModal: null,
        errors: null,
        isLoading: false
      }
    default:
      return state
  }

}

export default modal
